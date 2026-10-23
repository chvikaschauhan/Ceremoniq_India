import { useState } from "react";

const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function Checkout({ items, onOrderPlaced, onBack }) {
  const [form, setForm] = useState({ recipientName: "", phone: "", email: "", address: "", city: "", state: "", pincode: "", paymentMethod: "Cash on Delivery" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const totalAmount = items.reduce((sum, item) => sum + (item.product?.price || 0) + item.packagingPrice, 0);
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!items.length) { setError("Your basket is empty. Add a gift before checkout."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, address: { recipientName: form.recipientName.trim(), phone: form.phone.trim(), email: form.email.trim(), line1: form.address.trim(), city: form.city.trim(), state: form.state.trim(), pincode: form.pincode.trim() }, paymentMethod: form.paymentMethod, totalAmount }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "We couldn't place your order. Please try again.");
      onOrderPlaced(data.order);
    } catch (requestError) { setError(requestError.message || "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return <section className="flow-section"><div className="catalog-heading"><p className="eyebrow">Almost there</p><h2>Delivery & <em>payment.</em></h2><p>Tell us where this thoughtful gift should find its way.</p></div><div className="checkout-layout">
    <form className="checkout-form" onSubmit={placeOrder}><h3>Recipient details</h3><div className="form-grid"><label>Recipient name<input required name="recipientName" autoComplete="name" value={form.recipientName} onChange={change} /></label><label>Phone number<input required type="tel" name="phone" autoComplete="tel" pattern="[+0-9() -]{8,18}" value={form.phone} onChange={change} /></label><label className="field-wide">Email address <span>(optional)</span><input type="email" name="email" autoComplete="email" value={form.email} onChange={change} /></label><label className="field-wide">Delivery address<textarea required name="address" autoComplete="street-address" rows="3" value={form.address} onChange={change} /></label><label>City<input required name="city" autoComplete="address-level2" value={form.city} onChange={change} /></label><label>State<input required name="state" autoComplete="address-level1" value={form.state} onChange={change} /></label><label>PIN code<input required inputMode="numeric" pattern="[0-9]{6}" maxLength="6" name="pincode" autoComplete="postal-code" value={form.pincode} onChange={change} /></label></div>
      <h3 className="payment-heading">Payment method</h3><div className="payment-options"><label className={form.paymentMethod === "Cash on Delivery" ? "selected" : ""}><input type="radio" name="paymentMethod" value="Cash on Delivery" checked={form.paymentMethod === "Cash on Delivery"} onChange={change} /><span><strong>Cash on Delivery</strong><small>Pay when your gift arrives</small></span></label><label className={form.paymentMethod === "Online Payment" ? "selected" : ""}><input type="radio" name="paymentMethod" value="Online Payment" checked={form.paymentMethod === "Online Payment"} onChange={change} /><span><strong>Online Payment</strong><small>Payment gateway coming soon</small></span></label></div>
      {error && <p className="form-error checkout-error" role="alert">{error}</p>}<div className="checkout-actions"><button type="button" className="back-button" onClick={onBack}>← <span>Back to basket</span></button><button className="next-button" disabled={loading || !items.length}>{loading ? "Placing your order…" : <>Place order · {money(totalAmount)} <span>→</span></>}</button></div>
    </form><aside className="order-summary"><span className="recommendation-type">YOUR ORDER</span><h3>{items.length} {items.length === 1 ? "gift" : "gifts"}, wrapped with care.</h3>{items.map((item) => <p className="checkout-line" key={item.id}><span>{item.product?.name || "Custom gift"}<small>{item.customization.packagingStyle}</small></span><strong>{money((item.product?.price || 0) + item.packagingPrice)}</strong></p>)}<p className="summary-total"><span>Total</span><strong>{money(totalAmount)}</strong></p><small>Online payment is a placeholder and will not charge you.</small></aside>
  </div></section>;
}

export function OrderSuccess({ order, onContinue }) {
  return <section className="flow-section success-section"><div className="success-card"><span className="success-mark" aria-hidden="true">✓</span><p className="eyebrow">A meaningful moment is on its way</p><h2>Thank you, {order.address.recipientName}.</h2><p>Your order has been placed. We’ve saved the details and will deliver your gifts to {order.address.city}.</p><div className="success-order"><span>Order reference</span><strong>{order.id}</strong><span>Payment</span><strong>{order.paymentMethod}</strong><span>Total</span><strong>{money(order.totalAmount)}</strong></div><div className="success-items">{order.items.map((item, index) => <p key={`${item.product?.id || "custom"}-${index}`}><span>{item.product?.name || "Custom gift"} · {item.customization.packagingStyle}</span><strong>{money((item.product?.price || 0) + item.packagingPrice)}</strong></p>)}</div><button className="next-button" onClick={onContinue}>Continue exploring <span>→</span></button></div></section>;
}
