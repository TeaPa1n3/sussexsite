export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      member_auth: {
        Row: {
          id: string
          name: string
          email: string
          is_admin: boolean
          created_at: string
          updated_at: string
          last_login: string | null
          date_of_birth: string | null
          address: string | null
          postcode: string | null
          phone: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          group_division: string | null
          allergies: string | null
          dietary_requirements: string | null
          criminal_convictions: string | null
          declaration_agreed: boolean | null
          declaration_date: string | null
          profile_image_url: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
          date_of_birth?: string | null
          address?: string | null
          postcode?: string | null
          phone?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          group_division?: string | null
          allergies?: string | null
          dietary_requirements?: string | null
          criminal_convictions?: string | null
          declaration_agreed?: boolean | null
          declaration_date?: string | null
          profile_image_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
          date_of_birth?: string | null
          address?: string | null
          postcode?: string | null
          phone?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          group_division?: string | null
          allergies?: string | null
          dietary_requirements?: string | null
          criminal_convictions?: string | null
          declaration_agreed?: boolean | null
          declaration_date?: string | null
          profile_image_url?: string | null
        }
      }
      event_rsvps: {
        Row: {
          id: string
          user_id: string
          event_id: string
          status: string
          created_at: string
          updated_at: string
          attendance_data: Json | null
          name: string | null
          vehicle_registration: string | null
          camping_type: string | null
          insurance_confirmed: boolean | null
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          status: string
          created_at?: string
          updated_at?: string
          attendance_data?: Json | null
          name?: string | null
          vehicle_registration?: string | null
          camping_type?: string | null
          insurance_confirmed?: boolean | null
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          status?: string
          created_at?: string
          updated_at?: string
          attendance_data?: Json | null
          name?: string | null
          vehicle_registration?: string | null
          camping_type?: string | null
          insurance_confirmed?: boolean | null
        }
      }
      stripe_customers: {
        Row: {
          id: string
          user_id: string
          customer_id: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          customer_id: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          customer_id?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      stripe_subscriptions: {
        Row: {
          id: string
          customer_id: string
          subscription_id: string | null
          price_id: string | null
          status: string
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean | null
          payment_method_brand: string | null
          payment_method_last4: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          subscription_id?: string | null
          price_id?: string | null
          status: string
          current_period_start?: number | null
          current_period_end?: number | null
          cancel_at_period_end?: boolean | null
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          subscription_id?: string | null
          price_id?: string | null
          status?: string
          current_period_start?: number | null
          current_period_end?: number | null
          cancel_at_period_end?: boolean | null
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      stripe_orders: {
        Row: {
          id: string
          checkout_session_id: string
          payment_intent_id: string | null
          customer_id: string
          amount_subtotal: number | null
          amount_total: number | null
          currency: string | null
          payment_status: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          checkout_session_id: string
          payment_intent_id?: string | null
          customer_id: string
          amount_subtotal?: number | null
          amount_total?: number | null
          currency?: string | null
          payment_status?: string | null
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          checkout_session_id?: string
          payment_intent_id?: string | null
          customer_id?: string
          amount_subtotal?: number | null
          amount_total?: number | null
          currency?: string | null
          payment_status?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      stripe_user_subscriptions: {
        Row: {
          user_id: string | null
          customer_id: string | null
          subscription_id: string | null
          subscription_status: string | null
          price_id: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean | null
          payment_method_brand: string | null
          payment_method_last4: string | null
        }
      }
      stripe_user_orders: {
        Row: {
          user_id: string | null
          order_id: string | null
          checkout_session_id: string | null
          payment_intent_id: string | null
          amount_subtotal: number | null
          amount_total: number | null
          currency: string | null
          payment_status: string | null
          order_status: string | null
          created_at: string | null
        }
      }
    }
  }
}