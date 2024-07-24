import { DashboardNavigation } from "@/components/dashboard-navigation";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#EEEEEE] flex flex-col items-center min-h-screen">
      <div className="flex w-full flex-col sm:max-w-7xl mx-auto md:px-2 sm:px-4 lg:px-6">
        <header className="sm:mt-3 flex px-2 h-16 items-center justify-between bg-white rounded-md">
          <DashboardNavigation />
        </header>
        <main className="bg-[#EEEEEE]">
          <Toaster position="top-right" />
          {children}
        </main>
      </div>
    </div>
  );
}
