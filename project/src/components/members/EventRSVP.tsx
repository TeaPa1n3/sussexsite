import React, { useState, useEffect } from 'react';
import { Check, Calendar, Loader2 } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface EventRSVPProps {
  eventId: string;
  eventTitle: string;
  currentStatus?: string;
  onUpdate?: () => void;
}

export function EventRSVP({ eventId, eventTitle, currentStatus, onUpdate }: EventRSVPProps) {
  const [status, setStatus] = useState<string | null>(currentStatus || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, session } = useAuth();
  const navigate = useNavigate();

  // Update status when currentStatus prop changes
  useEffect(() => {
    setStatus(currentStatus || null);
  }, [currentStatus]);

  // Load RSVP status from database on component mount
  useEffect(() => {
    if (user && session && !currentStatus) {
      loadRSVPStatus();
    }
  }, [user, session, eventId, currentStatus]);

  const loadRSVPStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('event_rsvps')
        .select('status')
        .eq('user_id', user.id)
        .eq('event_id', eventId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" which is expected
        throw error;
      }

      setStatus(data?.status || null);
    } catch (err) {
      console.error('Error loading RSVP status:', err);
      setError('Failed to load RSVP status');
    }
  };

  const handleAttendClick = () => {
    if (!user || !session) {
      setError('Please sign in to RSVP');
      return;
    }

    console.log('Navigating to attendance form:', { eventId, eventTitle });
    
    // Navigate to the attendance form page
    navigate(`/event-attendance?eventId=${encodeURIComponent(eventId)}&eventTitle=${encodeURIComponent(eventTitle)}`);
  };

  const handleRSVP = async (newStatus: 'attending' | 'not-attending') => {
    if (!user || !session) {
      setError('Please sign in to RSVP');
      return;
    }

    console.log('Handling RSVP:', { eventId, newStatus, eventTitle });

    // If user wants to attend, navigate to attendance form
    if (newStatus === 'attending') {
      handleAttendClick();
      return;
    }

    // For "not-attending", update directly
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('event_rsvps')
        .upsert({
          user_id: user.id,
          event_id: eventId,
          status: newStatus,
          attendance_data: null // Clear attendance data for not-attending
        }, {
          onConflict: 'user_id,event_id'
        });

      if (error) throw error;

      setStatus(newStatus);
      onUpdate?.();
      
      // Dispatch custom event for other components to listen to
      window.dispatchEvent(new CustomEvent('rsvpUpdate', { 
        detail: { eventId, status: newStatus, userId: user.id }
      }));
    } catch (err: any) {
      console.error('Error updating RSVP:', err);
      setError(err.message || 'Failed to update RSVP');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !session) {
    return (
      <div className="text-gray-400 text-sm">
        Sign in to RSVP
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        {error}
        <button 
          onClick={() => setError(null)}
          className="ml-2 text-amber-500 hover:text-amber-400"
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === 'attending') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 rounded-full">
          <Check className="w-4 h-4" />
          <span>Attending</span>
        </div>
        <button
          onClick={() => handleRSVP('not-attending')}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/30 
            transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Cancel
        </button>
      </div>
    );
  }

  if (status === 'not-attending') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-full">
          <span>Not Attending</span>
        </div>
        <button
          onClick={handleAttendClick}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500/20 text-green-500 rounded-full hover:bg-green-500/30 
            transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          <Calendar className="w-4 h-4" />
          Attend
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleAttendClick}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 
          rounded-full hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        <Calendar className="w-4 h-4" />
        Attend
      </button>
      <button
        onClick={() => handleRSVP('not-attending')}
        disabled={isLoading}
        className="px-4 py-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/30 
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        Can't Attend
      </button>
    </div>
  );
}