import { VIEW_TYPE } from '@constants/enums'

export interface ILogicProps {
    withHolidays?: boolean
    withMondayFirst?: boolean
    withRange?: boolean
    withTodos?: boolean
    maxDate?: Date | null
    minDate?: Date | null
    activeDate?: string
    viewType?: VIEW_TYPE
    onSelectDay?: (val: string) => void
}
