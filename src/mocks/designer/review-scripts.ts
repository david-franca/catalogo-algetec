import { http, HttpResponse, delay } from "msw";
import { baseURL } from "../baseURL";

export const reviewScriptsHandler = [
  http.post(baseURL("document-designer/async/review-scripts"), async () => {
    await delay(1000);
    return HttpResponse.json({
      id: 3,
      type: "review-script",
      status: "ongoing",
    });
  }),
];
