import z from "zod";

export const createContentSchema = z.object({
  semester: z.string().nonempty("Please select a semester"),
  subject: z.string().nonempty("Please select a subject"),
  unit: z.string().nonempty("Please select a unit"),
  files: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Please provide a file"
    ),
});

export type CreateContentInput = z.infer<typeof createContentSchema>;
