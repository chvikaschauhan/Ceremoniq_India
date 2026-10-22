function Navbar() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Ceremoniq India home">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <span>Ceremoniq <span className="brand-country">India</span></span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#discover">Discover</a>
        <a href="#our-story">Our story</a>
      </nav>
      <a className="header-link" href="#discover">Find a meaningful gift <span aria-hidden="true">↗</span></a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Ceremoniq India</span>
      <span>Thoughtful giving, rooted in culture.</span>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <section className="welcome" id="discover">
          <p className="eyebrow">A little meaning goes a long way</p>
          <h1>Give a gift that <em>means something.</em></h1>
          <p className="intro">
            Discover thoughtful gifts inspired by the traditions, craft, and
            celebrations that bring us together.
          </p>
          <a className="primary-link" href="#our-story">Explore the collection <span aria-hidden="true">→</span></a>
        </section>
        <section className="story" id="our-story">
          <span className="story-symbol" aria-hidden="true">❋</span>
          <p>Made to celebrate the stories we share.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

