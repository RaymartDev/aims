
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import useRedirectIfNotAuth from "@/hooks/useRedirectIfNotAuth";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "@/store/store";

function Layout() {
    useRedirectIfNotAuth('/login');
    const user = useAppSelector((state) => state.user);

    return (
        <div className="flex h-screen">
            <ToastContainer />
            <Sidebar />
            <div className="flex-1 min-h-screen bg-white flex flex-col">
                <header className="bg-white shadow border-b border-black">
                    <div className="w-full flex justify-end mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-lg font-bold">{user?.name || 'User'}</h1>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto">
                    <div className="w-full mx-auto py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;
