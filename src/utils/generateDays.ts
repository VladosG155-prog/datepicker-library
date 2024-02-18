import { generateYearsDays } from './generateYearsDays'

export const generateCalendarDays = (
    year: number,
    month: number,
    viewType: 'month' | 'week' | 'year' = 'month',
    isMondayFirst: boolean = false
) => {
    let days = []
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

        const countOfDays = 6 * 7 // 6 rows of 7 days
        const nextMonthDays = countOfDays - days.length
        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({ day: i, month: month + 1, year })
        }
    } else if (viewType === 'week') {
        const firstDayOfWeek = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        let currentDay = 1
        let currentMonth = month
        for (let i = 0; i < 7; i++) {
            if (i >= firstDayOfWeek) {
                days.push({ day: currentDay, month: currentMonth, year })
                currentDay++
            } else {
                const prevMonthLastDay = new Date(year, month, 0).getDate()
                days.push({
                    day: prevMonthLastDay - (firstDayOfWeek - i) + 1,
                    month: month - 1,
                    year,
                })
            }
        }
    } else if (viewType === 'year') {
        return generateYearsDays(year)
    }

    return days
}
