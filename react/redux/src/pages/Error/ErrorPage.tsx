import { ErrorBoundaryState } from '../../components/error/ErrorBoundary'
import { isDevelopment } from '../../utilities/env.utility'

export default function ErrorPage(props?: ErrorBoundaryState) {
    // ? to be used with react router
    // const error: any = useRouteError()

    // ! Functions
    function renderErrorInfo() {
        if (isDevelopment() && props && props.error)
            return (
                <div className="flex  flex-col items-center justify-center">
                    <span className="font-semibold text-red-600 max-w-[850px] mb-5 mt-5">
                        {props.error.toString()}
                    </span>

                    <div className="max-h-64 max-w-[600px] overflow-y-auto text-red-500">
                        {props.errorInfo?.componentStack}
                    </div>
                </div>
            )
    }

    return (
        <div className="bg-secondary-background flex h-screen w-screen flex-col items-center justify-center">
            <h1 className="mb-1 text-4xl font-medium">oops!</h1>
            <span className="text-base">an unexpected error has occurred.</span>
            {renderErrorInfo()}
        </div>
    )
}
