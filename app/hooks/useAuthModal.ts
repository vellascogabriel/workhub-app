'use client';

interface AuthModalStore {
  isOpen: boolean;
  view: 'login' | 'register';
  onOpen: (view: 'login' | 'register') => void;
  onClose: () => void;
  onToggle: () => void;
}
