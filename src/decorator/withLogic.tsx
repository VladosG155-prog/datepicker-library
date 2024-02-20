import { ComponentType } from 'react'
import { CalendarService } from './calendarService'
import withHolidayDisplay from './withHolidays'
import { ICalendarProps } from '@components/Calendar/interfaces'
import { withMondayFirst } from './withMondayFirst'
import { withViewType } from './withViewType'
import { withRange } from './withRange'
import { withTodos } from './withTodos'

interface ILogicProps {
    withHolidays: boolean
    withMondayFirst: boolean
    withRange: boolean
}

export const withLogic = <P extends ICalendarProps>(
    Component: ComponentType<Omit<P, keyof ICalendarProps>>
) => {
    return (props) => {
        const calendarService = new CalendarService(Component as ComponentType)
        calendarService.add(withViewType)
        if (props.withHolidays) {
            calendarService.add(withHolidayDisplay)
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
