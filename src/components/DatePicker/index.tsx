import { FC, useState } from 'react'
import Calendar from '@components/Calendar'
import { Input } from '@components/Input'

interface IDatePickerProps {
    withHolidays?: boolean
    withMondayFirst?: boolean
    withRange?: boolean
    viewType?: 'month' | 'week' | 'year'
}

const DatePicker: FC<IDatePickerProps> = ({
    withHolidays = false,
    withMondayFirst = false,
    withRange = false,
    viewType = 'month',
}) => {
    const [date, setDate] = useState('')

    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    const [range, setRange] = useState({ from: 0, to: 0 })

    const handleClickInput = () => {
        setIsOpenCalendar(true)
    }

    const handleChangeInput = (val: string) => () => {
        setDate(val)
    }

    return (
        <div className="">
            <Input
                onClick={handleClickInput}
                onChange={(val) => handleChangeInput(val)}
                value={date.toString()}
            />
            {isOpenCalendar && (
                <Calendar
                    withHolidays={withHolidays}
                    withMondayFirst={withMondayFirst}
                    withRange={withRange}
                    activeDate={date}
                    viewType={viewType}
                    onSelectDay={(val: string) => setDate(val)}
                />
            )}
        </div>
    )
}
export default DatePicker
