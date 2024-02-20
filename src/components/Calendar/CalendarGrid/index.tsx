import { FC } from 'react'
import { DayCell } from '@components/DayCell'
import { transformDateToInput } from '@utils/transformDate'
import { isActiveRangeDay, isDisabledByMaxMinDate } from './config'
import { ICalendarGridProps } from './interfaces'

export const CalendarGrid: FC<ICalendarGridProps> = (props) => {
    const {
        days,
        isHoliday,
        onSelectDay,
        currentMonth,
        activeDate,
        dayNames,
        isRange,
        changeWithRange,
        rangeValues,
        activeTodoDays,
        toggleTodoModal,
        minDate,
        maxDate,
    } = props

    const handleCellClick = (day: number, month: number, year: number) => {
        if (isRange) {
            changeWithRange(transformDateToInput(day, month, year))
        } else {
            onSelectDay(transformDateToInput(day, month, year))
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

            {days.map(({ day, month, year }) => {
                const stringDate = transformDateToInput(day, month, year)
                const isActiveDayRange = isActiveRangeDay(
                    rangeValues,
                    day,
                    month,
                    year
                )

                const disabledByMaxMinValues = isDisabledByMaxMinDate(
                    maxDate,
                    minDate,
                    day,
                    month,
                    year
                )

                return (
                    <DayCell
                        day={day}
                        isRange={isRange}
                        key={`${day}-${month}-${year}`}
                        isPrevMonth={month === currentMonth}
                        isDisabledByMaxMin={disabledByMaxMinValues}
                        isHoliday={isHoliday && isHoliday(day, month)}
                        onClick={() => {
                            handleCellClick(day, month, year)
                            toggleTodoModal(stringDate)
                        }}
                        isActiveDay={activeDate === stringDate}
                        isActiveRangeDay={isActiveDayRange}
                        isActiveTodoDay={!!activeTodoDays?.includes(stringDate)}
                    />
                )
            })}
        </div>
    )
}
