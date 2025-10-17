import { http, HttpResponse, delay } from "msw";
import { baseURL } from "../baseURL";

export const knowledgeObjectsHandler = [
  http.post(baseURL("document-designer/knowledge-objects"), async () => {
    await delay(1000);
    return HttpResponse.json({
      id: 1,
      type: "knowledge-objects",
      status: "ongoing",
    });
  }),
];
