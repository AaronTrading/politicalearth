"use client";

import type { News as PrismaNews } from "@/generated/prisma";

import { motion } from "framer-motion";

export type News = Pick<
  PrismaNews,
  "id" | "title" | "category" | "date" | "content"
>;

type NewsCardProps = {
  article: News;
  index: number;
};

export const NewsCard = ({ article, index }: NewsCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
          {article.category}
        </span>
        <time className="text-gray-500 text-sm" dateTime={article.date}>
          {article.date}
        </time>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
        {article.title}
      </h2>

      <p className="text-gray-700 leading-relaxed">{article.content}</p>
    </motion.article>
  );
};
