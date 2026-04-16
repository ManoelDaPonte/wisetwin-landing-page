export default function CmsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning>
			<body id="outstatic">{children}</body>
		</html>
	);
}
