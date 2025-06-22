import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';
import { EventAttendanceForm, AttendanceFormData } from '../components/members/EventAttendanceForm';
import { ParchmentBox } from '../components/ui/ParchmentBox';
import { useAuth } from '../components/auth/AuthProvider';
import { supabase } from '../lib/supabase';
import { memberEvents } from '../components/sections/Members/EventsCalendar/data';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function EventAttendancePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eventId = searchParams.get('eventId');
  const eventTitle = searchParams.get('eventTitle');

  // Find the event details
  const event = memberEvents.find(e => e.id === eventId);

  useEffect(() => {
    // Redirect if no event ID or user not logged in
    if (!eventId || !user || !session) {
      navigate('/members');
    }
  }, [eventId, user, session, navigate]);

  const handleSubmit = async (formData: AttendanceFormData) => {
    if (!user || !session || !eventId) {
      setError('Please sign in to RSVP');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Submitting attendance form:', { eventId, formData });
      
      // Store the RSVP with attendance form data in both individual columns and JSONB field
      // Ensure allergies and dietary_requirements have proper default values to satisfy the constraint
      const { error } = await supabase
        .from('event_rsvps')
        .upsert({
          user_id: user.id,
          event_id: eventId,
          status: 'attending',
          // Individual columns required by the constraint
          name: (formData.name ?? '').trim(),
          vehicle_registration: (formData.vehicleRegistration ?? '').trim(),
          camping_type: formData.campingType,
          insurance_confirmed: formData.insuranceConfirmed,
          // Ensure these fields are never empty strings to satisfy the constraint
          allergies: (formData.allergies ?? '').trim() || 'None',
          dietary_requirements: (formData.dietaryRequirements ?? '').trim() || 'None',
          // Also store in JSONB field for backward compatibility
          attendance_data: formData
        }, {
          onConflict: 'user_id,event_id'
        });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('RSVP submitted successfully');
      setIsSuccess(true);
      
      // Dispatch custom event for other components to listen to
      window.dispatchEvent(new CustomEvent('rsvpUpdate', { 
        detail: { eventId, status: 'attending', userId: user.id }
      }));

      // Redirect back to members page after a short delay
      setTimeout(() => {
        navigate('/members');
      }, 2000);
    } catch (err: any) {
      console.error('Error updating RSVP:', err);
      setError(err.message || 'Failed to update RSVP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/members');
  };

  if (!eventId || !user || !session) {
    return null;
  }

  if (isSuccess) {
    return (
      <PageLayout>
        <Header />
        <main className="flex-grow">
          <div className="max-w-md mx-auto px-4 py-20">
            <ParchmentBox>
              <div className="p-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-medieval text-amber-500 mb-4">
                  Attendance Confirmed!
                </h2>
                <p className="text-gray-300 mb-6">
                  Your attendance for <strong>{eventTitle || event?.title}</strong> has been confirmed.
                </p>
                <p className="text-gray-400 text-sm">
                  Redirecting you back to the members area...
                </p>
              </div>
            </ParchmentBox>
          </div>
        </main>
        <Footer />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Header />
      <main className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="mb-6">
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Members Area
            </button>
          </div>

          <ParchmentBox>
            <div className="p-6">
              <h1 className="text-3xl font-medieval text-amber-500 mb-6 text-center">
                Event Attendance Form
              </h1>
              
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-500">{error}</p>
                </div>
              )}

              <div className="mb-8 p-4 bg-amber-500/10 rounded-lg">
                <h2 className="text-xl font-medieval text-amber-500 mb-2">
                  {eventTitle || event?.title || 'Event'}
                </h2>
                {event && (
                  <>
                    <p className="text-gray-400 mb-2">{event.description}</p>
                    <p className="text-amber-500 text-sm">
                      <strong>Date:</strong> {event.date} | <strong>Location:</strong> {event.location}
                    </p>
                  </>
                )}
              </div>

              <EventAttendanceForm
                eventTitle={eventTitle || event?.title || 'Event'}
                eventId={eventId}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            </div>
          </ParchmentBox>
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}