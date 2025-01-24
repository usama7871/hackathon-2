//src/sanity/schemaTypes/product.ts
export const productSchema = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name'
        }
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number'
      },
      {
        name: 'salePrice',
        title: 'Sale Price',
        type: 'number'
      },
      {
        name: 'salePercentage',
        title: 'Sale Percentage',
        type: 'number' // Added salePercentage
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text'
      },
      {
        name: 'image',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'brand',
        title: 'Brand',
        type: 'string' // Added brand
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string' // Added category
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number' // Added rating
      },
      {
        name: 'reviewCount',
        title: 'Review Count',
        type: 'number' // Added reviewCount
      },

      {
        name: 'images',
        title: 'Additional Images',
        type: 'array',
        of: [{ type: 'image' }]
      },
      {
        name: 'features',
        title: 'Features',
        type: 'object',
        fields: [
          {
            name: 'highlights',
            title: 'Highlights',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'specifications',
            title: 'Specifications',
            type: 'object',
            fields: [
              { name: 'dimensions', type: 'string' },
              { name: 'weight', type: 'string' },
              { name: 'material', type: 'string' },
              {
                name: 'color',
                type: 'array',
                of: [{ type: 'string' }]
              },
              { name: 'warranty', type: 'string' },
              { name: 'inStock', type: 'boolean' },
              { name: 'stockCount', type: 'number' }
            ]
          }
        ]
      }
    ]
  }
