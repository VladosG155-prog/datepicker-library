import { IDay } from './interfaces'

const startFromSunday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const startFromMonday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const DAYS_POSITION = {
    fromSun: startFromSunday,
    fromMon: startFromMonday,
}

export const MONTH_COUNT = 12

export const getDayKeys = (days: { [key: string]: IDay[] }): string[] => {
    return Object.keys(days)
}
