import { ITodo } from '../../decorator/interfaces'

export interface IModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (title: string) => void
    todos: ITodo[]
    onRemove: (id: number) => void
}
