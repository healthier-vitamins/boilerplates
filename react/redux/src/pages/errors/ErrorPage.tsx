import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error: any = useRouteError()

    function renderErrorInfo() {
        if (!error) return
        return error?.statusText || error?.message || ''
    }

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{renderErrorInfo()}</i>
            </p>
        </div>
    )
}
