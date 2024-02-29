import { FC } from 'react'
import { ReactComponent as ArrowLeft } from '@assets/Next.svg'
import { ReactComponent as ArrowRight } from '@assets/Prev.svg'

import { ICalendarHeaderProps } from './interfaces'

export const CalendarHeader: FC<ICalendarHeaderProps> = ({
    handleClickPrev,
    currentFullDate,
    handleClickNext,
}) => {
    return (
        <div className="flex justify-between items-center px-6 py-3">
            <button onClick={handleClickPrev} className="text-white focus:outline-none">
                <ArrowRight />
            </button>
            <div className="text-black font-bold">{currentFullDate}</div>
            <button onClick={handleClickNext} className="text-white focus:outline-none">
                <ArrowLeft />
            </button>
        </div>
    )
}
