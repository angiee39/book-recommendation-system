'use client'
import "./globals.css";
import { UserProvider } from '@/context/user-context';
import NavBar from "./nav-bar";
import {Toaster} from "@/components/ui/toaster";
import OneSignal from 'react-onesignal';
import {useEffect} from "react";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

export default function RootLayout({ children }) {
    const queryClient = new QueryClient()


    // One Signal push and email notifications
    useEffect(() => {
        if (typeof window !== 'undefined') {
            OneSignal.init({
                appId: '2b009837-4a61-4efe-9c06-509191b84012',
                notifyButton: {
                    enable: true,
                },
                allowLocalhostAsSecureOrigin: true
            });
        }
    }, []);

    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <QueryClientProvider client={queryClient}>
                        <NavBar />
                        <main>
                            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex justify-center items-center">
                                {children}
                            </div>
                        </main>
                        <Toaster />
                    </QueryClientProvider>
                </UserProvider>
            </body>
        </html>
    );
}
