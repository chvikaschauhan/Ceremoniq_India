import { randomUUID } from "node:crypto";

const savedCustomizations = [];

export function savePackageCustomization(request, response) {
  const { productId = null, productName = null, packagingStyle, message = "", senderName = "" } = request.body || {};
  if (typeof packagingStyle !== "string" || !packagingStyle.trim()) {
    return response.status(400).json({ message: "Please choose a packaging style." });
  }
  if (typeof message !== "string" || message.length > 240 || typeof senderName !== "string" || senderName.length > 60) {
    return response.status(400).json({ message: "Please check your message and sender name lengths." });
  }
  if (productId !== null && typeof productId !== "string") {
    return response.status(400).json({ message: "The selected product is invalid." });
  }

  const customization = {
    id: randomUUID(),
    productId,
    productName: typeof productName === "string" ? productName.slice(0, 120) : null,
    packagingStyle: packagingStyle.trim().slice(0, 100),
    message: message.trim(),
    senderName: senderName.trim(),
    createdAt: new Date().toISOString(),
  };
  savedCustomizations.push(customization);
  return response.status(201).json({ message: "Your packaging preferences have been saved.", customization });
}
