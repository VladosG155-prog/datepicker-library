import { ICalendarProps } from '@components/Calendar/interfaces'
import { holidays } from '@constants/holidays'
import { ComponentType } from 'react'

export const withHolidays = (Component: ComponentType<ICalendarProps>) => {
    return (props: ICalendarProps) => {
        const isHoliday = (day: number, month?: number): boolean => {
            return holidays.some(
                (holiday) => holiday.day === day && holiday.month === month
            )
        }
        return <Component {...props} isHoliday={isHoliday} />
    }
}
