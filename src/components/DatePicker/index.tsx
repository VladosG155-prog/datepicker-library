import { FC, useCallback, useEffect, useRef, useState } from 'react'
import Calendar from '@components/Calendar'
import { Input } from '@components/Input'
import { IDatePickerProps } from './interfaces'
import { VIEW_TYPE } from '@constants/enums'
import { useClickOutside } from '../../hooks/useClickOutside'
import { isValidDate } from '@utils/isValidDate'

export const DatePicker: FC<IDatePickerProps> = ({
    withHolidays = false,
    withMondayFirst = false,
    withRange = false,
    withTodos = false,
    viewType = VIEW_TYPE.MONTH,
    maxDate,
    minDate,
}) => {
    const [date, setDate] = useState('')
    const ref = useRef(null)
    const [range, setRange] = useState({ from: '', to: '' })

    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    const handleClickInput = (): void => {
        setIsOpenCalendar(true)
    }

    useEffect(() => {
        if (isValidDate(date)) {
            setIsOpenCalendar(true)
        }
    }, [date])

    const handleChangeInput = useCallback(
        (val: string): void => {
            if (withRange) {
                setRange((prev) => {
                    return {
                        ...prev,
                        to: val,
                    }
                })
            } else {
                setDate(val)
            }
        },
        [withRange]
    )

    const handleChangeSecondInput = useCallback((val: string): void => {
        setRange((prev) => {
            return {
                ...prev,
                from: val,
            }
        })
    }, [])

    const handleSelectDate = (val: string): void => {
        if (withRange) {
            const [from, to] = val.split('-')
            setRange({ from, to: to })
        } else {
            setDate(val)
        }
    }

    const rangeDateToString = range.from || range.to ? `${range.from}-${range.to}` : ''

    useClickOutside(ref, (e: MouseEvent | TouchEvent) => {
        if (e.target instanceof Element && !e.target.closest('[data-id="modal"]')) {
            setIsOpenCalendar(false)
        }
    })

    return (
        <div ref={ref}>
            {withRange && (
                <Input
                    onClick={handleClickInput}
                    onChange={handleChangeSecondInput}
                    value={range.from}
                    maxValue={maxDate}
                    minValue={minDate}
                />
            )}
            <Input
                onClick={handleClickInput}
                onChange={handleChangeInput}
                value={withRange ? range.to : date}
                maxValue={maxDate}
                minValue={minDate}
            />
            {isOpenCalendar && (
                <Calendar
                    withHolidays={withHolidays}
                    withMondayFirst={withMondayFirst}
                    withRange={withRange}
                    withTodos={withTodos}
                    maxDate={maxDate}
                    minDate={minDate}
                    activeDate={withRange ? rangeDateToString : date}
                    viewType={viewType}
                    onSelectDay={handleSelectDate}
                />
            )}
        </div>
    )
}
