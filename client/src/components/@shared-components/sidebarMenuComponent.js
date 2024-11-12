import { useRouter } from "next/router";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function SidebarMenuComponent({ menuItems }) {
  const router = useRouter();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <div className="w-8 h-8 bg-[#E9F443] rounded-lg" />
          <span className="font-bold text-xl">LoanBB</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = router.pathname === item.route; 

            return (
              <SidebarMenuItem className="mx-6 rounded-sm" key={item.title}>
                <Link href={item.route} passHref>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isActive ? "bg-[#E9F443] px-6" : "px-6"} 
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
