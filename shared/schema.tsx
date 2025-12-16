import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Dataset schema - represents uploaded CSV/JSON files
export const datasetSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["csv", "json"]),
  columns: z.array(z.object({
    name: z.string(),
    type: z.enum(["string", "number", "boolean", "date"]),
  })),
  data: z.array(z.record(z.any())),
  rowCount: z.number(),
  uploadedAt: z.string(),
});

export type Dataset = z.infer<typeof datasetSchema>;
export type DatasetColumn = Dataset["columns"][number];

export const insertDatasetSchema = datasetSchema.omit({ id: true, uploadedAt: true });
export type InsertDataset = z.infer<typeof insertDatasetSchema>;

// Query schema - saved queries with results
export const querySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  sql: z.string(),
  naturalLanguage: z.string().optional(),
  datasetId: z.string(),
  results: z.array(z.record(z.any())).optional(),
  executedAt: z.string(),
  executionTimeMs: z.number().optional(),
  isSaved: z.boolean().default(false),
});

export type Query = z.infer<typeof querySchema>;

export const insertQuerySchema = querySchema.omit({ id: true, executedAt: true });
export type InsertQuery = z.infer<typeof insertQuerySchema>;

// Visualization schema
export const visualizationSchema = z.object({
  id: z.string(),
  queryId: z.string(),
  type: z.enum(["bar", "line", "pie", "table"]),
  title: z.string().optional(),
  xAxis: z.string().optional(),
  yAxis: z.string().optional(),
  config: z.record(z.any()).optional(),
  createdAt: z.string(),
});

export type Visualization = z.infer<typeof visualizationSchema>;

export const insertVisualizationSchema = visualizationSchema.omit({ id: true, createdAt: true });
export type InsertVisualization = z.infer<typeof insertVisualizationSchema>;

// Share schema - shareable links for visualizations
export const shareSchema = z.object({
  id: z.string(),
  visualizationId: z.string(),
  shareToken: z.string(),
  isPublic: z.boolean().default(true),
  expiresAt: z.string().optional(),
  createdAt: z.string(),
});

export type Share = z.infer<typeof shareSchema>;

export const insertShareSchema = shareSchema.omit({ id: true, createdAt: true, shareToken: true });
export type InsertShare = z.infer<typeof insertShareSchema>;

// API Response types
export const translateQueryResponseSchema = z.object({
  sql: z.string(),
  explanation: z.string().optional(),
});

export type TranslateQueryResponse = z.infer<typeof translateQueryResponseSchema>;

export const executeQueryResponseSchema = z.object({
  results: z.array(z.record(z.any())),
  columns: z.array(z.string()),
  rowCount: z.number(),
  executionTimeMs: z.number(),
});

export type ExecuteQueryResponse = z.infer<typeof executeQueryResponseSchema>;
