export function total(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function priceCart(items) {
  const subtotal = total(items);
  return { subtotal, discountRate: 0, total: subtotal };
}
