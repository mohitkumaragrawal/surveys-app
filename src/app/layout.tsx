import "./globals.css";
import { Inter } from "next/font/google";
import { Layout } from "@/components/layout";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Surveys App",
  description: "Get feedback from your users",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
