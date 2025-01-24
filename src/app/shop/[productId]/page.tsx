import { client } from "@/sanity/lib/sanity";
import ProductDetails from "@/components/Shop/ProductDetails";

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    _id
  }`;
  
  const products = await client.fetch(query);
  return products.map((product: any) => ({
    productId: product._id
  }));
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    name,
    price,
    salePrice,
    description,
    "image": image.asset->url,
    "images": images[].asset->url,
    features {
      highlights,
      specifications {
        dimensions,
        weight,
        material,
        color,
        warranty,
        inStock,
        stockCount
      }
    }
  }`;

  const product = await client.fetch(query, { id: params.productId });

  // Transform the data to match your component props
  const transformedProduct = {
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    salePrice: product.salePrice,
    imageUrl: product.image,
    images: product.images,
    features: product.features,
    colors: product.features.specifications.color,
    ratings: 4.5, // Default value
    isNew: false,
    isBestSeller: false,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      shippingCost: 0
    },
    availableSizes: ["Standard"],
    availableColors: product.features.specifications.color
  };

  return <ProductDetails {...transformedProduct} />;
}