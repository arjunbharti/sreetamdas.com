import Image from "next/image";
import styled from "styled-components";

import { DEFAULT_REPO, octokit } from "@/domains/GitHub";
import { ExternalLink, SmallText } from "@/styles/typography";

export async function getRepoContributors() {
	return (
		await octokit.request("GET /repos/{owner}/{repo}/contributors", DEFAULT_REPO)
	).data.filter(({ type }) => type !== "Bot");
}

const ContributorsWrapper = styled.div`
	display: flex;
	gap: 25px;
	flex-wrap: wrap;
`;
const ContributorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	align-items: center;
`;
const ContributorImage = styled.span`
	position: relative;
	display: block;
	border-radius: var(--border-radius, 50%);
	max-height: 128px;
	max-width: 128px;
	overflow: hidden;
`;
const ContributorLogin = styled(SmallText)``;

export type RepoContributorsProps = {
	contributors: Awaited<ReturnType<typeof getRepoContributors>>;
};
export const RepoContributors = ({ contributors }: RepoContributorsProps) => (
	<ContributorsWrapper>
		{contributors?.map(({ login, avatar_url, html_url }) => (
			<ExternalLink href={html_url} key={login}>
				<ContributorWrapper>
					{avatar_url ? (
						<ContributorImage>
							<Image src={avatar_url} alt={login} height={128} width={128} />
						</ContributorImage>
					) : null}
					<ContributorLogin>{login}</ContributorLogin>
				</ContributorWrapper>
			</ExternalLink>
		))}
	</ContributorsWrapper>
);
