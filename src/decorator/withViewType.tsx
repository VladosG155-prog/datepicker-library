import { ComponentType, useMemo, useState } from 'react'
import { generateCalendarDays } from '../utils/generateDays'
import { monthNames } from '../constants/month'

const nowDate = new Date(Date.now())

import { ICalendarProps } from '@components/Calendar/interfaces'
import { VIEW_TYPE } from '@constants/enums'
import { isValidDate } from '@utils/isValidDate'

interface IWithViewTypeProps {
    days: { day: number; month: number; year: number }[]
    handleClickNext: () => void
    handleClickPrev: () => void
    currentFullDate: string
}

export const withViewType = <P extends Object>(Component: ComponentType<P>) => {
    return (props: ICalendarProps & P) => {
        const { activeDate, viewType, isMondayFirst } = props

        const rangeDate = activeDate.split('-')[1]
            ? activeDate.split('-')[1]
            : activeDate.split('-')[0]

        const [_, selectedMonth, selectedYear] = rangeDate
            .split('/')
            .map(Number)

        const selectedDate = new Date(selectedYear, selectedMonth - 1)
        const [currentDate, setCurrentDate] = useState(
            isValidDate(activeDate) ? selectedDate : nowDate
        )
        const currentYear = currentDate.getFullYear()

        const currentMonth = currentDate.getMonth()

        const handleClickControl = (increment: number): void => {
            const nextDate = new Date(currentDate.getTime())
            switch (viewType) {
                case VIEW_TYPE.YEAR:
                    nextDate.setFullYear(nextDate.getFullYear() + increment)
                    break
                case VIEW_TYPE.WEEK:
                    nextDate.setDate(nextDate.getDate() + increment * 7)
                    break
                default:
                    nextDate.setMonth(nextDate.getMonth() + increment)
                    break
            }
            setCurrentDate(nextDate)
        }

        const handleClickPrev = (): void => {
            handleClickControl(-1)
        }
        const handleClickNext = (): void => {
            handleClickControl(1)
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

        if (viewType === VIEW_TYPE.YEAR) {
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
