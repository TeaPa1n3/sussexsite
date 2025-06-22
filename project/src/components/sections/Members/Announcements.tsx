import React, { useState } from 'react';
import { AlertTriangle, Info, XCircle, ExternalLink, X, Coins, FileDown } from 'lucide-react';
import { ParchmentBox } from '../../ui/ParchmentBox';
import { announcements } from '../../../data/announcements';

const icons = {
  info: Info,
  warning: AlertTriangle,
  error: XCircle
};

const colors = {
  info: 'text-blue-500',
  warning: 'text-amber-500',
  error: 'text-red-500'
};

const bgColors = {
  info: 'bg-blue-500/10',
  warning: 'bg-amber-500/10',
  error: 'bg-red-500/10'
};

const buttonColors = {
  info: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-500',
  warning: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-500',
  error: 'bg-red-500/20 hover:bg-red-500/30 text-red-500'
};

interface PaymentModalProps {
  content: {
    title: string;
    description: string;
    accountName: string;
    accountNumber: string;
    sortCode: string;
    referenceFormat: string;
    priceLabel: string;
  };
  price: number;
  onClose: () => void;
}

function PaymentModal({ content, price, onClose }: PaymentModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95"
      onClick={onClose}
    >
      <div 
        className="relative max-w-md w-full mx-4 p-6 bg-gray-800 rounded-lg border border-amber-500/20"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-medieval text-amber-500 mb-2">{content.title}</h3>
          <p className="text-gray-300">{content.description}</p>
        </div>

        <div className="space-y-4 text-gray-300">
          <div className="p-4 bg-gray-900/50 rounded-lg space-y-2">
            <p><span className="text-amber-500">Account Name:</span> {content.accountName}</p>
            <p><span className="text-amber-500">Account Number:</span> {content.accountNumber}</p>
            <p><span className="text-amber-500">Sort Code:</span> {content.sortCode}</p>
          </div>

          <div className="p-4 bg-gray-900/50 rounded-lg space-y-2">
            <p className="font-medium text-amber-500">Payment Reference Format:</p>
            <p className="font-mono bg-gray-900 p-2 rounded">
              {content.referenceFormat}
            </p>
          </div>

          <div className="p-4 bg-gray-900/50 rounded-lg flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <span className="text-lg">
              {content.priceLabel}: <span className="text-amber-500 font-medium">£{price}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Announcements() {
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    content?: PaymentModalProps['content'];
    price: number;
  }>({
    isOpen: false,
    content: undefined,
    price: 0
  });

  // Filter active and non-expired announcements
  const activeAnnouncements = announcements.filter(announcement => {
    if (!announcement.isActive) return false;
    if (announcement.date && new Date(announcement.date) < new Date()) return false;
    return true;
  });

  if (activeAnnouncements.length === 0) return null;

  return (
    <>
      <div className="space-y-8 mb-8">
        {activeAnnouncements.map(announcement => {
          const Icon = icons[announcement.type] || Info;
          const textColor = colors[announcement.type] || colors.info;
          const bgColor = bgColors[announcement.type] || bgColors.info;
          const buttonColor = buttonColors[announcement.type] || buttonColors.info;

          return (
            <ParchmentBox key={announcement.id}>
              <div className={`p-4 ${bgColor} rounded-lg`}>
                <div className="flex items-start gap-4">
                  <Icon className={`w-6 h-6 ${textColor} flex-shrink-0 mt-1`} />
                  <div className="flex-grow">
                    <h3 className={`text-lg font-medieval ${textColor} mb-2`}>
                      {announcement.title}
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line mb-4">
                      {announcement.message}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {announcement.buttons.primary.isVisible && (
                        <a
                          href={announcement.buttons.primary.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            transition-colors ${buttonColor}`}
                        >
                          <span>{announcement.buttons.primary.label}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {announcement.buttons.file.isVisible && (
                        <a
                          href={announcement.buttons.file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            transition-colors ${buttonColor}`}
                        >
                          <span>{announcement.buttons.file.label}</span>
                          <FileDown className="w-4 h-4" />
                        </a>
                      )}
                      {announcement.buttons.payment.isVisible && (
                        <button
                          onClick={() => setPaymentModal({ 
                            isOpen: true,
                            content: announcement.buttons.payment.modalContent,
                            price: announcement.buttons.payment.price
                          })}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            transition-colors ${buttonColor}`}
                        >
                          <span>{announcement.buttons.payment.label}</span>
                          <Coins className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ParchmentBox>
          );
        })}
      </div>

      {paymentModal.isOpen && paymentModal.content && (
        <PaymentModal 
          content={paymentModal.content}
          price={paymentModal.price}
          onClose={() => setPaymentModal({ isOpen: false, content: undefined, price: 0 })}
        />
      )}
    </>
  );
}