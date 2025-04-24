import React, { createContext, useState, useEffect, useContext } from 'react';
 import { Session, User } from '@supabase/supabase-js';
 import { supabase } from '@/integrations/supabase/client';
 import { toast } from 'sonner';
 
 type AuthContextType = {
   session: Session | null;
   user: User | null;
   profile: any | null; // Profile includes role information
   isLoading: boolean;
   signIn: (email: string, password: string) => Promise<{ error: any }>;
   signUp: (email: string, password: string, userData: object) => Promise<{ error: any, data: any }>;
   signOut: () => Promise<void>;
   isAdmin: boolean;
   isHost: boolean;
 };
 
 const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
 export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [session, setSession] = useState<Session | null>(null);
   const [user, setUser] = useState<User | null>(null);
   const [profile, setProfile] = useState<any | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [isAdmin, setIsAdmin] = useState(false);
   const [isHost, setIsHost] = useState(false);
 
   useEffect(() => {
     // Set up auth state listener FIRST
     const { data: { subscription } } = supabase.auth.onAuthStateChange(
       (event, newSession) => {
         setSession(newSession);
         setUser(newSession?.user ?? null);
         
         if (newSession?.user) {
           setTimeout(async () => {
             await fetchUserProfile(newSession.user.id);
           }, 0);
         } else {
           setProfile(null);
           setIsAdmin(false);
           setIsHost(false);
         }
       }
     );
 
     // THEN check for existing session
     const initializeAuth = async () => {
       try {
         setIsLoading(true);
         const { data: { session: initialSession } } = await supabase.auth.getSession();
         
         setSession(initialSession);
         setUser(initialSession?.user ?? null);
         
         if (initialSession?.user) {
           await fetchUserProfile(initialSession.user.id);
         }
       } catch (error) {
         console.error('Error initializing auth:', error);
         toast.error('Authentication initialization failed');
       } finally {
         setIsLoading(false);
       }
     };
 
     initializeAuth();
 
     return () => {
       subscription.unsubscribe();
     };
   }, []);
 
   const fetchUserProfile = async (userId: string) => {
     try {
       const { data, error } = await supabase
         .from('profiles')
         .select('*')
         .eq('id', userId)
         .single();
         
       if (error) throw error;
       
       if (data) {
         setProfile(data);
         setIsAdmin(data.role === 'admin');
         setIsHost(data.role === 'host');
       }
     } catch (error: any) {
       console.error('Error fetching user profile:', error.message);
     }
   };
 
   const signIn = async (email: string, password: string) => {
     try {
       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
       
       if (error) {
         toast.error(error.message);
         return { error };
       }
       
       toast.success('Signed in successfully');
       return { error: null };
     } catch (error: any) {
       toast.error('Sign in failed');
       return { error };
     }
   };
 
   const signUp = async (email: string, password: string, userData: object) => {
     try {
       const { data, error } = await supabase.auth.signUp({
         email, 
         password,
         options: {
           data: userData
         }
       });
       
       if (error) {
         toast.error(error.message);
         return { error, data: null };
       }
       
       toast.success('Account created successfully. Check your email for verification');
       return { error: null, data };
     } catch (error: any) {
       toast.error('Sign up failed');
       return { error, data: null };
     }
   };
 
   const signOut = async () => {
     try {
       await supabase.auth.signOut();
       toast.success('Signed out successfully');
     } catch (error: any) {
       console.error('Error signing out:', error.message);
       toast.error('Sign out failed');
     }
   };
 
   const value = {
     session,
     user,
     profile,
     isLoading,
     signIn,
     signUp,
     signOut,
     isAdmin,
     isHost,
   };
 
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
 };
 
 export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
     throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
 };