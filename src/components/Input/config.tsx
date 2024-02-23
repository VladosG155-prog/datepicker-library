export const formatDate = (val: string): string => {
    const inputDate = val

    // Regexp for mask format: DD/MM/YYYY
    const formattedDate = inputDate
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .replace(/^(\d{2})\/(\d{2})/, '$1/$2/')
        .slice(0, 10)

    return formattedDate
}
