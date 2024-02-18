import { IDatePickerProps } from '@components/Calendar'
const holidays = [
    { month: 0, day: 1 },
    { month: 0, day: 7 },
    { month: 2, day: 8 },
    { month: 4, day: 1 },
    { month: 4, day: 9 },
    { month: 6, day: 3 },
    { month: 10, day: 7 },
    { month: 11, day: 25 },
]

interface IWithHolidayDisplay {
    isHoliday: (day: number, month?: number) => boolean
}

const withHolidayDisplay = <P extends IDatePickerProps>(
    Component: React.ComponentType<Omit<P, keyof IDatePickerProps>>
): React.FC<P> => {
    return (props: P) => {
        const isHoliday = (day: number, month?: number): boolean => {
            return holidays.some(
                (holiday) => holiday.day === day && holiday.month === month
            )
        }
        return <Component {...props} isHoliday={isHoliday} />
    }
}

export default withHolidayDisplay
