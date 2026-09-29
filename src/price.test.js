import { expect, test, vi } from "vitest";
import { priceCart, total } from "./price.js";

test("multiplies price by quantity and sums", () => {
  expect(total([{ price: 500, qty: 2 }, { price: 250, qty: 1 }])).toBe(1250);
});

test("a subtotal of exactly 5000 prices with rate 0 and total equal to subtotal", () => {
  const result = priceCart([{ price: 2500, qty: 2 }]);
  expect(result.subtotal).toBe(5000);
  expect(result.discountRate).toBe(0);
  expect(result.total).toBe(5000);
});

test("a subtotal below 5000 prices with no discount", () => {
  const result = priceCart([{ price: 400, qty: 3 }]);
  expect(result.subtotal).toBe(1200);
  expect(result.discountRate).toBe(0);
  expect(result.total).toBe(1200);
});

test("a subtotal of 5001 gets 5% off the whole subtotal", () => {
  const result = priceCart([{ price: 5001, qty: 1 }]);
  expect(result.discountRate).toBe(0.05);
  expect(result.total).toBe(4751);
});

test("a subtotal of exactly 10000 gets 5%, not 10%", () => {
  const result = priceCart([{ price: 5000, qty: 2 }]);
  expect(result.discountRate).toBe(0.05);
  expect(result.total).toBe(9500);
});

test("a subtotal of 10001 gets 10% off the whole subtotal, replacing the 5% tier", () => {
  const result = priceCart([{ price: 10001, qty: 1 }]);
  expect(result.discountRate).toBe(0.1);
  expect(result.total).toBe(9001);
});

test("a subtotal of 20000 totals 18000, not 17100: tiers replace, they never stack", () => {
  const result = priceCart([{ price: 10000, qty: 2 }]);
  expect(result.discountRate).toBe(0.1);
  expect(result.total).toBe(18000);
});

test("priceCart returns subtotal, discountRate, discountAmount and total, and they reconcile", () => {
  const result = priceCart([{ price: 4000, qty: 2 }]);
  expect(result).toEqual({
    subtotal: 8000,
    discountRate: 0.05,
    discountAmount: 400,
    total: 7600,
  });
  expect(result.subtotal - result.discountAmount).toBe(result.total);
});

test("a fractional discount rounds half up to a whole minor unit: subtotal 5010 gives discountAmount 251 and total 4759", () => {
  const result = priceCart([{ price: 1670, qty: 3 }]);
  expect(result.discountAmount).toBe(251);
  expect(result.total).toBe(4759);
});

test("the discount line is logged only when a tier applies", () => {
  const spy = vi.spyOn(console, "log").mockImplementation(() => {});
  try {
    priceCart([{ price: 6000, qty: 1 }]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("[Pricing]", "discount applied", {
      subtotal: 6000,
      rate: 0.05,
      total: 5700,
    });

    spy.mockClear();
    priceCart([{ price: 1000, qty: 1 }]);
    expect(spy).not.toHaveBeenCalled();
  } finally {
    spy.mockRestore();
  }
});
