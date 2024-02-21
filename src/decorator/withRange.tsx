import { ICalendarProps } from '@components/Calendar/interfaces'
import { ComponentType, useEffect, useState } from 'react'

export const withRange = <P extends Object>(Component: ComponentType<P>) => {
    return (props: P & ICalendarProps) => {
        const { activeDate, onSelectDay } = props

        const [from, to] = activeDate.split('-')

        const [rangeDate, setRangeDate] = useState({
            from: from,
            to: to,
        })

        useEffect(() => {
            if (
                (rangeDate.from && rangeDate.to && from !== rangeDate.from) ||
                to !== rangeDate.to
            ) {
                onSelectDay(`${rangeDate.from}-${rangeDate.to}`)
            }
        }, [rangeDate])

        const changeWithRange = (val: string) => {
            setRangeDate((prevRangeDate) => {
                if (!prevRangeDate.from) {
                    return { from: val, to: '' }
                }

                if (val >= prevRangeDate.from) {
                    return { from: prevRangeDate.from, to: val }
                } else {
                    return { from: val, to: prevRangeDate.from }
                }
            })
        }
        return (
            <Component
                {...props}
                isRange={true}
                changeWithRange={changeWithRange}
                rangeDate={rangeDate}
            />
        )
    }
}
