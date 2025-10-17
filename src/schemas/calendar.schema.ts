import { z } from "zod";

export const calendarSearchSchema = z.object({
  users: z.string().array().optional(),
  tags: z.string().array().optional(),
  department: z.string().optional(),
  dateStart: z.string().datetime().optional(),
  dateEnd: z.string().datetime().optional(),
});

export type CalendarSearch = z.infer<typeof calendarSearchSchema>;
