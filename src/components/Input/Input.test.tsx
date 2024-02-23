import { render, fireEvent } from '@testing-library/react'
import { Input } from '.'

describe('Input Component', () => {
    test('renders without crashing', () => {
        const onChange = jest.fn()
        const onClick = jest.fn()
        render(<Input value="" onChange={onChange} onClick={onClick} />)
    })

    test('executes onChange callback when input value changes', () => {
        const onChange = jest.fn()
        const onClick = jest.fn()
        const { getByPlaceholderText } = render(
            <Input value="" onChange={onChange} onClick={onClick} />
        )
        const inputElement = getByPlaceholderText('Choose Date')
        fireEvent.change(inputElement, { target: { value: '10/02/2012' } })
        expect(onChange).toHaveBeenCalledWith('10/02/2012')
    })

    test('executes onClick callback when calendar icon is clicked', () => {
        const onChange = jest.fn()
        const onClick = jest.fn()
        const { getByTestId } = render(<Input value="" onChange={onChange} onClick={onClick} />)
        const calendarIcon = getByTestId('calendar-icon')
        fireEvent.click(calendarIcon)
        expect(onClick).toHaveBeenCalled()
    })

    test('executes handleClearInput callback when clear icon is clicked', () => {
        const onChange = jest.fn()
        const onClick = jest.fn()
        const { getByTestId } = render(
            <Input value="2024/02/21" onChange={onChange} onClick={onClick} />
        )
        const clearIcon = getByTestId('clear-icon')
        fireEvent.click(clearIcon)
        expect(onChange).toHaveBeenCalledWith('')
    })
})
