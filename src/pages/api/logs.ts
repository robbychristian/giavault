import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../lib/database";
import { ERROR_TYPES } from "../../../typedefs/errors";
import type { NextRequest } from "next/server";
import { withAuth } from "../../../lib/guard";
import { getLogs, searchLogs } from "../../../lib/logging";
import { Query } from "../../../typedefs/query";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case "POST":
      return res.status(400).json({ success: false });
    case "GET":
      const query: unknown = req.query;
      const data = await searchLogs(query as Query);
      return res.status(200).json({ data });
    case "PATCH":
      return res.status(405).json({ error: ERROR_TYPES.METHOD_NOT_ALLOWED });
    default:
      return res.status(405).json({ error: ERROR_TYPES.METHOD_NOT_ALLOWED });
  }
}

export default withAuth(connectMongo(handler));
