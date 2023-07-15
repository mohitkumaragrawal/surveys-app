import { z } from "zod";

const newSurveyGroupSchema = z.object({
  title: z.string(),
  description: z.string(),
  surveyId: z.string(),
});

export default newSurveyGroupSchema;
