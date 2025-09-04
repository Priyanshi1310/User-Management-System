"use client";
import "./globals.css";
import QueryProvider from "../components/QueryProvider";
import ThemeWrapper from "../components/ThemeWrapper";
import { useUserStore } from "../store/userStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkMode } = useUserStore();
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <QueryProvider>
        <body
          className={`bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white`}
        >
          <ThemeWrapper>{children}</ThemeWrapper>
        </body>
      </QueryProvider>
    </html>
  );
}
