'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import Avatar from '../avatar/Avatar';
import { useState, useCallback } from 'react';
import MenuItem from '../menuitem/MenuItem';
import { useAuthModal } from '@/app/context/AuthModalContext';
import { useWorkspaceModal } from '@/app/context/WorkspaceModalContext';
import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useAuthModal();
  const { onOpen: openWorkspaceModal } = useWorkspaceModal();
  const currentUser = useCurrentUser();

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, []);

  const handleLogout = useCallback(() => {
    signOut();
    setIsOpen(false);
  }, []);
  return (
    <div className="relative flex flex-row">
      <div
        onClick={openWorkspaceModal}
        className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                "
      >
        Workhub your workspace
      </div>
      <div
        onClick={toggleOpen}
        className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    transition
                    cursor-pointer
                    hover:shadow-md          
                "
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div
          className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[240px]
                    md:w-[280px]
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="Meu perfil" onClick={() => {}} />
                <MenuItem label="Meus espaços" onClick={() => {}} />
                <MenuItem label="Favoritos" onClick={() => {}} />
                <MenuItem label="Reservas" onClick={() => {}} />
                <hr className="my-2" />
                <div className="md:hidden">
                  {' '}
                  {/* Wrapper div com a classe md:hidden */}
                  <MenuItem
                    label="Workhub your workspace"
                    onClick={() => {
                      openWorkspaceModal();
                      setIsOpen(false);
                    }}
                  />
                  <hr className="my-2" />
                </div>
                <MenuItem label="Sair" onClick={handleLogout} icon={BiLogOut} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    onOpen('login');
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="Cadastrar"
                  onClick={() => {
                    onOpen('register');
                    setIsOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
