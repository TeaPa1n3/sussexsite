import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Crown, Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { ParchmentBox } from '../ui/ParchmentBox';

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      setShowSuccess(true);
      // Clear the URL parameter after showing the success message
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  if (!showSuccess) {
    return null;
  }

  return (
    <div className="mb-8">
      <ParchmentBox>
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <Crown className="w-6 h-6 text-amber-500 absolute -top-1 -right-1" />
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-medieval text-amber-500">
              Welcome to the Society!
            </h2>
            <Star className="w-6 h-6 text-amber-500" />
          </div>
          
          <p className="text-gray-300 mb-6">
            Your membership payment has been processed successfully. You now have full access to all society benefits and activities.
          </p>
          
          <div className="bg-amber-500/10 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medieval text-amber-500 mb-2">What's Next?</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Join our WhatsApp and Discord communities</li>
              <li>• RSVP to upcoming events</li>
              <li>• Access historical resources and documents</li>
              <li>• Connect with your local division</li>
              <li>• Start training with your nearest group</li>
            </ul>
          </div>
          
          <Link
            to="/members"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-gray-900 
              rounded-lg font-medieval hover:bg-amber-400 transition-colors"
          >
            Explore Members Area
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ParchmentBox>
    </div>
  );
}