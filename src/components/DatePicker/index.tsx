import { FC, useState } from 'react'
import Calendar from '@components/Calendar'
import { Input } from '@components/Input'

interface IDatePickerProps {
    withHolidays?: boolean
    withMondayFirst?: boolean
    withRange?: boolean
    withTodos?: boolean
    viewType?: 'month' | 'week' | 'year'
    maxDate?: Date
    minDate?: Date
}

const DatePicker: FC<IDatePickerProps> = ({
    withHolidays = false,
    withMondayFirst = false,
    withRange = false,
    withTodos = false,
    viewType = 'month',
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
            const [from, to] = val.split(' ')
            setRange({ from: from, to: to })
        } else {
            setDate(val)
        }
    }

    return (
        <div className="">
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
                    activeDate={date} // withRange ? range.from + ' ' + range.to : date
                    viewType={viewType}
                    onSelectDay={handleSelectDate}
                />
            )}
        </div>
    )
}
export default DatePicker
