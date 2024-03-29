import { Toaster } from "react-hot-toast";

import { Footer } from "@/components/footer";
import { Sidebar } from "@/components/sidebar/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative flex flex-1 flex-row">
        <Sidebar />
        <div className="ml-80 flex flex-grow flex-col overflow-x-hidden border-l">
          <main className="flex-grow px-12 py-16">{children}</main>
          <Footer />
        </div>
      </div>
      <Toaster />
    </>
  );
}
