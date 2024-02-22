import { holidays } from '@constants/holidays'
import { ComponentType, FC } from 'react'

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
