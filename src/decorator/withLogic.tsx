import { ComponentType } from 'react'
import { CalendarService } from './calendarService'
import withHolidayDisplay from './withHolidays'
import { IDatePickerProps } from 'src/components/Calendar'
import { withMondayFirst } from './withMondayFirst'
import { withViewType } from './withViewType'

interface ILogicProps {
    withHolidays: boolean
    withMondayFirst: boolean
}

export const withLogic = (Component: ComponentType<IDatePickerProps>) => {
    return (props) => {
        const calendarService = new CalendarService(Component as ComponentType)
        calendarService.add(withViewType)
        if (props.withHolidays) {
            calendarService.add(withHolidayDisplay)
        }

        if (props.withMondayFirst) {
            calendarService.add(withMondayFirst)
        }

        const Calendar = calendarService.Calendar

        Calendar.displayName = `withLogic${Component.displayName}`
        return <Calendar {...props} />
    }
}
