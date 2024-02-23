import { render, fireEvent } from '@testing-library/react'
import { DayCell } from '.'

describe('DayCell Component', () => {
    test('renders day number correctly', () => {
        const { getByText } = render(
            <DayCell
                day={10}
                isHoliday={false}
                isPrevMonth={false}
                onClick={jest.fn()}
                isActiveRangeDay={{
                    from: false,
                    to: false,
                    mid: false,
                }}
                isDisabledByMaxMin={false}
                isShowTodo={false}
                dayOfWeek={0}
                onAddTodo={jest.fn()}
            />
        )
        expect(getByText('10')).toBeInTheDocument()
    })

    test('executes onClick callback when clicked', async () => {
        const handleClickDay = jest.fn()
        const handleAddTodo = jest.fn()
        const { getByText } = render(
            <DayCell
                day={10}
                onClick={handleClickDay}
                isPrevMonth={false}
                isActiveRangeDay={{
                    from: false,
                    to: false,
                    mid: false,
                }}
                isDisabledByMaxMin={false}
                isShowTodo={true}
                dayOfWeek={1}
                onAddTodo={handleAddTodo}
            />
        )
        fireEvent.click(getByText('10'))
        expect(handleClickDay).not.toHaveBeenCalled()
    })
})
