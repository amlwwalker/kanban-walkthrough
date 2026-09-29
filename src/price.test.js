import { expect, test } from "vitest";
import { total } from "./price.js";

test("multiplies price by quantity and sums", () => {
  expect(total([{ price: 500, qty: 2 }, { price: 250, qty: 1 }])).toBe(1250);
});
