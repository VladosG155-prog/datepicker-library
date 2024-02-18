import { ComponentType } from 'react'

export class CalendarService {
    Calendar: ComponentType<any>

    config: {
        viewType: 'month'
    }

    constructor(Calendar: ComponentType) {
        this.Calendar = Calendar
        this.config = {
            viewType: 'month',
        }
    }

    add(decorator: (Calendar: ComponentType) => ComponentType) {
        this.Calendar = decorator(this.Calendar)
    }
}
