import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Modal } from '.'
import { ITodo } from 'src/decorators/interfaces'

describe('Modal Component', () => {
    test('renders without crashing when isOpen is true', () => {
        const onClose = jest.fn()
        const onSubmit = jest.fn()
        const todos: ITodo[] = []
        const { getByTestId } = render(
            <Modal
                isOpen={true}
                onClose={onClose}
                onRemove={jest.fn()}
                onSubmit={onSubmit}
                todos={todos}
            />
        )
        const modalElement = getByTestId('modal')
        expect(modalElement).toBeInTheDocument()
    })

    test('does not render when isOpen is false', () => {
        const onClose = jest.fn()
        const onSubmit = jest.fn()
        const todos: ITodo[] = []
        const { queryByTestId } = render(
            <Modal
                isOpen={false}
                onRemove={jest.fn()}
                onClose={onClose}
                onSubmit={onSubmit}
                todos={todos}
            />
        )
        const modalElement = queryByTestId('modal')
        expect(modalElement).toBeNull()
    })

    test('calls onSubmit and onClose when form is submitted', () => {
        const onClose = jest.fn()
        const onSubmit = jest.fn()
        const todos: ITodo[] = []
        const { getByPlaceholderText, getByText } = render(
            <Modal
                onRemove={jest.fn()}
                isOpen={true}
                onClose={onClose}
                onSubmit={onSubmit}
                todos={todos}
            />
        )
        const inputElement = getByPlaceholderText('Enter todo...')
        fireEvent.change(inputElement, { target: { value: 'New todo' } })
        const addButton = getByText('Add new todo')
        fireEvent.click(addButton)
        expect(onSubmit).toHaveBeenCalledWith('New todo')
        expect(onClose).toHaveBeenCalled()
    })
    test('calls onRemove when remove button is clicked', () => {
        const onClose = jest.fn()
        const onSubmit = jest.fn()
        const onRemove = jest.fn()
        const todos: ITodo[] = [
            { id: '1', title: 'Todo 1' },
            { id: '2', title: 'Todo 2' },
        ]
        const { getAllByTestId } = render(
            <Modal
                isOpen={true}
                onClose={onClose}
                onSubmit={onSubmit}
                todos={todos}
                onRemove={onRemove}
            />
        )
        const removeButton = getAllByTestId('remove-todo')[0]
        fireEvent.click(removeButton)
        expect(onRemove).toHaveBeenCalledWith('1')
    })
})
