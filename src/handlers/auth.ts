import { rest } from "msw";
import { nanoid } from "nanoid";
import { API_URL } from "@/config";
import { delayedResponse } from "@/utils/msw";
import { logger } from "@/utils/logger";

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  teamId?: string;
  teamName?: string;
};

type LoginBody = {
  username: string;
  email: string;
  password: string;
};

type LoginResponse = {
  username: string;
};

export const authHandlers = [
  rest.post<RegisterBody>(`${API_URL}/auth/register`, async (req, _, ctx) => {
    try {
      const userObject = req.body;
      const existingUser = db.getCollection("users").findOne({ email: { $eq: userObject.email } });
      if (existingUser) {
        throw new Error("此用户已经存在了");
      }
      const result = db.getCollection("users").insert({
        ...userObject,
        user_id: nanoid(),
        createdAt: Date.now(),
        password: "foo",
        token: "foo",
      });
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({
          code: 0,
          msg: error.message,
        }),
      );
    }
  }),

  rest.post<LoginBody, LoginResponse>(`${API_URL}/auth/login`, (req, res, ctx) => {
    try {
      const { username, password } = req.body;
      logger.info(`登录: ${username}`);
      if (!username) {
        return res(ctx.json({ code: 0, msg: "用户名不能为空" }));
      }
      if (!password) {
        return res(ctx.json({ code: 0, msg: "密码不能为空" }));
      }
      if (username === "admin" && password === "admin") {
        return res(
          ctx.json({
            code: 0,
            msg: "登录成功",
            data: {
              username,
            },
          }),
        );
      }

      return res(ctx.json({ code: 0, msg: "账号或者密码错误" }));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error.message }));
    }
  }),

  rest.post(`${API_URL}/auth/logout`, (_req, res, ctx) => {
    return res(ctx.json({ code: 0, msg: "logged out" }));
  }),
];
