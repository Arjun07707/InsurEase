"use client";

import React, { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  Users,
  Shield,
  FileText,
  CreditCard,
  BarChart,
  LifeBuoy,
  BookOpen,
  FilePlus,
  Briefcase,
  User,
  LogOut,
  UserCheck,
} from "lucide-react";
import type { UserRole } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { users } from "@/lib/data";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/policies", label: "Policies", icon: Shield },
  { href: "/admin/claims", label: "Claims", icon: FileText },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/reports", label: "Reports", icon: BarChart },
];

const agentNav = [
  { href: "/agent/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agent/clients", label: "Clients", icon: Users },
  { href: "/agent/sales", label: "Policy Sales", icon: CreditCard },
  { href: "/agent/commission", label: "Commission", icon: BarChart },
];

const userNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/browse-policies", label: "Browse Policies", icon: BookOpen },
  { href: "/policies", label: "My Policies", icon: Shield },
  { href: "/claims", label: "My Claims", icon: FileText },
  { href: "/file-claim", label: "File a Claim", icon: FilePlus },
  { href: "/payments", label: "Payments", icon: CreditCard },
];

const helpNav = [{ href: "/help", label: "Help & Support", icon: LifeBuoy }];

export function SidebarWrapper() {
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState<UserRole>("user");

  const currentUser = useMemo(
    () => users.find((u) => u.role === activeRole) || users[0],
    [activeRole]
  );

  const navItems = {
    admin: adminNav,
    agent: agentNav,
    user: userNav,
  };

  const currentNav = navItems[activeRole];

  return (
    <>
      <SidebarHeader>
        <Link href="/" aria-label="InsurEase Home">
          <Logo className="h-8 w-auto" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Role Switcher (Demo)</SidebarGroupLabel>
          <Select value={activeRole} onValueChange={(v) => setActiveRole(v as UserRole)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Policyholder</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </SidebarGroup>

        <SidebarMenu>
          {currentNav.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu className="mt-auto">
          <Separator className="my-2" />
          {helpNav.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="mb-2" />
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Profile">
                    <UserCheck />
                    <span>{currentUser.name}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/">
                    <SidebarMenuButton tooltip="Logout">
                        <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
