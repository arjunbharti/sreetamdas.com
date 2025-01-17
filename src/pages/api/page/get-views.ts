import { captureException } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

import { getSupabaseClient } from "@/domains/Supabase";
import type { ErrorResponse, SuccessResponse } from "@/domains/api";

type GetViewsSuccessResponse = SuccessResponse<{
	view_count: number;
	message?: string;
}>;

type GetViewsErrorResponse = ErrorResponse;

type GetViewsResponse = GetViewsSuccessResponse | GetViewsErrorResponse;

/**
 * @api {post} /api/page/get-views Get view_count for page using Supabase client
 */
async function handler(req: NextApiRequest, res: NextApiResponse<GetViewsResponse>) {
	const { enabled: supabaseEnabled, supabaseClient } = getSupabaseClient();

	if (!supabaseEnabled) {
		res.status(400).json({ error: "Supabase is not intialised" });
	} else {
		if (req.method === "GET") {
			const { slug } = req.query;

			if (typeof slug === "undefined") {
				res.status(400).json({
					error: "Missing slug",
				});
				return;
			}

			// TODO: Add support for multiple slugs
			if (Array.isArray(slug)) {
				res.status(200).send({ view_count: 1, message: "This isn't supported yet, nice try!" });
			}
			// TODO: Add support for getting all/multiple slug views
			else {
				const { data, error } = await supabaseClient
					.from("page_details")
					.select("view_count")
					.eq("slug", slug)
					.limit(1)
					.single();

				if (error) {
					captureException(error);
					res.status(500).json({ error });
				} else {
					const { view_count } = data;
					res.status(200).json({ view_count });
				}
			}
		} else {
			res.status(400).json({ error: "Bad request" });
		}
	}
}

export default handler;

export const config = {
	api: {
		externalResolver: true,
	},
};
