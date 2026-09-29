export function total(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function priceCart(items) {
  const subtotal = total(items);
  const discountRate = subtotal > 10000 ? 0.1 : subtotal > 5000 ? 0.05 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  return { subtotal, discountRate, discountAmount, total: subtotal - discountAmount };
}
