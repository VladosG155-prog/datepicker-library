export interface IDayCellProps {
    day: number
    isHoliday?: boolean
    isPrevMonth: boolean
    onClick: () => void
    isActiveDay: boolean
    isActiveRangeDay: { from: boolean; to: boolean; mid: boolean }
    isActiveTodoDay?: boolean
    isDisabledByMaxMin: boolean
}
