import { FC, memo, useState } from 'react'
import cn from 'classnames'
import { IDayCellProps } from './interfaces'
import classNames from 'classnames'

export const DayCell: FC<IDayCellProps> = memo(
    ({
        day,
        isHoliday = false,
        isPrevMonth,
        onClick,
        isActiveDay = false,
        isActiveRangeDay,
        isActiveTodoDay,
        isDisabledByMaxMin,
        isShowTodo,
        onAddTodo,
        dayOfWeek,
    }) => {
        const [isHovered, setIsHovered] = useState(false)

        return (
            <div className="relative">
                <button
                    disabled={!isPrevMonth || isDisabledByMaxMin}
                    onClick={onClick}
                    onDoubleClick={onAddTodo}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={cn(
                        'w-8 h-8 flex relative justify-center p-5 text-sm items-center font-semibold rounded-lg text-center text-gray-default  ',
                        {
                            'text-red-400': isHoliday,
                            'text-gray-disabled':
                                !isPrevMonth || isDisabledByMaxMin,
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
                    <span>{day}</span>
                    {isActiveTodoDay && (
                        <div className="absolute bottom-1 z-5 left-1/2 transform -translate-x-1/2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        </div>
                    )}
                </button>
                {isShowTodo && isHovered && (
                    <div
                        className={classNames('absolute w-[90px] z-10 top-10', {
                            'right-1': dayOfWeek === 6,
                            'left-1': dayOfWeek === 0,
                        })}
                    >
                        <div className="bg-gray-100 text-sm text-gray-700 px-2 py-1 rounded shadow-md">
                            add todo
                        </div>
                    </div>
                )}
            </div>
        )
    }
)
