import { ICalendarProps } from '@components/Calendar'
import { ComponentType } from 'react'

export const withRange = <P extends ICalendarProps>(
    Component: ComponentType<Omit<P, keyof ICalendarProps>>
) => {
    return (props: P) => {
        return <Component {...props} isRange={true} />
    }
}
