// Shop BD - Complete User Pages (Exact Match to Reference UI)

window.UserPages = {
  // 1. HOME PAGE
  HomePage: ({ products, categories, banners, onNavigate, onAddToCart, onQuickView, onShare, onToggleFavorite, wishlist }) => {
    // 6 New Arrivals matching image.png
    const newArrivals = products.slice(0, 6);
    // 4 Best Sellers matching image.png
    const bestSellers = products.slice(6, 10);

    return (
      <div className="space-y-12 pb-16 bg-white">
        {/* Hero Section Carousel */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="relative bg-[#F8FAFC] rounded-2xl overflow-hidden min-h-[400px] md:min-h-[460px] flex items-center border border-slate-200/60">
            {/* Left/Right Arrow Controls */}
            <button
              onClick={() => onNavigate("/shop")}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition"
              aria-label="Previous slide"
            >
              <Icons.ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("/shop")}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition"
              aria-label="Next slide"
            >
              <Icons.ChevronRight className="w-4 h-4" />
            </button>

            {/* Slide Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full px-8 md:px-16 py-12 gap-8 z-10">
              <div className="space-y-4 max-w-lg">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                  Style for Every You
                </h1>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Discover the latest fashion trends and best deals in Bangladesh.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onNavigate("/shop")}
                    className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition"
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={() => onNavigate("/shop")}
                    className="px-6 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg transition"
                  >
                    Explore Collection
                  </button>
                </div>
              </div>

              {/* Right Model Image */}
              <div className="relative flex justify-center md:justify-end">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80"
                  alt="Fashion Model"
                  className="max-h-[380px] object-contain rounded-xl drop-shadow-lg"
                />
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold text-slate-950 tracking-tight">Shop by Category</h2>
            <button
              onClick={() => onNavigate("/shop")}
              className="text-xs font-semibold text-slate-600 hover:text-slate-950 flex items-center gap-1"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {categories.slice(0, 6).map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate(`/category/${cat.slug || cat.name.toLowerCase()}`)}
                className="group cursor-pointer flex flex-col items-center"
              >
                <div className="w-full aspect-square rounded-2xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center overflow-hidden group-hover:border-slate-400 group-hover:shadow-sm transition">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition duration-300"
                  />
                </div>
                <span className="mt-2 text-xs font-bold text-slate-800 group-hover:text-slate-950 text-center">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals (6 Items Grid) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold text-slate-950 tracking-tight">New Arrivals</h2>
            <button
              onClick={() => onNavigate("/shop")}
              className="text-xs font-semibold text-slate-600 hover:text-slate-950 flex items-center gap-1"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {newArrivals.map((prod) => (
              <Components.ProductCard
                key={prod.id}
                product={prod}
                onNavigate={onNavigate}
                onQuickView={onQuickView}
                onShare={onShare}
                onToggleFavorite={onToggleFavorite}
                isFavorite={wishlist.includes(prod.id)}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </section>

        {/* Split Promo Banner: 50% Off & Why Shop BD? */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left 50% Off Promo */}
            <div className="bg-slate-950 rounded-2xl p-8 text-white relative overflow-hidden flex items-center justify-between min-h-[190px]">
              <div className="z-10 space-y-2 max-w-[60%]">
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Up to 50% Off
                </h3>
                <p className="text-xs text-slate-300">Limited Time Offer</p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("/shop")}
                    className="px-5 py-2 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-lg transition"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
                alt="Promo Man"
                className="absolute right-0 bottom-0 h-full w-[45%] object-cover object-top opacity-90"
              />
            </div>

            {/* Right "Why Shop BD?" */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Why Shop BD?</h3>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-1.5 border border-slate-100">
                    <Icons.Shield className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">Quality Products</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-1.5 border border-slate-100">
                    <Icons.Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">Secure Checkout</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-1.5 border border-slate-100">
                    <Icons.Truck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">Delivery Nationwide</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-1.5 border border-slate-100">
                    <Icons.RotateCcw className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">Easy Returns</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-1.5 border border-slate-100">
                    <Icons.Headphones className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers (4 Items Grid) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold text-slate-950 tracking-tight">Best Sellers</h2>
            <button
              onClick={() => onNavigate("/shop")}
              className="text-xs font-semibold text-slate-600 hover:text-slate-950 flex items-center gap-1"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bestSellers.map((prod) => (
              <Components.ProductCard
                key={prod.id}
                product={prod}
                onNavigate={onNavigate}
                onQuickView={onQuickView}
                onShare={onShare}
                onToggleFavorite={onToggleFavorite}
                isFavorite={wishlist.includes(prod.id)}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </section>

        {/* Bottom Dual Boxes: Customer Reviews & Newsletter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reviews Box */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80"
                  alt="Fatema Rahman"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Customer Reviews</h4>
                  <p className="text-xs text-slate-600 italic mt-0.5">
                    "Amazing quality and fast delivery! Really love shopping from Shop BD."
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500">
                    <span className="font-bold text-slate-800 not-italic mr-1">Fatema Rahman</span>
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <Icons.ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>

            {/* Newsletter Box */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 space-y-3">
              <div>
                <h4 className="font-bold text-xs text-slate-900">Subscribe to Our Newsletter</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Get the latest updates, new arrivals and exclusive offers.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for subscribing to Shop BD newsletter!");
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  },

  // 2. PRODUCT LISTING (SHOP PAGE)
  ShopPage: ({ products, categories, onNavigate, onAddToCart, onQuickView, onShare, onToggleFavorite, wishlist }) => {
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    const [priceRange, setPriceRange] = React.useState(10000);
    const [selectedSize, setSelectedSize] = React.useState(null);
    const [selectedColor, setSelectedColor] = React.useState(null);
    const [inStockOnly, setInStockOnly] = React.useState(false);
    const [onSaleOnly, setOnSaleOnly] = React.useState(false);
    const [sortBy, setSortBy] = React.useState("newest");
    const [currentPage, setCurrentPage] = React.useState(1);

    // Filter Logic
    let filtered = products.filter((p) => {
      if (selectedCategory !== "All" && p.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (p.sellingPrice > priceRange) return false;
      if (selectedSize && !p.sizes?.includes(selectedSize)) return false;
      if (selectedColor && !p.colors?.includes(selectedColor)) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (onSaleOnly && (!p.originalPrice || p.originalPrice <= p.sellingPrice)) return false;
      return true;
    });

    // Sorting
    if (sortBy === "price-low") filtered.sort((a, b) => a.sellingPrice - b.sellingPrice);
    else if (sortBy === "price-high") filtered.sort((a, b) => b.sellingPrice - a.sellingPrice);
    else if (sortBy === "rating") filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar: Filters */}
          <aside className="space-y-6 text-xs text-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Filters</h3>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setPriceRange(10000);
                  setSelectedSize(null);
                  setSelectedColor(null);
                  setInStockOnly(false);
                  setOnSaleOnly(false);
                }}
                className="text-[11px] text-slate-400 hover:text-slate-800"
              >
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Category</h4>
              <div className="space-y-1.5">
                {["Men", "Women", "Kids", "Shoes", "Bags", "Accessories"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-0"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Price Range</h4>
                <span className="font-mono text-slate-800">৳ 0 - ৳ {priceRange.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-slate-900"
              />
            </div>

            {/* Color */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Color</h4>
              <div className="flex gap-2">
                {[
                  { name: "red", hex: "#EF4444" },
                  { name: "green", hex: "#10B981" },
                  { name: "blue", hex: "#3B82F6" },
                  { name: "yellow", hex: "#F59E0B" },
                  { name: "black", hex: "#0F172A" },
                  { name: "white", hex: "#E2E8F0" }
                ].map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(selectedColor === color.hex ? null : color.hex)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-5 h-5 rounded-full border border-slate-300 ${
                      selectedColor === color.hex ? "ring-2 ring-slate-900 ring-offset-1" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Size</h4>
              <div className="flex gap-1.5 flex-wrap">
                {["XS", "S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded border transition ${
                      selectedSize === sz ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-700"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Brand</h4>
              <div className="space-y-1.5">
                {["Nike", "Adidas", "Puma", "H&M", "Others"].map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-0" />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Rating</h4>
              <label className="flex items-center gap-2 cursor-pointer text-amber-500">
                <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-0" />
                <span>★★★★☆</span>
                <span className="text-slate-600 text-[10px]">4.0 & above</span>
              </label>
            </div>

            {/* Stock & Discount */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-0"
                />
                <span>In Stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-0"
                />
                <span>On Sale</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-900">
                All Products ({filtered.length})
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-slate-900 focus:outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* 3 Columns Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((prod) => (
                <Components.ProductCard
                  key={prod.id}
                  product={prod}
                  onNavigate={onNavigate}
                  onQuickView={onQuickView}
                  onShare={onShare}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={wishlist.includes(prod.id)}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-1.5 pt-8">
              <button className="px-2.5 py-1 border border-slate-200 rounded text-xs text-slate-600 hover:bg-slate-50">
                &lt;
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded text-xs font-semibold ${
                    currentPage === page ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-xs text-slate-400 px-1">..</span>
              <button className="px-2.5 py-1 border border-slate-200 rounded text-xs text-slate-600 hover:bg-slate-50">
                &gt;
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  },

  // 3. PRODUCT DETAILS PAGE (SCREEN 3)
  ProductDetailsPage: ({ productId, products, onAddToCart, onBuyNow, onShare, onToggleFavorite, wishlist, onNavigate, user }) => {
    const product = products.find((p) => String(p.id) === String(productId)) || products[0];
    const [selectedImg, setSelectedImg] = React.useState(product.images?.[0] || "");
    const [selectedSize, setSelectedSize] = React.useState(product.sizes?.[0] || "M");
    const [selectedColor, setSelectedColor] = React.useState(product.colors?.[0] || "#2E4A32");
    const [quantity, setQuantity] = React.useState(1);

    // Accordions
    const [openAccordion, setOpenAccordion] = React.useState("desc");

    // 4 Related Products
    const relatedProducts = products.filter((p) => String(p.id) !== String(product.id)).slice(0, 4);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white space-y-12">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <button onClick={() => onNavigate("/")} className="hover:text-slate-800">Shop BD</button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{product.name}</span>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Thumbnails Column (2 cols on md) */}
          <div className="md:col-span-2 flex md:flex-col gap-2.5 overflow-x-auto order-2 md:order-1">
            {(product.images?.length > 0 ? product.images : [selectedImg]).map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImg(img)}
                className={`w-14 h-16 md:w-full md:h-20 rounded-lg overflow-hidden border cursor-pointer ${
                  selectedImg === img ? "border-slate-900" : "border-slate-200 opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Large Main Image (5 cols on md) */}
          <div className="md:col-span-5 aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 order-1 md:order-2">
            <img src={selectedImg || product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Right Product Attributes (5 cols on md) */}
          <div className="md:col-span-5 space-y-4 order-3">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-950">{product.name}</h1>
              <p className="text-xs text-slate-500 mt-0.5">Brand: {product.brand || "H&M"}</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-500">
                <span>★★★★★</span>
                <span className="text-slate-600 font-bold ml-1">{product.rating || 4.5}</span>
                <span className="text-slate-400">({product.reviewCount || 124} reviews)</span>
              </div>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-3 py-2 border-y border-slate-100">
              <span className="text-2xl font-black text-slate-950">৳ {product.sellingPrice?.toLocaleString()}</span>
              {product.originalPrice > product.sellingPrice && (
                <span className="text-sm text-slate-400 line-through">৳ {product.originalPrice?.toLocaleString()}</span>
              )}
              {product.discount > 0 && (
                <span className="px-2 py-0.5 rounded text-xs font-bold text-red-500 bg-red-50">
                  -{product.discount}%
                </span>
              )}
              <span className="text-xs font-bold text-emerald-600 ml-auto flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> In Stock
              </span>
            </div>

            {/* Size Selector */}
            {product.sizes?.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Size</label>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[36px] py-1 px-2.5 text-xs font-bold rounded border transition ${
                        selectedSize === s ? "bg-slate-950 text-white border-slate-950" : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Swatches */}
            {product.colors?.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Color</label>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-full border ${
                        selectedColor === c ? "ring-2 ring-slate-900 ring-offset-2" : "border-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-slate-50 text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center hover:bg-white rounded"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-white rounded"
                >
                  +
                </button>
              </div>

              {/* Add to Cart & Buy Now */}
              <button
                onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor)}
                className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => onBuyNow(product, quantity, selectedSize, selectedColor)}
                className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-900 text-xs font-bold rounded-lg transition"
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-600">
              <button
                onClick={() => onToggleFavorite(product)}
                className="flex items-center gap-1.5 hover:text-slate-950 font-medium"
              >
                <Icons.Heart className="w-4 h-4" filled={wishlist.includes(product.id)} />
                <span>Add to Wishlist</span>
              </button>
              <button
                onClick={() => onShare(product)}
                className="flex items-center gap-1.5 hover:text-slate-950 font-medium"
              >
                <Icons.Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Accordions */}
            <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
              {[
                { id: "desc", title: "Description", content: product.description },
                { id: "specs", title: "Specifications", content: "100% Breathable Cotton. Regular fit. Machine washable." },
                { id: "shipping", title: "Shipping Information", content: "Inside Dhaka: 24-48 hrs (৳ 80). Outside Dhaka: 3-5 days (৳ 120)." },
                { id: "returns", title: "Return Policy", content: "7-day easy exchange & refund policy if unworn with tags intact." },
                { id: "reviews", title: "Reviews", content: `Customer feedback score: 4.5/5 based on ${product.reviewCount || 124} reviews.` }
              ].map((acc) => (
                <div key={acc.id} className="border-b border-slate-100 pb-2">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === acc.id ? "" : acc.id)}
                    className="w-full flex items-center justify-between font-bold text-slate-900 py-1"
                  >
                    <span>{acc.title}</span>
                    <Icons.ChevronDown className={`w-3.5 h-3.5 transition ${openAccordion === acc.id ? "rotate-180" : ""}`} />
                  </button>
                  {openAccordion === acc.id && (
                    <p className="text-slate-500 text-[11px] leading-relaxed pt-1">{acc.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-950">Related Products</h3>
            <button onClick={() => onNavigate("/shop")} className="text-xs text-slate-600 hover:text-slate-950 font-semibold">
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <Components.ProductCard
                key={p.id}
                product={p}
                onNavigate={onNavigate}
                onQuickView={() => {}}
                onShare={onShare}
                onToggleFavorite={onToggleFavorite}
                isFavorite={wishlist.includes(p.id)}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </section>
      </div>
    );
  },

  // 4. CART PAGE (SCREEN 4)
  CartPage: ({ cart, onUpdateQuantity, onRemoveItem, onNavigate, settings }) => {
    const [couponCode, setCouponCode] = React.useState("");
    const [discountAmount, setDiscountAmount] = React.useState(0);

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryCharge = subtotal > (settings?.freeShippingThreshold || 2500) ? 0 : 80;
    const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

    const handleApplyCoupon = (e) => {
      e.preventDefault();
      if (couponCode.toUpperCase() === "EID2026") {
        setDiscountAmount(Math.round(subtotal * 0.15));
        alert("Coupon EID2026 applied! 15% discount.");
      } else {
        alert("Invalid coupon code. Try EID2026");
      }
    };

    if (cart.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
          <Components.EmptyState
            icon="ShoppingBag"
            title="Your Cart is Empty"
            description="Looks like you haven't added anything yet."
            actionText="Continue Shopping"
            onAction={() => onNavigate("/shop")}
          />
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <h1 className="text-lg font-bold text-slate-900 mb-6">
          Your Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/80 gap-4"
              >
                <img
                  src={item.image || "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200"}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-slate-50"
                />

                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="text-xs font-bold text-slate-800 mt-1">৳ {item.price?.toLocaleString()}</p>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 rounded p-1 bg-slate-50 text-xs">
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                    className="w-5 h-5 flex items-center justify-center hover:bg-white"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                    className="w-5 h-5 flex items-center justify-center hover:bg-white"
                  >
                    +
                  </button>
                </div>

                {/* Line Total */}
                <span className="text-xs font-bold text-slate-900 w-16 text-right">
                  ৳ {(item.price * item.quantity).toLocaleString()}
                </span>

                {/* Trash Button */}
                <button
                  onClick={() => onRemoveItem(item.productId, item.size, item.color)}
                  className="text-slate-400 hover:text-red-500 p-1"
                >
                  <Icons.Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary (Right Column) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 h-fit">
            <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ৳ {discountAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>৳ {deliveryCharge}</span>
              </div>
              <div className="flex justify-between">
                <span>Coupon</span>
                <span>- ৳ 0</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
              <span className="font-bold text-xs text-slate-900">Grand Total</span>
              <span className="text-base font-black text-slate-950">৳ {grandTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={() => onNavigate("/checkout")}
              className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition"
            >
              Proceed to Checkout
            </button>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-slate-100">
              <p className="text-[11px] text-slate-500 mb-1.5">Have a coupon?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800 uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-lg"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  },

  // 5. CHECKOUT PAGE (SCREEN 5)
  CheckoutPage: ({ cart, user, onNavigate, onPlaceOrder, settings }) => {
    const [step, setStep] = React.useState(1); // 1 Shipping, 2 Payment, 3 Review
    const [name, setName] = React.useState(user?.name || "Rahim Ahmed");
    const [phone, setPhone] = React.useState(user?.phone || "01712345678");
    const [email, setEmail] = React.useState(user?.email || "rahim@email.com");
    const [address, setAddress] = React.useState("House 12, Road 5, Dhanmondi");
    const [city, setCity] = React.useState("Dhaka");
    const [area, setArea] = React.useState("Dhanmondi");
    const [postalCode, setPostalCode] = React.useState("1205");
    const [deliveryNote, setDeliveryNote] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState("Cash on Delivery");
    const [trxId, setTrxId] = React.useState("");

    const subtotal = cart.reduce((a, b) => a + (b.price * b.quantity), 0);
    const deliveryCharge = 80;
    const grandTotal = subtotal + deliveryCharge;

    const handleOrderSubmit = (e) => {
      e.preventDefault();
      const order = onPlaceOrder({
        userId: user?.uid || "usr_guest",
        customerName: name,
        phone,
        email,
        address,
        city,
        area,
        postalCode,
        deliveryNote,
        paymentMethod,
        transactionId: trxId,
        products: cart,
        subtotal,
        deliveryCharge,
        grandTotal
      });
      onNavigate(`/order-success/${order.id}`);
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className={`font-bold ${step >= 1 ? "text-slate-900" : ""}`}>1. Shipping</span>
          <span className="w-8 h-px bg-slate-200"></span>
          <span className={`font-bold ${step >= 2 ? "text-slate-900" : ""}`}>2. Payment</span>
          <span className="w-8 h-px bg-slate-200"></span>
          <span className={`font-bold ${step >= 3 ? "text-slate-900" : ""}`}>3. Review</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping / Payment Form (2 cols) */}
          <form onSubmit={handleOrderSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
                Shipping Address
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Area</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Delivery Note (Optional)</label>
                <input
                  type="text"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Leave a note for the delivery person..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3 text-xs">
              <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
                Payment Method
              </h3>

              {["Cash on Delivery", "bKash", "Nagad", "Rocket"].map((method) => (
                <label key={method} className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="text-slate-900 focus:ring-0"
                  />
                  <span className="font-bold text-slate-800">{method}</span>
                </label>
              ))}

              {paymentMethod !== "Cash on Delivery" && (
                <div className="pt-2">
                  <label className="block text-slate-600 font-semibold mb-1">Transaction ID (TrxID) *</label>
                  <input
                    type="text"
                    required
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="e.g. 9J28DA10"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition mt-4"
              >
                Place Order
              </button>
            </div>
          </form>

          {/* Right Order Summary */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 h-fit text-xs">
            <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3">
                  <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 truncate">
                    <p className="font-bold text-slate-900 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-slate-900">৳ {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>৳ {deliveryCharge}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-black text-slate-950">
                <span>Grand Total</span>
                <span>৳ {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  // 6. ORDER SUCCESS PAGE
  OrderSuccessPage: ({ orderId, onNavigate }) => {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4 bg-white">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <Icons.CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Thank you for your order!</h2>
        <p className="text-xs text-slate-500">
          Your order <strong>#{orderId}</strong> has been received and confirmed.
        </p>
        <div className="pt-4 flex gap-3 justify-center">
          <button
            onClick={() => onNavigate("/orders")}
            className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
          >
            View Orders
          </button>
          <button
            onClick={() => onNavigate("/")}
            className="px-5 py-2.5 border border-slate-200 text-slate-800 text-xs rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  },

  // 7. USER ORDERS PAGE (SCREEN 6)
  OrdersPage: ({ user, onNavigate }) => {
    const orders = window.StoreService.getUserOrders(user?.uid || "usr_guest");
    const [activeTab, setActiveTab] = React.useState("All");

    const filteredOrders = orders.filter((o) => {
      if (activeTab === "All") return true;
      return o.orderStatus?.toLowerCase() === activeTab.toLowerCase();
    });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left User Menu */}
          <aside className="space-y-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => onNavigate("/orders")}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold"
            >
              My Orders
            </button>
            <button
              onClick={() => onNavigate("/wishlist")}
              className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-50"
            >
              Wishlist
            </button>
            <button
              onClick={() => onNavigate("/notifications")}
              className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-50"
            >
              Notifications
            </button>
            <button
              onClick={() => onNavigate("/profile")}
              className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-50"
            >
              Settings
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("shopbd_current_user");
                onNavigate("/login");
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50"
            >
              Logout
            </button>
          </aside>

          {/* Right Orders List */}
          <main className="md:col-span-3 space-y-4">
            <h2 className="text-base font-bold text-slate-900">My Orders</h2>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto text-xs pb-2 border-b border-slate-100">
              {["All", "Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    activeTab === tab ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="space-y-3">
              {filteredOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/80 text-xs"
                >
                  <div>
                    <strong className="text-slate-900 font-mono">#{o.id}</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="font-bold text-slate-900">৳ {o.grandTotal?.toLocaleString()}</span>

                  <span
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      o.orderStatus === "Delivered" ? "bg-emerald-50 text-emerald-600" :
                      o.orderStatus === "Confirmed" ? "bg-emerald-50 text-emerald-600" :
                      o.orderStatus === "Processing" ? "bg-amber-50 text-amber-600" :
                      "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {o.orderStatus}
                  </span>

                  <button
                    onClick={() => onNavigate(`/orders/${o.id}`)}
                    className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  },

  // 8. ORDER DETAILS
  OrderDetailsPage: ({ orderId, onNavigate }) => {
    const order = window.StoreService.getOrderById(orderId);
    if (!order) return <p className="p-8 text-center text-xs">Order not found.</p>;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 bg-white space-y-6 text-xs">
        <button onClick={() => onNavigate("/orders")} className="text-slate-500 hover:text-slate-900">
          ← Back to Orders
        </button>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Order #{order.id}</h2>
              <p className="text-slate-400 text-[11px]">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-900 text-white font-bold text-[11px]">
              {order.orderStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-slate-700">Customer Details:</p>
              <p className="text-slate-600">{order.customerName}</p>
              <p className="text-slate-600">{order.phone}</p>
              <p className="text-slate-600">{order.email}</p>
            </div>
            <div>
              <p className="font-bold text-slate-700">Delivery Address:</p>
              <p className="text-slate-600">{order.address}</p>
              <p className="text-slate-600">{order.city}, {order.postalCode}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2">Items:</h4>
            {order.products?.map((item, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-slate-50">
                <span>{item.name} ({item.size}) x {item.quantity}</span>
                <strong className="text-slate-900">৳ {(item.price * item.quantity).toLocaleString()}</strong>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 font-bold text-sm">
            <span>Grand Total:</span>
            <span className="text-slate-950 font-black">৳ {order.grandTotal?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  },

  // 9. AUTH PAGES
  LoginPage: ({ onLogin, onNavigate }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-5 text-xs">
        <h2 className="text-xl font-bold text-slate-900 text-center">Sign In</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onLogin(email, password);
            onNavigate("/");
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-slate-950 text-white font-bold rounded-lg hover:bg-slate-800"
          >
            Sign In
          </button>
        </form>
        <div className="text-center pt-2 text-slate-500">
          <p>Admin? <button onClick={() => onNavigate("/admin/login")} className="text-slate-900 underline font-bold">Admin Portal</button></p>
        </div>
      </div>
    );
  },

  RegisterPage: ({ onRegister, onNavigate }) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-5 text-xs">
        <h2 className="text-xl font-bold text-slate-900 text-center">Create Account</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onRegister({ name, email, password });
            onNavigate("/");
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-bold text-slate-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-slate-950 text-white font-bold rounded-lg hover:bg-slate-800"
          >
            Register
          </button>
        </form>
      </div>
    );
  },

  ProfilePage: ({ user, onUpdateProfile, onLogout, onNavigate }) => {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl border border-slate-200/80 space-y-4 text-xs">
        <h2 className="text-xl font-bold text-slate-900">User Profile</h2>
        <p><strong>Name:</strong> {user?.name || "Customer"}</p>
        <p><strong>Email:</strong> {user?.email || "customer@shopbd.com.bd"}</p>
        <div className="pt-4 flex gap-3">
          <button onClick={() => onNavigate("/orders")} className="px-4 py-2 bg-slate-900 text-white rounded-lg">
            My Orders
          </button>
          <button onClick={onLogout} className="px-4 py-2 border border-slate-200 text-slate-800 rounded-lg">
            Logout
          </button>
        </div>
      </div>
    );
  },

  ForgotPasswordPage: ({ onNavigate }) => (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-4 text-xs">
      <h2 className="text-base font-bold text-slate-900">Reset Password</h2>
      <p className="text-slate-500">Enter your email to receive recovery instructions.</p>
      <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg" />
      <button onClick={() => onNavigate("/login")} className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg">
        Send Instructions
      </button>
    </div>
  )
};
