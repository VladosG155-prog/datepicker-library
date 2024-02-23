import { IDay } from '../interfaces'

export interface ICalendarGridProps {
    days: IDay[]
    isHoliday?: (day: number, month?: number) => boolean
    onSelectDay: (val: string) => void
    activeDate: string
    currentMonth?: number
    isRange?: boolean
    dayNames: string[]
    toggleTodoModal: (val: string) => void
    changeWithRange: (val: string) => void
    rangeValues?: { from: string; to: string }
    activeTodoDays: string[] | null
    maxDate: Date | null
    minDate: Date | null
}
