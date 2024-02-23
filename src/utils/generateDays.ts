import { VIEW_TYPE } from '@constants/enums'
import { generateYearsDays } from './generateYearsDays'
import { IDay } from '@components/Calendar/interfaces'

export const generateCalendarDays = (
    year: number,
    month: number,
    startDay: number,
    viewType: VIEW_TYPE = VIEW_TYPE.MONTH,
    isMondayFirst = false
) => {
    const days = []
    const calendar: { [key: number]: IDay[] } = {}
    if (viewType === VIEW_TYPE.MONTH) {
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const firstDayOfWeek = new Date(year, month, 1).getDay()
        const changePosition = isMondayFirst
            ? firstDayOfWeek - 1
            : firstDayOfWeek
        const prevMonthDays = firstDayOfWeek === 0 ? 6 : changePosition
        const prevMonthLastDay = new Date(year, month, 0).getDate()

        for (
            let i = prevMonthLastDay - prevMonthDays + 1;
            i <= prevMonthLastDay;
            i++
        ) {
            days.push({ day: i, month: month - 1, year })
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, month, year })
        }

        const countOfDays = 6 * 7
        const nextMonthDays = countOfDays - days.length

        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({ day: i, month: month + 1, year })
        }
        calendar[month] = days
    } else if (viewType === VIEW_TYPE.WEEK) {
        const startDate = new Date(year, month, startDay)

        if (isMondayFirst) {
            const startOfWeek = startDate.getDay()
            const daysToMonday = startOfWeek === 0 ? 6 : startOfWeek - 1
            startDate.setDate(startDate.getDate() - daysToMonday)
        }

        for (let i = 0; i < 7; i++) {
            days.push({
                day: startDate.getDate(),
                month: startDate.getMonth(),
                year: startDate.getFullYear(),
            })
            startDate.setDate(startDate.getDate() + 1)
        }
        calendar[month] = days
    } else if (viewType === VIEW_TYPE.YEAR) {
        return generateYearsDays(year, isMondayFirst)
    }

    return calendar
}
