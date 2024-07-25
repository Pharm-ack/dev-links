"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Eye, Link as LinkIcon } from "lucide-react";
import Image from "next/image";

export function DashboardNavigation() {
  const pathname = usePathname();

  const navButtonClass = (path: string) =>
    cn("flex items-center space-x-2", "hover:text-primary transition-colors", {
      "bg-[#EFEBFF] text-primary": pathname.includes(path),
      "bg-transparent": !pathname.includes(path),
    });

  return (
    <nav className="flex items-center justify-between w-full">
      <Link href="/" className="flex items-center gap-x-1 justify-center">
        <Image
          src="/solarlinkcirclebold.svg"
          width={32}
          height={32}
          alt="Logo"
        />
        <Image
          className="hidden md:inline-flex"
          src="/devlinks.svg"
          width={108}
          height={21}
          alt="Logo"
        />
      </Link>
      <div className="flex space-x-2">
        <Button className={navButtonClass("/links")} variant="ghost" asChild>
          <Link href="/links">
            <LinkIcon className="w-4 h-4" />
            <span className="hidden md:inline-flex">Links</span>
          </Link>
        </Button>
        <Button className={navButtonClass("/profile")} variant="ghost" asChild>
          <Link href="/profile">
            <CircleUserRound className="w-4 h-4" />
            <span className="hidden md:inline-flex">Profile Details</span>
          </Link>
        </Button>
      </div>
      <Button
        className="text-primary border-primary hover:bg-[#EFEBFF] hover:text-primary"
        variant="outline"
        asChild
      >
        <Link href="/preview">
          <Eye className="md:hidden" />
          <span className="hidden md:inline-flex">Preview</span>
        </Link>
      </Button>
    </nav>
  );
}
