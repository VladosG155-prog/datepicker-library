import { ICalendarProps } from '@components/Calendar/interfaces'
import { FC, useEffect, useState } from 'react'

export const withRange = <P extends ICalendarProps>(Component: FC<P>) => {
    return (props: P) => {
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
        }, [rangeDate, onSelectDay, to, from])

        const changeWithRange = (val: string): void => {
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
