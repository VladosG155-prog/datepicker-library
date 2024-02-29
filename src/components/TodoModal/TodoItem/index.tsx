import { FC } from 'react'
import { ITodoItemProps } from './interfaces'

export const TodoItem: FC<ITodoItemProps> = ({ title, todoPosition, id, onRemove }) => {
    return (
        <li className="flex items-center mb-2">
            <span className="mr-2">№: {todoPosition}</span>
            <span>{title}</span>
            <button
                type="button"
                data-testid="remove-todo"
                onClick={() => onRemove(id)}
                className="ml-2 text-red-500"
            >
                &#10006;
            </button>
        </li>
    )
}
