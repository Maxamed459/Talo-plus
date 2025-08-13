// app/dashboard/layout.tsx  (server component)
import "../../globals.css";
import { AuthProvider } from "../../context/AuthContext";
import DashboardShell from "../_components/DashboardShell";

export const metadata = {
  title: "Dashboard",
  description:
    "View the latest questions and answers. Stay updated with recent activity and manage your account from here.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DashboardShell>{children}</DashboardShell>
        </AuthProvider>
      </body>
    </html>
  );
}
