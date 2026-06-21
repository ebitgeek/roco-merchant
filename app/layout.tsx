import type { Metadata } from "next";
import "./globals.css";
import 'animal-island-ui/style';

export const metadata: Metadata = {
  title: "洛克王国远行商人",
  description: "",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
    <body>

    <div
      className="
    min-h-screen
    flex
    justify-center
    bg-[#7dc395]
    bg-[url('/home_bg-CzHux1Sq.webp')]
    bg-repeat
  "
      style={{
        animation: "bgScroll 80s linear infinite",
      }}
    >
      {children}
    </div>
    </body>
    </html>
  );
}
