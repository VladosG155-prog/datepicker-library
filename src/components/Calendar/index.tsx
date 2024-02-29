import { FC, memo } from 'react'
import { monthNames } from '@constants/month'
import { withLogic } from '@decorators/withLogic'
import { DAYS_POSITION, getDayKeys } from './config'
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

    const dayNames = isMondayFirst ? DAYS_POSITION.fromMon : DAYS_POSITION.fromSun

    const gridProps = {
        dayNames,
        maxDate: maxDate || null,
        minDate: minDate || null,
        rangeValues: rangeDate,
        isHoliday,
        activeDate,
        toggleTodoModal,
        onSelectDay,
        changeWithRange,
        isRange,
        activeTodoDays: activeTodoDays ?? null,
        viewType,
    }

    const isYearView = viewType === VIEW_TYPE.YEAR

    const dayKeys = getDayKeys(days)

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
                {dayKeys.map((day) => {
                    return (
                        <div className="flex flex-col" key={day}>
                            {isYearView && <h2>{[monthNames[+day]]}</h2>}
                            <CalendarGrid
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
