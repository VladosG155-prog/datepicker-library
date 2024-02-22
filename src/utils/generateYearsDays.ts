import { IDay } from '@components/Calendar/interfaces'

export const generateYearsDays = (year: number, isMondayFirst: boolean) => {
    const calendar: { [key: string]: IDay[] } = {}

    for (let month = 0; month < 12; month++) {
        const monthDays = []

        const daysInMonth = new Date(year, month + 1, 0).getDate()

        const firstDay = new Date(year, month, 1).getDay()
        const prevMonthDays =
            firstDay === 0 ? 6 : isMondayFirst ? firstDay - 1 : firstDay
        const prevMonthLastDay = new Date(year, month, 0).getDate()
        for (
            let i = prevMonthLastDay - prevMonthDays + 1;
            i <= prevMonthLastDay;
            i++
        ) {
            monthDays.push({ day: i, month: month - 1, year })
        }

        for (let i = 1; i <= daysInMonth; i++) {
            monthDays.push({ day: i, month, year })
        }

        const remainingDays = 42 - monthDays.length
        const nextMonth = month === 11 ? 0 : month + 1
        for (let i = 1; i <= remainingDays; i++) {
            monthDays.push({ day: i, month: nextMonth, year })
        }

        calendar[month] = monthDays
    }

    return calendar
}
