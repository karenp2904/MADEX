import { Outlet } from "react-router-dom"
import { NavBar } from "../../components/NavBar"
import Footer from "@/components/Footer"

export const Layout2 = () => {
    return (
        <div className="w-screen h-screen bg-gray-100">
            <NavBar />
            <div className="h-[calc(100vh-3.5rem)] w-full bg-gray-200">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}