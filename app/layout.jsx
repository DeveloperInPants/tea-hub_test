import "./globals.css";

export const metadata = {
  title: "Tea Master HUB",
  description: "Образовательная платформа для чайных мастеров",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
