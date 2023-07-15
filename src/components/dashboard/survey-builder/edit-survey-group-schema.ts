import { z } from "zod";

const editSurveyGroupSchema = z.object({
  surveyGroupId: z.string(),
  title: z.string().min(1),
  description: z.string(),
});

export default editSurveyGroupSchema;
