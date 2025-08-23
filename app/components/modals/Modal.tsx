'use client';
import { useEffect, useState, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  customActionButtonStyle?: string;
  isLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  customActionButtonStyle,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
                justify-center
                items-center
                flex
                overflow-x-hidden
                fixed
                inset-0
                z-50
                outline-none
                focus: outline-none
                bg-neutral-800/70"
      >
        <div
          className="
                    relative
                    w-full
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    my-6
                    mx-auto
                    h-full
                    lg:h-auto
                    md:h-auto
                    "
        >
          <div
            className={`
                        translate
                        duration-300
                        h-full
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100 ' : 'opacity-0 '}`}
          >
            <div
              className="
                                translate
                                h-full
                                lg:h-auto
                                md:h-auto
                                border-0
                                rounded-lg
                                shadow-lg
                                relative
                                flex
                                flex-col
                                w-full
                                bg-white
                                outline-none
                                focus:outline-none
                            "
            >
              <div
                className="
                                    flex
                                    items-center
                                    p-6
                                    rounded-t
                                    justify-center
                                    border-b-[1px]
                                    relative
                                "
              >
                <button
                  onClick={handleClose}
                  className="
                                    p-1
                                    border-0
                                    hover:opacity-70
                                    transition
                                    absolute
                                    left-9
                                    "
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div
                className="
                                    p-6
                                    relative
                                    flex-auto   
                                "
              >
                {body}
              </div>
              <div
                className="
                                    p-6
                                    flex
                                    flex-col
                                    gap-2
                                "
              >
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <button
                      onClick={handleSecondaryAction}
                      disabled={disabled}
                      className="
                                                relative
                                                disabled:opacity-70
                                                disabled:cursor-not-allowed
                                                rounded-lg
                                                hover:opacity-80
                                                transition
                                                w-full
                                                py-2
                                                border-[1px]
                                                border-black
                                                text-black
                                            "
                    >
                      {secondaryActionLabel}
                    </button>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={disabled || isLoading}
                    className={`
                                            relative
                                            disabled:opacity-70
                                            disabled:cursor-not-allowed
                                            rounded-lg
                                            hover:opacity-80
                                            transition
                                            w-full
                                            py-2
                                            ${customActionButtonStyle || 'bg-black text-white'}
                                        `}
                  >
                    {isLoading ? 'Carregando...' : actionLabel}
                  </button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
