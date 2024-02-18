import { ComponentType } from 'react'
import { IDatePickerProps } from '@components/Calendar'

export const withMondayFirst = <P extends IDatePickerProps>(
    Component: ComponentType<Omit<P, keyof IDatePickerProps>>
) => {
    return (props: P) => {
        return <Component {...props} isMondayFirst={true} />
    }
}
