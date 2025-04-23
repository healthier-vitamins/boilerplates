import { BrowserHistory } from 'history'
import { ReactNode, useLayoutEffect, useState } from 'react'
import { Router } from 'react-router-dom'

const CustomRouter = ({
    history,
    children,
    ...props
}: {
    history: BrowserHistory
    children: ReactNode
}) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    })

    useLayoutEffect(() => history.listen(setState), [history])

    return (
        <Router
            {...props}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        >
            {children}
        </Router>
    )
}
export default CustomRouter
