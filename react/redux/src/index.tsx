import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'
import './assets/main.css'

import { Provider } from 'react-redux'
import ErrorBoundary from './components/error/ErrorBoundary'
import CustomRouter from './components/router/CustomBrowserRouter'
import customHistory from './components/router/CustomHistory'
import NotFoundPage from './pages/Error/NotFoundPage'
import Main from './pages/Main/Main'
import store from './redux/store'

// update react 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide
const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        {/* <RouterProvider router={router} /> */}
        <CustomRouter history={customHistory}>
            <ErrorBoundary>
                <Routes>
                    <Route path={'/'} element={<Main />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </ErrorBoundary>
        </CustomRouter>
    </Provider>
)
