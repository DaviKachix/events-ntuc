export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>

        {/* Tailwind CDN (must load first) */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* Tailwind config (MUST be before any usage) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      primary: '#10b981',
                      denim: '#1e3a8a',
                      muted: '#64748b'
                    }
                  }
                }
              }
            `,
          }}
        />

        {/* Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome (stable CDN usage) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />

      </head>

      <body className="bg-gray-50 text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}