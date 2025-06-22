import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Lock } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { VotersList } from './VotersList';
import type { Poll, PollVotes } from './types';

interface PollCardProps {
  poll: Poll;
  onVote: (pollId: string, optionId: string, voterName: string) => void;
  onReset: (pollId: string) => void;
  userVotes: Record<string, string>;
  pollVotes: PollVotes;
}

export function PollCard({ poll, onVote, onReset, userVotes, pollVotes }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    userVotes[poll.id] || null
  );
  const [voterName, setVoterName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showVotersList, setShowVotersList] = useState(false);

  const hasVoted = poll.id in userVotes;
  const isExpired = poll.endsAt && new Date(poll.endsAt) < new Date();
  const canVote = poll.isActive && !isExpired && !hasVoted;

  const pollResults = pollVotes[poll.id] || { votes: {}, totalVotes: 0, voters: [] };

  const handleVote = () => {
    if (selectedOption && canVote) {
      if (!voterName.trim()) {
        setNameError(true);
        return;
      }
      setNameError(false);
      onVote(poll.id, selectedOption, voterName.trim());
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'belle') {
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError(false);
      onReset(poll.id);
    } else {
      setPasswordError(true);
    }
  };

  const getVotePercentage = (optionId: string): number => {
    if (pollResults.totalVotes === 0) return 0;
    return ((pollResults.votes[optionId] || 0) / pollResults.totalVotes) * 100;
  };

  return (
    <ParchmentBox>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-4">
          <div>
            <h3 className="text-lg md:text-xl font-medieval text-amber-500">{poll.title}</h3>
            <p className="text-gray-400 mt-1 text-sm md:text-base">{poll.description}</p>
          </div>
          <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
            {poll.endsAt && (
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-1 text-amber-500" />
                <span>Ends {new Date(poll.endsAt).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowVotersList(true)}
                className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 
                  rounded-full hover:bg-amber-500/20 transition-colors text-sm"
              >
                <Users className="w-4 h-4" />
                {pollResults.voters?.length || 0} Voters
              </button>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 
                  rounded-full hover:bg-amber-500/20 transition-colors text-sm"
              >
                <Lock className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {poll.options.map((option) => {
            const voteCount = pollResults.votes[option.id] || 0;
            const percentage = getVotePercentage(option.id);
            
            return (
              <label
                key={option.id}
                className={`block p-3 rounded-lg border transition-colors cursor-pointer relative overflow-hidden
                  ${
                    selectedOption === option.id
                      ? 'border-amber-500/50 bg-amber-500/5'
                      : 'border-amber-500/20 hover:border-amber-500/30'
                  }
                  ${!canVote ? 'cursor-not-allowed opacity-75' : ''}
                `}
              >
                <input
                  type="radio"
                  name={`poll-${poll.id}`}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => canVote && setSelectedOption(option.id)}
                  disabled={!canVote}
                  className="hidden"
                />
                
                {/* Progress bar background */}
                {hasVoted && (
                  <div 
                    className="absolute inset-0 bg-amber-500/10 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                )}
                
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center">
                    <span className="text-gray-300 text-sm md:text-base">{option.text}</span>
                    {userVotes[poll.id] === option.id && (
                      <CheckCircle className="w-5 h-5 text-amber-500 ml-2" />
                    )}
                  </div>
                  
                  {hasVoted && (
                    <div className="flex items-center gap-2 text-right">
                      <span className="text-sm text-amber-500">{voteCount} votes</span>
                      <span className="text-sm text-gray-400">({percentage.toFixed(1)}%)</span>
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {canVote && (
          <div className="mt-4 space-y-4">
            <div>
              <input
                type="text"
                value={voterName}
                onChange={(e) => {
                  setVoterName(e.target.value);
                  setNameError(false);
                }}
                placeholder="Enter your name"
                className={`w-full px-4 py-2 bg-gray-800 border rounded-lg
                  ${nameError ? 'border-red-500' : 'border-amber-500/20'}
                  text-gray-200 focus:outline-none focus:border-amber-500`}
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-1">Please enter your name</p>
              )}
            </div>
            <button
              onClick={handleVote}
              disabled={!selectedOption}
              className={`w-full px-4 py-2 rounded-lg transition-colors text-sm md:text-base
                ${
                  selectedOption
                    ? 'bg-amber-500 text-gray-900 hover:bg-amber-400'
                    : 'bg-amber-500/20 text-amber-500 cursor-not-allowed'
                }
              `}
            >
              Submit Vote
            </button>
          </div>
        )}

        {!poll.isActive && (
          <p className="mt-4 text-center text-gray-400 text-sm">This poll is closed</p>
        )}

        {isExpired && (
          <p className="mt-4 text-center text-gray-400 text-sm">This poll has ended</p>
        )}

        {hasVoted && (
          <div className="mt-4 text-center">
            <p className="text-amber-500">Thanks for voting!</p>
            <p className="text-gray-400 text-sm">Results are visible to all members</p>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95">
            <div className="bg-gray-800 p-6 rounded-lg border border-amber-500/20 max-w-md w-full mx-4">
              <h3 className="text-xl font-medieval text-amber-500 mb-4">Enter Password to Reset Poll</h3>
              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className={`w-full px-4 py-2 bg-gray-900 border rounded-lg mb-4
                    ${passwordError 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-amber-500/20 focus:border-amber-500'
                    }
                    text-gray-200 focus:outline-none`}
                  placeholder="Enter password to reset poll"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mb-4">Incorrect password</p>
                )}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPassword('');
                      setPasswordError(false);
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 text-gray-900 rounded-lg
                      hover:bg-amber-400 transition-colors"
                  >
                    Reset Poll
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Voters List Modal */}
        {showVotersList && (
          <VotersList
            voters={pollResults.voters || []}
            onClose={() => setShowVotersList(false)}
            pollId={poll.id}
          />
        )}
      </div>
    </ParchmentBox>
  );
}