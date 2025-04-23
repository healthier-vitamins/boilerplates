import { Component, ErrorInfo, ReactNode } from 'react'
import ErrorPage from '../../pages/Error/ErrorPage'

interface ErrorBoundaryProps {
    children: ReactNode
}

export interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
    errorInfo: ErrorInfo | null
}

// https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary or react-error-boundary
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error, errorInfo: null }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo })
        console.error('ErrorBoundary caught an error', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage {...this.state} />
        }

        return this.props.children
    }
}

export default ErrorBoundary
