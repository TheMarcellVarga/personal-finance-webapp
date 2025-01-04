"use client";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Welcome, {user?.firstName}!</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user?.firstName} {user?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
