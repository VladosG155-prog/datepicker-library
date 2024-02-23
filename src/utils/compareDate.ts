export const compareDate = (
    first: string,
    second: string,
    comparator?: '=' | '>' | '<'
): boolean => {
    if (!first || !second) return false
    const [dayFirst, monthFirst, yearFirst] = first.split('/').map(Number)

    const [daySecond, monthSecond, yearSecond] = second.split('/').map(Number)

    const dateFirst = new Date(yearFirst, monthFirst - 1, dayFirst)
    const dateSecond = new Date(yearSecond, monthSecond - 1, daySecond)

    if (comparator === '>') {
        return dateFirst > dateSecond
    } else if (comparator === '<') {
        return dateFirst < dateSecond
    } else {
        return dateFirst.getTime() === dateSecond.getTime()
    }
}
