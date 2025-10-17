import { http, HttpResponse, delay } from "msw";
import { baseURL } from "../baseURL";
import response from "./response.json";

const maxFailures = Math.floor(Math.random() * 9) + 1; // Número aleatório entre 1 e 9
let requestCount = 0;

export const requestsHandler = [
  http.get(baseURL("document-designer/requests/:id"), async ({ params }) => {
    const id = params.id as keyof typeof response;

    if (requestCount++ < maxFailures) {
      return HttpResponse.error();
    }

    await delay(1000);
    return HttpResponse.json(response[id]);
  }),
];
