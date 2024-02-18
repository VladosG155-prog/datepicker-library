import { ReactComponent as ArrowLeft } from '@assets/Next.svg'
import { ReactComponent as ArrowRight } from '@assets/Prev.svg'
import { ComponentType, FC, useState } from 'react'
import { monthNames } from '@constants/month'
import { withLogic } from '../../decorator/withLogic'
import { daysPosition } from './config'
import { CalendarGrid } from './CalendarGrid'

export interface ICalendarProps {
    isHoliday?: (day: number, month?: number) => boolean
    onSelectDay: (val: string) => void
    activeDate: string
    isMondayFirst: boolean
    isRange: boolean
    viewType?: 'month' | 'week' | 'year'
    days: { day: number; month: number; year: number }[]
    currentDate: Date
    currentMonth: number
    handleClickNext: () => void
    handleClickPrev: () => void
    currentFullDate: string
}
const Calendar: FC<ICalendarProps> = ({
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
}) => {
    const dayNames = isMondayFirst ? daysPosition.fromMon : daysPosition.fromSun

    const [date, setDate] = useState({ from: '', to: '' })

    const changeWithRange = (val: string) => {
        if (date.from.length && !date.to.length) {
            setDate({ ...date, to: val })
        } else if (date.from.length && date.to.length) {
            setDate({ from: val, to: '' })
        } else {
            setDate({ ...date, from: val })
        }
    }

    console.log(days)

    return (
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-3">
                <button
                    onClick={handleClickPrev}
                    className="text-white focus:outline-none"
                >
                    <ArrowRight />
                </button>
                <div className="text-black font-bold">{currentFullDate}</div>
                <button
                    onClick={handleClickNext}
                    className="text-white focus:outline-none"
                >
                    <ArrowLeft />
                </button>
            </div>

            {viewType !== 'year' && (
                <div className="p-2 grid grid-cols-1 gap-4">
                    <CalendarGrid
                        dayNames={dayNames}
                        days={days}
                        rangeValues={date}
                        isHoliday={isHoliday}
                        currentMonth={currentMonth}
                        activeDate={activeDate}
                        viewType={viewType}
                        onSelectDay={onSelectDay}
                        changeWithRange={changeWithRange}
                        isRange={isRange}
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
                                rangeValues={date}
                                viewType={viewType}
                                currentMonth={index}
                                changeWithRange={changeWithRange}
                                onSelectDay={onSelectDay}
                                days={days[index]}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const CalendarWithLogic = withLogic(Calendar)

export default CalendarWithLogic
