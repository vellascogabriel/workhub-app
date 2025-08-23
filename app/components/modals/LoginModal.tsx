'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormData } from '@/app/types';
import { useRouter } from 'next/navigation';

import { useAuthModal } from '@/app/context/AuthModalContext';
import Modal from './Modal';
import Heading from './Heading';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/ui/buttons/Button';
import ErrorMessage from '@/app/components/ui/ErrorMessage';

const LoginModal = () => {
  const { isOpen, onClose, onToggle, view } = useAuthModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    setIsLoading(true);
    setError(''); // Clear any previous errors

    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then(callback => {
        setIsLoading(false);

        if (callback?.ok) {
          router.refresh();
          onClose();
        } else if (callback?.error) {
          // Display error message to user
          setError(callback.error);
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        setIsLoading(false);
        setError('Ocorreu um erro durante o login');
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bem-vindo de volta" subtitle="Entre na sua conta!" />
      {error && <ErrorMessage message={error} />}
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
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          setError('');
          signIn('google', { callbackUrl: '/' }).catch(() => {
            setIsLoading(false);
            setError('Ocorreu um erro ao conectar com Google');
          });
        }}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Primeira vez usando o Workhub?</div>
          <div onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">
            Criar uma conta
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen && view === 'login'}
      title="Login"
      actionLabel="Continuar"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
