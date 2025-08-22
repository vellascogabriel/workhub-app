'use client';

import { useState, useCallback } from 'react';
import { useWorkspaceModal } from '@/app/context/WorkspaceModalContext';
import Modal from '@/app/components/modals/Modal';
import CategoryStep from './CategoryStep';

const WorkspaceModal = () => {
  const { isOpen, onClose, currentStep, nextStep } = useWorkspaceModal();
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Will be used for future steps
  const [workspaceData, setWorkspaceData] = useState({
    category: '',
    // Add more fields as needed for future steps
  });

  const onSubmit = useCallback(() => {
    // Save current step data
    setWorkspaceData(prev => ({
      ...prev,
      category: selectedCategory
    }));
    
    // Move to next step or finish the process
    nextStep();
    
    // For now, we'll close the modal after the first step
    // In the future, this will navigate to the next step
    onClose();
  }, [selectedCategory, nextStep, onClose]);

  // Render the current step content
  const bodyContent = (
    <CategoryStep
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );
  
  // Custom button style to match the design in the image
  const footerContent = (
    <div className="mt-4">
      {/* This div is just for spacing */}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Workhub your workspace"
      actionLabel="Next"
      body={bodyContent}
      footer={footerContent}
      disabled={!selectedCategory}
      customActionButtonStyle="bg-neutral-800 text-white hover:bg-neutral-700"
    />
  );
};

export default WorkspaceModal;
