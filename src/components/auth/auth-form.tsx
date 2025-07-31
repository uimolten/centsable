
"use client";

import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "../logo";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.021,35.596,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
  );

const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "YOUR_API_KEY";

export function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<null | 'google' | 'email'>(null);
  
  const defaultTab = searchParams.get("view") === "signup" ? "signup" : "login";

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  const getAuthErrorMessage = (error: any) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please try logging in.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      case 'auth/popup-closed-by-user':
        return ''; // Return empty to prevent toast for this specific case
      case 'auth/unauthorized-domain':
        return 'This domain is not authorized for authentication. Please add it to the Firebase console.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  };

  const showConfigErrorToast = () => {
    toast({
      variant: "destructive",
      title: "Firebase Not Configured",
      description: "Please add your Firebase credentials to the .env.local file and restart the server.",
      duration: 10000,
    });
  }

  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured) {
      showConfigErrorToast();
      return;
    }
    setLoading('google');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'user',
          createdAt: serverTimestamp(),
        });
      }
      
      router.push("/learn");
    } catch (error: any) {
        const description = getAuthErrorMessage(error);
        if (description) {
            toast({ variant: "destructive", title: "Sign in failed", description });
        }
    } finally {
        setLoading(null);
    }
  };

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (!isFirebaseConfigured) {
      showConfigErrorToast();
      return;
    }
    setLoading('email');
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/learn");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Login failed", description: getAuthErrorMessage(error) });
    } finally {
        setLoading(null);
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    if (!isFirebaseConfigured) {
      showConfigErrorToast();
      return;
    }
    setLoading('email');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: 'user',
        createdAt: serverTimestamp(),
      });

      router.push("/learn");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Sign up failed", description: getAuthErrorMessage(error) });
    } finally {
        setLoading(null);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border border-border/20 shadow-2xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
            <Logo/>
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Your financial adventure continues here. Sign in or create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-background/50">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="pt-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField control={loginForm.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="you@example.com" {...field} className="bg-background/50 border-border/20" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={loginForm.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} className="bg-background/50 border-border/20" /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full shadow-glow" disabled={!!loading}>
                  {loading === 'email' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Log In
                </Button>
              </form>
            </Form>
             <div className="relative my-4"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div></div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={!!loading}>
              {loading === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />} Sign in with Google
            </Button>
          </TabsContent>
          <TabsContent value="signup" className="pt-4">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <FormField control={signupForm.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="you@example.com" {...field} className="bg-background/50 border-border/20" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={signupForm.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} className="bg-background/50 border-border/20"/></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full shadow-glow" disabled={!!loading}>
                  {loading === 'email' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create Account
                </Button>
              </form>
            </Form>
             <div className="relative my-4"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div></div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={!!loading}>
              {loading === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />} Sign up with Google
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
