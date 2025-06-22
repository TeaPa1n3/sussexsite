import React, { useState, useEffect } from 'react';
import { User, Calendar, Shield, MapPin, Users, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { useAuth } from '../../../auth/AuthProvider';
import { supabase } from '../../../../lib/supabase';
import { memberEvents } from '../EventsCalendar/data';
import { useDivisionImages } from '../../../../hooks/useDivisionImages';

interface UserProfile {
  name: string;
  email: string;
  group_division: string | null;
  is_admin: boolean;
  created_at: string;
  can_view_members_area: boolean;
  profile_image_url: string | null;
}

interface UserRSVP {
  event_id: string;
  status: string;
  name: string | null;
  vehicle_registration: string | null;
  camping_type: string | null;
}

interface Order {
  order_id: string | null;
  checkout_session_id: string | null;
  amount_total: number | null;
  currency: string | null;
  payment_status: string | null;
  order_status: string | null;
  order_date: string | null;
}

export function MemberInfoCard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<UserRSVP[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEventsExpanded, setIsEventsExpanded] = useState(false);
  const { user, session } = useAuth();
  const { getDivisionImage, isLoading: divisionImagesLoading } = useDivisionImages();

  useEffect(() => {
    if (user && session) {
      loadMemberData();
    }
  }, [user, session]);

  const loadMemberData = async () => {
    if (!user) return;

    try {
      // Load user profile including profile_image_url
      const { data: profileData, error: profileError } = await supabase
        .from('member_auth')
        .select('name, email, group_division, is_admin, created_at, can_view_members_area, profile_image_url')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      
      console.log('👤 Loaded profile data:', {
        name: profileData.name,
        division: profileData.group_division,
        hasProfileImage: !!profileData.profile_image_url
      });
      
      setProfile(profileData);

      // Load upcoming events user is attending
      const { data: rsvpData, error: rsvpError } = await supabase
        .from('event_rsvps')
        .select('event_id, status, name, vehicle_registration, camping_type')
        .eq('user_id', user.id)
        .eq('status', 'attending');

      if (rsvpError && rsvpError.code !== 'PGRST116') throw rsvpError;
      
      // Filter to only upcoming events
      const today = new Date();
      const upcomingRSVPs = (rsvpData || []).filter(rsvp => {
        const event = memberEvents.find(e => e.id === rsvp.event_id);
        if (!event) return false;
        
        // Parse event date
        let eventDate;
        if (event.date.includes('-')) {
          const [startDate] = event.date.split('-');
          eventDate = new Date(startDate.trim() + ', ' + event.date.split(',')[1]);
        } else if (event.date.includes(',')) {
          eventDate = new Date(event.date);
        } else {
          const [month, year] = event.date.split(' ');
          const monthIndex = new Date(`${month} 1`).getMonth();
          eventDate = new Date(parseInt(year), monthIndex + 1, 0);
        }
        
        return eventDate >= today;
      });

      setUpcomingEvents(upcomingRSVPs);

      // Load orders to check membership status
      const { data: orderData, error: orderError } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (orderError && orderError.code !== 'PGRST116') throw orderError;
      setOrders(orderData || []);

    } catch (error) {
      console.error('Error loading member data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventTitle = (eventId: string) => {
    const event = memberEvents.find(e => e.id === eventId);
    return event?.title || 'Unknown Event';
  };

  const getEventDate = (eventId: string) => {
    const event = memberEvents.find(e => e.id === eventId);
    return event?.date || 'Unknown Date';
  };

  const getEventLocation = (eventId: string) => {
    const event = memberEvents.find(e => e.id === eventId);
    return event?.location || 'Unknown Location';
  };

  const getMembershipStatus = () => {
    // Primary check: if user has viewing access, they are an active member
    if (profile?.can_view_members_area) {
      return { status: 'Active Member', color: 'text-green-500', bgColor: 'bg-green-500/10' };
    }

    // Secondary check: if they have a completed payment but no viewing access yet
    const membershipOrder = orders.find(order => 
      order.payment_status === 'paid' && 
      order.order_status === 'completed'
    );

    if (membershipOrder) {
      return { status: 'Payment Complete - Awaiting Access', color: 'text-amber-500', bgColor: 'bg-amber-500/10' };
    }

    // Check for pending payments
    const pendingOrder = orders.find(order => 
      order.payment_status === 'pending' || 
      order.order_status === 'pending'
    );

    if (pendingOrder) {
      return { status: 'Payment Pending', color: 'text-amber-500', bgColor: 'bg-amber-500/10' };
    }

    return { status: 'No Active Membership', color: 'text-red-500', bgColor: 'bg-red-500/10' };
  };

  const getProfileImage = () => {
    // Use the profile image URL from the database if available
    if (profile?.profile_image_url) {
      return profile.profile_image_url;
    }
    
    // Fallback to initials if no profile image
    if (!profile?.name) return null;
    const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return initials;
  };

  const getMemberSince = () => {
    if (!profile?.created_at) return 'Unknown';
    return new Date(profile.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  if (!user || !session) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="mb-8">
        <ParchmentBox>
          <div className="p-6">
            <div className="animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                <div className="flex-grow">
                  <div className="h-6 bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="h-20 bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </ParchmentBox>
      </section>
    );
  }

  const membershipStatus = getMembershipStatus();
  const profileImageData = getProfileImage();
  const divisionImage = getDivisionImage(profile?.group_division);

  // Debug logging for division image
  console.log('🏰 Division image debug:', {
    userDivision: profile?.group_division,
    divisionImage,
    divisionImagesLoading
  });

  return (
    <section className="mb-8">
      <ParchmentBox>
        <div className="p-6">
          {/* Header with profile info */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              {/* Profile Picture/Avatar */}
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-amber-500/30 overflow-hidden">
                {profile?.profile_image_url ? (
                  <img
                    src={profile.profile_image_url}
                    alt={`${profile.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : profileImageData ? (
                  <span className="text-xl font-medieval text-amber-500">
                    {profileImageData}
                  </span>
                ) : (
                  <User className="w-8 h-8 text-amber-500" />
                )}
              </div>
              
              {/* Name and basic info */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-medieval text-amber-500">
                    {profile?.name || 'Unknown Member'}
                  </h2>
                  {profile?.is_admin && (
                    <Crown className="w-5 h-5 text-amber-500" title="Administrator" />
                  )}
                </div>
                <p className="text-gray-400 text-sm">{profile?.email}</p>
                <p className="text-gray-500 text-xs">Member since {getMemberSince()}</p>
              </div>
            </div>

            {/* Membership Status */}
            <div className="md:ml-auto">
              <div className={`px-4 py-2 rounded-full ${membershipStatus.bgColor} border border-current/20`}>
                <div className="flex items-center gap-2">
                  <Shield className={`w-4 h-4 ${membershipStatus.color}`} />
                  <span className={`text-sm font-medium ${membershipStatus.color}`}>
                    {membershipStatus.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Division */}
            <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg">
              {divisionImage ? (
                <div className="flex-shrink-0">
                  <img
                    src={divisionImage}
                    alt={`${profile?.group_division} division`}
                    className="h-auto w-auto max-h-48 object-contain"
                    style={{ maxWidth: '192px' }}
                    onLoad={() => console.log('✅ Division image loaded successfully')}
                    onError={(e) => console.error('❌ Division image failed to load:', e)}
                  />
                </div>
              ) : (
                <Users className="w-6 h-6 text-amber-500 flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-amber-500 font-medium text-2xl">Division</p>
                <p className="text-gray-300 truncate text-3xl">
                  {profile?.group_division || 'Not Assigned'}
                </p>
                {!divisionImage && profile?.group_division && !divisionImagesLoading && (
                  <p className="text-gray-500 text-xs mt-1">
                    No image available
                  </p>
                )}
              </div>
            </div>

            {/* Upcoming Events - Expandable */}
            <div className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg">
              <Calendar className="w-6 h-6 text-amber-500 mt-1" />
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-amber-500 font-medium text-sm">Upcoming Events</p>
                  {upcomingEvents.length > 0 && (
                    <button
                      onClick={() => setIsEventsExpanded(!isEventsExpanded)}
                      className="text-amber-500 hover:text-amber-400 transition-colors"
                      title={isEventsExpanded ? 'Collapse events' : 'Expand events'}
                    >
                      {isEventsExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                
                {upcomingEvents.length === 0 ? (
                  <p className="text-gray-400 text-sm">No upcoming events</p>
                ) : (
                  <div className="space-y-1">
                    {/* Show first 2 events when collapsed, all when expanded */}
                    {(isEventsExpanded ? upcomingEvents : upcomingEvents.slice(0, 2)).map((rsvp, index) => (
                      <div key={index} className="text-sm">
                        <p className="text-gray-300 font-medium truncate">
                          {getEventTitle(rsvp.event_id)}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {getEventDate(rsvp.event_id)}
                        </p>
                        {isEventsExpanded && (
                          <p className="text-gray-500 text-xs truncate">
                            📍 {getEventLocation(rsvp.event_id)}
                          </p>
                        )}
                        {isEventsExpanded && index < upcomingEvents.length - 1 && (
                          <div className="border-b border-gray-700/50 my-2"></div>
                        )}
                      </div>
                    ))}
                    
                    {!isEventsExpanded && upcomingEvents.length > 2 && (
                      <button
                        onClick={() => setIsEventsExpanded(true)}
                        className="text-amber-500 text-xs hover:text-amber-400 transition-colors"
                      >
                        +{upcomingEvents.length - 2} more events
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg">
              <MapPin className="w-6 h-6 text-amber-500" />
              <div>
                <p className="text-amber-500 font-medium text-sm">Events Attending</p>
                <p className="text-gray-300 text-2xl font-medieval">
                  {upcomingEvents.length}
                </p>
              </div>
            </div>
          </div>

          {/* Membership info for active members */}
          {membershipStatus.status === 'Active Member' && (
            <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-green-500 text-sm">
                <strong>✅ Annual membership active</strong> - You have full access to all society benefits!
              </p>
            </div>
          )}

          {/* Info for members with payment but no access yet */}
          {membershipStatus.status === 'Payment Complete - Awaiting Access' && (
            <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <p className="text-amber-500 text-sm">
                <strong>⏳ Payment received</strong> - Your membership payment has been processed. An administrator will grant you full access shortly.
              </p>
            </div>
          )}
        </div>
      </ParchmentBox>
    </section>
  );
}