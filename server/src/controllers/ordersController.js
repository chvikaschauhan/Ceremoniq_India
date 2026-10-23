import { randomUUID } from "node:crypto";

const orders = [];
const paymentMethods = new Set(["Cash on Delivery", "Online Payment"]);

export function createOrder(request, response) {
  const { items, address, paymentMethod, totalAmount } = request.body || {};
  if (!Array.isArray(items) || items.length < 1 || items.length > 50) return response.status(400).json({ message: "Add at least one gift to your order." });
  if (!address || typeof address !== "object" || !["recipientName", "phone", "line1", "city", "state", "pincode"].every((field) => typeof address[field] === "string" && address[field].trim())) return response.status(400).json({ message: "Please provide complete recipient and delivery details." });
  if (!paymentMethods.has(paymentMethod)) return response.status(400).json({ message: "Please select a valid payment method." });

  const cleanItems = [];
  for (const item of items) {
    const product = item?.product || null;
    const customization = item?.customization;
    const packagingPrice = Number(item?.packagingPrice);
    if (!customization || typeof customization.packagingStyle !== "string" || !customization.packagingStyle.trim() || !Number.isFinite(packagingPrice) || packagingPrice < 0 || packagingPrice > 10000 || (product && (typeof product.name !== "string" || !Number.isFinite(Number(product.price)) || Number(product.price) < 0))) return response.status(400).json({ message: "One of the gifts or packaging choices is invalid." });
    cleanItems.push({ product: product ? { id: String(product.id || "").slice(0, 120), name: product.name.slice(0, 160), price: Number(product.price) } : null, packagingPrice, customization: { packagingStyle: customization.packagingStyle.trim().slice(0, 100), message: typeof customization.message === "string" ? customization.message.slice(0, 240) : "", senderName: typeof customization.senderName === "string" ? customization.senderName.slice(0, 60) : "" } });
  }
  const calculatedTotal = cleanItems.reduce((sum, item) => sum + (item.product?.price || 0) + item.packagingPrice, 0);
  if (!Number.isFinite(totalAmount) || Math.abs(totalAmount - calculatedTotal) > 0.01) return response.status(400).json({ message: "The order total does not match the selected gifts." });

  const order = { id: `CRQ-${randomUUID().slice(0, 8).toUpperCase()}`, items: cleanItems, address: Object.fromEntries(Object.entries(address).map(([key, value]) => [key, typeof value === "string" ? value.trim().slice(0, 200) : ""])), paymentMethod, totalAmount: calculatedTotal, status: paymentMethod === "Online Payment" ? "Payment pending" : "Confirmed", createdAt: new Date().toISOString() };
  orders.push(order);
  return response.status(201).json({ message: "Your order has been placed.", order });
}

export { orders };
