import { z } from "zod";

const questionSchema = z.object({
  title: z.string().nonempty(),
  description: z.string(),
  type: z.enum(["text", "number", "date", "radio", "checkbox"]),
  required: z.boolean(),
});

export type QuestionSchema = z.infer<typeof questionSchema>;

export default questionSchema;
