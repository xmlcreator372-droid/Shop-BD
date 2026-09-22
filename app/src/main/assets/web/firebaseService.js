// Shop BD - Data & Firebase Layer (Exact Spec from Reference Design)
const STORAGE_PREFIX = "shopbd_";

const defaultSettings = {
  websiteName: "Shop BD",
  tagline: "Fashion for a better you.",
  logo: "",
  contactPhone: "+880 1700-000000",
  contactEmail: "support@shopbd.com.bd",
  officeAddress: "House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh",
  insideCityDeliveryCharge: 80,
  outsideCityDeliveryCharge: 120,
  freeShippingThreshold: 2500,
  whatsappNumber: "+8801700000000",
  whatsappPhoneId: "",
  whatsappBusinessAccountId: "",
  whatsappAccessToken: "",
  whatsappApiVersion: "v18.0",
  maintenanceMode: false,
  maintenanceTitle: "Under Scheduled Maintenance",
  maintenanceMessage: "We are currently improving Shop BD. We will be back shortly!",
  maintenanceReturnTime: "2 hours",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/8801700000000"
  },
  paymentMethods: [
    { id: "cod", name: "Cash on Delivery", active: true, instructions: "Pay with cash upon delivery.", fee: 0 },
    { id: "bkash", name: "bKash", active: true, accountNumber: "01700000000 (Merchant)", instructions: "Send Payment to our merchant number and enter Transaction ID.", fee: 0 },
    { id: "nagad", name: "Nagad", active: true, accountNumber: "01700000000 (Merchant)", instructions: "Send Payment to our Nagad merchant account and enter Transaction ID.", fee: 0 },
    { id: "rocket", name: "Rocket", active: true, accountNumber: "01700000000-8", instructions: "Send payment to Rocket number with 12th digit.", fee: 0 }
  ]
};

const getStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStorage = (key, data) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error("Storage write error", e);
  }
};

