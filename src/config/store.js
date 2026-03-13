/**
 * ╔══════════════════════════════════════════════════════╗
 * ║           STORE CONFIGURATION FILE                  ║
 * ║  Edit this file to customize your store settings.   ║
 * ╚══════════════════════════════════════════════════════╝
 */

const STORE = {

  // ── Brand ────────────────────────────────────────────────────────────────
  name:        'ZUBZEN',          // First word of your store name
  nameAccent:  'Store',           // Second word (shown in accent color)
  tagline:     'Premium products, unbeatable prices.',

  // ── Hero Section ─────────────────────────────────────────────────────────
  hero: {
    badge:           '🔥 Summer Sale — Up to 50% Off',
    headline:        'Upgrade Your',
    headlineAccent:  'Tech Game',
    subtext:         'Shop the latest smartphones, headphones & accessories. Fast delivery, easy returns, secure checkout.',
    ctaPrimary:      'Shop Now',
    ctaSecondary:    'View Deals',
    stats: [
      { value: '500+',  label: 'Products' },
      { value: '10k+',  label: 'Customers' },
      { value: '4.9★',  label: 'Rating' },
    ],
  },

  // ── Promotional Banner (mid-page) ─────────────────────────────────────────
  promoBanner: {
    tag:   'Limited Time Offer',
    title: 'Exclusive Deals Just For You',
    sub:   'Don\'t miss out — prices drop every day',
    cta:   'Grab the Deal',
  },

  // ── Trust / Feature Bar ───────────────────────────────────────────────────
  features: [
    { icon: 'truck',    label: 'Free Shipping',   sub: 'On orders over $50'    },
    { icon: 'shield',   label: 'Secure Payment',  sub: '100% safe & protected' },
    { icon: 'refresh',  label: 'Easy Returns',    sub: '30-day return policy'  },
    { icon: 'support',  label: '24/7 Support',    sub: 'Always here to help'   },
  ],

  // ── Category Display Names ─────────────────────────────────────────────
  // Map your DB category slugs to display names & emoji icons
  categories: {
    mobile:    { label: 'Mobile Phones', emoji: '📱' },
    headphone: { label: 'Headphones',    emoji: '🎧' },
    laptop:    { label: 'Laptops',       emoji: '💻' },
    tablet:    { label: 'Tablets',       emoji: '📲' },
    watch:     { label: 'Smart Watches', emoji: '⌚' },
    camera:    { label: 'Cameras',       emoji: '📷' },
    // Add more as you create categories in the admin panel
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    about:     'Premium tech products at unbeatable prices. Trusted by over 10,000 happy customers worldwide.',
    copyright: '© 2025 ZUBZEN Store. All rights reserved.',
    links: {
      shop:    [['All Products', '/products'], ['New Arrivals', '/products'], ['Best Sellers', '/products']],
      account: [['My Profile', '/profile'], ['My Orders', '/myorders'], ['Cart', '/cart'], ['Sign In', '/login']],
    },
    social: {
      facebook:  '#',
      instagram: '#',
      twitter:   '#',
    },
    contact: {
      email: 'support@ZUBZENstore.com',
    },
  },

  // ── Announcement Bar ────────────────────────────────────────────────────
  // Set to null to hide
  announcement: '🎉 Free shipping on all orders this week! Use code: FREESHIP',

}

export default STORE
