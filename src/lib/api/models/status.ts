import z from "zod";

export const StatusSchema = z.enum(["idle", "loading", "error"]).default("idle")
export type Status = z.infer<typeof StatusSchema>;