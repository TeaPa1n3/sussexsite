import React, { useState, useEffect } from 'react';
import { ParchmentBox } from '../ui/ParchmentBox';
import { SubscriptionStatus } from './SubscriptionStatus';
import { Crown, ExternalLink, Star } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';

export function MembershipPayment() {
  const [hasActiveMembership, setHasActiveMembership] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    checkMembershipStatus();
  }, [session]);

  const checkMembershipStatus = async () => {
    try {
      const { data: orders, error } = await supabase
        .from('stripe_user_orders')
        .select('payment_status, order_status')
        .order('order_date', { ascending: false });

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // Check if user has a completed payment
      const activeMembership = orders?.find(order => 
        order.payment_status === 'paid' && 
        order.order_status === 'completed'
      );

      setHasActiveMembership(!!activeMembership);
    } catch (error) {
      console.error('Error checking membership status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="p-6 bg-gray-800/50 rounded-lg">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Current Subscription Status */}
      <SubscriptionStatus />

      {/* Only show membership purchase section if user doesn't have active membership */}
      {!hasActiveMembership && (
        <ParchmentBox>
          <div className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-medieval text-amber-500">
                  Annual Membership
                </h2>
              </div>
              
              <div className="text-3xl font-medieval text-amber-500 mb-4">
                £30.00
              </div>
              
              <p className="text-gray-400 mb-6">
                Join the Sussex Medieval Society and become part of our medieval community
              </p>

              {/* Purchase Button */}
              <a
                href="https://buy.stripe.com/eVq28qa266ny9yPeO5cV200"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-gray-900 
                  rounded-lg font-medieval hover:bg-amber-400 transition-colors"
              >
                Purchase Annual Membership
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <p className="text-gray-500 text-sm mt-4">
                Secure payment processed by Stripe
              </p>
            </div>
          </div>
        </ParchmentBox>
      )}
    </div>
  );
}