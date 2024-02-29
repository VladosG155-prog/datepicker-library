import { VIEW_TYPE } from '@constants/enums'

export interface IDay {
    day: number
    month: number
    year: number
}

export interface ICalendarHeader {
    handleClickNext: () => void
    handleClickPrev: () => void
    currentFullDate: string
}

export interface ICalendarGrid {
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

export interface ICalendarProps extends ICalendarGrid, ICalendarHeader {
    withHolidays?: boolean
    withMondayFirst?: boolean
    withRange?: boolean
    withTodos?: boolean
    isMondayFirst?: boolean
    viewType?: VIEW_TYPE
    days: { [key: number]: IDay[] }
    currentDate: Date
    rangeDate?: { from: string; to: string }
}
