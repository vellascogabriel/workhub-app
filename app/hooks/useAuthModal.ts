'use client';

import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  view: 'login' | 'register';
  onOpen: (view: 'login' | 'register') => void;
  onClose: () => void;
  onToggle: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: 'login',
  onOpen: (view) => set({ isOpen: true, view }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set((state) => ({ 
    view: state.view === 'login' ? 'register' : 'login' 
  })),
}));

export default useAuthModal;
