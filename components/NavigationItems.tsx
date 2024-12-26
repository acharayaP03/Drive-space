import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavigationItemsProps {
  linkContentClass: string;
  imageContentClass: string;
  icon: string;
  name: string;
  url: string;
  isMobile: boolean;
}

export default function NavigationItems({
  linkContentClass,
  imageContentClass,
  name,
  icon,
  url,
  isMobile = false,
}: NavigationItemsProps) {
  return (
    <Link key={name} href={url} className="lg:w-full">
      <li className={linkContentClass}>
        <Image
          src={icon}
          alt={name}
          width={24}
          height={24}
          className={imageContentClass}
        />
        <p className={`${!isMobile ? "hidden" : ""} lg:block`}>{name}</p>
      </li>
    </Link>
  );
}
