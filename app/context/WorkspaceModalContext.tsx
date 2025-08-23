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
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  title: string;
  description: string;
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
  setGuestCount: (count: number) => void;
  setRoomCount: (count: number) => void;
  setBathroomCount: (count: number) => void;
  setImageSrc: (imageSrc: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
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
    },
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: '',
    title: '',
    description: ''
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
      },
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      title: '',
      description: ''
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
  
  // Métodos para atualizar os contadores
  const setGuestCount = (count: number) => {
    setWorkspaceData(prev => ({
      ...prev,
      guestCount: count
    }));
  };
  
  const setRoomCount = (count: number) => {
    setWorkspaceData(prev => ({
      ...prev,
      roomCount: count
    }));
  };
  
  const setBathroomCount = (count: number) => {
    setWorkspaceData(prev => ({
      ...prev,
      bathroomCount: count
    }));
  };
  
  // Método para atualizar a imagem
  const setImageSrc = (imageSrc: string) => {
    setWorkspaceData(prev => ({
      ...prev,
      imageSrc
    }));
  };
  
  // Método para atualizar o título
  const setTitle = (title: string) => {
    setWorkspaceData(prev => ({
      ...prev,
      title
    }));
  };
  
  // Método para atualizar a descrição
  const setDescription = (description: string) => {
    setWorkspaceData(prev => ({
      ...prev,
      description
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
        setLocation,
        setGuestCount,
        setRoomCount,
        setBathroomCount,
        setImageSrc,
        setTitle,
        setDescription
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
