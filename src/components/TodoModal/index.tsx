import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { ITodoModalProps } from './interfaces'
import { TodoItem } from './TodoItem'

export const TodoModal: FC<ITodoModalProps> = (props) => {
    const { onClose, onSubmit, todos, onRemove } = props

    const [todoText, setTodoText] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault()
        e.stopPropagation()
        onSubmit(todoText)
        setTodoText('')
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Add Todo</h2>
            <ul>
                {todos.map(({ id, title }, index) => (
                    <TodoItem
                        key={id}
                        id={id}
                        todoPosition={index + 1}
                        title={title}
                        onRemove={onRemove}
                    />
                ))}
            </ul>
            <div className="sticky top-1">
                <input
                    type="text"
                    ref={inputRef}
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    placeholder="Enter todo..."
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        type="button"
                        className="mr-2 bg-gray-300 hover:bg-gray-400
                            text-gray-800 font-semibold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Add new todo
                    </button>
                </div>
            </div>
        </form>
    )
}
