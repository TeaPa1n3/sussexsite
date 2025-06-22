/*
  # Create Stripe Views for User Data

  1. Views
    - `stripe_user_subscriptions` - Join user data with subscription info
    - `stripe_user_orders` - Join user data with order info
  
  2. Security
    - Views inherit RLS from underlying tables
    - Users can only see their own data through the views
*/

-- Create view for user subscriptions
CREATE OR REPLACE VIEW stripe_user_subscriptions AS
SELECT 
  c.user_id,
  c.customer_id,
  s.subscription_id,
  s.status as subscription_status,
  s.price_id,
  s.current_period_start,
  s.current_period_end,
  s.cancel_at_period_end,
  s.payment_method_brand,
  s.payment_method_last4
FROM stripe_customers c
LEFT JOIN stripe_subscriptions s ON c.customer_id = s.customer_id
WHERE c.deleted_at IS NULL;

-- Create view for user orders  
CREATE OR REPLACE VIEW stripe_user_orders AS
SELECT 
  c.user_id,
  o.id as order_id,
  o.checkout_session_id,
  o.payment_intent_id,
  o.amount_subtotal,
  o.amount_total,
  o.currency,
  o.payment_status,
  o.status as order_status,
  o.created_at
FROM stripe_customers c
LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id
WHERE c.deleted_at IS NULL;

-- Grant access to authenticated users
GRANT SELECT ON stripe_user_subscriptions TO authenticated;
GRANT SELECT ON stripe_user_orders TO authenticated;