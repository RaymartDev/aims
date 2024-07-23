import { ReactNode } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 min-h-screen bg-white flex flex-col">
                <header className="bg-white shadow border-b border-black">
                    <div className="w-full flex justify-end mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-lg font-bold">Leansel Nico</h1>
                    </div>
                </header>
                <main className="flex-1">
                    <div className="w-full mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;
