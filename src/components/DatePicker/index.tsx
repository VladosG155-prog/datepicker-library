import { FC, useState } from 'react'
import Calendar from '@components/Calendar'
import { Input } from '@components/Input'

interface IDatePickerProps {
    withHolidays?: boolean
    withMondayFirst?: boolean
    viewType?: 'month' | 'week' | 'year'
}

const DatePicker: FC<IDatePickerProps> = ({
    withHolidays = false,
    withMondayFirst = false,
    viewType = 'month',
}) => {
    const [date, setDate] = useState('')

    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    return (
        <div className="">
            <Input
                onClick={() => setIsOpenCalendar(true)}
                onChange={(val) => setDate(val)}
                value={date.toString()}
            />
            {isOpenCalendar && (
                <Calendar
                    withHolidays={withHolidays}
                    withMondayFirst={withMondayFirst}
                    activeDate={date}
                    viewType={viewType}
                    onSelectDay={(val: string) => setDate(val)}
                />
            )}
        </div>
    )
}
export default DatePicker
