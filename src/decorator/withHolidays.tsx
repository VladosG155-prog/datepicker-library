import { ComponentType, FC } from 'react'

const holidays = [
    { month: 0, day: 1 },
    { month: 0, day: 7 },
    { month: 2, day: 8 },
    { month: 4, day: 1 },
    { month: 4, day: 9 },
    { month: 6, day: 3 },
    { month: 10, day: 7 },
    { month: 11, day: 25 },
]

export const withHolidays = <P extends Object>(
    Component: ComponentType<P>
): FC<P> => {
    return (props: P) => {
        const isHoliday = (day: number, month?: number): boolean => {
            return holidays.some(
                (holiday) => holiday.day === day && holiday.month === month
            )
        }
        return <Component {...props} isHoliday={isHoliday} />
    }
}
