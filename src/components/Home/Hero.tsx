"use-client";
import Image from "next/image";
import HeroImage from "../../Pictures/Hero.png";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import Link from "next/link";

const FloatingBubbles = () => {
  const bubbleConfigs: {
    position: [number, number, number];
    scale: number;
    color: string;
    opacity: number;
  }[] = [
    { position: [-2, 1, -3], scale: 2.5, color: "#ff6f00ff", opacity: 0.5 },
    { position: [1.5, 2, -2], scale: 1, color: "#ffd700", opacity: 0.7 },
    { position: [0, -1, -4], scale: 1.5, color: "#00ff04ff", opacity: 0.8 },
  ];

  return (
    <>
      {bubbleConfigs.map((bubble, index) => (
        <Sphere key={index} args={[1, 8, 8]} position={bubble.position} scale={bubble.scale}>
          <meshStandardMaterial color={bubble.color} transparent opacity={bubble.opacity} />
        </Sphere>
      ))}
    </>
  );
};

export default function Hero() {
  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-black">
      <Image src={HeroImage} alt="Hero Image" fill className="object-cover brightness-75" />
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={0.5} />
          <FloatingBubbles />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gradient-to-r from-[#ffd700] to-[#ff9900] p-8 shadow-2xl rounded-2xl text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Discover Our New Collection</h1>
          <p className="text-lg text-white/90 mb-8">Explore the latest trends and styles that redefine fashion.</p>
          <Link href="/shop">
            <button className="bg-white text-[#ffd700] font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-[#ff9900] hover:text-white">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}


