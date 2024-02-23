import { compareDate } from '@utils/compareDate'
import { transformDateToInput } from '@utils/transformDate'

export const isActiveRangeDay = (
    day: number,
    month: number,
    year: number,
    rangeValues?: { from: string; to: string }
): { from: boolean; to: boolean; mid: boolean } => {
    if (!rangeValues) {
        return { from: false, to: false, mid: false }
    }
    return {
        from: !!compareDate(
            rangeValues.from,
            transformDateToInput(day, month, year)
        ),
        to: !!compareDate(
            rangeValues.to,
            transformDateToInput(day, month, year)
        ),
        mid:
            !!compareDate(
                transformDateToInput(day, month, year),
                rangeValues.from,
                '>'
            ) &&
            !!compareDate(
                transformDateToInput(day, month, year),
                rangeValues.to,
                '<'
            ),
    }
}

export const isDisabledByMaxMinDate = (
    max: Date | null,
    min: Date | null,
    day: number,
    month: number,
    year: number
): boolean => {
    const currentDate = new Date(year, month, day)

    if ((max && currentDate > max) || (min && currentDate < min)) {
        return true
    }

    return false
}
