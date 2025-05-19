export function TypographyExample() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <span className="luxury-subheading text-sm text-muted-foreground">Ultra-Luxury Experience</span>
        <h1 className="luxury-heading text-6xl md:text-7xl lg:text-8xl">Luxury Redefined</h1>
        <p className="luxury-body text-lg md:text-xl max-w-2xl">
          Experience premium design and function with our curated collection of exclusive products and services.
        </p>
      </section>

      {/* Typography Showcase */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="luxury-heading text-3xl">Display Typography</h2>
          <div className="space-y-4">
            <div>
              <span className="luxury-caption text-muted-foreground">Display XL</span>
              <p className="font-display text-5xl">Roxie Rossa</p>
            </div>
            <div>
              <span className="luxury-caption text-muted-foreground">Display L</span>
              <p className="font-display text-4xl">Roxie Rossa</p>
            </div>
            <div>
              <span className="luxury-caption text-muted-foreground">Display M</span>
              <p className="font-display text-3xl">Roxie Rossa</p>
            </div>
            <div>
              <span className="luxury-caption text-muted-foreground">Display S</span>
              <p className="font-display text-2xl">Roxie Rossa</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="luxury-heading text-3xl">Body Typography</h2>
          <div className="space-y-4">
            <div>
              <span className="luxury-caption text-muted-foreground">Body XL</span>
              <p className="font-sans text-xl">Josefin Sans</p>
            </div>
            <div>
              <span className="luxury-caption text-muted-foreground">Body L</span>
              <p className="font-sans text-lg">Josefin Sans</p>
            </div>
            <div>
              <span className="luxury-caption text-muted-foreground">Body M</span>
              <p className="font-sans text-base">Josefin Sans</p>
            </div>
            <div>
              <span className="luxury-caption text-muted-foreground">Body S</span>
              <p className="font-sans text-sm">Josefin Sans</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Usage */}
      <section className="space-y-8 border-t pt-8">
        <h2 className="luxury-heading text-3xl mt-8">Example Usage</h2>

        <div className="bg-card p-8 rounded-lg">
          <span className="luxury-subheading text-xs text-muted-foreground">Featured Collection</span>
          <h3 className="luxury-heading text-4xl mb-4">Timeless Elegance</h3>
          <p className="luxury-body mb-6">
            Our signature collection embodies the perfect balance of contemporary design and timeless craftsmanship.
            Each piece is meticulously created to elevate your everyday experience.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-sans uppercase tracking-wider text-sm">
            Explore Collection
          </button>
        </div>
      </section>
    </div>
  )
}

export default TypographyExample
