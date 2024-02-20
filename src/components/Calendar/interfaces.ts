export interface ICalendarProps {
    isHoliday?: (day: number, month?: number) => boolean
    onSelectDay: (val: string) => void
    activeDate: string
    isMondayFirst: boolean
    isRange: boolean
    viewType?: 'month' | 'week' | 'year'
    days: { day: number; month: number; year: number }[]
    currentDate: Date
    currentMonth: number
    handleClickNext: () => void
    handleClickPrev: () => void
    currentFullDate: string
    toggleTodoModal?: (val: string) => void
    activeTodoDays?: string[]
    maxDate?: Date
    minDate?: Date
}
