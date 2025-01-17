import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

import { UnstyledLink } from "@/styles/typography";
import { breakpoint, focusVisible } from "@/utils/style";

export const BlogPostContentWrapper = styled.div`
	padding: 30px 0;
`;

export const WarningSpan = styled.span`
	padding: 5px 10px;
	margin: 0 15px 0 0;
	background-color: red;
	color: white;
	border-radius: var(--border-radius);
	text-transform: uppercase;
`;

export const PostNotPublishedWarning = () => <WarningSpan>Unpublished</WarningSpan>;

export const PostMetaDataGrid = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 0.5rem;
	justify-content: center;
	align-items: center;
`;

export const StyledPre = styled.pre`
	background-color: var(--color-inlineCode-bg);
	margin: 0;
	padding: 15px;
	border-radius: var(--border-radius);
	font-size: 14px;
	max-width: var(--max-width);
	overflow-x: scroll;
`;

export const LinkedIcon = styled(UnstyledLink)<{ $styledOnHover?: boolean }>`
	font-size: 25px;
	background-color: transparent;
	border: none;
	cursor: pointer;

	display: flex;
	align-items: center;
	gap: 0.3rem;

	${({ $styledOnHover }) =>
		$styledOnHover
			? css`
					color: var(--color-primary);
					:hover {
						color: var(--color-primary-accent);
					}
			  `
			: css`
					color: var(--color-primary-accent);
			  `}

	& > span {
		display: inline-block;
		vertical-align: middle;
		font-size: 0.7rem;
		line-height: 1rem;
	}
`;

export const LinkedHeaderIconWrapper = styled(UnstyledLink)<{ $isHovered: boolean }>`
	color: var(--color-primary-accent);
	position: absolute;
	transform: translateX(-125%) translateY(0.2rem);
	font-size: inherit;

	opacity: ${({ $isHovered }) => ($isHovered ? 0.75 : 0)};
	transition: opacity 200ms ease;

	${breakpoint.until.md(css`
		display: none;
	`)}

	${focusVisible(css`
		opacity: 0.75;
	`)}
`;

export const CustomBlockquote = styled.aside<{ type?: string }>`
	padding: 20px 20px 20px 40px;
	margin: 20px -20px 20px -45px;
	border-radius: var(--border-radius);
	border-left: 5px solid;

	${({ type }) =>
		type
			? css`
					background-color: var(--color-${type}-accent-faded);
					border-color: var(--color-${type}-accent);
			  `
			: css`
					background-color: var(--color-info-accent-faded);
					border-color: var(--color-info-accent);
			  `}
`;

export const Highlight = styled.span`
	color: var(--color-primary-accent);
	font-style: italic;
	font-weight: bold;
`;

const EndLinksGrid = styled.div`
	padding-top: 15px;
	display: grid;
	grid-auto-flow: column;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	color: var(--color-primary-accent);

	& * {
		cursor: pointer;
	}
`;

export const EndLinks = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
	<EndLinksGrid>{children}</EndLinksGrid>
);
