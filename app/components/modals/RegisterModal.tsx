'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useAuthModal } from '@/app/context/AuthModalContext';
import Modal from './Modal';
import Heading from './Heading';
import Input from './inputs/Input';
import Button from './Button';

const RegisterModal = () => {
  const { isOpen, onClose, onToggle, view } = useAuthModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // This would typically make an API call to register the user
    // For now, we'll just simulate a successful registration
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // After registration, we can automatically sign in the user
      signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      }).then(() => {
        router.refresh();
      });
    }, 1000);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bem-vindo ao Workhub"
        subtitle="Crie sua conta!"
      />
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
