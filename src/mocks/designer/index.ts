import { conceptsHandler } from "./concepts";
import { descriptionHandler } from "./description";
import { evaluateSkillsHandler } from "./evaluate-skills";
import { importScriptHandler } from "./import-script";
import { knowledgeObjectsHandler } from "./knowledge-objects";
import { learningObjectivesHandler } from "./learning-objectives";
import { requestsHandler } from "./requests";
import { reviewQuestionsHandler } from "./review-questions";
import { reviewScriptsHandler } from "./review-scripts";
import { skillsHandler } from "./skills";

export const designerHandlers = [
  ...importScriptHandler,
  ...descriptionHandler,
  ...conceptsHandler,
  ...skillsHandler,
  ...learningObjectivesHandler,
  ...knowledgeObjectsHandler,
  ...evaluateSkillsHandler,
  ...reviewScriptsHandler,
  ...reviewQuestionsHandler,
  ...requestsHandler,
];
