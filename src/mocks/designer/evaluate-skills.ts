import { http, HttpResponse, delay } from "msw";
import { baseURL } from "../baseURL";

export const evaluateSkillsHandler = [
  http.post(baseURL("document-designer/evaluate-skills"), async () => {
    await delay(1000);
    return HttpResponse.json({
      id: 2,
      type: "evaluate-skills",
      status: "ongoing",
    });
  }),
];
