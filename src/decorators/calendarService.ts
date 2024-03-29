import { ICalendarProps } from '@components/Calendar/interfaces'
import { FC } from 'react'

export class CalendarService {
    Calendar: FC<ICalendarProps>

    constructor(Calendar: FC<ICalendarProps>) {
        this.Calendar = Calendar
    }

    add(decorator: (Calendar: FC<ICalendarProps>) => FC<ICalendarProps>): void {
        this.Calendar = decorator(this.Calendar)
    }
}
