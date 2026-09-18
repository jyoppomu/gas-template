import {describe, expect, it, vi} from "vitest";

import functions from "../src/functions";

vi.stubGlobal("Logger", {
  log: vi.fn(),
  clear: vi.fn(),
  getLog: vi.fn(),
});

describe("functions", () => {
  describe("main", () => {
    it("Logging the message", () => {
      functions.main();
      expect(Logger.log).toHaveBeenCalledWith("Hello, World!");
    });
  });
});
