type Product = {
    title: string; // The title of the product
    slug: string; // The URL slug of the product
    summary: string; // A summary or description of the product
    discountedPrice: number; // The discounted price of the product
    price: number; // The regular price of the product
    image: string; // Array of image URLs associated with the product
    colors: string[]; // Array of color options available for the product
    sizeQuantities: {
      small: number; // Quantity of the small size
      medium: number; // Quantity of the medium size
      large: number; // Quantity of the large size
    };
    totalItems: number; // Total number of items available
    featured: boolean; // Whether the product is featured or not (converted to boolean from string)
    _id: string; // The unique identifier for the product
  };
  