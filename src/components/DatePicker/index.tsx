import { FC, useCallback, useEffect, useRef, useState } from 'react'
import Calendar from '@components/Calendar'
import { Input } from '@components/Input'
import { IDatePickerProps } from './interfaces'
import { VIEW_TYPE } from '@constants/enums'
import { useClickOutside } from '@hooks/useClickOutside'
import { isValidDate } from '@utils/isValidDate'
import { ErrorBoundary } from '@components/ErrorBoundary'

export const DatePicker: FC<IDatePickerProps> = ({
    withHolidays = false,
    withMondayFirst = false,
    withRange = false,
    withTodos = false,
    viewType = VIEW_TYPE.MONTH,
    maxDate,
    minDate,
    onChange = () => null,
    value = '',
}) => {
    const [date, setDate] = useState(value)
    const ref = useRef(null)

    const [range, setRange] = useState({
        from: value.split('-')[0],
        to: value.split('-')[1],
    })

    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    const handleClickInput = (): void => {
        setIsOpenCalendar(true)
    }

    useEffect(() => {
        const [from, to] = value.split('-')
        if (range.to && range.from && range.from !== from && range.to != to) {
            onChange(`${range.from}-${range.to}`)
        }
    }, [range])

    useEffect(() => {
        if (isValidDate(date)) {
            setIsOpenCalendar(true)
            onChange(date)
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

    const handleSelectDate = useCallback(
        (val: string): void => {
            if (withRange) {
                const [from, to] = val.split('-')
                setRange({ from, to: to })
            } else {
                setDate(val)
            }
        },
        [withRange]
    )

    const rangeDateToString = range.from || range.to ? `${range.from}-${range.to}` : ''

    useClickOutside(ref, (e: MouseEvent | TouchEvent) => {
        if (e.target instanceof Element && !e.target.closest('[data-id="modal"]')) {
            setIsOpenCalendar(false)
        }
    })

    return (
        <ErrorBoundary>
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
        </ErrorBoundary>
    )
}