window.StoreService = {
  // Products
  getProducts: () => getStorage("products", []),
  saveProducts: (products) => setStorage("products", products),
  getProductById: (id) => {
    const list = getStorage("products", []);
    return list.find(p => String(p.id) === String(id));
  },
  addProduct: (product) => {
    const list = getStorage("products", []);
    const newProduct = {
      ...product,
      id: "prod_" + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.unshift(newProduct);
    setStorage("products", list);
    return newProduct;
  },
  updateProduct: (id, updates) => {
    const list = getStorage("products", []);
    const index = list.findIndex(p => String(p.id) === String(id));
    if (index !== -1) {
      list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
      setStorage("products", list);
      return list[index];
    }
    return null;
  },
  deleteProduct: (id) => {
    let list = getStorage("products", []);
    list = list.filter(p => String(p.id) !== String(id));
    setStorage("products", list);
  },

  // Categories
  getCategories: () => getStorage("categories", []),
  saveCategories: (categories) => setStorage("categories", categories),
  addCategory: (cat) => {
    const list = getStorage("categories", []);
    const newCat = { ...cat, id: "cat_" + Date.now(), createdAt: new Date().toISOString() };
    list.push(newCat);
    setStorage("categories", list);
    return newCat;
  },
  updateCategory: (id, updates) => {
    const list = getStorage("categories", []);
    const idx = list.findIndex(c => String(c.id) === String(id));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setStorage("categories", list);
      return list[idx];
    }
    return null;
  },
  deleteCategory: (id) => {
    let list = getStorage("categories", []);
    list = list.filter(c => String(c.id) !== String(id));
    setStorage("categories", list);
  },

  // Orders
  getOrders: () => getStorage("orders", []),
  getOrderById: (id) => {
    const list = getStorage("orders", []);
    return list.find(o => String(o.id) === String(id));
  },
  getUserOrders: (userId) => {
    const list = getStorage("orders", []);
    return list.filter(o => !userId || o.userId === userId || userId === "all" || o.userId === "usr_guest");
  },
  createOrder: (orderData) => {
    const list = getStorage("orders", []);
    const orderId = "SB" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      ...orderData,
      id: orderId,
      orderStatus: "Confirmed",
      paymentStatus: orderData.paymentMethod === "Cash on Delivery" ? "Pending" : "Submitted",
      createdAt: new Date().toISOString(),
      statusTimeline: [
        { status: "Order Placed", timestamp: new Date().toISOString(), note: "Order placed by customer." },
        { status: "Confirmed", timestamp: new Date().toISOString(), note: "Order confirmed automatically." }
      ]
    };
    list.unshift(newOrder);
    setStorage("orders", list);

    if (orderData.paymentMethod !== "Cash on Delivery" && orderData.transactionId) {
      const payments = getStorage("payments", []);
      payments.unshift({
        id: "pay_" + Date.now(),
        orderId: orderId,
        userId: orderData.userId,
        method: orderData.paymentMethod,
        amount: orderData.grandTotal,
        transactionId: orderData.transactionId,
        payerPhone: orderData.payerPhone || orderData.phone,
        status: "Submitted",
        createdAt: new Date().toISOString()
      });
      setStorage("payments", payments);
    }

    return newOrder;
  },
  updateOrderStatus: (orderId, newStatus, note = "") => {
    const list = getStorage("orders", []);
    const idx = list.findIndex(o => String(o.id) === String(orderId));
    if (idx !== -1) {
      list[idx].orderStatus = newStatus;
      if (!list[idx].statusTimeline) list[idx].statusTimeline = [];
      list[idx].statusTimeline.push({
        status: newStatus,
        timestamp: new Date().toISOString(),
        note: note || `Order status updated to ${newStatus}.`
      });
      if (newStatus === "Delivered" && list[idx].paymentMethod === "Cash on Delivery") {
        list[idx].paymentStatus = "Paid";
      }
      setStorage("orders", list);
      return list[idx];
    }
    return null;
  },

  // Payments
  getPayments: () => getStorage("payments", []),
  updatePaymentStatus: (id, status, note = "") => {
    const list = getStorage("payments", []);
    const idx = list.findIndex(p => String(p.id) === String(id));
    if (idx !== -1) {
      list[idx].status = status;
      list[idx].note = note;
      setStorage("payments", list);

      if (list[idx].orderId) {
        const orders = getStorage("orders", []);
        const oIdx = orders.findIndex(o => o.id === list[idx].orderId);
        if (oIdx !== -1) {
          orders[oIdx].paymentStatus = status === "Verified" ? "Paid" : status;
          setStorage("orders", orders);
        }
      }
      return list[idx];
    }
    return null;
  },

  // Coupons
  getCoupons: () => getStorage("coupons", []),
  saveCoupons: (coupons) => setStorage("coupons", coupons),
  addCoupon: (coupon) => {
    const list = getStorage("coupons", []);
    const newCoupon = { ...coupon, id: "cpn_" + Date.now(), usedCount: 0 };
    list.push(newCoupon);
    setStorage("coupons", list);
    return newCoupon;
  },
  deleteCoupon: (id) => {
    let list = getStorage("coupons", []);
    list = list.filter(c => String(c.id) !== String(id));
    setStorage("coupons", list);
  },

  // Banners & Offers
  getBanners: () => getStorage("banners", []),
  saveBanners: (banners) => setStorage("banners", banners),
  getOffers: () => getStorage("offers", []),
  saveOffers: (offers) => setStorage("offers", offers),

  // Reviews
  getReviews: (productId = null) => {
    const list = getStorage("reviews", []);
    if (productId) {
      return list.filter(r => String(r.productId) === String(productId));
    }
    return list;
  },
  addReview: (review) => {
    const list = getStorage("reviews", []);
    const newReview = {
      ...review,
      id: "rev_" + Date.now(),
      status: "approved",
      createdAt: new Date().toISOString()
    };
    list.unshift(newReview);
    setStorage("reviews", list);
    return newReview;
  },

  // Notifications
  getNotifications: (userId) => {
    const list = getStorage("notifications", []);
    return list.filter(n => n.userId === userId || n.targetAudience === "all");
  },

  // Settings
  getSettings: () => getStorage("settings", defaultSettings),
  updateSettings: (newSettings) => {
    const current = getStorage("settings", defaultSettings);
    const merged = { ...current, ...newSettings };
    setStorage("settings", merged);
    return merged;
  },

  // WhatsApp Workflow
  triggerWhatsAppConfirmation: (order, settings) => {
    const customerPhone = order.phone.replace(/[^0-9]/g, "");
    const formattedPhone = customerPhone.startsWith("88") ? customerPhone : "88" + customerPhone;
    const message = `*Shop BD*\nHello ${order.customerName},\nYour order has been confirmed!\n\n*Order ID:* ${order.id}\n*Total:* ৳ ${order.grandTotal.toLocaleString()}\n*Payment Method:* ${order.paymentMethod}\n*Delivery Address:* ${order.address}, ${order.city}\n*Order Status:* Confirmed\n\nThank you for shopping with Shop BD.`;

    const logs = getStorage("whatsappNotifications", []);
    logs.unshift({
      id: "wa_" + Date.now(),
      orderId: order.id,
      phone: formattedPhone,
      message,
      status: "Manual_Fallback",
      timestamp: new Date().toISOString()
    });
    setStorage("whatsappNotifications", logs);

    const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    return { waUrl, message };
  },

  // Default Categories & Products Seed (Matches image.png exactly)
  seedDefaultStore: () => {
    const categories = [
      { id: "cat_men", name: "Men", slug: "men", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80", description: "Men's fashion", status: "active", displayOrder: 1 },
      { id: "cat_women", name: "Women", slug: "women", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80", description: "Women's fashion", status: "active", displayOrder: 2 },
      { id: "cat_kids", name: "Kids", slug: "kids", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80", description: "Kids collection", status: "active", displayOrder: 3 },
      { id: "cat_shoes", name: "Shoes", slug: "shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80", description: "Footwear & sneakers", status: "active", displayOrder: 4 },
      { id: "cat_bags", name: "Bags", slug: "bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80", description: "Luxury bags & backpacks", status: "active", displayOrder: 5 },
      { id: "cat_accessories", name: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80", description: "Sunglasses, watches, accessories", status: "active", displayOrder: 6 }
    ];

    const products = [
      {
        id: "prod_1",
        name: "Men's Casual Shirt",
        sku: "SBD-MSH-001",
        brand: "H&M",
        category: "Men",
        subcategory: "Shirts",
        description: "Premium tailored olive green casual cotton shirt with breathable weave, button-down collar, and modern relaxed comfort fit.",
        shortDescription: "Tailored olive green casual button-up shirt.",
        purchasePrice: 750,
        originalPrice: 1800,
        sellingPrice: 1250,
        discount: 31,
        stock: 45,
        minStock: 5,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["#2E4A32", "#1E293B", "#FFFFFF", "#B45309", "#0284C7"],
        images: [
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["shirt", "menswear", "casual", "cotton"],
        featured: true,
        bestSeller: true,
        newArrival: true,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.5,
        reviewCount: 124,
        shippingInfo: "Delivery inside Dhaka in 24-48 hours. Outside Dhaka in 3-4 days.",
        returnPolicy: "7 days easy exchange and return policy."
      },
      {
        id: "prod_2",
        name: "Women's Floral Dress",
        sku: "SBD-WDR-002",
        brand: "Zara",
        category: "Women",
        subcategory: "Dresses",
        description: "Elegant floral print summer midi dress tailored from ultra-light chiffon with a comfortable cinched waist.",
        shortDescription: "Floral midi dress with graceful silhouette.",
        purchasePrice: 1500,
        originalPrice: 3200,
        sellingPrice: 2450,
        discount: 23,
        stock: 32,
        minStock: 4,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["#F43F5E", "#EC4899", "#E11D48"],
        images: [
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["dress", "floral", "women"],
        featured: true,
        bestSeller: false,
        newArrival: true,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.8,
        reviewCount: 86,
        shippingInfo: "Fast express delivery across all 64 districts.",
        returnPolicy: "7 days easy exchange and return policy."
      },
      {
        id: "prod_3",
        name: "Running Shoes",
        sku: "SBD-SH-003",
        brand: "Nike",
        category: "Shoes",
        subcategory: "Sneakers",
        description: "High-cushion lightweight mesh running and training sneakers designed for maximum comfort and traction.",
        shortDescription: "Athletic running shoes with responsive sole.",
        purchasePrice: 2000,
        originalPrice: 4500,
        sellingPrice: 3200,
        discount: 28,
        stock: 28,
        minStock: 5,
        sizes: ["39", "40", "41", "42", "43", "44"],
        colors: ["#94A3B8", "#1E293B", "#FFFFFF"],
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["shoes", "running", "sneakers"],
        featured: true,
        bestSeller: true,
        newArrival: true,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.7,
        reviewCount: 102,
        shippingInfo: "Protective branded packaging.",
        returnPolicy: "7 days size exchange."
      },
      {
        id: "prod_4",
        name: "Laptop Backpack",
        sku: "SBD-BAG-004",
        brand: "Samsonite",
        category: "Bags",
        subcategory: "Backpacks",
        description: "Matte black ergonomic laptop backpack with padded 15.6 inch compartment and water-resistant fabric.",
        shortDescription: "Slim executive laptop backpack with anti-theft storage.",
        purchasePrice: 1700,
        originalPrice: 3500,
        sellingPrice: 2800,
        discount: 20,
        stock: 19,
        minStock: 3,
        sizes: ["One Size"],
        colors: ["#000000", "#1E293B"],
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["backpack", "laptop", "bags"],
        featured: true,
        bestSeller: true,
        newArrival: true,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.9,
        reviewCount: 64,
        shippingInfo: "Shipped in safe waterproof casing.",
        returnPolicy: "7 days replacement warranty."
      },
      {
        id: "prod_5",
        name: "Men's Watch",
        sku: "SBD-ACC-005",
        brand: "Fossil",
        category: "Accessories",
        subcategory: "Watches",
        description: "Matte black precision quartz wristwatch with genuine leather strap and scratch-proof crystal dial.",
        shortDescription: "Minimalist black dial leather watch.",
        purchasePrice: 2700,
        originalPrice: 6000,
        sellingPrice: 4500,
        discount: 25,
        stock: 14,
        minStock: 2,
        sizes: ["Standard"],
        colors: ["#000000", "#78350F"],
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["watch", "accessories", "black"],
        featured: true,
        bestSeller: false,
        newArrival: true,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.6,
        reviewCount: 48,
        shippingInfo: "Shipped in luxury presentation box.",
        returnPolicy: "1 year mechanical warranty + 7 days return."
      },
      {
        id: "prod_6",
        name: "Sunglasses",
        sku: "SBD-ACC-006",
        brand: "Ray-Ban",
        category: "Accessories",
        subcategory: "Eyewear",
        description: "Classic polarized UV400 dark sunglasses with lightweight durable frame and glare-reduction lenses.",
        shortDescription: "Classic dark polarized sunglasses.",
        purchasePrice: 700,
        originalPrice: 1900,
        sellingPrice: 1200,
        discount: 35,
        stock: 25,
        minStock: 5,
        sizes: ["Standard"],
        colors: ["#000000"],
        images: [
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["sunglasses", "accessories"],
        featured: true,
        bestSeller: false,
        newArrival: true,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.4,
        reviewCount: 75,
        shippingInfo: "Includes protective case & microfiber wipe.",
        returnPolicy: "7 days easy replacement."
      },
      {
        id: "prod_7",
        name: "Classic T-Shirt",
        sku: "SBD-TSH-007",
        brand: "H&M",
        category: "Men",
        subcategory: "T-Shirts",
        description: "Clean organic cotton crewneck short sleeve t-shirt with premium ribbed collar and relaxed drape.",
        shortDescription: "Everyday solid white crewneck t-shirt.",
        purchasePrice: 450,
        originalPrice: 1200,
        sellingPrice: 850,
        discount: 29,
        stock: 50,
        minStock: 5,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#FFFFFF", "#000000", "#1E293B"],
        images: [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["t-shirt", "men", "cotton"],
        featured: true,
        bestSeller: true,
        newArrival: false,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.6,
        reviewCount: 92,
        shippingInfo: "Fast express delivery across Bangladesh.",
        returnPolicy: "7 days easy exchange."
      },
      {
        id: "prod_8",
        name: "Women Handbag",
        sku: "SBD-BAG-008",
        brand: "Michael Kors",
        category: "Bags",
        subcategory: "Handbags",
        description: "Structured luxury faux leather handbag with golden hardware, dual carry handles, and detachable shoulder strap.",
        shortDescription: "Structured brown leather luxury handbag.",
        purchasePrice: 1300,
        originalPrice: 3100,
        sellingPrice: 2200,
        discount: 27,
        stock: 22,
        minStock: 3,
        sizes: ["Standard"],
        colors: ["#78350F", "#000000"],
        images: [
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["handbag", "women", "leather"],
        featured: true,
        bestSeller: true,
        newArrival: false,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.7,
        reviewCount: 54,
        shippingInfo: "Delivered in dust bag.",
        returnPolicy: "7 days return policy."
      },
      {
        id: "prod_9",
        name: "Sports Shoes",
        sku: "SBD-SH-009",
        brand: "Adidas",
        category: "Shoes",
        subcategory: "Athletic",
        description: "High-performance athletic running and gym sneakers with energy return boost midsole and rubber grip.",
        shortDescription: "Navy blue athletic training shoes.",
        purchasePrice: 2200,
        originalPrice: 5100,
        sellingPrice: 3500,
        discount: 30,
        stock: 30,
        minStock: 4,
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["#1E3A8A", "#000000", "#FFFFFF"],
        images: [
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["shoes", "sports", "running"],
        featured: true,
        bestSeller: true,
        newArrival: false,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.8,
        reviewCount: 68,
        shippingInfo: "Delivered within 2-3 business days.",
        returnPolicy: "7 days easy size exchange."
      },
      {
        id: "prod_10",
        name: "Kids Hoodie",
        sku: "SBD-KID-010",
        brand: "Junior Vibe",
        category: "Kids",
        subcategory: "Hoodies",
        description: "Cozy fleece-lined pullover hoodie with front pouch pocket, soft ribbed cuffs, and skin-safe cotton blend.",
        shortDescription: "Navy warm fleece hoodie for boys and girls.",
        purchasePrice: 1100,
        originalPrice: 2600,
        sellingPrice: 1800,
        discount: 28,
        stock: 24,
        minStock: 4,
        sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
        colors: ["#1E3A8A", "#B91C1C", "#4B5563"],
        images: [
          "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["kids", "hoodie", "warm"],
        featured: true,
        bestSeller: true,
        newArrival: true,
        trending: false,
        sale: true,
        status: "published",
        rating: 4.5,
        reviewCount: 38,
        shippingInfo: "Shipped in 24 hours.",
        returnPolicy: "7 days exchange."
      },
      {
        id: "prod_11",
        name: "Leather Bag",
        sku: "SBD-BAG-011",
        brand: "Heritage Craft",
        category: "Bags",
        subcategory: "Tote",
        description: "Classic rich brown leather tote bag with roomy compartments, phone holder, and sturdy zip closure.",
        shortDescription: "Premium rich brown leather shoulder bag.",
        purchasePrice: 2100,
        originalPrice: 4500,
        sellingPrice: 3500,
        discount: 22,
        stock: 16,
        minStock: 3,
        sizes: ["Standard"],
        colors: ["#78350F", "#000000"],
        images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["leather", "bag", "tote"],
        featured: false,
        bestSeller: true,
        newArrival: true,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.7,
        reviewCount: 42,
        shippingInfo: "Delivered in protective bag.",
        returnPolicy: "7 days warranty."
      },
      {
        id: "prod_12",
        name: "Sports Jacket",
        sku: "SBD-JKT-012",
        brand: "Puma",
        category: "Men",
        subcategory: "Jackets",
        description: "Water-resistant olive windbreaker sports jacket with breathable inner lining, zip pockets, and adjustable hood.",
        shortDescription: "Olive sports windbreaker jacket.",
        purchasePrice: 1700,
        originalPrice: 3900,
        sellingPrice: 2900,
        discount: 26,
        stock: 20,
        minStock: 4,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#2E4A32", "#1E293B"],
        images: [
          "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80"
        ],
        tags: ["jacket", "sports", "windbreaker"],
        featured: false,
        bestSeller: false,
        newArrival: true,
        trending: true,
        sale: true,
        status: "published",
        rating: 4.8,
        reviewCount: 33,
        shippingInfo: "Delivered in 2-3 days.",
        returnPolicy: "7 days easy replacement."
      }
    ];

    const banners = [
      {
        id: "ban_hero_1",
        type: "hero",
        title: "Style for Every You",
        subtitle: "Discover the latest fashion trends and best deals in Bangladesh.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&auto=format&fit=crop&q=80",
        buttonText: "Shop Now",
        buttonUrl: "/shop",
        active: true,
        displayOrder: 1
      },
      {
        id: "ban_promo_1",
        type: "promotional",
        title: "Up to 50% Off",
        subtitle: "Limited Time Offer",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
        buttonText: "Shop Now",
        buttonUrl: "/shop",
        active: true,
        displayOrder: 2
      }
    ];

    const coupons = [
      {
        id: "cpn_eid26",
        code: "EID2026",
        discountType: "percentage",
        discountValue: 15,
        minOrder: 1500,
        maxDiscount: 500,
        usageLimit: 500,
        usedCount: 14,
        startDate: "2026-01-01",
        expiryDate: "2026-12-31",
        status: "active"
      },
      {
        id: "cpn_first100",
        code: "WELCOME100",
        discountType: "fixed",
        discountValue: 100,
        minOrder: 1000,
        maxDiscount: 100,
        usageLimit: 1000,
        usedCount: 45,
        startDate: "2026-01-01",
        expiryDate: "2026-12-31",
        status: "active"
      }
    ];

    const sampleOrders = [
      {
        id: "SB123456",
        userId: "usr_guest",
        customerName: "Rahim Ahmed",
        phone: "01712345678",
        email: "rahim@email.com",
        address: "House 12, Road 5, Dhanmondi",
        city: "Dhaka",
        area: "Dhanmondi",
        postalCode: "1205",
        deliveryNote: "",
        products: [
          { productId: "prod_1", name: "Men's Casual Shirt", price: 1250, size: "L", color: "#2E4A32", quantity: 1, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300" },
          { productId: "prod_7", name: "Classic T-Shirt", price: 850, size: "M", color: "#FFFFFF", quantity: 1, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300" }
        ],
        subtotal: 2770,
        deliveryCharge: 80,
        grandTotal: 2850,
        paymentMethod: "bKash",
        paymentStatus: "Paid",
        orderStatus: "Confirmed",
        createdAt: "2025-05-14T10:30:00.000Z",
        statusTimeline: [
          { status: "Order Placed", timestamp: "2025-05-14T10:30:00.000Z", note: "Order placed." },
          { status: "Confirmed", timestamp: "2025-05-14T11:00:00.000Z", note: "Order verified & confirmed." }
        ]
      },
      {
        id: "SB123455",
        userId: "usr_guest",
        customerName: "Ayesha Islam",
        phone: "01812345679",
        email: "ayesha@email.com",
        address: "Flat 4B, Gulshan 2",
        city: "Dhaka",
        area: "Gulshan",
        postalCode: "1212",
        deliveryNote: "",
        products: [
          { productId: "prod_6", name: "Sunglasses", price: 1200, size: "Standard", color: "#000000", quantity: 1, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300" }
        ],
        subtotal: 1570,
        deliveryCharge: 80,
        grandTotal: 1650,
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pending",
        orderStatus: "Processing",
        createdAt: "2025-05-14T09:15:00.000Z",
        statusTimeline: [
          { status: "Order Placed", timestamp: "2025-05-14T09:15:00.000Z", note: "Order placed." },
          { status: "Processing", timestamp: "2025-05-14T10:00:00.000Z", note: "Packing at warehouse." }
        ]
      },
      {
        id: "SB123454",
        userId: "usr_guest",
        customerName: "Tanvir Hossain",
        phone: "01912345670",
        email: "tanvir@email.com",
        address: "GEC Circle",
        city: "Chittagong",
        area: "Nasirabad",
        postalCode: "4000",
        deliveryNote: "",
        products: [
          { productId: "prod_3", name: "Running Shoes", price: 3200, size: "42", color: "#94A3B8", quantity: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" }
        ],
        subtotal: 3980,
        deliveryCharge: 120,
        grandTotal: 4100,
        paymentMethod: "Nagad",
        paymentStatus: "Paid",
        orderStatus: "Shipped",
        createdAt: "2025-05-12T14:20:00.000Z",
        statusTimeline: [
          { status: "Order Placed", timestamp: "2025-05-12T14:20:00.000Z", note: "Order placed." },
          { status: "Confirmed", timestamp: "2025-05-12T15:00:00.000Z", note: "Confirmed." },
          { status: "Shipped", timestamp: "2025-05-13T09:00:00.000Z", note: "Handed over to courier." }
        ]
      },
      {
        id: "SB123453",
        userId: "usr_guest",
        customerName: "Samiya Akter",
        phone: "01612345671",
        email: "samiya@email.com",
        address: "Kumarpara, Sylhet",
        city: "Sylhet",
        area: "Kumarpara",
        postalCode: "3100",
        deliveryNote: "",
        products: [
          { productId: "prod_6", name: "Sunglasses", price: 1200, size: "Standard", color: "#000000", quantity: 1, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300" }
        ],
        subtotal: 1170,
        deliveryCharge: 80,
        grandTotal: 1250,
        paymentMethod: "Rocket",
        paymentStatus: "Paid",
        orderStatus: "Delivered",
        createdAt: "2025-05-11T11:45:00.000Z",
        statusTimeline: [
          { status: "Order Placed", timestamp: "2025-05-11T11:45:00.000Z", note: "Order placed." },
          { status: "Delivered", timestamp: "2025-05-13T16:00:00.000Z", note: "Delivered to recipient." }
        ]
      }
    ];

    setStorage("categories", categories);
    setStorage("products", products);
    setStorage("banners", banners);
    setStorage("coupons", coupons);
    setStorage("orders", sampleOrders);
    setStorage("settings", defaultSettings);

    return { categories, products, banners, coupons, orders: sampleOrders };
  }
};
