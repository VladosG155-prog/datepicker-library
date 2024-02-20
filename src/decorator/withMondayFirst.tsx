import { ComponentType } from 'react'
import { ICalendarProps } from '@components/Calendar/interfaces'

export const withMondayFirst = <P extends ICalendarProps>(
    Component: ComponentType<Omit<P, keyof ICalendarProps>>
) => {
    return (props: P) => {
        return <Component {...props} isMondayFirst={true} />
    }
}
