import { RefObject, useEffect } from 'react'

export const useClickOutside = <T extends HTMLElement>(
    ref: RefObject<T>,
    handler: (event: TouchEvent | MouseEvent) => void
): RefObject<T> => {
    useEffect(() => {
        const handleClickOutside = (event: TouchEvent | MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler(event)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, handler])

    return ref
}
