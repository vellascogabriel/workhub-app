'use client';

import { createContext, useContext, useState } from 'react';

// Define o tipo para a localização
interface LocationType {
  latlng: [number, number] | null;
  address: string;
}

// Define o tipo para os dados do workspace
interface WorkspaceData {
  category: string;
  location: LocationType;
  // Adicione mais campos conforme necessário para passos futuros
}

interface WorkspaceModalContextProps {
  isOpen: boolean;
  currentStep: number;
  workspaceData: WorkspaceData;
  onOpen: () => void;
  onClose: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  setCategory: (category: string) => void;
  setLocation: (location: LocationType) => void;
  // Adicione mais setters conforme necessário para passos futuros
}

const WorkspaceModalContext = createContext<WorkspaceModalContextProps | undefined>(undefined);

export const WorkspaceModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Estado inicial para os dados do workspace
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>({
    category: '',
    location: {
      latlng: null,
      address: ''
    }
    // Adicione mais campos conforme necessário
  });

  // Métodos para abrir e fechar o modal
  const onOpen = () => {
    setIsOpen(true);
    setCurrentStep(0);
  };

  const onClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
    // Resetar os dados ao fechar o modal
    setWorkspaceData({
      category: '',
      location: {
        latlng: null,
        address: ''
      }
    });
  };

  // Métodos para navegação entre passos
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  // Métodos para atualizar os dados do workspace
  const setCategory = (category: string) => {
    setWorkspaceData(prev => ({
      ...prev,
      category
    }));
  };

  const setLocation = (location: LocationType) => {
    setWorkspaceData(prev => ({
      ...prev,
      location
    }));
  };

  return (
    <WorkspaceModalContext.Provider
      value={{
        isOpen,
        currentStep,
        workspaceData,
        onOpen,
        onClose,
        nextStep,
        prevStep,
        setStep,
        setCategory,
        setLocation
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
