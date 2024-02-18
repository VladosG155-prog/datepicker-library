import { FC } from 'react'
import { DayCell } from '../../../components/DayCell'
import { transformDateToInput } from '../../../utils/transformDate'

interface ICalendarGridProps {
    days: { day: number; month: number; year: number }[]
    isHoliday?: (day: number, month?: number) => boolean
    onSelectDay: (val: string) => void
    activeDate: string
    currentMonth?: number
    dayNames: string[]
    viewType: 'month' | 'week' | 'year'
}

export const CalendarGrid: FC<ICalendarGridProps> = ({
    days,
    isHoliday,
    onSelectDay,
    currentMonth,
    activeDate,
    dayNames,
    viewType,
}) => {
    console.log(currentMonth)

    return (
        <div className="grid grid-cols-7 gap-2">
            {dayNames.map((day) => (
                <div
                    key={day}
                    className="w-8 text-sm font-bold text-center text-gray-default"
                >
                    {day}
                </div>
            ))}

            {days.map(({ day, month, year }) => (
                <DayCell
                    day={day}
                    key={`${day}-${month}-${year}`}
                    isPrevMonth={currentMonth ? month === currentMonth : true}
                    isHoliday={isHoliday && isHoliday(day, month)}
                    onClick={() => {
                        onSelectDay(transformDateToInput(day, month, year))
                    }}
                    isActiveDay={
                        activeDate === transformDateToInput(day, month, year)
                    }
                />
            ))}
        </div>
    )
}
