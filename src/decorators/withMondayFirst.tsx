import { ICalendarProps } from '@components/Calendar/interfaces'
import { ComponentType } from 'react'

export const withMondayFirst = <P extends Object>(
    Component: ComponentType<P>
) => {
    return (props: P & ICalendarProps) => {
        return <Component {...props} isMondayFirst={true} />
    }
}
