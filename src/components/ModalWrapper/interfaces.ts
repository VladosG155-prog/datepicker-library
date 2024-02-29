import { ReactNode } from 'react'

export interface IModalWrapperProps {
    children: ReactNode
    onClose: () => void
    isOpen: boolean
}
