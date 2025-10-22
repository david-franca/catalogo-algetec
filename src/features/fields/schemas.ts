import { z } from "zod";

/**
 * 1. Schema para a entidade 'Tag' e seu tipo inferido.
 */
const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  language: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
type Tag = z.infer<typeof tagSchema>;

/**
 * 2. Defina a ESTRUTURA RECURSIVA como um tipo TypeScript primeiro.
 * A interface 'Experiment' se refere a si mesma no campo 'experiments'.
 */
interface Experiment {
  field_id: number;
  name: string;
  description: string | null;
  image: string | null;
  test: string | null;
  web: boolean;
  pt: boolean;
  en: boolean;
  es: boolean;
  android: boolean;
  ios: boolean;
  status: number;
  created_at: string;
  updated_at: string;
  approved: boolean;
  id: string;
  original_experiment_id: string | null;
  experiments?: Experiment[]; // A parte recursiva
  tags: Tag[];
}

/**
 * 3. Agora, crie o schema Zod, ANOTANDO explicitamente com o tipo.
 * A anotação `z.ZodType<Experiment>` informa ao TypeScript qual será a "forma" final
 * do schema, resolvendo a referência circular.
 */
const experimentSchema: z.ZodType<Experiment> = z.lazy(() =>
  z.object({
    field_id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    image: z.string().nullable(),
    test: z.string().nullable(),
    web: z.boolean(),
    pt: z.boolean(),
    en: z.boolean(),
    es: z.boolean(),
    android: z.boolean(),
    ios: z.boolean(),
    status: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    approved: z.boolean(),
    id: z.string(),
    original_experiment_id: z.string().nullable(),
    experiments: z.array(experimentSchema).optional(), // A recursão agora é segura
    tags: z.array(tagSchema),
  })
);

/**
 * 4. O restante do schema continua o mesmo.
 */
const categorySchema = z.object({
  id: z.number(),
  category: z.string(),
  name: z.string(),
  language: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  experiments: z.array(experimentSchema).optional(),
});

/**
 * 5. Schema final exportado.
 */
export const FieldSchema = z.array(categorySchema);

// Os tipos agora podem ser exportados diretamente ou inferidos novamente
export type { Experiment, Tag };
export type Category = z.infer<typeof categorySchema>;
