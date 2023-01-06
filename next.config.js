import { withSentryConfig } from "@sentry/nextjs";
import { withPlausibleProxy } from "next-plausible";

process.env.SITE_URL = process.env.SITE_URL || process.env.VERCEL_URL || "http://localhost:3000";
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

/** @type {import('next').NextConfig} */
const moduleExports = withPlausibleProxy()({
	experimental: {
		appDir: true,
	},
	compiler: {
		styledComponents: true,
	},
	sentry: {
		hideSourceMaps: false,
		tunnelRoute: "/tunnel/sentry",
		disableServerWebpackPlugin: SENTRY_DSN === "",
		disableClientWebpackPlugin: SENTRY_DSN === "",
	},
	pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
	env: {
		SITE_URL: process.env.SITE_URL,
		OWNER: process.env.OWNER,
	},
	images: {
		domains: ["avatars.githubusercontent.com", "i.imgur.com"],
	},

	async headers() {
		return [
			{
				source: "/foobar",
				headers: [
					{
						key: "x-foobar",
						value: "/foobar/headers",
					},
				],
			},
		];
	},
});

const sentryWebpackPluginOptions = {
	silent: true, // Suppresses all logs
};

export default withSentryConfig(moduleExports, sentryWebpackPluginOptions);
