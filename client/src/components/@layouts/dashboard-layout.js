'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Wallet } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarMenuComponent from '../@shared-components/sidebarMenuComponent';
import { menuItems } from '../@shared-components/menuItems';
import Cookies from 'js-cookie';

export default function Dashboard({ children }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const router = useRouter();

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleLogout = () => {
  Cookies.remove('authToken');
  sessionStorage.removeItem('authToken');
  
  router.push('/');
  };

  return (
    <SidebarProvider>
      <div className="flex text-gray-700 h-screen w-full bg-gray-50">
        <SidebarMenuComponent menuItems={menuItems} />
        <div className="flex-1 overflow-auto">
          <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleConnectWallet}
                className="bg-[#E9F443] text-black hover:bg-[#d9e33d] flex items-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                {isWalletConnected ? '0x1234...5678' : 'Connect Wallet'}
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/placeholder.svg" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
