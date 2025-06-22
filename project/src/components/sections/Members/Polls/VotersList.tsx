import React from 'react';
import { X } from 'lucide-react';
import type { Vote } from './types';
import { polls } from './data';

interface VotersListProps {
  voters: Vote[];
  onClose: () => void;
  pollId?: string; // Optional poll ID to provide context
}

export function VotersList({ voters, onClose, pollId }: VotersListProps) {
  // Find the current poll if pollId is provided
  const currentPoll = pollId ? polls.find(p => p.id === pollId) : null;

  // Group voters by their vote choice
  const votersByChoice = voters.reduce((acc, vote) => {
    // Find the option text - first check current poll, then search all polls
    let optionText = 'Unknown Option';
    if (currentPoll) {
      const option = currentPoll.options.find(opt => opt.id === vote.optionId);
      if (option) {
        optionText = option.text;
      }
    } else {
      // Fallback to searching all polls if no specific poll is provided
      for (const poll of polls) {
        const option = poll.options.find(opt => opt.id === vote.optionId);
        if (option) {
          optionText = option.text;
          break;
        }
      }
    }

    if (!acc[vote.optionId]) {
      acc[vote.optionId] = {
        optionText,
        voters: []
      };
    }
    acc[vote.optionId].voters.push({
      name: vote.name,
      timestamp: vote.timestamp
    });
    return acc;
  }, {} as Record<string, { optionText: string; voters: { name: string; timestamp: string }[] }>);

  // Sort voters within each option by timestamp (most recent first)
  Object.values(votersByChoice).forEach(group => {
    group.voters.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  });

  // If we have a current poll, ensure all options are shown even if they have no votes
  if (currentPoll) {
    currentPoll.options.forEach(option => {
      if (!votersByChoice[option.id]) {
        votersByChoice[option.id] = {
          optionText: option.text,
          voters: []
        };
      }
    });
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 p-6 rounded-lg border border-amber-500/20 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-medieval text-amber-500">
              {currentPoll ? currentPoll.title : 'Voters'}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Total votes: {voters.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {voters.length === 0 ? (
          <p className="text-gray-400 text-center">No votes yet</p>
        ) : (
          <div className="space-y-8">
            {Object.entries(votersByChoice).map(([optionId, { optionText, voters }]) => (
              <div key={optionId} className="space-y-4">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                  <h4 className="text-lg font-medieval text-amber-500">
                    {optionText}
                  </h4>
                  <span className="text-amber-500/80 text-sm">
                    {voters.length} {voters.length === 1 ? 'vote' : 'votes'}
                  </span>
                </div>
                {voters.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {voters.map((voter, index) => (
                      <div 
                        key={`${voter.name}-${index}`}
                        className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg
                          hover:bg-gray-900/70 transition-colors"
                      >
                        <span className="text-gray-200">{voter.name}</span>
                        <span className="text-gray-400 text-sm">
                          {new Date(voter.timestamp).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-2">No votes for this option</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}