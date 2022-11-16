import { Inter } from "@next/font/google";
import localFont from "@next/font/local";
import PlausibleProvider from "next-plausible";
import { Toaster } from "react-hot-toast";

import { RootStyleRegistry } from "./Providers";

import { FOOBAR_SOURCE_COMMENT } from "@/components/foobar";
import { blockingSetInitialColorMode } from "@/domains/style/darkmode";
import { toasterProps } from "@/styles";

if (process.env.NEXT_PUBLIC_API_MOCKING_ENABLED === "true") {
	require("mocks");
}

// type ThemeObjectInitial = Pick<StyledThemeObject, "themeType" | "theme">;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	// const initialTheme = getInitialColorMode()!;

	// const [queryClient] = useState(() => new QueryClient());
	// const [themeObject, setThemeObject] = useState<ThemeObjectInitial>({
	// 	themeType: initialTheme,
	// 	theme: theme[initialTheme],
	// });
	// function changeThemeVariant(themeType: StyledThemeObject["themeType"]) {
	// 	setThemeObject((prevState) => ({ ...prevState, themeType, theme: theme[themeType] }));
	// }
	// const themeForContext: StyledThemeObject = {
	// 	...themeObject,
	// 	changeThemeVariant,
	// };

	return (
		<html lang="en" className={`${interFont.variable} ${iosevkaFont.variable}`}>
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
				{/* <div
					dangerouslySetInnerHTML={{
						__html: FOOBAR_SOURCE_COMMENT,
					}}
				></div> */}

				<PlausibleProvider
					domain="sreetamdas.com"
					customDomain="sreetamdas.com"
					trackOutboundLinks
					trackFileDownloads
				>
					{/* <Toaster {...toasterProps} /> */}
					<RootStyleRegistry>{children}</RootStyleRegistry>
				</PlausibleProvider>
			</body>
		</html>
	);
}

const interFont = Inter({
	variable: "--font-inter",
});
const iosevkaFont = localFont({
	variable: "--font-iosevka",
	src: [
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-thin.woff2",
			weight: "100",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-thinitalic.woff2",
			weight: "100",
			style: "italic",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-extralight.woff2",
			weight: "200",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-extralightitalic.woff2",
			weight: "200",
			style: "italic",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-lightitalic.woff2",
			weight: "300",
			style: "italic",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-italic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-mediumitalic.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-semibold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-semibolditalic.woff2",
			weight: "600",
			style: "italic",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-bolditalic.woff2",
			weight: "700",
			style: "italic",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-extrabold.woff2",
			weight: "800",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-extrabolditalic.woff2",
			weight: "800",
			style: "italic",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-heavy.woff2",
			weight: "900",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/woff2/iosevka-heavyitalic.woff2",
			weight: "900",
			style: "italic",
		},
	],
});
