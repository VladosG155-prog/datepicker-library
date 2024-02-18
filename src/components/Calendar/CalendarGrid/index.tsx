import { FC } from 'react'
import { DayCell } from '../../../components/DayCell'
import { transformDateToInput } from '../../../utils/transformDate'
import { compareDate } from '@utils/compareDate'

interface ICalendarGridProps {
    days: { day: number; month: number; year: number }[]
    isHoliday?: (day: number, month?: number) => boolean
    onSelectDay: (val: string) => void
    activeDate: string
    currentMonth?: number
    isRange?: boolean
    dayNames: string[]
    changeWithRange: any
    rangeValues: { from: string; to: string }
}

export const CalendarGrid: FC<ICalendarGridProps> = ({
    days,
    isHoliday,
    onSelectDay,
    currentMonth,
    activeDate,
    dayNames,
    isRange,
    changeWithRange,
    rangeValues,
}) => {
    const handleCellClick = (day: number, month: number, year: number) => {
        if (isRange) {
            changeWithRange(transformDateToInput(day, month, year))
        } else {
            onSelectDay(transformDateToInput(day, month, year))
        }
    }

    const isActiveRangeDay = (day: number, month: number, year: number) => {
        return {
            from: compareDate(
                rangeValues.from,
                transformDateToInput(day, month, year)
            ),
            to: compareDate(
                rangeValues.to,
                transformDateToInput(day, month, year)
            ),
            mid:
                compareDate(
                    transformDateToInput(day, month, year),
                    rangeValues.from,
                    '>'
                ) &&
                compareDate(
                    transformDateToInput(day, month, year),
                    rangeValues.to,
                    '<'
                ),
        }
    }

    return (
        <div className="grid grid-cols-7">
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
                    isRange={isRange}
                    key={`${day}-${month}-${year}`}
                    isPrevMonth={currentMonth ? month === currentMonth : true}
                    isHoliday={isHoliday && isHoliday(day, month)}
                    onClick={() => {
                        handleCellClick(day, month, year)
                    }}
                    isActiveDay={
                        activeDate === transformDateToInput(day, month, year)
                    }
                    isActiveRangeDay={isActiveRangeDay(day, month, year)}
                />
            ))}
        </div>
    )
}
