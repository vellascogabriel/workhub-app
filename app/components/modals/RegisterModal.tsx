'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterFormData } from '@/app/types';
import { useRouter } from 'next/navigation';

import { useAuthModal } from '@/app/context/AuthModalContext';
import Modal from './Modal';
import Heading from './Heading';
import Input from '@/app/components/inputs/Input';
import Button from './Button';
import ErrorMessage from '@/app/components/ui/ErrorMessage';

const RegisterModal = () => {
  const { isOpen, onClose, onToggle, view } = useAuthModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    setIsLoading(true);
    setError(''); // Clear any previous errors
    
    // Make an API call to register the user
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.error || 'Failed to register');
      }
      return data.data;
    })
    .then(() => {
      // After successful registration, sign in the user
      return signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });
    })
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch((error) => {
      console.error('Registration error:', error);
      setError(error.message || 'Ocorreu um erro durante o registro');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bem-vindo ao Workhub"
        subtitle="Crie sua conta!"
      />
      {error && <ErrorMessage message={error} />}
      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Senha"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continuar com Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            Já tem uma conta?
          </div>
          <div 
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Entrar
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen && view === 'register'}
      title="Registrar"
      actionLabel="Continuar"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
