import { FC } from 'react'
import cn from 'classnames'

interface IDayCellProps {
    day: number
    isHoliday?: boolean
    isPrevMonth: boolean
    onClick: () => void
    isActiveDay: boolean
    isRange?: boolean
    isActiveRangeDay: { from: boolean; to: boolean; mid: boolean }
}

export const DayCell: FC<IDayCellProps> = ({
    day,
    isHoliday = false,
    isPrevMonth,
    onClick,
    isActiveDay = false,
    isRange = false,
    isActiveRangeDay,
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'w-8 h-8 flex justify-center p-5 text-sm items-center font-semibold rounded-lg text-center text-gray-default  ',
                {
                    'text-red-400': isHoliday,
                    'text-gray-disabled': !isPrevMonth,
                    'bg-blue-300 text-white': isActiveDay,
                    'cursor-pointer hover:bg-gray-200': isPrevMonth,
                    'bg-blue-100 text-white rounded-l-lg rounded-r-none':
                        isActiveRangeDay.from,
                    'bg-blue-300 rounded-r-lg rounded-l-none text-white':
                        isActiveRangeDay.to,
                    'bg-blue-50 rounded-none text-blue-900':
                        isActiveRangeDay.mid,
                }
            )}
        >
            {day}
        </div>
    )
}
