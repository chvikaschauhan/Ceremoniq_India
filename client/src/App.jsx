import { useEffect, useState } from "react";
import Catalog from "./pages/Catalog.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout, { OrderSuccess } from "./pages/Checkout.jsx";
import PackagingCustomizer from "./components/PackagingCustomizer.jsx";

const steps = ["Occasion", "Recipient", "Culture", "Your edit"];
const options = {
  occasion: [
    { title: "Wedding", detail: "A beautiful beginning", icon: "✦" },
    { title: "Housewarming", detail: "For a home to call their own", icon: "⌂" },
    { title: "Diwali", detail: "Light, abundance & new hopes", icon: "✺" },
    { title: "Birthday", detail: "A little joy, just for them", icon: "❋" },
    { title: "Baby shower", detail: "Welcoming a precious new life", icon: "♡" },
    { title: "Thank you", detail: "A thoughtful note of gratitude", icon: "❧" },
  ],
  recipient: [
    { title: "Parents", detail: "For all they have given", icon: "♡" },
    { title: "Newly wed couple", detail: "Celebrate their shared story", icon: "♧" },
    { title: "Friend", detail: "Someone who feels like home", icon: "✿" },
    { title: "Boss or mentor", detail: "With respect and appreciation", icon: "❖" },
    { title: "Sibling", detail: "Your first and forever friend", icon: "❋" },
    { title: "Host", detail: "A lovely gesture for their home", icon: "⌂" },
  ],
  culture: [
    { title: "Punjabi", detail: "Punjab & the North", icon: "✺" },
    { title: "Bengali", detail: "West Bengal & the East", icon: "❋" },
    { title: "Maharashtrian", detail: "Maharashtra & the Deccan", icon: "✦" },
    { title: "South Indian", detail: "Tamil Nadu, Kerala, Karnataka & Andhra", icon: "❧" },
    { title: "Rajasthani", detail: "Rajasthan & the royal west", icon: "❖" },
    { title: "Gujarati", detail: "Gujarat & its vibrant traditions", icon: "✿" },
    { title: "Assamese", detail: "Assam & the North East", icon: "❀" },
    { title: "Surprise me", detail: "A thoughtful pan-Indian edit", icon: "✧" },
  ],
};

function Navbar() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Ceremoniq India home">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <span>Ceremoniq <span className="brand-country">India</span></span>
      </a>
      <nav aria-label="Main navigation"><a href="#discover">The gifting edit</a><a href="#our-story">Our story</a></nav>
      <a className="header-link" href="#discover">Find a meaningful gift <span aria-hidden="true">↗</span></a>
    </header>
  );
}

