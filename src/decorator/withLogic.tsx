import { FC } from 'react'
import { CalendarService } from './calendarService'
import { withHolidays } from './withHolidays'
import { ICalendarProps } from '@components/Calendar/interfaces'
import { withMondayFirst } from './withMondayFirst'
import { withViewType } from './withViewType'
import { withRange } from './withRange'
import { withTodos } from './withTodos'

export interface ILogicProps {
    withHolidays: boolean
    withMondayFirst: boolean
    withRange: boolean
    withTodos: boolean
}

export const withLogic = <P extends ICalendarProps>(
    Component: FC<ICalendarProps>
) => {
    return (props: P & ILogicProps) => {
        const calendarService = new CalendarService(Component)
        calendarService.add(withViewType)

        if (props.withHolidays) {
            calendarService.add(withHolidays)
        }

        if (props.withMondayFirst) {
            calendarService.add(withMondayFirst)
        }

        if (props.withRange) {
            calendarService.add(withRange)
        }

        if (props.withTodos) {
            calendarService.add(withTodos)
        }

        const Calendar = calendarService.Calendar

        Calendar.displayName = `withLogic${Component.displayName}`
        return <Calendar {...props} />
    }
}
