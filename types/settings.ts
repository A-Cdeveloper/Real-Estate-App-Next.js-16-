// @ts-expect-error - Settings type exists in Prisma Client, TypeScript cache issue
import type { Settings } from "@prisma/client";
import { ActionState } from "./action-state";

/**
 * Settings types - for application-wide configuration
 */

// Full Settings type (all fields)
export type CurrentSettings = Settings;

// Update Settings type (exclude auto-managed fields)
export type UpdateSettings = Omit<Settings, "id" | "createdAt" | "updatedAt">;

// Settings Action State for server actions
export type SettingsActionState<TData = unknown> = ActionState<
  TData,
  { settings?: CurrentSettings }
>;
