"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import NavigationItems from "./NavigationItems";

import UserInfo from "./UserInfo";

export default function Sidebar({ fullName, email }: ICurrentLoggedInUser) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
        {/* small device logo */}
        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <NavigationItems
              key={name}
              url={url}
              name={name}
              icon={icon}
              linkContentClass={cn(
                "sidebar-nav-item",
                pathname === url && "shad-active",
              )}
              imageContentClass={cn(
                "nav-icon",
                pathname === url && "nav-icon-active",
              )}
              isMobile={false}
            />
          ))}
        </ul>
      </nav>
      <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />
      <UserInfo
        contentClass="sidebar-user-info"
        fullName={fullName}
        email={email}
        isMobile={false}
      />
    </aside>
  );
}
