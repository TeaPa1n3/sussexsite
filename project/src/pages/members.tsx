import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { MembersHero } from '../components/sections/Members/MembersHero';
import { MemberInfoCard } from '../components/sections/Members/MemberInfoCard';
import { EventsCalendar } from '../components/sections/Members/EventsCalendar';
import { Downloads } from '../components/sections/Members/Downloads';
import { HistoricalResources } from '../components/sections/Members/HistoricalResources';
import { MembersList } from '../components/sections/Members/MembersList/index';
import { Traders } from '../components/sections/Friends/Traders';
import { SocietyPlatforms } from '../components/sections/Members/SocietyPlatforms';
import { QuickLinks } from '../components/sections/Members/QuickLinks';
import { Polls } from '../components/sections/Members/Polls';
import { Announcements } from '../components/sections/Members/Announcements';
import { LocationsMap } from '../components/sections/Members/LocationsMap';
import { MembershipPayment } from '../components/stripe/MembershipPayment';
import { PaymentSuccess } from '../components/stripe/PaymentSuccess';
import { AdminPanel } from '../components/members/AdminPanel';
import { GoogleSheetsSync } from '../components/members/GoogleSheetsSync';
import { DivisionImageManager } from '../components/members/DivisionImageManager';
import { useAuth } from '../components/auth/AuthProvider';
import { supabase } from '../lib/supabase';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';
import { ParchmentBox } from '../components/ui/ParchmentBox';
import { Lock } from 'lucide-react';

function MembersContent() {
  const { user } = useAuth();
  const [canViewMembersArea, setCanViewMembersArea] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user?.isAdmin || user?.id === 'admin';

  useEffect(() => {
    if (user) {
      checkMembersAreaAccess();
    }
  }, [user]);

  const checkMembersAreaAccess = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('member_auth')
        .select('can_view_members_area')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setCanViewMembersArea(data?.can_view_members_area || false);
    } catch (error) {
      console.error('Error checking members area access:', error);
      setCanViewMembersArea(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <Header />
        <main className="flex-grow">
          <MembersHero />
          <div className="max-w-7xl mx-auto px-4">
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
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
        <MembersHero />
        <div className="max-w-7xl mx-auto px-4">
          <PaymentSuccess />
          <MemberInfoCard />
          
          {/* Always show membership payment section */}
          <div id="membership">
            <MembershipPayment />
          </div>

          {/* Only show the rest if user has permission */}
          {canViewMembersArea ? (
            <>
              <QuickLinks />
              <div id="events">
                <Announcements />
                <EventsCalendar />
              </div>
              <div id="locations">
                <LocationsMap />
              </div>
              <div id="polls">
                <Polls />
              </div>
              <div id="platforms">
                <SocietyPlatforms />
              </div>
              <div id="documents">
                <Downloads />
              </div>
              <div id="resources">
                <HistoricalResources />
              </div>
              <div id="officers">
                <MembersList />
              </div>
              <div id="traders" className="mt-24 mb-32">
                <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
                  Trusted Traders
                </h2>
                <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
                  Below you can see a selection of traders the society regularly uses for kit and materials. 
                  As always, we advise you to speak to an officer before making any purchases to ensure it falls 
                  in line with our authenticity requirements.
                </p>
                <Traders />
              </div>
              {isAdmin && (
                <div id="admin" className="mt-12 mb-32">
                  <AdminPanel />
                  <div className="mt-8">
                    <GoogleSheetsSync />
                  </div>
                  <div className="mt-8">
                    <DivisionImageManager />
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Show access denied message for users without permission */
            <div className="mt-8 mb-32">
              <ParchmentBox>
                <div className="p-8 text-center">
                  <Lock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-medieval text-amber-500 mb-4">
                    Members Area Access Required
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Your account needs to be granted access to view the full members area content. 
                    Please contact an administrator to request access.
                  </p>
                  <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <p className="text-amber-500 text-sm">
                      <strong>Contact Information:</strong><br />
                      Email: sussexmedieval@outlook.com<br />
                      Phone: 07742 455424
                    </p>
                  </div>
                </div>
              </ParchmentBox>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}

export default function MembersPage() {
  const { session } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!session) {
    return (
      <PageLayout>
        <Header />
        <main className="flex-grow">
          <div className="max-w-6xl mx-auto px-4 py-20">
            {showRegister ? (
              <RegisterForm
                onSuccess={() => window.location.reload()}
                onBackToLogin={() => setShowRegister(false)}
              />
            ) : (
              <div className="max-w-md mx-auto">
                <LoginForm onRegisterClick={() => setShowRegister(true)} />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </PageLayout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MembersContent />} />
      <Route path="*" element={<Navigate to="/members\" replace />} />
    </Routes>
  );
}