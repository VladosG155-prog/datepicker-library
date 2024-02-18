export const generateYearsDays = (year: number) => {
    const calendar = {} as {
        [key: number]: { day: number; month: number; year: number }[]
    }

    for (let month = 0; month < 12; month++) {
        const monthDays = []

        const daysInMonth = new Date(year, month + 1, 0).getDate()

        const firstDay = new Date(year, month, 1).getDay()
        const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1
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
