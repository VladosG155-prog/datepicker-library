import { ComponentType, useEffect, useState } from 'react'
import { ICalendarProps } from '@components/Calendar/interfaces'
import { Modal } from '@components/Modal'
import { ITodo } from './interfaces'
import { v4 as uuidv4 } from 'uuid'
import { useClickOutside } from '../hooks/useClickOutside'
type TodosObject = {
    [key: string]: ITodo[]
}

export const withTodos = <P extends Object>(Component: ComponentType<P>) => {
    const [isShowModal, setIsShowModal] = useState(false)
    const [todos, setTodos] = useState<TodosObject>(
        JSON.parse(localStorage.getItem('todos') || '{}')
    )

    const [currentDate, setCurrentDate] = useState('')

    const handleCloseModal = () => {
        setIsShowModal(false)
    }

    const toggleTodoModal = (val: string) => {
        setCurrentDate(val)
        if (!todos[val]) {
            setTodos({ ...todos, [val]: [] })
        }

        setIsShowModal(true)
    }
    const addTodo = (title: string) => {
        const todo = {
            id: uuidv4(),
            title,
        }

        const currentTodos = { ...todos }
        currentTodos[currentDate].push(todo)
        setTodos(currentTodos)
        localStorage.setItem('todos', JSON.stringify(currentTodos))
    }

    const removeTodo = (id: string) => {
        const currentTodos = { ...todos }
        const newTodos = currentTodos[currentDate].filter(
            (todo) => todo.id !== id
        )

        setTodos({ ...todos, [currentDate]: newTodos })
    }

    let activeTodoDays: string[] = []
    for (let key in todos) {
        if (todos[key].length) {
            activeTodoDays.push(key)
        }
    }

    return (props: P) => {
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
