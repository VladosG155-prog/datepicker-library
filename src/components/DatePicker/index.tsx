import { FC, useState } from 'react'
import Calendar from '@components/Calendar'
import { Input } from '@components/Input'
import { IDatePickerProps } from './interfaces'
import { VIEW_TYPE } from '@constants/enums'

const DatePicker: FC<IDatePickerProps> = ({
    withHolidays = false,
    withMondayFirst = false,
    withRange = false,
    withTodos = false,
    viewType = VIEW_TYPE.MONTH,
    maxDate,
    minDate,
}) => {
    const [date, setDate] = useState('')

    const [range, setRange] = useState({ from: '', to: '' })

    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    const handleClickInput = () => {
        setIsOpenCalendar(true)
    }

    const handleChangeInput = (val: string) => {
        setDate(val)
    }

    const handleSelectDate = (val: string) => {
        if (withRange) {
            const [from, to] = val.split('-')
            setRange({ from, to: to })
        } else {
            setDate(val)
        }
    }
    console.log(range)

    const rangeDateToString =
        range.from || range.to ? `${range.from}-${range.to}` : ''

    return (
        <div>
            {withRange && (
                <Input
                    onClick={handleClickInput}
                    onChange={handleChangeInput}
                    value={range.from}
                />
            )}
            <Input
                onClick={handleClickInput}
                onChange={handleChangeInput}
                value={withRange ? range.to : date}
            />
            {isOpenCalendar && (
                <Calendar
                    withHolidays={withHolidays}
                    withMondayFirst={withMondayFirst}
                    withRange={withRange}
                    withTodos={withTodos}
                    maxDate={maxDate}
                    minDate={minDate}
                    activeDate={withRange ? rangeDateToString : date}
                    viewType={viewType}
                    onSelectDay={handleSelectDate}
                />
            )}
        </div>
    )
}
export default DatePicker
