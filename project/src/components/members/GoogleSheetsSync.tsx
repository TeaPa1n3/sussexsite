import React, { useState } from 'react';
import { Download, RefreshCw, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { ParchmentBox } from '../ui/ParchmentBox';

interface SyncResponse {
  success: boolean;
  message?: string;
  error?: string;
  memberCount?: number;
  lastSync?: string;
  sheetId?: string;
  sheetName?: string;
  updatedCells?: number;
  configurationRequired?: boolean;
}

export default function GoogleSheetsSync() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [syncResult, setSyncResult] = useState<SyncResponse | null>(null);

  const handleSync = async () => {
    setIsLoading(true);
    setSyncResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-to-google-sheets`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result: SyncResponse = await response.json();
      setSyncResult(result);

      if (result.success && result.lastSync) {
        setLastSync(result.lastSync);
      }
    } catch (error) {
      console.error('❌ Sync error:', error);
      setSyncResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <ParchmentBox>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Download className="w-6 h-6 text-amber-500" />
          <h3 className="text-xl font-medieval text-amber-500">Google Sheets Export</h3>
        </div>

        <p className="text-gray-400 mb-6">
          Export all member data to Google Sheets for backup and external access.
        </p>

        {/* Configuration Required Warning */}
        {syncResult?.configurationRequired && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medieval text-amber-500 mb-2">Configuration Required</h4>
                <p className="text-amber-400 text-sm mb-3">
                  Google Sheets integration requires additional setup. Please configure the following environment variables in your Supabase Edge Function settings:
                </p>
                <ul className="text-amber-400 text-sm space-y-1 mb-3">
                  <li><code className="bg-amber-500/10 px-1 rounded text-amber-500">GOOGLE_SERVICE_ACCOUNT_EMAIL</code> - Your Google service account email</li>
                  <li><code className="bg-amber-500/10 px-1 rounded text-amber-500">GOOGLE_PRIVATE_KEY</code> - Your Google service account private key</li>
                  <li><code className="bg-amber-500/10 px-1 rounded text-amber-500">GOOGLE_API_KEY</code> - Your Google API key (optional)</li>
                </ul>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <a 
                    href="https://supabase.com/docs/guides/functions/secrets" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-400 underline text-sm transition-colors"
                  >
                    Learn how to set Edge Function environment variables
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {syncResult?.error && !syncResult.configurationRequired && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medieval text-red-500 mb-1">Sync Failed</h4>
                <p className="text-red-400 text-sm">{syncResult.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Display */}
        {syncResult?.success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medieval text-green-500 mb-1">Sync Successful</h4>
                <p className="text-green-400 text-sm mb-2">{syncResult.message}</p>
                {syncResult.memberCount && (
                  <p className="text-green-400 text-sm">
                    Exported {syncResult.memberCount} members
                    {syncResult.updatedCells && ` (${syncResult.updatedCells} cells updated)`}
                  </p>
                )}
                {syncResult.sheetName && (
                  <p className="text-green-400 text-sm">
                    Updated sheet: "{syncResult.sheetName}"
                  </p>
                )}
                {syncResult.sheetId && (
                  <div className="mt-2">
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${syncResult.sheetId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-green-500 hover:text-green-400 underline text-sm transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Google Sheet
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Last Sync Info */}
        {lastSync && (
          <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-400">
              <span className="font-medium text-amber-500">Last sync:</span> {formatDate(lastSync)}
            </p>
          </div>
        )}

        {/* Sync Button */}
        <button
          onClick={handleSync}
          disabled={isLoading}
          className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 disabled:cursor-not-allowed 
            text-gray-900 font-medieval py-3 px-4 rounded-lg transition-colors duration-200 
            flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Syncing...' : 'Sync to Google Sheets'}
        </button>

        <div className="mt-4 text-xs text-gray-500">
          <p>This will export all member data including personal information, contact details, and emergency contacts to the configured Google Sheet.</p>
        </div>
      </div>
    </ParchmentBox>
  );
}

export { GoogleSheetsSync }