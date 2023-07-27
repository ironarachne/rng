import { describe, expect, jest, test } from "@jest/globals";
import { simple } from "../src/index";

jest.useFakeTimers();

describe("simple", () => {
  test("should return a number", () => {
    expect(simple(10)).toEqual(expect.any(Number));
  });
});
