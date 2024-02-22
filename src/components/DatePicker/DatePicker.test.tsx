import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import DatePicker from '.'

describe('Calendar component', () => {
    test('renders DatePicker component', () => {
        render(<DatePicker />)
    })

    test('renders DatePicker component with holidays', () => {
        render(<DatePicker withHolidays />)
    })

    test('renders DatePicker component with range', () => {
        render(<DatePicker withRange />)
    })

    test('renders DatePicker component with todos', () => {
        render(<DatePicker withTodos />)
    })
    test('renders DatePicker component with mondayFirst', () => {
        render(<DatePicker withMondayFirst />)
    })
})
