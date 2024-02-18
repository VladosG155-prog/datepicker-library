import { FC } from 'react'
import cn from 'classnames'

interface IDayCellProps {
    day: number
    isHoliday?: boolean
    isPrevMonth: boolean
    onClick: () => void
    isActiveDay: boolean
}

export const DayCell: FC<IDayCellProps> = ({
    day,
    isHoliday = false,
    isPrevMonth,
    onClick,
    isActiveDay = false,
}) => {
    console.log(isActiveDay)
    return (
        <div
            onClick={onClick}
            className={cn(
                'w-8 h-8 flex justify-center text-sm items-center font-semibold rounded-lg text-center text-gray-default  ',
                {
                    'text-red-400': isHoliday,
                    'text-gray-disabled': !isPrevMonth,
                    'bg-blue-300 text-white': isActiveDay,
                    'cursor-pointer hover:bg-blue-300 hover:text-white':
                        isPrevMonth,
                }
            )}
        >
            {day}
        </div>
    )
}
