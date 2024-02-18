import { ComponentType, useMemo, useState } from 'react'
import { generateCalendarDays } from '../utils/generateDays'
import { monthNames } from '../constants/month'

const nowDate = new Date(Date.now())

import { IDatePickerProps } from '../components/Calendar'

interface IWithViewTypeProps {
    days: { day: number; month: number; year: number }[]
    handleClickNext: () => void
    handleClickPrev: () => void
    currentFullDate: string
}

export const withViewType = <P extends IDatePickerProps>(
    Component: ComponentType<Omit<P, keyof IDatePickerProps>>
) => {
    return (props: IDatePickerProps & P) => {
        const { activeDate, viewType, isMondayFirst } = props

        const [_, selectedMonth, selectedYear] = activeDate
            ?.replace('0', '')
            .split('/')
            .map(Number)

        const selectedDate = new Date(selectedYear, selectedMonth - 1)
        const [currentDate, setCurrentDate] = useState(
            activeDate ? selectedDate : nowDate
        )
        const currentYear = currentDate.getFullYear()

        const currentMonth = currentDate.getMonth()

        const handleClickNext = (): void => {
            const nextDate = new Date(currentDate.getTime())
            if (viewType === 'year') {
                nextDate.setFullYear(nextDate.getFullYear() + 1)
            } else if (viewType === 'week') {
                nextDate.setDate(nextDate.getDate() + 7)
                console.log(nextDate.getDate())
            } else {
                nextDate.setMonth(nextDate.getMonth() + 1)
            }
            setCurrentDate(nextDate)
        }

        const handleClickPrev = (): void => {
            const nextDate = new Date(currentDate.getTime())
            if (viewType === 'year') {
                nextDate.setFullYear(nextDate.getFullYear() - 1)
            } else if (viewType === 'week') {
                nextDate.setDate(nextDate.getDate() - 7)
            } else {
                nextDate.setMonth(nextDate.getMonth() - 1)
            }

            setCurrentDate(nextDate)
        }

        const days = useMemo(
            () =>
                generateCalendarDays(
                    currentYear,
                    currentMonth,
                    viewType,
                    isMondayFirst
                ),
            [currentYear, currentMonth, viewType, isMondayFirst]
        )
        let currentFullDate = ''
        console.log(days)

        if (viewType === 'year') {
            currentFullDate = `${currentYear}`
        } else {
            currentFullDate = `${monthNames[currentMonth]} ${currentYear}`
        }

        return (
            <Component
                {...props}
                days={days}
                currentMonth={currentMonth}
                handleClickNext={handleClickNext}
                handleClickPrev={handleClickPrev}
                currentFullDate={currentFullDate}
            />
        )
    }
}
