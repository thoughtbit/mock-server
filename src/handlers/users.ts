import { rest } from "msw";
import { nanoid } from "nanoid";
import { API_URL } from "@/config";
import { delayedResponse } from "@/utils/msw";
import { db } from "@/db";

type ProfileBody = {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
};

export const usersHandlers = [
  rest.get(`${API_URL}/users`, (req, res, ctx) => {
    try {
      const result = db.user.findFirst({
        where: {
          id: {
            equals: "1",
          },
        },
      });
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.patch<ProfileBody>(`${API_URL}/users/profile`, (req, res, ctx) => {
    try {
      const data = req.body;
      const result = db.user.update({
        where: {
          id: {
            equals: "1",
          },
        },
        data,
      });
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error.message }));
    }
  }),

  rest.delete(`${API_URL}/users/:userId`, (req, res, ctx) => {
    try {
      const { userId } = req.params;
      const result = db.user.delete({
        where: {
          id: {
            equals: `${userId}`,
          },
        },
      });
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error.message }));
    }
  }),
];
