import { useState } from "react";

const styles = [
  { name: "Banarasi Silk Fabric Wrap", detail: "A luminous, reusable silk wrap inspired by Varanasi’s brocade tradition.", price: 450, icon: "✦" },
  { name: "Handcrafted Jute Box", detail: "Natural woven jute with a keepsake-ready, hand-finished form.", price: 350, icon: "⌂" },
  { name: "Patachitra Art Box", detail: "A vivid hand-painted finish inspired by Bengal and Odisha’s storytelling art.", price: 600, icon: "❋" },
];

export default function PackagingCustomizer({ product, onBack, onSaved }) {
  const [style, setStyle] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const save = async (event) => {
    event.preventDefault();
    if (!style) { setError("Please choose a wrapping style to continue."); return; }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/customize-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product?.id || null, productName: product?.name || null, packagingStyle: style, message: message.trim(), senderName: senderName.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "We couldn't save your preferences.");
      onSaved({ ...data, product, packagingPrice: styles.find((item) => item.name === style)?.price || 0 });
    } catch (requestError) {
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <section className="customizer-section" id="packaging">
      <div className="catalog-heading">
        <p className="eyebrow">The finishing touch</p>
        <h2>Make it <em>uniquely yours.</em></h2>
        <p>{product ? `Personalise ${product.name} with a considered wrap and a note from you.` : "Choose a traditional wrap and add a message for someone special."}</p>
      </div>
      <form className="customizer-card" onSubmit={save}>
        <div className="customizer-options" role="radiogroup" aria-label="Choose packaging style">
          {styles.map((item) => <button type="button" role="radio" aria-checked={style === item.name} className={`wrap-option ${style === item.name ? "selected" : ""}`} key={item.name} onClick={() => { setStyle(item.name); setError(""); }}><span className="option-icon" aria-hidden="true">{item.icon}</span><span className="wrap-copy"><strong>{item.name}</strong><small>{item.detail}</small></span><span className="wrap-price">+₹{item.price}</span></button>)}
        </div>
        <label className="message-label" htmlFor="gift-message">Your gift message <span>Optional · up to 240 characters</span></label>
        <textarea id="gift-message" maxLength={240} rows={4} placeholder="Write a few heartfelt words…" value={message} onChange={(event) => setMessage(event.target.value)} />
        <label className="message-label sender-label" htmlFor="sender-name">From <span>Optional</span></label>
        <input id="sender-name" maxLength={60} placeholder="Your name" value={senderName} onChange={(event) => setSenderName(event.target.value)} />
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="wizard-actions customizer-actions"><button type="button" className="back-button" onClick={onBack}>← <span>Back to collection</span></button><button className="next-button" disabled={loading}>{loading ? "Saving your details…" : <>Save my personalisation <span>→</span></>}</button></div>
      </form>
    </section>
  );
}
