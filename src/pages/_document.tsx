import Document, {
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript,
	DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

import { FOOBAR_SOURCE_COMMENT } from "@/components/foobar";
import { blockingSetInitialColorMode } from "@/domains/style/darkmode";

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: [initialProps.styles, sheet.getStyleElement()],
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/favicon.png" />
					<meta name="apple-mobile-web-app-title" content="Sreetam Das' Blog" />
					<meta name="apple-mobile-web-app-status-bar-style" content="default" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="mobile-web-app-capable" content="yes" />
				</Head>
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
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
