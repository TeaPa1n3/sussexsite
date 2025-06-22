import React, { useState } from 'react';
import { ParchmentBox } from '../ui/ParchmentBox';
import { Lock, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LoginFormProps {
  onRegisterClick: () => void;
}

export function LoginForm({ onRegisterClick }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Update last login timestamp
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('member_auth')
          .update({ last_login: new Date().toISOString() })
          .eq('id', user.id);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ParchmentBox>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <h2 className="text-2xl font-medieval text-amber-500 mb-6">Members Area Login</h2>
        
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-amber-500 mb-2">
              <User className="w-4 h-4" />
              <span>Email or Username</span>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                text-gray-200 focus:outline-none focus:border-amber-500"
              placeholder="Enter your email or username"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-amber-500 mb-2">
              <Lock className="w-4 h-4" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                text-gray-200 focus:outline-none focus:border-amber-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-amber-500 text-gray-900 rounded-md font-medieval
            hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Enter Members Area'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onRegisterClick}
            className="text-amber-500 hover:text-amber-400 transition-colors text-sm"
          >
            New member? Register here
          </button>
        </div>

        <div className="mt-6 p-4 bg-amber-500/10 rounded-lg">
          <p className="text-amber-500 text-sm text-center">
            <strong>Note:</strong> Your session will persist until you manually log out.
          </p>
        </div>
      </form>
    </ParchmentBox>
  );
}