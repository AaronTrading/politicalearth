import { env } from "@/lib/env";
import type { Metadata } from "next";

import AdminPanel from "./_components/admin-panel";

export const metadata: Metadata = {
  title: `Admin | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default function AdminPage() {
  return (
    <main>
      <AdminPanel />
    </main>
  );
}
