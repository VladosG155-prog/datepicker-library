import { ComponentType, useMemo, useState } from 'react'
import { generateCalendarDays } from '../utils/generateDays'
import { monthNames } from '../constants/month'

const nowDate = new Date(Date.now())

import { ICalendarProps } from '../components/Calendar'

interface IWithViewTypeProps {
    days: { day: number; month: number; year: number }[]
    handleClickNext: () => void
    handleClickPrev: () => void
    currentFullDate: string
}

export const withViewType = <P extends ICalendarProps>(
    Component: ComponentType<Omit<P, keyof ICalendarProps>>
) => {
    return (props: ICalendarProps & P) => {
        const { activeDate, viewType, isMondayFirst } = props

        const [_, selectedMonth, selectedYear] = activeDate
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
                    currentDate.getDate(),
                    viewType,
                    isMondayFirst
                ),
            [viewType, isMondayFirst, currentDate]
        )

        let currentFullDate = ''

        if (viewType === 'year') {
            currentFullDate = `${currentYear}`
        } else {
            currentFullDate = `${monthNames[currentMonth]} ${currentYear}`
        }

        console.log(days)

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
