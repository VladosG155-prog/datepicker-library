import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DatePicker } from '.'

describe('Calendar component', () => {
    test('renders DatePicker component', () => {
        render(<DatePicker onChange={jest.fn()} />)
    })

    test('renders DatePicker component with holidays', () => {
        render(<DatePicker withHolidays onChange={jest.fn()} />)
    })

    test('renders DatePicker component with range', () => {
        render(<DatePicker withRange onChange={jest.fn()} />)
    })

    test('renders DatePicker component with todos', () => {
        render(<DatePicker withTodos onChange={jest.fn()} />)
    })
    test('renders DatePicker component with mondayFirst', () => {
        render(<DatePicker withMondayFirst onChange={jest.fn()} />)
    })
})
