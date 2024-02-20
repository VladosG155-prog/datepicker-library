import { ComponentType } from 'react'

export class CalendarService {
    Calendar: ComponentType<any>

    constructor(Calendar: ComponentType) {
        this.Calendar = Calendar
    }

    add(decorator: (Calendar: ComponentType) => ComponentType) {
        this.Calendar = decorator(this.Calendar)
    }
}
