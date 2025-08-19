"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getWaitlistCount } from '@/lib/actions';

interface WaitlistContextType {
  waitlistCount: number;
  updateWaitlistCount: () => Promise<void>;
  incrementWaitlistCount: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [waitlistCount, setWaitlistCount] = useState<number>(0);

  const updateWaitlistCount = async () => {
    try {
      const count = await getWaitlistCount();
      setWaitlistCount(count);
    } catch (error) {
      console.error('Error updating waitlist count:', error);
    }
  };

  const incrementWaitlistCount = () => {
    setWaitlistCount(prev => prev + 1);
  };

  useEffect(() => {
    updateWaitlistCount();
  }, []);

  return (
    <WaitlistContext.Provider value={{
      waitlistCount,
      updateWaitlistCount,
      incrementWaitlistCount
    }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
}