import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().default(''),
    linkedin: z.union([z.string().url(), z.literal('')]).optional(),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    header: z.string().optional(),
  }),
});

export const collections = { articulos };
