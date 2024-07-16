import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Button } from "../ui/button";
import { DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuGroup, 
    DropdownMenuLabel,
    DropdownMenuSeparator 
} from "@radix-ui/react-dropdown-menu";

function Layout ({ children } : { children: ReactNode}) {
    return (
        <div className="flex">
            <Sidebar />
                <div className="flex-1 min-h-screen bg-white">
                    <header className="bg-white shadow border-b border-black">
                        <div className="w-full flex justify-end mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="text-lg font-bold bg-transparent text-fontHeading hover:bg-transparent border-none">Leansel Nico</Button>
                                </DropdownMenuTrigger> 
                                <DropdownMenuContent align="end" className="w-64 bg-black rounded border-black border-2">
                                    <DropdownMenuLabel className="px-5 py-3 text-white"><span className="">Admin</span></DropdownMenuLabel>
                                    <DropdownMenuSeparator className="h-px bg-gray-300"/>
                                    <DropdownMenuGroup>
                                    <DropdownMenuItem className="px-5 py-3 text-white hover:bg-hoverCream hover:text-fontHeading border-none"><span>Logout</span></DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>                           
                            </DropdownMenu>
                        </div>
                    </header>
                    <main>
                        <div className="w-full mx-auto py-6 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </main>
                </div>
        </div>
    );
}

export default Layout;

