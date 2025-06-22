import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

interface CustomUserProfile {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  canViewMembersArea?: boolean;
}

interface AuthContextType {
  session: Session | null;
  user: CustomUserProfile | null;
  error: Error | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  error: null,
  signOut: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<CustomUserProfile | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Use maybeSingle() to handle cases where no profile exists
      const { data, error } = await supabase
        .from('member_auth')
        .select('id, name, email, is_admin, can_view_members_area')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        // Profile exists, use it
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          isAdmin: data.is_admin,
          canViewMembersArea: data.can_view_members_area
        });
      } else {
        // No profile found, create a basic one from auth user data
        const { data: authUser } = await supabase.auth.getUser();
        
        if (authUser.user) {
          const { data: newProfile, error: insertError } = await supabase
            .from('member_auth')
            .insert({
              id: authUser.user.id,
              name: authUser.user.user_metadata?.name || authUser.user.email?.split('@')[0] || 'User',
              email: authUser.user.email || '',
              is_admin: false,
              can_view_members_area: false
            })
            .select('id, name, email, is_admin, can_view_members_area')
            .single();

          if (insertError) {
            console.error('Error creating user profile:', insertError);
            throw insertError;
          }

          if (newProfile) {
            setUser({
              id: newProfile.id,
              name: newProfile.name,
              email: newProfile.email,
              isAdmin: newProfile.is_admin,
              canViewMembersArea: newProfile.can_view_members_area
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error as Error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local state
      setSession(null);
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error as Error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      error,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};