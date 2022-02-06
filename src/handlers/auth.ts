import { rest } from "msw";
import { nanoid } from "nanoid";
import { API_URL } from "@/config";
import { delayedResponse } from "@/utils/msw";
import { db } from "@/db";

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
  rest.post<RegisterBody>(`${API_URL}/auth/register`, (req, res, ctx) => {
    try {
      const userObject = req.body;

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingUser) {
        throw new Error("The user already exists");
      }

      db.user.create({
        ...userObject,
        id: nanoid(),
        createdAt: Date.now(),
        password: "foo",
      });

      const result = {
        user: "foo",
        token: "foo",
      };

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error.message }));
    }
  }),

  rest.post<LoginBody, LoginResponse>(`${API_URL}/auth/login`, (req, res, ctx) => {
    try {
      const { username } = req.body;
      return res(
        ctx.json({
          username,
        }),
      );
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error.message }));
    }
  }),

  rest.post("/logout", (_req, res, ctx) => {
    return res(ctx.json({ message: "logged out" }));
  }),
];
