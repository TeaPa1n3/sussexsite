/*
  # Fix Stripe Views Migration

  1. Views
    - Drop existing views completely to avoid column naming conflicts
    - Create stripe_user_subscriptions view with proper column mapping
    - Create stripe_user_orders view with proper column mapping
  
  2. Security
    - Grant SELECT permissions to authenticated users for both views
*/

-- Drop existing views completely to avoid column naming conflicts
DROP VIEW IF EXISTS stripe_user_subscriptions;
DROP VIEW IF EXISTS stripe_user_orders;

-- Create view for user subscriptions
CREATE VIEW stripe_user_subscriptions AS
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
CREATE VIEW stripe_user_orders AS
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
  o.created_at as order_date
FROM stripe_customers c
LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id
WHERE c.deleted_at IS NULL;

-- Grant access to authenticated users
GRANT SELECT ON stripe_user_subscriptions TO authenticated;
GRANT SELECT ON stripe_user_orders TO authenticated;