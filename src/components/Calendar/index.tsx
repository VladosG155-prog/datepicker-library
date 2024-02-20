import { FC, memo, useState } from 'react'
import { monthNames } from '@constants/month'
import { withLogic } from '../../decorator/withLogic'
import { daysPosition } from './config'
import { CalendarGrid } from './CalendarGrid'
import { ICalendarProps } from './interfaces'
import { CalendarHeader } from './CalendarHeader'

const Calendar: FC<ICalendarProps> = memo((props) => {
    const {
        isHoliday,
        onSelectDay,
        activeDate,
        isMondayFirst,
        viewType = 'month',
        days,
        handleClickNext,
        currentMonth,
        handleClickPrev,
        currentFullDate,
        isRange,
        toggleTodoModal,
        activeTodoDays,
        maxDate,
        minDate,
    } = props

    const dayNames = isMondayFirst ? daysPosition.fromMon : daysPosition.fromSun

    const [rangeDate, setRangeDate] = useState({
        from: '',
        to: '',
    })

    const changeWithRange = (val: string) => {
        setRangeDate((prevRangeDate) => {
            if (prevRangeDate.from.length > 0) {
                if (val >= prevRangeDate.from) {
                    return { ...prevRangeDate, to: val }
                } else {
                    return { from: val, to: prevRangeDate.from }
                }
            } else {
                return { from: val, to: '' }
            }
        })
    }

    return (
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <CalendarHeader
                handleClickPrev={handleClickPrev}
                handleClickNext={handleClickNext}
                currentFullDate={currentFullDate}
            />
            {viewType !== 'year' && (
                <div className="p-2 grid grid-cols-1 gap-4">
                    <CalendarGrid
                        dayNames={dayNames}
                        days={days}
                        maxDate={maxDate || null}
                        minDate={minDate || null}
                        rangeValues={rangeDate}
                        isHoliday={isHoliday}
                        currentMonth={currentMonth}
                        activeDate={activeDate}
                        viewType={viewType}
                        toggleTodoModal={toggleTodoModal}
                        onSelectDay={onSelectDay}
                        changeWithRange={changeWithRange}
                        isRange={isRange}
                        activeTodoDays={activeTodoDays}
                    />
                </div>
            )}
            {viewType === 'year' && (
                <div className="p-2 grid grid-cols-4 gap-4">
                    {new Array(12).fill(9).map((elem, index) => (
                        <div>
                            <h1>{monthNames[index]}</h1>
                            <CalendarGrid
                                dayNames={dayNames}
                                activeDate={activeDate}
                                isHoliday={isHoliday}
                                isRange={isRange}
                                maxDate={maxDate}
                                minDate={minDate}
                                rangeValues={rangeDate}
                                toggleTodoModal={toggleTodoModal}
                                viewType={viewType}
                                currentMonth={index}
                                changeWithRange={changeWithRange}
                                onSelectDay={onSelectDay}
                                days={days[index]}
                                activeTodoDays={activeTodoDays}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
})

const CalendarWithLogic = withLogic(Calendar)

export default CalendarWithLogic
