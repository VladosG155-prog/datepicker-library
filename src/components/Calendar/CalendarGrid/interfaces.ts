export interface ICalendarGridProps {
    days: { day: number; month: number; year: number }[]
    isHoliday?: (day: number, month?: number) => boolean
    onSelectDay: (val: string) => void
    activeDate: string
    currentMonth?: number
    isRange?: boolean
    dayNames: string[]
    toggleTodoModal: (val: string) => void
    changeWithRange: any
    rangeValues: { from: string; to: string }
    activeTodoDays: string[]
    maxDate: Date | null
    minDate: Date | null
}
