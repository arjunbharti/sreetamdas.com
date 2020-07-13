import styled from "styled-components";

export const BlogPostsPreviewLayout = styled.div`
	display: grid;
	grid-gap: 1rem;
`;

export const Layout = styled.div`
	max-width: 600px;
	width: 100%;
`;

export const Center = styled.div`
	display: grid;
	padding: 0 20px;
	justify-items: center;
`;

export const MDXText = styled.div`
	line-height: 1.4;
	margin: 0; /* thanks @mxstbr! */
	padding: 15px 0;
`;

export const RemoveBulletsFromOL = styled.div`
	& ul {
		list-style: none;
		padding-left: 30px;
	}
	& ul li {
		padding: 5px;
	}
`;

export const PaddingListItems = styled.div`
	& ul li {
		padding: 5px;
	}
`;

export const ReallyBigTitle = styled.h1`
	font-size: 5rem;
`;

export const TextGradient = styled.span`
	font-weight: 900;
	background: linear-gradient(
		90deg,
		var(--color-primary-accent),
		rgba(106, 218, 251, 1) 100%
	);

	background-clip: text;
	-webkit-text-fill-color: transparent;
`;

export const Monospace = styled.span`
	font-family: SFMono-Regular, Consolas, Roboto Mono, Menlo, Monaco,
		Liberation Mono, Lucida Console, monospace;
`;