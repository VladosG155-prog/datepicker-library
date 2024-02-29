import { FC, useRef } from 'react'
import { CalendarService } from './calendarService'
import { withHolidays as withHolidaysHoc } from './withHolidays'
import { ICalendarProps } from '@components/Calendar/interfaces'
import { withMondayFirst as withMondayFirstHoc } from './withMondayFirst'
import { withViewType } from './withViewType'
import { withRange as withRangeHoc } from './withRange'
import { withTodos as withTodosHoc } from './withTodos'
import { ILogicProps } from './interfaces/ILogicInterface'

const options = {
    withHolidays: withHolidaysHoc,
    withMondayFirst: withMondayFirstHoc,
    withRange: withRangeHoc,
    withTodos: withTodosHoc,
}

export const withLogic = <P extends ICalendarProps>(Component: FC<ICalendarProps>) => {
    return (props: ILogicProps) => {
        const calendarService = new CalendarService(Component)
        const ref = useRef()

        calendarService.add(withViewType)

        for (const [prop, hoc] of Object.entries(options)) {
            if (props[prop as keyof ILogicProps]) {
                calendarService.add(hoc)
            }
        }

        const Calendar = calendarService.Calendar

        Calendar.displayName = `withLogic${Component.displayName}`
        return <Calendar ref={ref} {...(props as P)} />
    }
}
