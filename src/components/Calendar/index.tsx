import { FC, memo } from 'react'
import { monthNames } from '@constants/month'
import { withLogic } from '../../decorators/withLogic'
import { MONTH_COUNT, DAYS_POSITION } from './config'
import { CalendarGrid } from './CalendarGrid'
import { ICalendarProps } from './interfaces'
import { CalendarHeader } from './CalendarHeader'
import { VIEW_TYPE } from '@constants/enums'
import classNames from 'classnames'

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

    const isYearView = viewType === VIEW_TYPE.YEAR

    return (
        <div className="max-w-max bg-white shadow-lg rounded-lg overflow-hidden">
            <CalendarHeader
                handleClickPrev={handleClickPrev}
                handleClickNext={handleClickNext}
                currentFullDate={currentFullDate}
            />
            <div
                className={classNames('p-2 grid grid-cols-1 gap-4', {
                    'grid-cols-3': isYearView,
                })}
            >
                {Object.keys(days).map((day) => {
                    return (
                        <div className="flex flex-col">
                            {isYearView && <h2>{[monthNames[+day]]}</h2>}
                            <CalendarGrid
                                key={day}
                                currentMonth={isYearView ? +day : currentMonth}
                                days={days[+day]}
                                {...gridProps}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

const CalendarWithLogic = withLogic(Calendar)

export default CalendarWithLogic
