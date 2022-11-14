import { Inter } from "@next/font/google";
import localFont from "@next/font/local";

import RootStyleRegistry from "./RootStyleRegistry";

import { FOOBAR_SOURCE_COMMENT } from "@/components/foobar";
import { blockingSetInitialColorMode } from "@/domains/style/darkmode";

const inter = Inter({
	variable: "--font-inter",
});
const iosevkaFont = localFont({
	src: [
		{
			path: "/fonts/iosevka/woff2/iosevka-thin.woff2",
			weight: "100",
			style: "normal",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-thinitalic.woff2",
			weight: "100",
			style: "italic",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-extralight.woff2",
			weight: "200",
			style: "normal",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-extralightitalic.woff2",
			weight: "200",
			style: "italic",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-lightitalic.woff2",
			weight: "300",
			style: "italic",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-italic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-mediumitalic.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-semibold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-semibolditalic.woff2",
			weight: "600",
			style: "italic",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-bolditalic.woff2",
			weight: "700",
			style: "italic",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-extrabold.woff2",
			weight: "800",
			style: "normal",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-extrabolditalic.woff2",
			weight: "800",
			style: "italic",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-heavy.woff2",
			weight: "900",
			style: "normal",
		},
		{
			path: "/fonts/iosevka/woff2/iosevka-heavyitalic.woff2",
			weight: "900",
			style: "italic",
		},
	],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={inter.variable}>
			<link rel="icon" href="/favicon.png" />
			<meta name="apple-mobile-web-app-title" content="Sreetam Das' Blog" />
			<meta name="apple-mobile-web-app-status-bar-style" content="default" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="mobile-web-app-capable" content="yes" />

			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: blockingSetInitialColorMode,
					}}
				></script>
				<div
					dangerouslySetInnerHTML={{
						__html: FOOBAR_SOURCE_COMMENT,
					}}
				></div>
				<RootStyleRegistry>{children}</RootStyleRegistry>
			</body>
		</html>
	);
}
