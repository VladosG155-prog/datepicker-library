import { RefObject, useEffect } from 'react'

export const useClickOutside = <T extends HTMLElement>(
    ref: RefObject<T>,
    handler: (event: TouchEvent | MouseEvent) => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: TouchEvent | MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
               
                handler(event)
            }
        }

        document.addEventListener('mousedown', handleClickOutside, {capture: false})

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, {capture: false})
        }
    }, [ref, handler])

    return ref
}
