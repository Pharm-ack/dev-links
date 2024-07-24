import { Toaster } from "@/components/ui/sonner";

function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col sm:bg-[#fafafa] sm:relative">
      <Toaster position="top-right" />
      {children}
    </div>
  );
}

export default PreviewLayout;
