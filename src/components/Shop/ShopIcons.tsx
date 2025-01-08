import { Trophy, CheckCircle, Truck, Headphones } from 'lucide-react';

const features = [
  {
    icon: Trophy,
    title: "High Quality",
    description: "Crafted from top materials",
    color: "#B88E2F"
  },
  {
    icon: CheckCircle,
    title: "Warranty Protection",
    description: "Over 2 years",
    color: "#B88E2F"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Order over 150,000",
    color: "#B88E2F"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support",
    color: "#B88E2F"
  }
];

export default function ShopIcons() {
  return (
    <div className="bg-[#F9F1E7] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-white hover:shadow-lg transition-shadow group"
              >
                <div className="mb-4 p-3 rounded-full bg-[#F9F1E7] group-hover:bg-[#B88E2F] transition-colors">
                  <Icon 
                    className="w-8 h-8 text-[#B88E2F] group-hover:text-white transition-colors" 
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}