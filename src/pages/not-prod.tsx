import { GetStaticProps } from "next";

import { DocumentHead } from "@/components/shared/seo";
import { IS_DEV } from "@/config";
import { LiveViewsCounter } from "@/domains/Workers/LiveViewsCounter";
import { Center } from "@/styles/layouts";
import { Paragraph, Title } from "@/styles/typography";

const Index = () => (
	<>
		<DocumentHead title="Dev" />
		<Center>
			<Title $size={5} $codeFont>
				/dev
			</Title>
			<Paragraph>A non-Prod environment.</Paragraph>
			<LiveViewsCounter />
		</Center>
	</>
);

export const getStaticProps: GetStaticProps = () => {
	if (IS_DEV) return { props: {} };
	return { notFound: true };
};

export default Index;
