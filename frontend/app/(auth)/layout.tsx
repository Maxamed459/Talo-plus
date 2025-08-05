import { AuthProvider } from "../context/AuthContext";
import "../globals.css";
export const metadata = {
  title: "Register & Login | Talo+",
  description:
    "Register a new account or login to your existing Talo+ account.",
};

export default function AuthLayout({
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
