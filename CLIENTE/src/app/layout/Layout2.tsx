import { Outlet } from "react-router-dom"
import { NavBar } from "../../components/NavBar"

export const Layout2 = () => {
    return (
        <div className="w-screen h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <div className="flex-1 overflow-x-hidden bg-gray-200">
                <Outlet />
            </div>
        </div>
    )
}