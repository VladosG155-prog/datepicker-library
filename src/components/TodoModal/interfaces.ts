import { ITodo } from '../../decorators/interfaces/ITodo'

export interface ITodoModalProps {
    onClose: () => void
    onSubmit: (title: string) => void
    todos: ITodo[]
    onRemove: (id: string) => void
}
