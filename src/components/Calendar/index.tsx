import { FC, memo } from 'react'
import { monthNames } from '@constants/month'
import { withLogic } from '../../decorators/withLogic'
import { MONTH_COUNT, DAYS_POSITION } from './config'
import { CalendarGrid } from './CalendarGrid'
import { ICalendarProps } from './interfaces'
import { CalendarHeader } from './CalendarHeader'
import { VIEW_TYPE } from '@constants/enums'

const Calendar: FC<ICalendarProps> = memo((props) => {
    const {
        isHoliday,
        onSelectDay,
        activeDate,
        isMondayFirst,
        viewType = VIEW_TYPE.MONTH,
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
        changeWithRange,
        rangeDate,
    } = props

    const dayNames = isMondayFirst
        ? DAYS_POSITION.fromMon
        : DAYS_POSITION.fromSun

    const gridProps = {
        dayNames: dayNames,
        maxDate: maxDate || null,
        minDate: minDate || null,
        rangeValues: rangeDate,
        isHoliday: isHoliday,
        activeDate: activeDate,
        toggleTodoModal: toggleTodoModal,
        onSelectDay: onSelectDay,
        changeWithRange: changeWithRange,
        isRange: isRange,
        activeTodoDays: activeTodoDays ?? [],
    }
    return (
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <CalendarHeader
                handleClickPrev={handleClickPrev}
                handleClickNext={handleClickNext}
                currentFullDate={currentFullDate}
            />
            {viewType !== VIEW_TYPE.YEAR && (
                <div className="p-2 grid grid-cols-1 gap-4">
                    <CalendarGrid
                        days={days}
                        currentMonth={currentMonth}
                        {...gridProps}
                    />
                </div>
            )}
            {viewType === VIEW_TYPE.YEAR && (
                <div className="p-2 grid grid-cols-3 gap-4">
                    {new Array(MONTH_COUNT).fill(9).map((elem, monthIndex) => {
                        return (
                            <div key={monthIndex}>
                                <h1>{monthNames[monthIndex]}</h1>
                                <CalendarGrid
                                    currentMonth={monthIndex}
                                    days={days[monthIndex]}
                                    {...gridProps}
                                />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
})

const CalendarWithLogic = withLogic(Calendar)

export default CalendarWithLogic
