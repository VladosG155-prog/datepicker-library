import { Meta, StoryObj } from '@storybook/react'
import CalendarWithLogic from '.'

const meta = {
    title: 'Components/Calendar',
    component: CalendarWithLogic,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CalendarWithLogic>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
