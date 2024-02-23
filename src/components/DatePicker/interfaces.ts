import { VIEW_TYPE } from '@constants/enums'

export interface IDatePickerProps {
    withHolidays?: boolean
    withMondayFirst?: boolean
    withRange?: boolean
    withTodos?: boolean
    viewType?: VIEW_TYPE
    maxDate?: Date
    minDate?: Date
    onChange: (val: string) => void
}
