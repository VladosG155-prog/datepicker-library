import { FC, useRef } from 'react'
import { IModalWrapperProps } from './interfaces'
import { createPortal } from 'react-dom'
import { useClickOutside } from '@hooks/useClickOutside'

export const ModalWrapper: FC<IModalWrapperProps> = ({ children, onClose, isOpen }) => {
    const modalRef = useRef(null)

    useClickOutside(modalRef, onClose)

    if (!isOpen) return null

    return createPortal(
        <div
            ref={modalRef}
            data-testid="modal"
            className="fixed top-0 left-0 w-full h-full flex justify-center
            items-center bg-black bg-opacity-50"
        >
            <div data-id="modal">{children}</div>
        </div>,

        document.body
    )
}
