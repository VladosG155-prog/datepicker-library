import { Component, ReactNode } from 'react'

import { IErrorBoundaryProps } from './interfaces'

export class ErrorBoundary extends Component<IErrorBoundaryProps, { hasError: boolean }> {
    constructor(props: IErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true }
    }

    render(): ReactNode {
        const { hasError } = this.state
        const { children } = this.props
        if (hasError) {
            return <h1>Something went wrong.</h1>
        }

        return children
    }
}
