import { siteConfig } from "./site";
import { type CartItem, cartTotal } from "./cart-store";
import { formatINR } from "./utils";

/** Builds the structured order message and returns a wa.me deep link. */
export function buildOrderMessage(items: CartItem[]): string {
  const total = cartTotal(items);

  const lines: string[] = [];
  lines.push("Hello Madurai Spice Box,");
  lines.push("");
  lines.push("I would like to place an order.");
  lines.push("");
  lines.push("*Order Details:*");
  items.forEach((i, idx) => {
    lines.push(`${idx + 1}. ${i.name} (${i.weight})`);
    lines.push(`   Qty: ${i.qty}  |  Price: ${formatINR(i.price * i.qty)}`);
  });
  lines.push("");
  lines.push(`*Total: ${formatINR(total)}*`);
  lines.push("");
  lines.push("Please share the payment details. Thank you!");

  return lines.join("\n");
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

/** Convenience: order link from cart. */
export function orderLink(items: CartItem[]) {
  return whatsappLink(buildOrderMessage(items));
}

/** Generic enquiry / catalog link with a preset message. */
export function enquiryLink(message?: string) {
  const msg =
    message ??
    `Hello ${siteConfig.name}, I'd like to know more about your products and place an order.`;
  return whatsappLink(msg);
}

/** Single-product quick order link. */
export function productOrderLink(name: string, weight: string, price: number) {
  const msg = `Hello ${siteConfig.name}, I'm interested in ordering:\n\n*${name}* (${weight}) — ${formatINR(
    price
  )}\n\nPlease share the payment details.`;
  return whatsappLink(msg);
}