function GiftWizard({ onBrowseCatalog }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({ occasion: "", recipient: "", culture: "" });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectOption = (key, title) => setSelections((current) => ({ ...current, [key]: title }));
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";
  const getRecommendations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occasion: selections.occasion,
          recipient: selections.recipient,
          culture: selections.culture,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "We couldn't find your edit just now.");
      setRecommendations(data);
      setStep(3);
    } catch (requestError) {
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const goBack = () => {
    if (step === 3) setStep(2);
    else setStep((current) => Math.max(0, current - 1));
  };
  const startOver = () => {
    setStep(0);
    setSelections({ occasion: "", recipient: "", culture: "" });
    setRecommendations(null);
    setError("");
  };
  const key = ["occasion", "recipient", "culture"][step];
  const canContinue = Boolean(selections[key]);

  return (
    <section className="wizard-section" id="discover">
      <div className="wizard-heading">
        <p className="eyebrow">A considered gift, made personal</p>
        <h2>Find your <em>meaningful</em> match.</h2>
        <p>Tell us a little about the moment. We’ll bring the cultural details together.</p>
      </div>
      <div className="wizard-card">
        <div className="stepper" aria-label={`Step ${step + 1} of 4`}>
          {steps.map((label, index) => (
            <div className={`stepper-item ${index === step ? "active" : ""} ${index < step ? "complete" : ""}`} key={label}>
              <span className="stepper-number">{index < step ? "✓" : `0${index + 1}`}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
        {step < 3 ? (
          <>
            <div className="wizard-prompt">
              <span className="prompt-kicker">STEP 0{step + 1} / 03</span>
              <h3>{["What are we celebrating?", "Who is this special for?", "Which cultural roots should inspire the gift?"][step]}</h3>
              <p>{["Every occasion has its own lovely way of being marked.", "We’ll find something that feels right for your relationship.", "Choose a region or tradition to guide the details."][step]}</p>
            </div>
            <div className={`option-grid ${step === 2 ? "culture-grid" : ""}`} role="group" aria-label={steps[step]}>
              {options[key].map((option) => {
                const selected = selections[key] === option.title;
                return (
                  <button key={option.title} type="button" className={`option-card ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => selectOption(key, option.title)}>
                    <span className="option-icon" aria-hidden="true">{option.icon}</span>
                    <span className="option-copy"><strong>{option.title}</strong><small>{option.detail}</small></span>
                    <span className="option-check" aria-hidden="true">{selected ? "✓" : ""}</span>
                  </button>
                );
              })}
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="wizard-actions">
              {step > 0 ? <button type="button" className="back-button" onClick={goBack}>← <span>Back</span></button> : <span />}
              {step < 2 ? (
                <button type="button" className="next-button" disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>Continue <span>→</span></button>
              ) : (
                <button type="button" className="next-button" disabled={!canContinue || loading} onClick={getRecommendations}>{loading ? "Curating your edit…" : <>Reveal my gift edit <span>→</span></>}</button>
              )}
            </div>
          </>
        ) : (
          <div className="results-view">
            <div className="results-intro">
              <span className="results-flower" aria-hidden="true">✳</span>
              <p className="prompt-kicker">YOUR CEREMONIQ EDIT</p>
              <h3>A thoughtful gesture, <em>rooted in meaning.</em></h3>
              <p>For {selections.recipient.toLowerCase()} · {selections.occasion} · {selections.culture}</p>
            </div>
            <div className="results-grid">
              {(recommendations?.items || []).map((item, index) => (
                <article className="recommendation-card" key={item.name}>
                  <div className="recommendation-number">0{index + 1}</div>
                  <span className="recommendation-type">THE GIFT</span>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <div className="recommendation-note">{item.culturalNote}</div>
                </article>
              ))}
            </div>
            <article className="packaging-card">
              <div><span className="recommendation-type">THE FINISHING TOUCH</span><h4>Packaging with a story</h4></div>
              <div className="packaging-list">{(recommendations?.packaging || []).map((idea) => <p key={idea.name}><strong>{idea.name}</strong><span>{idea.description}</span></p>)}</div>
            </article>
            <div className="wizard-actions result-actions">
              <button type="button" className="back-button" onClick={goBack}>← <span>Adjust my choices</span></button>
              <button type="button" className="next-button" onClick={onBrowseCatalog}>Explore the collection <span>→</span></button>
            </div>
          </div>
        )}
      </div>
      <p className="wizard-footnote"><span aria-hidden="true">✧</span> Thoughtful by nature. Inspired by you.</p>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer" id="our-story"><span>© {new Date().getFullYear()} Ceremoniq India</span><span>Thoughtful giving, rooted in culture.</span></footer>;
}

function readCart() {
  try { const saved = JSON.parse(localStorage.getItem("ceremoniq-cart") || "[]"); return Array.isArray(saved) ? saved : []; }
  catch { return []; }
}

export default function App() {
  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [savedCustomization, setSavedCustomization] = useState(null);
  const [cart, setCart] = useState(readCart);
  const [placedOrder, setPlacedOrder] = useState(null);
  useEffect(() => { localStorage.setItem("ceremoniq-cart", JSON.stringify(cart)); }, [cart]);
  const navigate = (nextView) => { setView(nextView); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openCustomizer = (product) => { setSelectedProduct(product); setSavedCustomization(null); setView("customize"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div className="app-shell" id="top">
      <Navbar />
      <div className="flow-nav" aria-label="Gifting flow navigation">
        <button onClick={() => navigate("home")}>Home</button>
        <button onClick={() => { navigate("home"); window.setTimeout(() => document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }), 0); }}>Gift finder</button>
        <button onClick={() => navigate("catalog")}>Catalog</button>
        <button onClick={() => navigate("cart")}>Cart <span>{cart.length}</span></button>
        {cart.length > 0 && <button onClick={() => navigate("checkout")}>Checkout</button>}
      </div>
      <main>
        <section className="welcome">
          <p className="eyebrow">A little meaning goes a long way</p>
          <h1>Give a gift that <em>means something.</em></h1>
          <p className="intro">Discover thoughtful gifts inspired by the traditions, craft, and celebrations that bring us together.</p>
          <a className="primary-link" href="#discover" onClick={() => setView("home")}>Explore the collection <span aria-hidden="true">→</span></a>
          <span className="hero-ornament hero-ornament-left" aria-hidden="true">✳</span><span className="hero-ornament hero-ornament-right" aria-hidden="true">❋</span>
        </section>
        {view === "home" && <GiftWizard onBrowseCatalog={() => navigate("catalog")} />}
        {view === "catalog" && <Catalog onCustomize={openCustomizer} />}
        {view === "customize" && (savedCustomization ? (
          <section className="customizer-section"><div className="saved-card" role="status"><span className="results-flower" aria-hidden="true">✳</span><p className="eyebrow">A personal touch, saved</p><h2>Your gift is taking shape.</h2><p>{savedCustomization.customization.message || "Your packaging choice and gift details have been saved."}</p><button className="next-button" onClick={() => { setCart((items) => [...items, { id: savedCustomization.customization.id, product: savedCustomization.product, customization: savedCustomization.customization, packagingPrice: savedCustomization.packagingPrice }]); setSavedCustomization(null); navigate("cart"); }}>Add to basket <span>→</span></button></div></section>
        ) : <PackagingCustomizer product={selectedProduct} onBack={() => navigate("catalog")} onSaved={(data) => setSavedCustomization(data)} />)}
        {view === "cart" && <Cart items={cart} onRemove={(id) => setCart((items) => items.filter((item) => item.id !== id))} onCheckout={() => navigate("checkout")} onBrowse={() => navigate("catalog")} />}
        {view === "checkout" && <Checkout items={cart} onBack={() => navigate("cart")} onOrderPlaced={(order) => { setPlacedOrder(order); setCart([]); navigate("success"); }} />}
        {view === "success" && placedOrder && <OrderSuccess order={placedOrder} onContinue={() => navigate("catalog")} />}
        {view === "home" && <section className="story"><span className="story-symbol" aria-hidden="true">❋</span><p>Made to celebrate the stories we share.</p></section>}
      </main>
      <Footer />
    </div>
  );
}
