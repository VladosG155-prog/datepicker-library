import { Meta, StoryObj } from '@storybook/react'
import DatePicker from '@components/DatePicker'

const meta = {
    title: 'Components/Datepicker',
    component: DatePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        withHolidays: false,
        withMondayFirst: false,
    },
}
export const WithHolidays: Story = {
    render: () => <DatePicker withHolidays />,
}

export const WithMondayFirst: Story = {
    render: () => <DatePicker withMondayFirst />,
}
