"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/store/user.store";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const avatarLabel =
    user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          MyLogo
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">Log in</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar>
                {user?.image ? (
                  <AvatarImage src={user.image} alt={user.name || "User avatar"} />
                ) : (
                  <AvatarFallback>{avatarLabel}</AvatarFallback>
                )}
              </Avatar>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? "Close" : "Menu"}
        </Button>
      </div>

      {isOpen && (
        <div className="border-t border-border/70 bg-background px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-2 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {!user ? (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="w-full">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3 rounded-md border border-border/70 bg-muted p-3">
                <Avatar>
                  {user?.image ? (
                    <AvatarImage src={user.image} alt={user.name || "User avatar"} />
                  ) : (
                    <AvatarFallback>{avatarLabel}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{user?.name || user?.email}</p>
                  <p className="text-xs text-muted-foreground">Logged in</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
