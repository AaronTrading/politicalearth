import { z } from "zod";

// Schéma pour les paramètres d'ID
export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a valid number").transform(Number),
});

// Schéma pour les actualités
export const newsCreateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be less than 50 characters"),
  date: z
    .string()
    .min(1, "Date is required")
    .max(50, "Date must be less than 50 characters"),
  imageUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || z.string().url().safeParse(val).success,
      {
        message: "Invalid URL format",
      }
    ),
});

export const newsUpdateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters")
    .optional(),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be less than 50 characters")
    .optional(),
  date: z
    .string()
    .min(1, "Date is required")
    .max(50, "Date must be less than 50 characters")
    .optional(),
  imageUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || z.string().url().safeParse(val).success,
      {
        message: "Invalid URL format",
      }
    ),
});

// Schéma pour les classements militaires
export const militaryRankingUpdateSchema = z.object({
  rank: z
    .number()
    .int()
    .min(1, "Rank must be at least 1")
    .max(999, "Rank must be less than 1000")
    .optional(),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country name must be less than 100 characters")
    .optional(),
  flag: z
    .string()
    .min(1, "Flag is required")
    .max(10, "Flag must be less than 10 characters")
    .optional(),
  power: z
    .number()
    .min(0, "Power must be positive")
    .max(999.99, "Power must be less than 1000")
    .optional(),
  budget: z
    .string()
    .min(1, "Budget is required")
    .max(50, "Budget must be less than 50 characters")
    .optional(),
  forces: z
    .string()
    .min(1, "Forces is required")
    .max(50, "Forces must be less than 50 characters")
    .optional(),
});

// Schéma pour les classements économiques
export const economicRankingUpdateSchema = z.object({
  rank: z
    .number()
    .int()
    .min(1, "Rank must be at least 1")
    .max(999, "Rank must be less than 1000")
    .optional(),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country name must be less than 100 characters")
    .optional(),
  flag: z
    .string()
    .min(1, "Flag is required")
    .max(10, "Flag must be less than 10 characters")
    .optional(),
  gdp: z
    .string()
    .min(1, "GDP is required")
    .max(50, "GDP must be less than 50 characters")
    .optional(),
  growth: z
    .string()
    .min(1, "Growth is required")
    .max(50, "Growth must be less than 50 characters")
    .optional(),
  trade: z
    .string()
    .min(1, "Trade is required")
    .max(50, "Trade must be less than 50 characters")
    .optional(),
});

// Schéma pour la date de jeu
export const gameDateUpdateSchema = z.object({
  date: z
    .string()
    .min(1, "Date is required")
    .max(100, "Date must be less than 100 characters"),
});
