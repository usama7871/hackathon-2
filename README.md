
```markdown
# 🛋️ Funiro - Modern Furniture E-commerce

<div align="center">
  <img src="/Logo.png" alt="Funiro Logo" width="200"/>
  <p>A modern, responsive e-commerce platform for luxury furniture.</p>
</div>

---

## ✨ Features

- 🎨 Modern, minimalist design
- 📱 Fully responsive layout
- 🛒 Real-time cart management
- 💳 Secure checkout process
- 🔍 Advanced product filtering
- 🖼️ Dynamic image galleries
- 🌙 Smooth animations
- 🔒 User authentication
- 💖 Wishlist functionality
- 🔄 Product comparison

---

## 🚀 Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Context API
- **Icons:** Lucide Icons
- **Form Handling:** React Hook Form
- **Image Optimization:** Next/Image
- **Type Safety:** TypeScript

---

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/usama7871/hackathon-2.git
   cd hackathon-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```
funiro/
├── src/
│   ├── app/ # App router pages
│   │   ├── about/ # About page
│   │   │   └── page.tsx # About page component
│   │   ├── blog/ # Blog pages
│   │   │   ├── [slug]/ # Dynamic blog post pages
│   │   │   │   └── page.tsx # Blog post component
│   │   │   ├── category/ # Blog category pages
│   │   │   │   ├── [category]/ # Dynamic category pages
│   │   │   │   │   └── page.tsx # Category page component
│   │   │   └── tag/ # Blog tag pages
│   │   │       ├── [tag]/ # Dynamic tag pages
│   │   │       │   └── page.tsx # Tag page component
│   │   ├── cart/ # Cart page
│   │   │   └── page.tsx # Cart page component
│   │   ├── checkout/ # Checkout pages
│   │   │   ├── page.tsx # Checkout page component
│   │   │   └── success/ # Checkout success page
│   │   │       └── page.tsx # Success page component
│   │   ├── compare/ # Compare page
│   │   │   └── page.tsx # Compare page component
│   │   ├── contact/ # Contact page
│   │   │   └── page.tsx # Contact page component
│   │   ├── shop/ # Shop pages
│   │   │   ├── [productId]/ # Dynamic product detail pages
│   │   │   │   └── page.tsx # Product detail component
│   │   │   └── page.tsx # Shop page component
│   │   ├── wishlist/ # Wishlist page
│   │   │   └── page.tsx # Wishlist page component
│   │   ├── layout.tsx # App layout
│   │   ├── page.tsx # Main entry point
│   │   └── globals.css # Global styles
│   ├── components/ # Reusable components
│   │   ├── AdminDashboard.tsx # Admin dashboard component
│   │   ├── Auth/ # Authentication components
│   │   ├── Blog/ # Blog components
│   │   ├── Cart/ # Cart components
│   │   ├── Checkout/ # Checkout components
│   │   ├── Contact/ # Contact components
│   │   ├── Home/ # Home page components
│   │   ├── Shop/ # Shop components
│   │   ├── common/ # Common components
│   │   └── ... # Other components
│   ├── context/ # Context providers
│   │   ├── CartContext.tsx # Cart context
│   │   ├── WishlistContext.tsx # Wishlist context
│   │   └── CompareContext.tsx # Compare context
│   ├── data/ # Static data
│   │   ├── blogContent.ts # Blog content data
│   │   └── products.ts # Product data
│   ├── types/ # TypeScript types
│   │   ├── product.ts # Product types
│   │   ├── blog.ts # Blog types
│   │   └── cart.ts # Cart types
│   └── utils/ # Utility functions
│       ├── formatPrice.ts # Price formatting functions
│       └── stripe.js # Stripe utility functions
├── public/ # Static assets
│   ├── Logo.png # Logo image
│   └── Pictures/ # Additional images
├── tailwind.config.js # Tailwind configuration
├── next.config.mjs # Next.js configuration
├── package.json # Project metadata and dependencies
└── .eslintrc.json # ESLint configuration


```

---

## 🔧 Configuration

Tailwind CSS configuration includes:
- Custom colors
- Extended animations
- Custom plugins
- Responsive breakpoints

---

## 📱 Responsive Design

- **Mobile-first approach**
- Breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

---

## ⚡ Performance

- Optimized for fast loading times
- Uses Next.js for server-side rendering (SSR) and static site generation (SSG)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

---

## 📧 Contact

For any inquiries, please contact us at **kusamakhan1234@gmail.com**.
```
