import z from "zod";

export const createRequestSchema = z.object({
  requestType: z.string().nonempty("Please select a request type"),
  semester: z.string().nonempty("Please select a semester"),
  subject: z.string().nonempty("Please select a subject"),
  unit: z.string().nonempty("Please select a unit"),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>;
