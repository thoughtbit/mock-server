import { factory, primaryKey } from "@mswjs/data";

const models = {
  user: {
    id: primaryKey(String),
    username: String,
    email: String,
    password: String,
    createdAt: Number,
  },
  comment: {
    id: primaryKey(String),
    body: String,
    authorId: String,
    discussionId: String,
    createdAt: Number,
  },
};

export const db = factory(models);
export type Model = keyof typeof db;
