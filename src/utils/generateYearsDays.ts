export const generateYearsDays = (year: number) => {
    const calendar = {} as {
        [key: number]: { day: number; month: number; year: number }[]
    }

    // Перебираем каждый месяц в году
    for (let month = 0; month < 12; month++) {
        const monthDays = []

        // Получаем количество дней в месяце
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        // Добавляем предыдущие дни предыдущего месяца
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

        // Добавляем дни текущего месяца
        for (let i = 1; i <= daysInMonth; i++) {
            monthDays.push({ day: i, month, year })
        }

        // Добавляем следующие дни следующего месяца, если нужно до 42 дней (6 недель)
        const remainingDays = 42 - monthDays.length
        const nextMonth = month === 11 ? 0 : month + 1
        for (let i = 1; i <= remainingDays; i++) {
            monthDays.push({ day: i, month: nextMonth, year })
        }

        // Записываем массив дней в объект календаря
        calendar[month] = monthDays
    }

    console.log(calendar)
    return calendar
}
