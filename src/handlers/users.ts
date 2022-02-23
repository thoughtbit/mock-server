import { rest } from "msw";
import { nanoid } from "nanoid";
import { API_URL } from "@/config";
import { delayedResponse } from "@/utils/msw";

type ProfileBody = {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
};

export const usersHandlers = [
  rest.get(`${API_URL}/users`, (req, res, ctx) => {
    try {
      const result = db.getCollection("users").find();
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.patch<ProfileBody>(`${API_URL}/users/profile`, (req, res, ctx) => {
    try {
      const data = req.body;
      const result = {};
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error.message }));
    }
  }),

  rest.delete(`${API_URL}/users/:userId`, (req, res, ctx) => {
    try {
      const { userId } = req.params;
      const result = {};
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error.message }));
    }
  }),
];
