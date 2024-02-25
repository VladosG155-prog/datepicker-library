import { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '@components/DatePicker'

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
    argTypes: {
        value: {
            argTypes: {
                label: { control: 'date' },
            },
        },
    },
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

export const WithRange: Story = {
    render: () => <DatePicker withRange />,
}

export const WithTodos: Story = {
    render: () => <DatePicker withTodos />,
}
