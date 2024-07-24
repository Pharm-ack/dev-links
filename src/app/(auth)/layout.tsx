import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#fafafa]">
      <Toaster position="top-right" />
      {children}
    </div>
  );
}
