import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { ERROR_TYPES } from "@typedefs/errors";
import { JWTParse, JWTServerValidator, JWTVerify } from "@libs/jwt";

/*
Future support will include userAgent please see: https://nextjs.org/docs/api-reference/next/server#useragent
*/

function getToken(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return null;
  }

  return token;
}

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    // console.log("IP", ip);
    // console.log("req", req.method, req.url);
    // JWTServerValidator(req, res);
    const token = getToken(req)!;
    if (token) {
      const parsedToken = JWTParse(getToken(req)!);
      console.log("parsedToken", parsedToken);
    }
    // if (!token && !parsedToken) {
    //   return res.status(401).json({ error: ERROR_TYPES.UNAUTHORIZED });
    // }

    // Here, you could validate the token and/or check if the user has the required permissions.
    // For this example, we'll just log the token to the console.
    console.log("Bearer token:", token);

    await handler(req, res);
  };
}
