import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Global Tax Calculator",
  description: "Calculate income tax across different countries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            card: "shadow-none",
          },
        }}
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <body className={inter.className}>
          <main className="min-h-screen bg-background">{children}</main>
        </body>
      </ClerkProvider>
    </html>
  );
}
