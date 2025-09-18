
"use client";

import { AdminRoute } from "@/components/AdminRoute";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { resetAllUsersProgress } from "@/ai/flows/reset-all-users-progress-flow";
import { debugAdminStatus } from "@/ai/flows/debug-admin-status-flow";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

function AdminPageContent() {
  const { user, userData } = useAuth();
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);

  const handleDebugCheck = async () => {
    console.log("--- STARTING ADMIN DEBUG CHECK ---");
    
    if (!user || !userData) {
      console.error("Client-side check failed: No user or userData available.");
      alert("Debug check failed: Not logged in on the client. See console.");
      return;
    }

    console.log("Client-side user object:", user);
    console.log("Client-side user data (from context):", userData);
    
    setIsResetting(true);
    try {
      console.log("Calling 'debugAdminStatus' flow...");
      const result = await debugAdminStatus({ userId: user.uid });

      console.log("--- SERVER RESPONSE ---");
      console.log("Status:", result.status);
      console.log("Message from Server:", result.message);
      console.log("UID Checked by Server:", result.checkedUid);
      console.log("Firestore Doc Exists?:", result.docExists);
      console.log("Firestore Doc Data:", result.docData);
      console.log("Server thinks I am admin?:", result.isAdmin);
      console.log("-------------------------");

      alert("Debug check complete. See the browser console for results.");

    } catch (error: any) {
      console.error("Debug function call FAILED:", error);
      alert(`Debug check failed: ${error.message}`);
    } finally {
        setIsResetting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold font-headline">Admin Panel</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Use the tools below to manage the application.
      </p>

      <div className="mt-8 max-w-md space-y-4">
        <div className="p-6 border border-destructive/50 rounded-lg bg-destructive/10">
          <h3 className="text-xl font-bold text-destructive-foreground">Danger Zone</h3>
          <p className="text-destructive-foreground/80 mt-2">
            This action is irreversible and will reset the learning progress (XP, level, completed lessons) for all users.
          </p>
          <Button variant="destructive" className="mt-4 w-full" onClick={handleDebugCheck} disabled={isResetting}>
            {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Run Admin Status Check
          </Button>
        </div>
      </div>
    </div>
  );
}

const ProtectedAdminPage = () => (
    <AdminRoute>
        <AdminPageContent />
    </AdminRoute>
);

export default ProtectedAdminPage;
