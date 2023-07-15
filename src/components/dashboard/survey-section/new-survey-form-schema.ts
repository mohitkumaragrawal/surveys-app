import { z } from "zod";

const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string(),
});

export default formSchema;
