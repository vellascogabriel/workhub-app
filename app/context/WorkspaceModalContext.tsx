'use client';

import { createContext, useContext, useState } from 'react';

interface WorkspaceModalContextProps {
  isOpen: boolean;
  currentStep: number;
  onOpen: () => void;
  onClose: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

const WorkspaceModalContext = createContext<WorkspaceModalContextProps | undefined>(undefined);

export const WorkspaceModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const onOpen = () => {
    setIsOpen(true);
    setCurrentStep(0);
  };

  const onClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <WorkspaceModalContext.Provider
      value={{
        isOpen,
        currentStep,
        onOpen,
        onClose,
        nextStep,
        prevStep,
        setStep,
      }}
    >
      {children}
    </WorkspaceModalContext.Provider>
  );
};

export const useWorkspaceModal = () => {
  const context = useContext(WorkspaceModalContext);
  if (context === undefined) {
    throw new Error('useWorkspaceModal must be used within a WorkspaceModalProvider');
  }
  return context;
};
