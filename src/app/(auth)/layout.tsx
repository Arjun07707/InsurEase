import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 p-4">
        <div className="absolute top-8 left-8">
            <Link href="/" aria-label="Back to homepage">
                <Logo className="h-8 w-auto"/>
            </Link>
        </div>
      {children}
    </div>
  );
}
