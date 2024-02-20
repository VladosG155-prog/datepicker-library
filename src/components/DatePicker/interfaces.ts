export interface IDatePickerProps {
    withHolidays?: boolean
    withMondayFirst?: boolean
    withRange?: boolean
    withTodos?: boolean
    viewType?: 'month' | 'week' | 'year'
    maxDate?: Date
    minDate?: Date
}
