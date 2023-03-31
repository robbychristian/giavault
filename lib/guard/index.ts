import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { ERROR_TYPES } from "@typedefs/errors";
import { JWTParse, JWTServerValidator, JWTVerify } from "@libs/jwt";
import { User } from "@typedefs/user";
import { URLList } from "@constants/urls";
import { LogAction } from "@libs/logging";

/*
Future support will include userAgent please see: https://nextjs.org/docs/api-reference/next/server#useragent
*/

function getToken(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization;
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
    JWTServerValidator(req, res);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { method, url } = req;
    console.log("IP", ip);
    console.log("req", method, url);
    const token = getToken(req)!;
    if (token) {
      const { username, role, _id } = JWTParse(getToken(req)!);
      const queryStringIndex = url?.indexOf("?")!;
      const newUrl = queryStringIndex === -1 ? url : url?.substring(0, queryStringIndex + 1);
      const log = {
        username,
        role,
        IP: ip as string,
        method: method!,
        action: URLList[`${newUrl}`],
      };
      console.log("parsed Log", log);
      await LogAction(log);
    }

    await handler(req, res);
  };
}
