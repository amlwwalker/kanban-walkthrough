export function total(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function priceCart(items) {
  const subtotal = total(items);
  const discountRate = subtotal > 5000 ? 0.05 : 0;
  const discount = Math.floor(subtotal * discountRate);
  return { subtotal, discountRate, total: subtotal - discount };
}
