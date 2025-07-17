
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Logo } from "../logo";

interface LoginPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginPromptDialog({ open, onOpenChange }: LoginPromptDialogProps) {
  const router = useRouter();

  const handleLogin = () => {
    onOpenChange(false);
    router.push('/auth');
  };

  const handleSignUp = () => {
    onOpenChange(false);
    router.push('/auth?view=signup');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader className="items-center">
          <Logo />
          <DialogTitle className="text-2xl font-bold mt-4">Start Your Adventure!</DialogTitle>
          <DialogDescription>
            Create an account or log in to access this feature and save your progress.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button size="lg" className="w-full text-lg shadow-glow" onClick={handleSignUp}>
            Create Account
          </Button>
          <Button size="lg" variant="outline" className="w-full text-lg" onClick={handleLogin}>
            Log In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
