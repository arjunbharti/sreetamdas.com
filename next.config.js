/* eslint-disable @typescript-eslint/no-var-requires */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { withSentryConfig } from "@sentry/nextjs";
import { withPlausibleProxy } from "next-plausible";

process.env.SITE_URL = process.env.SITE_URL || process.env.VERCEL_URL || "https://sreetamdas.com";
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
						value: "/foobar/headers", // Matched parameters can be used in the value
					},
				],
			},
		];
	},
});

const sentryWebpackPluginOptions = {
	// Additional config options for the Sentry Webpack plugin. Keep in mind that
	// the following options are set automatically, and overriding them is not
	// recommended:
	//   release, url, org, project, authToken, configFile, stripPrefix,
	//   urlPrefix, include, ignore

	silent: true, // Suppresses all logs
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default withSentryConfig(moduleExports, sentryWebpackPluginOptions);
