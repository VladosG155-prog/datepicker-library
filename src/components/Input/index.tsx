import { ChangeEvent, FC, KeyboardEvent, memo } from 'react'
import { ReactComponent as CalendarIcon } from '../../assets/Calendar.svg'
import { ReactComponent as CloseIcon } from '../../assets/Clear.svg'
import { validateInput } from '@utils/validateInput'

interface IInputProps {
    value: string
    onChange: (val: string) => void
    onClick: () => void
    maxValue?: Date
    minValue?: Date
}

export const Input: FC<IInputProps> = memo((props) => {
    const { value = '', onChange, onClick, maxValue, minValue } = props
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputDate = e.target.value

        const formattedDate = inputDate
            .replace(/\D/g, '')
            .replace(/^(\d{2})/, '$1/')
            .replace(/^(\d{2})\/(\d{2})/, '$1/$2/')
            .slice(0, 10)
        onChange(formattedDate)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault()
            const newDate = (value as string).slice(0, -1)
            onChange(newDate)
        }
    }

    const handleClearInput = () => {
        onChange('')
    }

    const { valid, message } = validateInput(value, minValue, maxValue)

    return (
        <>
            {!valid && <span className="text-red-500 text-sm">{message}</span>}
            <div className="w-[250px] relative mb-5">
                <i
                    onClick={onClick}
                    className="absolute top-4 left-4 cursor-pointer "
                >
                    <CalendarIcon className=" hover:fill-gray-800 fill-slate-400" />
                </i>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={handleKeyDown}
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
        </>
    )
})
