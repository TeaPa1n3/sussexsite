import React, { useState, useEffect } from 'react';
import { ParchmentBox } from '../ui/ParchmentBox';
import { Lock, X, Users, Settings, LogOut, Trash2, Crown, Shield, Eye, EyeOff, RefreshCw, AlertTriangle, User } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import { ProfileImageUpload } from './ProfileImageUpload';

interface Member {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  last_login: string | null;
  can_view_members_area: boolean;
  profile_image_url: string | null;
}

export function AdminPanel() {
  const { user, session } = useAuth();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Auto-unlock for admin user
  useEffect(() => {
    if (user?.isAdmin) {
      setIsUnlocked(true);
      loadMembers();
    }
  }, [user]);

  const loadMembers = async () => {
    setIsLoading(true);
    setLoadError(null);
    setDebugInfo('Starting member load...');
    
    try {
      console.log('🔍 Loading members using admin function...');
      setDebugInfo('Querying database with admin privileges...');
      
      // Use the admin function to bypass RLS
      const { data, error } = await supabase.rpc('get_all_members_for_admin');

      console.log('📊 Admin function result:', { 
        dataLength: data?.length, 
        error,
        firstRecord: data?.[0] 
      });

      if (error) {
        console.error('❌ Admin function error:', error);
        setDebugInfo(`Admin function error: ${error.message} (Code: ${error.code})`);
        
        // If the function doesn't exist or fails, fall back to regular query
        if (error.message.includes('function') || error.code === '42883') {
          console.log('🔄 Function not found, falling back to regular query...');
          setDebugInfo('Admin function not available, using fallback method...');
          
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('member_auth')
            .select('id, name, email, is_admin, created_at, last_login, can_view_members_area, profile_image_url')
            .order('name', { ascending: true }); // Sort alphabetically in fallback too

          if (fallbackError) {
            throw new Error(`Fallback query failed: ${fallbackError.message}`);
          }

          setMembers(fallbackData || []);
          setDebugInfo(`Fallback successful: loaded ${fallbackData?.length || 0} members (sorted alphabetically)`);
          return;
        }
        
        throw error;
      }
      
      console.log(`✅ Successfully loaded ${data?.length || 0} members via admin function`);
      setDebugInfo(`Successfully loaded ${data?.length || 0} members from database (sorted alphabetically)`);
      
      // Log each member for debugging
      data?.forEach((member, index) => {
        console.log(`👤 Member ${index + 1}:`, {
          name: member.name,
          email: member.email,
          isAdmin: member.is_admin,
          canView: member.can_view_members_area,
          hasProfileImage: !!member.profile_image_url
        });
      });

      setMembers(data || []);
      
      if (!data || data.length === 0) {
        setLoadError('No members found in the database. This might indicate that no users have registered yet.');
        setDebugInfo('No members found - database is empty or query returned no results');
      }
    } catch (error: any) {
      console.error('💥 Error loading members:', error);
      setLoadError(`Failed to load members: ${error.message}`);
      setDebugInfo(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'admin123') {
      setIsUnlocked(true);
      setShowPasswordModal(false);
      setPassword('');
      setError(false);
      loadMembers();
    } else {
      setError(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const deleteMember = async (memberId: string, memberName: string) => {
    if (confirm(`Are you sure you want to delete member "${memberName}"? This action cannot be undone.`)) {
      setActionLoading(`delete-${memberId}`);
      try {
        const { error } = await supabase
          .from('member_auth')
          .delete()
          .eq('id', memberId);

        if (error) throw error;
        
        // Reload members list
        await loadMembers();
        console.log(`✅ Successfully deleted member: ${memberName}`);
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Failed to delete member');
      } finally {
        setActionLoading(null);
      }
    }
  };

  const toggleAdminStatus = async (memberId: string, currentStatus: boolean, memberName: string) => {
    setActionLoading(`admin-${memberId}`);
    try {
      console.log(`🔄 Toggling admin status for ${memberName}: ${currentStatus} -> ${!currentStatus}`);
      
      const { error } = await supabase
        .from('member_auth')
        .update({ is_admin: !currentStatus })
        .eq('id', memberId);

      if (error) {
        console.error('❌ Error updating admin status:', error);
        throw error;
      }
      
      console.log(`✅ Successfully updated admin status for ${memberName}`);
      
      // Reload members list
      await loadMembers();
    } catch (error) {
      console.error('Error updating admin status:', error);
      alert(`Failed to update admin status: ${error.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const toggleMembersAreaAccess = async (memberId: string, currentAccess: boolean, memberName: string) => {
    setActionLoading(`access-${memberId}`);
    try {
      console.log(`🔄 Toggling members area access for ${memberName}: ${currentAccess} -> ${!currentAccess}`);
      console.log(`🔍 Current user:`, { id: user?.id, isAdmin: user?.isAdmin });
      console.log(`🔍 Session:`, { userId: session?.user?.id });
      
      // First, let's check what permissions we have
      const { data: currentUserData, error: userError } = await supabase
        .from('member_auth')
        .select('is_admin')
        .eq('id', user?.id)
        .single();
      
      console.log(`🔍 Current user admin status:`, currentUserData);
      
      if (userError) {
        console.error('❌ Error checking current user admin status:', userError);
        throw new Error(`Permission check failed: ${userError.message}`);
      }
      
      if (!currentUserData?.is_admin) {
        throw new Error('You must be an admin to perform this action');
      }
      
      // Now try to update the target user
      console.log(`🔄 Attempting to update member ${memberId} access from ${currentAccess} to ${!currentAccess}`);
      
      const { data: updateData, error: updateError } = await supabase
        .from('member_auth')
        .update({ can_view_members_area: !currentAccess })
        .eq('id', memberId)
        .select();

      if (updateError) {
        console.error('❌ Error updating members area access:', updateError);
        console.error('❌ Error details:', {
          code: updateError.code,
          message: updateError.message,
          details: updateError.details,
          hint: updateError.hint
        });
        throw updateError;
      }
      
      console.log(`✅ Update successful:`, updateData);
      console.log(`✅ Successfully updated members area access for ${memberName}`);
      
      // Reload members list
      await loadMembers();
    } catch (error: any) {
      console.error('Error updating members area access:', error);
      alert(`Failed to update members area access: ${error.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleImageUpdate = (memberId: string, newImageUrl: string | null) => {
    console.log('🖼️ Updating image for member:', memberId, 'New URL:', newImageUrl);
    
    setMembers(prevMembers => 
      prevMembers.map(member => 
        member.id === memberId 
          ? { ...member, profile_image_url: newImageUrl }
          : member
      )
    );
    
    // Force a refresh of the members list to ensure persistence
    setTimeout(() => {
      loadMembers();
    }, 1000);
  };

  // Manual database check function
  const performDatabaseCheck = async () => {
    setDebugInfo('Performing comprehensive database check...');
    
    try {
      // Check 1: Test admin function
      console.log('🔍 Check 1: Testing admin function...');
      const { data: adminData, error: adminError } = await supabase.rpc('get_all_members_for_admin');
      
      if (adminError) {
        console.error('❌ Admin function failed:', adminError);
        setDebugInfo(`Admin function failed: ${adminError.message}`);
      } else {
        console.log('✅ Admin function successful:', adminData?.length);
        setDebugInfo(`Admin function works: ${adminData?.length || 0} members found (sorted alphabetically)`);
        
        if (adminData) {
          setMembers(adminData);
          setLoadError(null);
        }
        return;
      }

      // Check 2: Fallback to regular query
      console.log('🔍 Check 2: Testing regular query...');
      const { data: regularData, error: regularError } = await supabase
        .from('member_auth')
        .select('id, name, email, is_admin, created_at, last_login, can_view_members_area, profile_image_url')
        .order('name', { ascending: true }); // Sort alphabetically

      if (regularError) {
        console.error('❌ Regular query failed:', regularError);
        setDebugInfo(`Regular query failed: ${regularError.message}`);
      } else {
        console.log('✅ Regular query successful:', regularData?.length);
        setDebugInfo(`Regular query works: ${regularData?.length || 0} members found (sorted alphabetically)`);
        
        if (regularData) {
          setMembers(regularData);
          setLoadError(null);
        }
      }

    } catch (error: any) {
      console.error('💥 Database check failed:', error);
      setDebugInfo(`Database check failed: ${error.message}`);
    }
  };

  if (!isUnlocked && !user?.isAdmin) {
    return (
      <>
        <ParchmentBox>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl font-medieval text-amber-500">Admin Panel</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Administrative functions are protected. Enter the admin password to continue.
            </p>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-6 py-3 bg-amber-500 text-gray-900 rounded-lg font-medieval
                hover:bg-amber-400 transition-colors"
            >
              Access Admin Panel
            </button>
          </div>
        </ParchmentBox>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95">
            <div className="bg-gray-800 p-6 rounded-lg border border-amber-500/20 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medieval text-amber-500">Enter Admin Password</h3>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                    setError(false);
                  }}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`w-full px-4 py-2 bg-gray-900 border rounded-lg mb-4
                    ${error 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-amber-500/20 focus:border-amber-500'
                    }
                    text-gray-200 focus:outline-none`}
                  placeholder="Enter admin password"
                />
                {error && (
                  <p className="text-red-500 text-sm mb-4">Incorrect password</p>
                )}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPassword('');
                      setError(false);
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 text-gray-900 rounded-lg
                      hover:bg-amber-400 transition-colors"
                  >
                    Access Panel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <ParchmentBox>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-amber-500" />
            <h2 className="text-2xl font-medieval text-amber-500">Admin Panel</h2>
          </div>
          <div className="flex gap-2">
            {!user?.isAdmin && (
              <button
                onClick={() => setIsUnlocked(false)}
                className="px-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg
                  hover:bg-amber-500/20 transition-colors"
              >
                Lock Panel
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg
                hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* All Registered Members */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-medieval text-amber-500">
                All Registered Members ({members.length}) - Alphabetical Order
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={performDatabaseCheck}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-lg
                  hover:bg-blue-500/20 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Database Check
              </button>
              <button
                onClick={loadMembers}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg
                  hover:bg-amber-500/20 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
          
          {/* Enhanced Debug Information */}
          <div className="mb-4 p-4 bg-blue-500/10 rounded border border-blue-500/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-500 text-sm font-semibold mb-1">Debug Information:</p>
                <p className="text-blue-500 text-xs">{debugInfo}</p>
                {loadError && (
                  <p className="text-red-500 text-xs mt-1">Error: {loadError}</p>
                )}
                <div className="mt-2 text-blue-400 text-xs">
                  <p>Current user: {user?.name} ({user?.email})</p>
                  <p>Is admin: {user?.isAdmin ? 'Yes' : 'No'}</p>
                  <p>Session active: {session ? 'Yes' : 'No'}</p>
                  <p>Members loaded: {members.length}</p>
                </div>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-amber-500">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Loading members from database...
              </div>
            </div>
          ) : loadError ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{loadError}</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={loadMembers}
                  className="px-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg
                    hover:bg-amber-500/20 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={performDatabaseCheck}
                  className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-lg
                    hover:bg-blue-500/20 transition-colors"
                >
                  Run Database Check
                </button>
              </div>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No members found in the database</p>
              <p className="text-gray-500 text-sm mb-4">
                This could mean:
                <br />• No users have registered yet
                <br />• Database connection issue
                <br />• Permission problem
                <br />• Table structure issue
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={loadMembers}
                  className="px-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg
                    hover:bg-amber-500/20 transition-colors"
                >
                  Reload Members
                </button>
                <button
                  onClick={performDatabaseCheck}
                  className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-lg
                    hover:bg-blue-500/20 transition-colors"
                >
                  Diagnose Issue
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-4 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-grow">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        {member.profile_image_url ? (
                          <img
                            src={member.profile_image_url}
                            alt={`${member.name}'s profile`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30"
                            onError={(e) => {
                              console.warn('⚠️ Profile image failed to load for:', member.name, member.profile_image_url);
                            }}
                            onLoad={() => {
                              console.log('✅ Profile image loaded for:', member.name);
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-500/30 
                            flex items-center justify-center">
                            <User className="w-6 h-6 text-amber-500" />
                          </div>
                        )}
                      </div>

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-amber-500 font-medium">{member.name}</h4>
                          {member.is_admin && (
                            <Crown className="w-4 h-4 text-amber-500" title="Admin" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${
                            member.can_view_members_area 
                              ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                              : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                            {member.can_view_members_area ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            {member.can_view_members_area ? 'Can View' : 'No Access'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{member.email}</p>
                        <div className="flex gap-4 text-gray-500 text-xs mt-1">
                          <span>Registered: {new Date(member.created_at).toLocaleDateString()}</span>
                          {member.last_login && (
                            <span>Last login: {new Date(member.last_login).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 items-center">
                      {/* Profile Image Management Button */}
                      <button
                        onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                        className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-lg
                          hover:bg-purple-500/20 transition-colors text-sm flex items-center gap-1"
                        title="Manage profile image"
                      >
                        <User className="w-3 h-3" />
                        Image
                      </button>

                      {/* Members Area Access Toggle */}
                      <button
                        onClick={() => toggleMembersAreaAccess(member.id, member.can_view_members_area, member.name)}
                        disabled={actionLoading === `access-${member.id}`}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                          member.can_view_members_area
                            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                            : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                        }`}
                        title={member.can_view_members_area ? 'Remove members area access' : 'Grant members area access'}
                      >
                        {actionLoading === `access-${member.id}` ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : member.can_view_members_area ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                        {member.can_view_members_area ? 'Remove Access' : 'Grant Access'}
                      </button>
                      
                      <button
                        onClick={() => toggleAdminStatus(member.id, member.is_admin, member.name)}
                        disabled={actionLoading === `admin-${member.id}`}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          member.is_admin
                            ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
                            : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
                        }`}
                      >
                        {actionLoading === `admin-${member.id}` ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          member.is_admin ? 'Remove Admin' : 'Make Admin'
                        )}
                      </button>
                      
                      <button
                        onClick={() => deleteMember(member.id, member.name)}
                        disabled={actionLoading === `delete-${member.id}`}
                        className="px-3 py-1 bg-red-500/10 text-red-500 rounded-lg
                          hover:bg-red-500/20 transition-colors text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === `delete-${member.id}` ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Expanded Profile Image Management */}
                  {expandedMember === member.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <ProfileImageUpload
                        memberId={member.id}
                        memberName={member.name}
                        currentImageUrl={member.profile_image_url}
                        onImageUpdate={(newImageUrl) => handleImageUpdate(member.id, newImageUrl)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* System Info */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-medieval text-amber-500">System Info</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-amber-500">Current User:</span> {user?.name || 'Unknown'}
              </p>
              <p className="text-gray-400">
                <span className="text-amber-500">Role:</span> {user?.isAdmin ? 'Administrator' : 'Member'}
              </p>
              <p className="text-gray-400">
                <span className="text-amber-500">Total Members:</span> {members.length}
              </p>
              <p className="text-gray-400">
                <span className="text-amber-500">Members with Access:</span> {
                  members.filter(m => m.can_view_members_area).length
                }
              </p>
              <p className="text-gray-400">
                <span className="text-amber-500">Database:</span> Supabase Connected
              </p>
              <p className="text-gray-400">
                <span className="text-amber-500">Session:</span> Persistent (until logout)
              </p>
              <p className="text-gray-400">
                <span className="text-amber-500">Sort Order:</span> Alphabetical by Name
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-medieval text-amber-500">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  const data = JSON.stringify(members, null, 2);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `sms-members-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                }}
                className="w-full px-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg
                  hover:bg-amber-500/20 transition-colors text-sm"
              >
                Export Members Data
              </button>
              <button
                onClick={loadMembers}
                className="w-full px-4 py-2 bg-blue-500/10 text-blue-500 rounded-lg
                  hover:bg-blue-500/20 transition-colors text-sm"
              >
                Refresh Member List
              </button>
              <button
                onClick={performDatabaseCheck}
                className="w-full px-4 py-2 bg-purple-500/10 text-purple-500 rounded-lg
                  hover:bg-purple-500/20 transition-colors text-sm"
              >
                Run Full Database Check
              </button>
            </div>
          </div>
        </div>

        {/* Permission System Guide */}
        <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
          <h4 className="text-amber-500 font-medieval mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Members Area Permission System
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">👁️ Can View - Full access to members area content</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">🚫 No Access - Only sees membership payment section</span>
            </div>
          </div>
          
          <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-blue-500 text-xs">
                <p className="font-semibold mb-1">🔒 PERMISSION-BASED ACCESS CONTROL</p>
                <p>Members can only see content below the membership payment section if you grant them access:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><strong>Grant Access:</strong> Member can see events, documents, polls, and all member content</li>
                  <li><strong>Remove Access:</strong> Member only sees the membership payment card</li>
                  <li><strong>Admin Status:</strong> Separate from viewing permissions - controls admin panel access</li>
                  <li><strong>Profile Images:</strong> Upload and manage member profile pictures through the Image button</li>
                  <li><strong>Image Persistence:</strong> Profile images are stored permanently until manually deleted by an admin</li>
                </ul>
                <p className="mt-2 font-semibold">Use this to control who can access the full members area regardless of payment status.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParchmentBox>
  );
}