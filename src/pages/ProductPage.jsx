import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingBag,
  Eye,
  Heart,
  ArrowLeft,
  Star,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import VtonModal from "../components/vton/VtonModal";
import styles from "../styles/ProductPage.module.css";

// Mock product catalog (matches BrowsePage data)
const allProducts = [
  {
    id: 1,
    name: "Classic Abaya",
    price: 299.99,
    image:
      "https://via.placeholder.com/600x800/8B4852/FFFFFF?text=Classic+Abaya",
    images: [
      "https://via.placeholder.com/600x800/8B4852/FFFFFF?text=Classic+Abaya",
      "https://via.placeholder.com/600x800/6d3640/FFFFFF?text=Back+View",
      "https://via.placeholder.com/600x800/a85a66/FFFFFF?text=Detail",
    ],
    brand: "Dar Zain",
    category: "Abayas",
    rating: 4.8,
    reviews: 124,
    description:
      "A timeless classic abaya crafted from premium crepe fabric. Features delicate hand-stitched detailing along the sleeves and hem, perfect for both everyday elegance and special occasions.",
    details: [
      "Premium crepe fabric",
      "Hand-stitched detailing",
      "Relaxed, flowing silhouette",
      "Front button closure",
      "Side pockets",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#2d2d2d" },
      { name: "Navy", hex: "#1a2744" },
      { name: "Burgundy", hex: "#8B4852" },
    ],
    vtonReady: true,
  },
  {
    id: 2,
    name: "Embroidered Kaftan",
    price: 399.99,
    image:
      "https://via.placeholder.com/600x800/D4AF7A/FFFFFF?text=Embroidered+Kaftan",
    images: [
      "https://via.placeholder.com/600x800/D4AF7A/FFFFFF?text=Embroidered+Kaftan",
      "https://via.placeholder.com/600x800/b8925a/FFFFFF?text=Back+View",
      "https://via.placeholder.com/600x800/e8cfa0/FFFFFF?text=Detail",
    ],
    brand: "Lulwa Studio",
    category: "Kaftans",
    rating: 4.9,
    reviews: 89,
    description:
      "Exquisite kaftan adorned with intricate gold embroidery inspired by traditional arabesque motifs. A statement piece that celebrates heritage with a modern twist.",
    details: [
      "Luxurious silk blend",
      "Hand-embroidered gold thread",
      "Traditional arabesque motifs",
      "Relaxed fit",
      "Dry clean only",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Gold", hex: "#D4AF7A" },
      { name: "Ivory", hex: "#F7F3ED" },
    ],
    vtonReady: true,
  },
  {
    id: 3,
    name: "Silk Jalabiya",
    price: 449.99,
    image:
      "https://via.placeholder.com/600x800/A8B5A0/FFFFFF?text=Silk+Jalabiya",
    images: [
      "https://via.placeholder.com/600x800/A8B5A0/FFFFFF?text=Silk+Jalabiya",
      "https://via.placeholder.com/600x800/8a9c80/FFFFFF?text=Back+View",
      "https://via.placeholder.com/600x800/c4cfc0/FFFFFF?text=Detail",
    ],
    brand: "Ghaya Collection",
    category: "Jalabiyas",
    rating: 4.7,
    reviews: 56,
    description:
      "A flowing silk jalabiya in sage green with subtle crystal beading at the neckline. Effortlessly blends comfort with sophistication for evening gatherings.",
    details: [
      "100% pure silk",
      "Crystal bead neckline",
      "Floor-length cut",
      "Hidden side zip",
      "Comes with matching belt",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Sage", hex: "#A8B5A0" },
      { name: "Blush", hex: "#d4a8a8" },
      { name: "Ivory", hex: "#F7F3ED" },
    ],
    vtonReady: true,
  },
  {
    id: 4,
    name: "Beaded Dress",
    price: 549.99,
    image:
      "https://via.placeholder.com/600x800/6d3640/FFFFFF?text=Beaded+Dress",
    images: [
      "https://via.placeholder.com/600x800/6d3640/FFFFFF?text=Beaded+Dress",
      "https://via.placeholder.com/600x800/8B4852/FFFFFF?text=Back+View",
      "https://via.placeholder.com/600x800/a85a66/FFFFFF?text=Detail",
    ],
    brand: "Oud & Silk",
    category: "Dresses",
    rating: 4.6,
    reviews: 42,
    description:
      "A stunning beaded dress featuring thousands of hand-sewn beads creating an ombré pattern. Designed for galas, weddings, and memorable celebrations.",
    details: [
      "Hand-sewn beading throughout",
      "Ombré bead pattern",
      "Fitted bodice with flared skirt",
      "Hidden back zipper",
      "Fully lined",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Burgundy", hex: "#6d3640" },
      { name: "Midnight", hex: "#1a1a2e" },
    ],
    vtonReady: false,
  },
  {
    id: 5,
    name: "Luxury Abaya",
    price: 649.99,
    image:
      "https://via.placeholder.com/600x800/3A302B/FFFFFF?text=Luxury+Abaya",
    images: [
      "https://via.placeholder.com/600x800/3A302B/FFFFFF?text=Luxury+Abaya",
      "https://via.placeholder.com/600x800/5c4f48/FFFFFF?text=Back+View",
      "https://via.placeholder.com/600x800/8a7d76/FFFFFF?text=Detail",
    ],
    brand: "Al Waha",
    category: "Abayas",
    rating: 5.0,
    reviews: 31,
    description:
      "The pinnacle of abaya craftsmanship. Features Swarovski crystal embellishments and a structured shoulder that creates a powerful, elegant silhouette.",
    details: [
      "Premium Japanese crepe",
      "Swarovski crystal accents",
      "Structured shoulder design",
      "Comes with storage garment bag",
      "Certificate of authenticity",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#3A302B" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    vtonReady: true,
  },
  {
    id: 6,
    name: "Designer Kaftan",
    price: 749.99,
    image:
      "https://via.placeholder.com/600x800/b8925a/FFFFFF?text=Designer+Kaftan",
    images: [
      "https://via.placeholder.com/600x800/b8925a/FFFFFF?text=Designer+Kaftan",
      "https://via.placeholder.com/600x800/D4AF7A/FFFFFF?text=Back+View",
      "https://via.placeholder.com/600x800/e8cfa0/FFFFFF?text=Detail",
    ],
    brand: "Zomoroda",
    category: "Kaftans",
    rating: 4.9,
    reviews: 67,
    description:
      "A masterpiece kaftan featuring laser-cut geometric overlays and metallic thread-work. Each piece is numbered as part of a limited collection.",
    details: [
      "Limited edition — numbered",
      "Laser-cut geometric overlay",
      "Metallic thread-work",
      "Silk charmeuse lining",
      "Handmade in Dubai",
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Gold", hex: "#b8925a" },
      { name: "Rose Gold", hex: "#c9a08a" },
    ],
    vtonReady: true,
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [vtonOpen, setVtonOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.notFound}>
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/browse" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Browse
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link to="/browse">Browse</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        <div className={styles.productLayout}>
          {/* Left — Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={styles.heroImage}
              />
              {product.vtonReady && (
                <span className={styles.vtonBadge}>VTON Ready</span>
              )}
            </div>
            <div className={styles.thumbnails}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumbnail} ${i === selectedImage ? styles.thumbnailActive : ""}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div className={styles.productInfo}>
            <p className={styles.brand}>{product.brand}</p>
            <h1 className={styles.productName}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < Math.floor(product.rating) ? "var(--gold)" : "none"
                    }
                    stroke={
                      i < Math.floor(product.rating)
                        ? "var(--gold)"
                        : "var(--charcoal-muted)"
                    }
                  />
                ))}
              </div>
              <span className={styles.ratingText}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className={styles.price}>${product.price.toFixed(2)}</p>

            <p className={styles.description}>{product.description}</p>

            {/* Color Selector */}
            <div className={styles.optionGroup}>
              <h4 className={styles.optionLabel}>
                Color: <span>{product.colors[selectedColor].name}</span>
              </h4>
              <div className={styles.colorOptions}>
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    className={`${styles.colorSwatch} ${i === selectedColor ? styles.colorActive : ""}`}
                    style={{ background: color.hex }}
                    onClick={() => setSelectedColor(i)}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className={styles.optionGroup}>
              <h4 className={styles.optionLabel}>Size</h4>
              <div className={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${selectedSize === size ? styles.sizeActive : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} />
                <span>{addedToCart ? "Added!" : "Add to Cart"}</span>
              </button>

              <button
                className={styles.wishlistButton}
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={22}
                  fill={isWishlisted ? "var(--burgundy)" : "none"}
                  stroke="var(--burgundy)"
                />
              </button>
            </div>

            {/* VTON Button */}
            {product.vtonReady && (
              <button
                className={styles.tryOnButton}
                onClick={() => setVtonOpen(true)}
              >
                <Eye size={22} />
                <span>Virtual Try-On</span>
                <span className={styles.tryOnTag}>AI Powered</span>
              </button>
            )}

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <Truck size={18} />
                <span>Free Shipping</span>
              </div>
              <div className={styles.trustItem}>
                <RotateCcw size={18} />
                <span>30-Day Returns</span>
              </div>
              <div className={styles.trustItem}>
                <Shield size={18} />
                <span>Authenticity Guaranteed</span>
              </div>
            </div>

            {/* Details List */}
            <div className={styles.detailsSection}>
              <h4 className={styles.detailsTitle}>Product Details</h4>
              <ul className={styles.detailsList}>
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Virtual Try-On Modal */}
      <VtonModal isOpen={vtonOpen} onClose={() => setVtonOpen(false)} />
    </div>
  );
}
