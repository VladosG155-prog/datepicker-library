import { generateYearsDays } from './generateYearsDays'

export const generateCalendarDays = (
    year: number,
    month: number,
    startDay: number,
    viewType: 'month' | 'year' | 'week' = 'month',
    isMondayFirst = false
) => {
    const days = []

    if (viewType === 'month') {
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
    } else if (viewType === 'week') {
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
    } else if (viewType === 'year') {
        return generateYearsDays(year)
    }

    return days
}
