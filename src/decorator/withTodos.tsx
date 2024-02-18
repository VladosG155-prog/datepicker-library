import { ComponentType, useState } from 'react'
import { ICalendarProps } from '@components/Calendar'

export const withTodos = <P extends ICalendarProps>(
    Component: ComponentType<Omit<P, keyof ICalendarProps>>
) => {
    const [isShowModal, setIsShowModal] = useState(false)

    return (props: P) => {
        return <Component {...props} isMondayFirst={true} />
    }
}
