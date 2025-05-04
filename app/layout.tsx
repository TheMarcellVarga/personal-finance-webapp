import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
// import { ClerkProvider } from "@clerk/nextjs";
import { MockClerkProvider } from "@/lib/mock-clerk";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Tax Calculator",
  description: "Calculate income tax across different countries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MockClerkProvider>
      <html lang="en" suppressHydrationWarning className="h-full">
        <body className={`${inter.className} h-full`}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </MockClerkProvider>
  );
}
