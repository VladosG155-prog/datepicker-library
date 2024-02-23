import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IModalProps } from './interfaces'
import { useClickOutside } from '../../hooks/useClickOutside'

export const Modal: FC<IModalProps> = ({ isOpen, onClose, onSubmit, todos, onRemove }) => {
    const [todoText, setTodoText] = useState('')
    const modalRef = useRef(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault()
        onSubmit(todoText)
        setTodoText('')
        onClose()
    }

    useClickOutside(modalRef, onClose)

    if (!isOpen) return null

    return createPortal(
        <div
            data-id="modal"
            data-testid="modal"
            className="fixed top-0 left-0 w-full h-full flex justify-center
            items-center bg-black bg-opacity-50"
        >
            <form
                ref={modalRef}
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-lg relative"
            >
                <h2 className="text-lg font-semibold mb-4">Add Todo</h2>
                <ul>
                    {todos.map(({ id, title }, index) => (
                        <li key={id} className="flex items-center mb-2">
                            <span className="mr-2">№: {index + 1}</span>
                            <span>{title}</span>
                            <button
                                data-testid="remove-todo"
                                onClick={() => onRemove(id)}
                                className="ml-2 text-red-500"
                            >
                                &#10006;
                            </button>
                        </li>
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
        </div>,
        document.body
    )
}
