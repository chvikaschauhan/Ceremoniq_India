import { useEffect, useState } from "react";

export default function Catalog({ onCustomize }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/products")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "We couldn't load the collection.");
        return data.products;
      })
      .then((items) => { if (active) setProducts(items); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section className="catalog-section" id="catalog">
      <div className="catalog-heading">
        <p className="eyebrow">A collection with a story</p>
        <h2>Gifts rooted in <em>craft & culture.</em></h2>
        <p>Explore thoughtful regional treats and keepsakes, chosen to make every occasion feel personal.</p>
      </div>
      {loading ? <p className="catalog-status">Gathering the collection…</p> : null}
      {error ? <p className="catalog-status form-error" role="alert">{error}</p> : null}
      {!loading && !error && (
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image" role="img" aria-label={`${product.name} placeholder`}><span aria-hidden="true">✳</span><small>{product.imagePlaceholder}</small></div>
              <div className="product-copy">
                <div className="product-tags"><span>{product.cultureTag}</span><span>{product.regionalOrigin}</span></div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-bottom"><strong>₹{product.price.toLocaleString("en-IN")}</strong><button className="product-select" onClick={() => onCustomize(product)}>Personalise gift <span aria-hidden="true">→</span></button></div>
              </div>
            </article>
          ))}
        </div>
      )}
      <div className="catalog-customize"><p>Already know what you’re gifting?</p><button className="next-button" onClick={() => onCustomize(null)}>Choose your packaging <span>→</span></button></div>
    </section>
  );
}
