import { render } from '@testing-library/react'
import Calendar from '.'
import { monthNames } from '@constants/month'
import '@testing-library/jest-dom'

describe('Calendar component', () => {
    test('renders Calendar component', () => {
        render(<Calendar />)
    })

    test('month name and year should be equal active date', () => {
        const { getByText, getByTestId } = render(
            <Calendar activeDate="12/02/2025" />
        )

        const date = new Date(Date.now())
        const elem = getByText(`${monthNames[date.getMonth()]} 2025`)

        expect(elem).toBeInTheDocument()
    })
})
