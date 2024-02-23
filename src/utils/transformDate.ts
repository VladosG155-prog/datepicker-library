export const transformDateToInput = (day: number, month: number, year: number): string => {
    return `${day < 9 ? '0' + day : day}/${month + 1 < 9 ? '0' + Number(month + 1) : Number(month + 1)}/${year}`
}
