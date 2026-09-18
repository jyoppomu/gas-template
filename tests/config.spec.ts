import {beforeEach, describe, expect, it, vi} from "vitest";

import {loadProperties} from "../src/config";

let properties: Record<string, string> = {};
const getProperties = vi.fn(() => ({...properties}));

global.PropertiesService = {
  getScriptProperties: () => ({getProperties}),
} as unknown as typeof PropertiesService;

beforeEach(() => {
  properties = {
    STRING_PROPERTY: "hello",
    NUMBER_PROPERTY: "42",
    BOOLEAN_PROPERTY: "true",
  };
  getProperties.mockClear();
});

describe("config", () => {
  describe("loadProperties", () => {
    it("Returning the parsed properties", () => {
      expect(loadProperties()).toEqual({
        stringProperty: "hello",
        numberProperty: 42,
        booleanProperty: true,
      });
    });

    it("Reading the Script Properties in a single batch call", () => {
      loadProperties();
      expect(getProperties).toHaveBeenCalledTimes(1);
    });

    it("Trimming the surrounding whitespace", () => {
      properties.STRING_PROPERTY = "  hello  ";
      expect(loadProperties().stringProperty).toBe("hello");
    });

    it("Falling back to the default when the property is missing", () => {
      delete properties.BOOLEAN_PROPERTY;
      expect(loadProperties().booleanProperty).toBe(false);
    });

    it("Reporting the property as missing when it has no fallback", () => {
      delete properties.STRING_PROPERTY;
      expect(() => loadProperties()).toThrow(
        "Required property STRING_PROPERTY is missing."
      );
    });

    it("Treating a whitespace-only property as missing", () => {
      properties.NUMBER_PROPERTY = "   ";
      expect(() => loadProperties()).toThrow(
        "Required property NUMBER_PROPERTY is missing."
      );
    });

    it("Stopping at the first invalid property", () => {
      properties.NUMBER_PROPERTY = "abc";
      properties.BOOLEAN_PROPERTY = "yes";

      expect(() => loadProperties()).toThrow(
        'Property NUMBER_PROPERTY is invalid: invalid number: "abc"'
      );
    });

    it.each(["abc", "Infinity", "-Infinity", "1e400"])(
      "Rejecting the non-finite number %s",
      (value) => {
        properties.NUMBER_PROPERTY = value;
        expect(() => loadProperties()).toThrow(
          `Property NUMBER_PROPERTY is invalid: invalid number: "${value}"`
        );
      }
    );

    it.each([
      ["true", true],
      ["TRUE", true],
      ["1", true],
      ["false", false],
      ["FALSE", false],
      ["0", false],
    ])("Parsing the boolean %s", (value, expected) => {
      properties.BOOLEAN_PROPERTY = value;
      expect(loadProperties().booleanProperty).toBe(expected);
    });

    it("Rejecting the invalid boolean", () => {
      properties.BOOLEAN_PROPERTY = "yes";
      expect(() => loadProperties()).toThrow(
        'Property BOOLEAN_PROPERTY is invalid: invalid boolean: "yes"'
      );
    });
  });
});
