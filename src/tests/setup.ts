import "@testing-library/jest-dom";

import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "@/mocks/node";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Start server before all tests
beforeAll(() => {
  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterAll(() => {
  server.close();
});

// Reset any request handlers that are declared as a part of our tests
afterEach(() => {
  server.resetHandlers();
});
