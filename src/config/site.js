/**
 * ============================================================================
 * SHOP BD - SITE CONFIGURATION
 * ============================================================================
 * Centralized site metadata and primary public domain URL.
 * Used for dynamic product sharing links, Open Graph tags, and canonical links.
 * ============================================================================
 */
export const SITE_URL = "https://shopbd.com.bd";

export const siteConfig = {
  name: "Shop BD",
  tagline: "Fashion for a better you",
  description: "Modern fashion ecommerce platform for Bangladesh with premium clothing, shoes, bags, and accessories.",
  currency: "BDT",
  currencySymbol: "৳",
  country: "Bangladesh",
  contactPhone: "+880 1700-000000",
  contactEmail: "support@shopbd.com.bd",
  officeAddress: "House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh",
  socialLinks: {
    facebook: "https://facebook.com/shopbd",
    instagram: "https://instagram.com/shopbd",
    tiktok: "https://tiktok.com/@shopbd",
    youtube: "https://youtube.com/@shopbd",
    whatsapp: "+8801700000000",
    messenger: "https://m.me/shopbd"
  },
  defaultDeliveryCharge: {
    insideCity: 60,
    outsideCity: 120,
    freeShippingThreshold: 2000
  }
};
