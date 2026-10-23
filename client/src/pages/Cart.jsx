const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function Cart({ items, onRemove, onCheckout, onBrowse }) {
  const total = items.reduce((sum, item) => sum + (item.product?.price || 0) + (item.packagingPrice || 0), 0);

  return (
    <section className="flow-section">
      <div className="catalog-heading"><p className="eyebrow">Your thoughtful edit</p><h2>Your <em>gift basket.</em></h2><p>Review each gift and the personal touches you chose.</p></div>
      {items.length === 0 ? <div className="flow-empty"><span className="results-flower">✳</span><h3>Your basket is waiting for a little meaning.</h3><button className="next-button" onClick={onBrowse}>Explore the collection <span>→</span></button></div> : <>
        <div className="cart-layout">
          <div className="cart-items">{items.map((item) => <article className="cart-item" key={item.id}>
            <div className="cart-item-art" aria-hidden="true">✳</div><div className="cart-item-copy">
              <span className="recommendation-type">PERSONALISED GIFT</span><h3>{item.product?.name || "Custom gift packaging"}</h3>
              <p>Packaging: {item.customization.packagingStyle}</p>
              {item.customization.message && <blockquote>“{item.customization.message}”{item.customization.senderName && <cite>— {item.customization.senderName}</cite>}</blockquote>}
              <button className="text-button" onClick={() => onRemove(item.id)}>Remove</button>
            </div><strong className="cart-item-price">{money((item.product?.price || 0) + item.packagingPrice)}</strong>
          </article>)}</div>
          <aside className="order-summary"><span className="recommendation-type">ORDER SUMMARY</span><h3>A lovely choice.</h3><p><span>Gifts ({items.length})</span><strong>{money(items.reduce((sum, item) => sum + (item.product?.price || 0), 0))}</strong></p><p><span>Personal packaging</span><strong>{money(items.reduce((sum, item) => sum + item.packagingPrice, 0))}</strong></p><p className="summary-total"><span>Total</span><strong>{money(total)}</strong></p><button className="next-button summary-button" onClick={onCheckout}>Continue to delivery <span>→</span></button><small>Shipping calculated at checkout</small></aside>
        </div>
      </>}
    </section>
  );
}
