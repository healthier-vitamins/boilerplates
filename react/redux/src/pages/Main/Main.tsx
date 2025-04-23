import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export default function Main() {
    useEffect(() => {
        console.log(process.env.TEST)
    }, [])
    // throw Error('heoi')
    return (
        <div>
            <div>hello werld</div>
            <Outlet />
        </div>
    )
}
