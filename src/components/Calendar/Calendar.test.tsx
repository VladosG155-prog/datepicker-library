import { render } from '@testing-library/react'
import Calendar from '.'
import { monthNames } from '@constants/month'
import '@testing-library/jest-dom'

describe('Calendar component', () => {
    test('render Calendar component', () => {
        render(<Calendar onSelectDay={jest.fn()} />)
    })

    test('month name and year should be equal active date', () => {
        const { getByText } = render(<Calendar activeDate="12/02/2025" />)

        const date = new Date(Date.now())
        const elem = getByText(`${monthNames[date.getMonth()]} 2025`)

        expect(elem).toBeInTheDocument()
    })

    test('holidays should be exist', () => {
        const { getByText } = render(
            <Calendar withHolidays activeDate="12/02/2024" />
        )
        const elem = getByText(23)
        console.log('class', elem.classList)

        expect(elem.classList).toBeInTheDocument()
    })

    test('holidays should be exist', () => {
        const {} = render(
            <Calendar
                withHolidays
                onSelectDay={jest.fn()}
                activeDate="12/02/2024"
            />
        )
    })
})
