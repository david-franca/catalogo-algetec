import { http, HttpResponse, delay } from "msw";
import { baseURL } from "../baseURL";

export const reviewQuestionsHandler = [
  http.post(baseURL("document-designer/async/review-questions"), async () => {
    await delay(1000);
    return HttpResponse.json({
      id: 4,
      type: "review-question",
      status: "ongoing",
    });
  }),
];
