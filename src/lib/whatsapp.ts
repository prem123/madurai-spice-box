import { siteConfig } from "./site";
import {
  type CartItem,
  cartSubtotal,
  cartShipping,
  cartTotal,
} from "./cart-store";
import { formatINR } from "./utils";

export interface CustomerDetails {
  name?: string;
  phone?: string;
  address?: string;
}

/** Builds the structured order message and returns a wa.me deep link. */
export function buildOrderMessage(
  items: CartItem[],
  customer: CustomerDetails = {}
): string {
  const subtotal = cartSubtotal(items);
  const shipping = cartShipping(subtotal);
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
  lines.push(`Subtotal: ${formatINR(subtotal)}`);
  lines.push(
    `Shipping: ${shipping === 0 ? "FREE" : formatINR(shipping)}`
  );
  lines.push(`*Total: ${formatINR(total)}*`);
  lines.push("");
  lines.push("*Customer Details:*");
  lines.push(`Name: ${customer.name?.trim() || "_____"}`);
  lines.push(`Phone: ${customer.phone?.trim() || "_____"}`);
  lines.push(`Address: ${customer.address?.trim() || "_____"}`);
  lines.push("");
  lines.push("Please share the payment details. Thank you!");

  return lines.join("\n");
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

/** Convenience: order link from cart + customer. */
export function orderLink(items: CartItem[], customer?: CustomerDetails) {
  return whatsappLink(buildOrderMessage(items, customer));
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
