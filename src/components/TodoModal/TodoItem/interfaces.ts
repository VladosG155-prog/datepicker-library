export interface ITodoItemProps {
    title: string
    id: string
    todoPosition: number
    onRemove: (id: string) => void
}
