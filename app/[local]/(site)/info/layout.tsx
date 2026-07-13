export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="min-h-full flex flex-col max-w-dvw w-[60dvw] overflow-x-hidden justify-center items-center">{children}</div>;
}
