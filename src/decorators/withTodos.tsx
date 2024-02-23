import { FC, useState } from 'react'
import { Modal } from '@components/Modal'
import { ITodosObject } from './interfaces'
import { v4 as uuidv4 } from 'uuid'
import { ICalendarProps } from '@components/Calendar/interfaces'

export const withTodos = <P extends ICalendarProps>(Component: FC<P>): FC<P> => {
    return (props: P) => {
        const [isShowModal, setIsShowModal] = useState(false)
        const [todos, setTodos] = useState<ITodosObject>(
            JSON.parse(localStorage.getItem('todos') || '{}')
        )

        const [currentDate, setCurrentDate] = useState('')

        const handleCloseModal = (): void => {
            setIsShowModal(false)
        }

        const toggleTodoModal = (val: string): void => {
            setCurrentDate(val)
            if (!todos[val]) {
                setTodos({ ...todos, [val]: [] })
            }

            setIsShowModal(true)
        }
        const addTodo = (title: string): void => {
            const todo = {
                id: uuidv4(),
                title,
            }

            const currentTodos = { ...todos }
            currentTodos[currentDate].push(todo)
            setTodos(currentTodos)
            localStorage.setItem('todos', JSON.stringify(currentTodos))
        }

        const removeTodo = (id: string): void => {
            const currentTodos = { ...todos }
            const newTodos = currentTodos[currentDate].filter((todo) => todo.id !== id)

            setTodos({ ...todos, [currentDate]: newTodos })
            localStorage.setItem('todos', JSON.stringify(todos))
        }

        const activeTodoDays: string[] = []
        for (const key in todos) {
            if (todos[key].length) {
                activeTodoDays.push(key)
            }
        }
        return (
            <>
                <Modal
                    isOpen={isShowModal}
                    onSubmit={addTodo}
                    onClose={handleCloseModal}
                    todos={todos[currentDate]}
                    onRemove={removeTodo}
                />
                <Component
                    {...props}
                    toggleTodoModal={toggleTodoModal}
                    activeTodoDays={activeTodoDays}
                />
            </>
        )
    }
}
