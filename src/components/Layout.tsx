import { ReactNode } from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  
  import { Button } from "@/components/ui/button";
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col   bg-black text-black">
      {/* Header / Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-[#1A1E22] text-white">
      {/* Left Side - Logo */}
      <div className="text-3xl ">Material </div>
      
      {/* Center - Navigation Links */}
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-6">
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="text-white hover:text-black">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="text-white hover:text-black">About Us</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="text-white hover:text-black">Contact Us</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Right Side - Login/Logout Button */}
      <Button variant="outline" className="bg-[#1A1E22] text-white">Login</Button>
    </nav>


      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        &copy; {new Date().getFullYear()} Product Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;