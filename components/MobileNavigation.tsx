"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import type { ICurrentLoggedInUser } from "@/lib/typings";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import NavigationItems from "./NavigationItems";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";

export default function MobileNavigation({
  ownerId,
  accountId,
  fullName,
  email,
  avatar,
}: ICurrentLoggedInUser) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          {/* this header with description is needed here for now, since it will generate description missing warning */}
          <SheetHeader className="sr-only">
            <SheetDescription>
              This is the mobile navigation sheet.
            </SheetDescription>
          </SheetHeader>
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatarPlaceholderUrl}
                alt="avatar"
                width={40}
                height={40}
                className="header-user-avatar rounded-full"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <NavigationItems
                  key={name}
                  url={url}
                  name={name}
                  icon={icon}
                  linkContentClass={cn(
                    "mobile-nav-item",
                    pathname === url ? "shad-active" : "",
                  )}
                  imageContentClass={cn(
                    "nav-icon",
                    pathname === url ? "nav-icon-active" : "",
                  )}
                  isMobile={true}
                />
              ))}
            </ul>
          </nav>
          <Separator className="mt-5 bg-light-200/20" />
          <div className="flex flex-col justify-between gap-5">
            <FileUploader />

            <Button type="submit" className="mobile-sign-out-button">
              <Image
                src="/assets/icons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
