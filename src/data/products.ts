export const products = [
  {
    id: "1",
    name: "Syltherine",
    price: 2500000,
    salePrice: 2000000,
    salePercentage: 20,
    image: "/Hero.png",
    images: ["/Hero.png", "/images.png", "/1.jpg"],
    description: "Stylish cafe chair with premium comfort and elegant design. Perfect for modern dining spaces.",
    features: {
      highlights: [
        "Premium comfort seating",
        "Ergonomic design for proper posture",
        "Durable construction for long-lasting use",
        "Easy to clean and maintain"
      ],
      specifications: {
        dimensions: "60cm x 80cm x 55cm",
        weight: "8 kg",
        material: "Premium Wood, Fabric, Metal",
        color: ["Black", "Brown", "Beige"],
        warranty: "2 Years Limited Warranty",
        inStock: true,
        stockCount: 15
      },
      rating: 4.5,
      reviewCount: 128,
      category: "Chair",
      tags: ["modern", "dining", "comfort", "premium"],
      brand: "Luxura Living",
      sku: "SYL-CH-001",
      manufacturingDate: "2023-10-15"
    },
    isNew: true,
    isBestSeller: true,
    availableSizes: ["Standard", "Large"],
    availableColors: ["Black", "Brown", "Beige"],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      shippingCost: 0
    }
  },
  {
    id: "2",
    name: "Jane Smith Collection",
    price: 2500000,
    salePrice: 1250000,
    salePercentage: 50,
    image: "/8.jpg",
    images: ["/8.jpg", "/11.jpg", "/13.jpg"],
    description: "A creative designer's masterpiece combining modern aesthetics with timeless comfort.",
    features: {
      highlights: [
        "Designer collection piece",
        "Premium leather upholstery",
        "Modular design for flexibility",
        "Built-in USB charging ports"
      ],
      specifications: {
        dimensions: "180cm x 90cm x 85cm",
        weight: "45 kg",
        material: "Premium Leather, Hardwood, Stainless Steel",
        color: ["Navy", "Purple", "Green"],
        warranty: "5 Years Limited Warranty",
        inStock: true,
        stockCount: 10
      },
      rating: 4.8,
      reviewCount: 256,
      category: "Sofa",
      tags: ["luxury", "modern", "designer", "smart-furniture"],
      brand: "JSC Design",
      sku: "JSC-SF-002",
      manufacturingDate: "2023-11-01"
    },
    isNew: true,
    isBestSeller: true,
    availableSizes: ["3-Seater", "2-Seater", "L-Shape"],
    availableColors: ["Navy", "Purple", "Green"],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 5,
      shippingCost: 0
    }
  },
  {
    id: "3",
    name: "Sam Wilson Desk",
    price: 2500000,
    image: "/1.jpg",
    images: ["/1.jpg", "/5.jpg", "/9.jpg"],
    description: "Elegant software engineering workstation with built-in cable management and ergonomic design.",
    features: {
      highlights: [
        "Built-in cable management",
        "Ergonomic height adjustment",
        "Spacious work surface",
        "Anti-scratch coating"
      ],
      specifications: {
        dimensions: "140cm x 75cm x 70cm",
        weight: "35 kg",
        material: "Oak Wood, Steel, Tempered Glass",
        color: ["Natural Oak", "Dark Walnut", "White"],
        warranty: "3 Years Limited Warranty",
        inStock: true,
        stockCount: 20
      },
      rating: 4.6,
      reviewCount: 89,
      category: "Desk",
      tags: ["workspace", "modern", "ergonomic"],
      brand: "Wilson Works",
      sku: "WW-DSK-003",
      manufacturingDate: "2023-09-15"
    },
    isNew: false,
    isBestSeller: true,
    availableSizes: ["Standard", "Large"],
    availableColors: ["Natural Oak", "Dark Walnut", "White"],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 4,
      shippingCost: 0
    }
  },
  {
    id: "4",
    name: "Ella Harper Lounge",
    price: 3000000,
    salePrice: 900000,
    salePercentage: 70,
    image: "/11.jpg",
    images: ["/11.jpg", "/13.jpg", "/19.jpg"],
    description: "Modern and minimalistic lounge chair perfect for reading corners and relaxation spaces.",
    features: {
      highlights: [
        "Ultra-comfortable design",
        "Premium velvet upholstery",
        "Adjustable reclining",
        "Ottoman included"
      ],
      specifications: {
        dimensions: "75cm x 85cm x 80cm",
        weight: "28 kg",
        material: "Velvet, Walnut Wood, Brass",
        color: ["Royal Blue", "Emerald", "Charcoal"],
        warranty: "2 Years Limited Warranty",
        inStock: true,
        stockCount: 8
      },
      rating: 4.7,
      reviewCount: 156,
      category: "Chair",
      tags: ["lounge", "comfort", "luxury"],
      brand: "Harper Home",
      sku: "HH-LNG-004",
      manufacturingDate: "2023-10-20"
    },
    isNew: true,
    isBestSeller: false,
    availableSizes: ["Standard"],
    availableColors: ["Royal Blue", "Emerald", "Charcoal"],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      shippingCost: 0
    }
  },
  {
    id: "5",
    name: "Mason Grey Dining Set",
    price: 2700000,
    salePrice: 1890000,
    salePercentage: 30,
    image: "/13.jpg",
    images: ["/13.jpg", "/19.jpg", "/Hero.png"],
    description: "Luxury comfort redefined in this contemporary dining set. Perfect for family gatherings.",
    features: {
      highlights: [
        "Complete 6-piece dining set",
        "Stain-resistant finish",
        "Comfortable padded seats",
        "Extendable table design"
      ],
      specifications: {
        dimensions: "160cm x 75cm x 90cm",
        weight: "85 kg",
        material: "Mahogany, Leather, Brushed Steel",
        color: ["Grey", "Cream", "Brown"],
        warranty: "5 Years Limited Warranty",
        inStock: true,
        stockCount: 5
      },
      rating: 4.9,
      reviewCount: 203,
      category: "Dining",
      tags: ["dining", "family", "luxury"],
      brand: "Mason Living",
      sku: "ML-DN-005",
      manufacturingDate: "2023-11-10"
    },
    isNew: false,
    isBestSeller: true,
    availableSizes: ["6-Seater", "8-Seater"],
    availableColors: ["Grey", "Cream", "Brown"],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 7,
      shippingCost: 0
    }
  },
  {
    id: "6",
    name: "Olivia Brown Bookshelf",
    price: 2900000,
    image: "/19.jpg",
    images: ["/19.jpg", "/9.jpg", "/5.jpg"],
    description: "Contemporary elegance for your living space with adjustable shelves and modern design.",
    features: {
      highlights: [
        "Adjustable shelf heights",
        "Built-in LED lighting",
        "Anti-tip safety feature",
        "Hidden storage compartments"
      ],
      specifications: {
        dimensions: "120cm x 200cm x 40cm",
        weight: "65 kg",
        material: "Bamboo, Steel, Glass",
        color: ["Espresso", "Natural", "White"],
        warranty: "3 Years Limited Warranty",
        inStock: true,
        stockCount: 12
      },
      rating: 4.4,
      reviewCount: 167,
      category: "Storage",
      tags: ["storage", "modern", "bookshelf"],
      brand: "OB Furniture",
      sku: "OB-BS-006",
      manufacturingDate: "2023-10-05"
    },
    isNew: false,
    isBestSeller: true,
    availableSizes: ["Standard", "Tall"],
    availableColors: ["Espresso", "Natural", "White"],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 5,
      shippingCost: 0
    }
  },
  {
    id: "7",
    name: "Ethan White Cabinet",
    price: 3200000,
    salePrice: 1920000,
    salePercentage: 40,
    image: "/9.jpg",
    images: ["/9.jpg", "/5.jpg", "/1.jpg"],
    description: "Timeless craftsmanship and design in a versatile storage solution for any room.",
    features: {
      highlights: [
        "Soft-close doors and drawers",
        "Tempered glass panels",
        "Adjustable shelving",
        "Cable management system"
      ],
      specifications: {
        dimensions: "100cm x 180cm x 45cm",
        weight: "55 kg",
        material: "Pine Wood, Metal, Glass",
        color: ["White", "Oak", "Black"],
        warranty: "4 Years Limited Warranty",
        inStock: true,
        stockCount: 15
      },
      rating: 4.3,
      reviewCount: 142,
      category: "Storage",
      tags: ["cabinet", "storage", "modern"],
      brand: "Ethan Home",
      sku: "EH-CB-007",
      manufacturingDate: "2023-09-20"
    },
    isNew: true,
    isBestSeller: false,
    availableSizes: ["Standard", "Large"],
    availableColors: ["White", "Oak", "Black"],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 4,
      shippingCost: 0
    }
  },
  {
    id: "8",
    name: "Sophia Green Coffee Table",
    price: 2800000,
    image: "/5.jpg",
    images: ["/5.jpg", "/1.jpg", "/Hero.png"],
    description: "Durable and stylish furniture solution with innovative storage compartments.",
    features: {
      highlights: [
        "Hidden storage compartment",
        "Scratch-resistant surface",
        "Modern geometric design",
        "Eco-friendly materials"
      ],
      specifications: {
        dimensions: "110cm x 45cm x 60cm",
        weight: "30 kg",
        material: "Reclaimed Wood, Steel, Tempered Glass",
        color: ["Forest Green", "Teal", "Sage"],
        warranty: "2 Years Limited Warranty",
        inStock: true,
        stockCount: 18
      },
      rating: 4.7,
      reviewCount: 189,
      category: "Table",
      tags: ["coffee-table", "storage", "eco-friendly"],
      brand: "Sophia Living",
      sku: "SL-CT-008",
      manufacturingDate: "2023-11-05"
    },
    isNew: false,
    isBestSeller: true,
    availableSizes: ["Standard"],
    availableColors: ["Forest Green", "Teal", "Sage"],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      shippingCost: 0
    }
  }
]; 