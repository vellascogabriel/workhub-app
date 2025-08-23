'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ModalView = 'login' | 'register';

interface AuthModalContextType {
  isOpen: boolean;
  view: ModalView;
  onOpen: (view: ModalView) => void;
  onClose: () => void;
  onToggle: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ModalView>('login');

  const onOpen = useCallback((selectedView: ModalView) => {
    setView(selectedView);
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setView(currentView => (currentView === 'login' ? 'register' : 'login'));
  }, []);

  return (
    <AuthModalContext.Provider value={{ isOpen, view, onOpen, onClose, onToggle }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);

  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }

  return context;
};
