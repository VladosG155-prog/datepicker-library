import { isValidDate } from './isValidDate'
import { transformDateToInput } from './transformDate'

export const validateInput = (
    value: string,
    minDate?: Date,
    maxDate?: Date
): { valid: boolean; message?: string } => {
    const [day, selectedMonth, selectedYear] = value.split('/').map(Number)
    if (!value.length) return { valid: false }

    const dateValue = new Date(selectedYear, selectedMonth - 1, day)

    if (!isValidDate(value) || selectedMonth - 1 !== dateValue.getMonth()) {
        return {
            valid: false,
            message: 'Please enter a valid date. DD/MM/YYYY',
        }
    }

    if (!minDate || !maxDate) return { valid: false }

    const minDateValue = new Date(minDate)
    const maxDateValue = new Date(maxDate)

    const stringMaxDate = transformDateToInput(
        maxDateValue.getDay(),
        maxDateValue.getMonth(),
        maxDateValue.getFullYear()
    )
    const stringMinDate = transformDateToInput(
        minDateValue.getDay(),
        minDateValue.getMonth(),
        minDateValue.getFullYear()
    )

    if (dateValue < minDateValue) {
        return {
            valid: false,
            message: `The date should not be earlier than ${stringMinDate}.`,
        }
    }

    if (dateValue > maxDateValue) {
        return {
            valid: false,
            message: `The date should not be later than ${stringMaxDate}.`,
        }
    }

    return {
        valid: true,
    }
}
