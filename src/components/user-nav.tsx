
"use client";

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, LogOut, User as UserIcon, Coins, Gem } from 'lucide-react';
import { Card } from './ui/card';

export function UserNav() {
  const { user, userData, signOut } = useAuth();
  const isAdmin = userData?.role === 'admin';

  if (!user || !userData) return null;

  const handleSignOut = () => {
    signOut();
  }

  return (
    <div className="flex items-center gap-4">
      {isAdmin && (
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin">Admin Panel</Link>
        </Button>
      )}
      <Card id="xp-display" className="flex items-center gap-2 p-2 bg-card/50 border-border/20">
        <Gem className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg text-foreground">{userData.xp}</span>
      </Card>
      <Card id="cents-display" className="flex items-center gap-2 p-2 bg-card/50 border-border/20">
        <Coins className="h-6 w-6 text-yellow-400" />
        <span className="font-bold text-lg text-foreground">{userData.cents}</span>
      </Card>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userData?.displayName ?? 'Welcome'}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile"><UserIcon className="mr-2 h-4 w-4" />Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
