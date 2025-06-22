import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, CreditCard, Crown } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';

interface Order {
  order_id: string | null;
  checkout_session_id: string | null;
  amount_total: number | null;
  currency: string | null;
  payment_status: string | null;
  order_status: string | null;
  order_date: string | null;
}

export function SubscriptionStatus() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    fetchOrders();
  }, [session]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) {
        throw error;
      }

      setOrders(data || []);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError('Failed to load payment information');
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-800/50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
        <div className="flex items-center gap-2 text-red-500">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  // Find the most recent completed membership payment
  const membershipOrder = orders.find(order => 
    order.payment_status === 'paid' && 
    order.order_status === 'completed'
  );

  // Don't show anything if no membership found - this removes the notification
  if (!membershipOrder) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-amber-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100); // Stripe amounts are in cents
  };

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-medieval text-amber-500">Membership Status</h3>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(membershipOrder.order_status || 'unknown')}
            <span className={`text-sm font-medium ${getStatusColor(membershipOrder.order_status || 'unknown')}`}>
              {membershipOrder.order_status === 'completed' ? 'ACTIVE' : (membershipOrder.order_status?.toUpperCase() || 'UNKNOWN')}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="text-gray-400">
            <span>Payment Date: </span>
            <span className="text-amber-500">
              {membershipOrder.order_date ? formatDate(membershipOrder.order_date) : 'Unknown'}
            </span>
          </div>

          <div className="text-gray-400">
            <span>Amount Paid: </span>
            <span className="text-amber-500">
              {membershipOrder.amount_total && membershipOrder.currency 
                ? formatAmount(membershipOrder.amount_total, membershipOrder.currency)
                : 'Unknown'
              }
            </span>
          </div>
        </div>

        {membershipOrder.order_status === 'completed' && (
          <div className="flex items-center gap-2 text-green-500 text-sm bg-green-500/10 p-3 rounded-lg">
            <CreditCard className="w-4 h-4" />
            <span>✅ Annual membership active - Welcome to the Society!</span>
          </div>
        )}

        {/* Show all orders if there are multiple */}
        {orders.length > 1 && (
          <details className="mt-4">
            <summary className="text-amber-500 text-sm cursor-pointer hover:text-amber-400">
              View payment history ({orders.length} payments)
            </summary>
            <div className="mt-3 space-y-2">
              {orders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-900/50 rounded text-xs">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.order_status || 'unknown')}
                    <span className="text-gray-300">
                      {order.order_date ? formatDate(order.order_date) : 'Unknown date'}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    {order.amount_total && order.currency 
                      ? formatAmount(order.amount_total, order.currency)
                      : 'Unknown amount'
                    }
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}