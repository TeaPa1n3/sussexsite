import React, { useState } from 'react';
import { PollCard } from './PollCard';
import { LoadingSpinner } from '../../../ui/LoadingSpinner';
import { polls } from './data';
import type { PollVotes } from './types';

export function Polls() {
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [pollVotes, setPollVotes] = useState<PollVotes>({});
  const [userIp, setUserIp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Simplified local storage for votes
  const handleVote = (pollId: string, optionId: string, voterName: string) => {
    const updatedPollVotes = { ...pollVotes };
    const currentPoll = updatedPollVotes[pollId] || { 
      votes: {}, 
      totalVotes: 0, 
      ipVotes: {},
      voters: []
    };
    
    // Remove previous vote if exists
    const previousVote = currentPoll.ipVotes[userIp];
    if (previousVote) {
      currentPoll.votes[previousVote] = Math.max(0, (currentPoll.votes[previousVote] || 0) - 1);
      currentPoll.totalVotes = Math.max(0, currentPoll.totalVotes - 1);
    }

    // Add new vote
    currentPoll.votes[optionId] = (currentPoll.votes[optionId] || 0) + 1;
    currentPoll.totalVotes += 1;
    currentPoll.ipVotes[userIp] = optionId;
    
    // Add voter information
    currentPoll.voters = [
      ...(currentPoll.voters || []),
      {
        name: voterName,
        optionId,
        timestamp: new Date().toISOString()
      }
    ];
    
    updatedPollVotes[pollId] = currentPoll;
    setPollVotes(updatedPollVotes);
    setUserVotes(prev => ({
      ...prev,
      [pollId]: optionId
    }));
  };

  const handleReset = (pollId: string) => {
    if (!confirm(`Are you sure you want to reset the "${polls.find(p => p.id === pollId)?.title}" poll? This action cannot be undone.`)) {
      return;
    }

    const updatedPollVotes = { ...pollVotes };
    updatedPollVotes[pollId] = { votes: {}, totalVotes: 0, ipVotes: {}, voters: [] };
    setPollVotes(updatedPollVotes);
    setUserVotes(prev => {
      const updated = { ...prev };
      delete updated[pollId];
      return updated;
    });
    
    alert('Poll has been reset successfully!');
  };

  if (isLoading) {
    return (
      <section className="py-12\" id="polls">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12" id="polls">
      <h2 className="text-3xl font-medieval text-amber-500 mb-8">Member Polls</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            onVote={handleVote}
            onReset={handleReset}
            userVotes={userVotes}
            pollVotes={pollVotes}
          />
        ))}
      </div>
    </section>
  );
}