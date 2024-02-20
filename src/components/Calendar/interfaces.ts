import { VIEW_TYPE } from '@constants/enums'

export interface IDay {
    day: number
    month: number
    year: number
}

export interface ICalendarProps {
    isHoliday?: (day: number, month?: number) => boolean
    onSelectDay: (val: string) => void
    activeDate: string
    isMondayFirst?: boolean
    isRange?: boolean
    viewType?: VIEW_TYPE
    days: IDay[] | { [key: number]: IDay[] }
    currentDate: Date
    currentMonth: number
    handleClickNext: () => void
    handleClickPrev: () => void
    currentFullDate: string
    toggleTodoModal?: (val: string) => void
    activeTodoDays?: string[]
    maxDate?: Date
    minDate?: Date
    rangeDate?: { from: string; to: string }
    changeWithRange: (val: string) => void
}
