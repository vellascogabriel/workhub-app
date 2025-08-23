'use client';

import { useCallback, useMemo } from 'react';
import { useWorkspaceModal } from '@/app/context/WorkspaceModalContext';
import Modal from '@/app/components/modals/Modal';
import CategoryStep from './CategoryStep';
import LocationStep from './LocationStep';
import InfoStep from './InfoStep';
import ImageStep from './ImageStep';
import DescriptionStep from './DescriptionStep';

const WorkspaceModal = () => {
  const { 
    isOpen, 
    onClose, 
    currentStep, 
    nextStep, 
    prevStep,
    workspaceData,
    setCategory,
    setLocation,
    setGuestCount,
    setRoomCount,
    setBathroomCount,
    setImageSrc,
    setTitle,
    setDescription
  } = useWorkspaceModal();
  
  // Função para avançar para o próximo passo
  const onSubmit = useCallback(() => {
    if (currentStep === 0) {
      nextStep();
    } else if (currentStep === 1) {
      nextStep();
    } else if (currentStep === 2) {
      nextStep();
    } else if (currentStep === 3) {
      nextStep();
    } else if (currentStep === 4) {
      // Aqui você pode adicionar mais passos ou finalizar o processo
      onClose();
    }
  }, [currentStep, nextStep, onClose]);
  
  // Função para voltar ao passo anterior
  const onBack = useCallback(() => {
    if (currentStep === 0) {
      onClose();
    } else {
      prevStep();
    }
  }, [currentStep, prevStep, onClose]);
  
  // Conteúdo do modal baseado no passo atual
  const bodyContent = useMemo(() => {
    if (currentStep === 0) {
      return (
        <CategoryStep
          selectedCategory={workspaceData.category}
          setSelectedCategory={setCategory}
        />
      );
    }
    
    if (currentStep === 1) {
      return (
        <LocationStep
          location={workspaceData.location}
          setLocation={setLocation}
        />
      );
    }
    
    if (currentStep === 2) {
      return (
        <InfoStep
          guestCount={workspaceData.guestCount}
          roomCount={workspaceData.roomCount}
          bathroomCount={workspaceData.bathroomCount}
          setGuestCount={setGuestCount}
          setRoomCount={setRoomCount}
          setBathroomCount={setBathroomCount}
        />
      );
    }
    
    if (currentStep === 3) {
      return (
        <ImageStep
          imageSrc={workspaceData.imageSrc}
          setImageSrc={setImageSrc}
        />
      );
    }
    
    if (currentStep === 4) {
      return (
        <DescriptionStep
          title={workspaceData.title}
          description={workspaceData.description}
          setTitle={setTitle}
          setDescription={setDescription}
        />
      );
    }
    
    // Retornar um componente vazio em vez de null
    return <div></div>;
  }, [currentStep, workspaceData, setCategory, setLocation, setGuestCount, setRoomCount, setBathroomCount, setImageSrc, setTitle, setDescription]);
  
  // Verificar se o botão "Next" deve estar desabilitado
  const isNextDisabled = useMemo(() => {
    if (currentStep === 0) {
      return !workspaceData.category;
    }
    
    if (currentStep === 1) {
      return !workspaceData.location.latlng;
    }
    
    if (currentStep === 2) {
      // Todos os campos do passo 3 já têm valores padrão válidos
      return false;
    }
    
    if (currentStep === 3) {
      // O botão só deve ser habilitado se uma imagem foi carregada
      return !workspaceData.imageSrc;
    }
    
    if (currentStep === 4) {
      // O botão só deve ser habilitado se o título foi preenchido
      // A descrição é opcional
      return !workspaceData.title;
    }
    
    return false;
  }, [currentStep, workspaceData]);
  
  // Rótulo do botão de ação baseado no passo atual
  const actionLabel = useMemo(() => {
    if (currentStep === 3) {
      return 'Create';
    }
    
    return 'Next';
  }, [currentStep]);
  
  // Rótulo do botão secundário baseado no passo atual
  const secondaryActionLabel = useMemo(() => {
    if (currentStep === 0) {
      return undefined;
    }
    
    return 'Back';
  }, [currentStep]);
  
  // Espaçamento adicional no footer
  const footerContent = (
    <div className="mt-4">
      {/* Este div é apenas para espaçamento */}
    </div>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Workhub your workspace"
      actionLabel={actionLabel}
      body={bodyContent}
      footer={footerContent}
      disabled={isNextDisabled}
      secondaryAction={currentStep === 0 ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      customActionButtonStyle="bg-neutral-800 text-white hover:bg-neutral-700"
    />
  );
};

export default WorkspaceModal;
