import type { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "../../../helper/objects";
import { LoginApi, RegisterApi } from "../../../helper/user";
import connectMongo from "../../../lib/database";
import { ERROR_TYPES } from "../../../typedefs/errors";
import { User } from "../../../typedefs/user";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case "POST":
      // registration
      const user: User = req.body;
      if (isEmpty(user)) res.status(400).json({ success: false, error: "Empty Field Detected" });
      if (!user) res.status(400).json({ success: false });
      const { status, code } = await RegisterApi(user);
      if (status) return res.status(201).json({ success: true });
      return res.status(400).json({ success: false, error: code === 11000 ? "User already registered" : "Unknown error" });
    case "GET":
      // login
      const creds: Partial<User> = req.query;
      const jwtToken = await LoginApi(creds);
      if (!jwtToken) return res.status(401).json({ error: ERROR_TYPES.UNAUTHORIZED });
      return res.status(200).json({ token: jwtToken });
    case "PATCH":
      return res.status(405).json({ error: ERROR_TYPES.METHOD_NOT_ALLOWED });
    default:
      return res.status(405).json({ error: ERROR_TYPES.METHOD_NOT_ALLOWED });
  }
}

export default connectMongo(handler);
