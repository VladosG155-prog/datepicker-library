import { ChangeEvent, FC, KeyboardEvent } from 'react'
import { ReactComponent as CalendarIcon } from '../../assets/Calendar.svg'
import { ReactComponent as CloseIcon } from '../../assets/Clear.svg'

interface IInputProps {
    value: string
    onChange: (val: string) => void
    onClick: () => void
}

export const Input: FC<IInputProps> = ({ value = '', onChange, onClick }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputDate = e.target.value

        const formattedDate = inputDate
            .replace(/\D/g, '')
            .replace(/^(\d{2})/, '$1/')
            .replace(/^(\d{2})\/(\d{2})/, '$1/$2/')
            .slice(0, 10)
        onChange(formattedDate)
    }

    const handleClearInput = () => {
        onChange('')
    }

    return (
        <div className="w-[250px] relative mb-5">
            <i
                onClick={onClick}
                className="absolute top-4 left-4 cursor-pointer"
            >
                <CalendarIcon />
            </i>
            <input
                type="text"
                value={value}
                onChange={(e) => handleChange(e)}
                placeholder="Choose Date"
                className="border-gray-100 w-full border-2 rounded-lg py-2.5 pl-9 pr-3.5 font-normal text-gray-default"
            />
            {value.length > 0 && (
                <i
                    onClick={handleClearInput}
                    className="absolute top-4 right-4 cursor-pointer"
                >
                    <CloseIcon />
                </i>
            )}
        </div>
    )
}
