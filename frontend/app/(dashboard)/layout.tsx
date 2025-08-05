import { AuthProvider } from "../context/AuthContext";
import "../globals.css";
export const metadata = {
  title: "Home Page",
  description:
    "View the latest questions and answers. Stay updated with recent activity and manage your account from here.",
};

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
