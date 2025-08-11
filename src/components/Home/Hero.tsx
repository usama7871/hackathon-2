"use client";
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';


// Note: For full 3D effects, install these packages:
// npm install @react-three/fiber @react-three/drei three
// Then uncomment the imports below and remove the fallback components
interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children, className }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 animate-pulse opacity-70 text-cyan-400"
        style={{ 
          animationDelay: '0.1s',
          transform: 'translate(2px, -1px)' 
        }}
      >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 animate-pulse opacity-50 text-pink-400"
        style={{ 
          animationDelay: '0.2s',
          transform: 'translate(-1px, 1px)' 
        }}
      >
        {children}
      </span>
    </div>
  );
};

interface FloatingOrbProps {
  delay?: number;
  size?: string;
  position?: string;
  gradient?: string;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ delay = 0, size = 'w-20 h-20', position = 'top-1/4 left-1/4', gradient = 'from-cyan-400 to-blue-500' }) => {
  return (
    <div 
      className={`animate-float absolute ${position} ${size} rounded-full bg-gradient-to-r ${gradient} opacity-30 blur-sm`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
};

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      ctx!.fillStyle = '#00ff41';
      ctx!.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 opacity-10 pointer-events-none"
    />
  );
};

export default function Hero() {
  return (
    <>
      <style jsx global>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes scan {
          0% { top: 0; opacity: 1; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4); }
        }
        
        @keyframes hologram {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes dataStream {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-hologram { animation: hologram 3s ease-in-out infinite; }
        .animate-data-stream { animation: dataStream 8s linear infinite; }
      `}</style>
      
      <main className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-purple-900">
        {/* Matrix Rain Background */}
        <MatrixRain />
        
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        {/* Data stream lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-data-stream opacity-60"
              style={{
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${6 + i}s`
              }}
            />
          ))}
        </div>

        {/* Floating orbs with different configurations */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingOrb 
            delay={0} 
            size="w-20 h-20" 
            position="top-1/4 left-1/4" 
            gradient="from-cyan-400 to-blue-500" 
          />
          <FloatingOrb 
            delay={1} 
            size="w-16 h-16" 
            position="top-3/4 right-1/4" 
            gradient="from-pink-400 to-purple-500" 
          />
          <FloatingOrb 
            delay={2} 
            size="w-12 h-12" 
            position="top-1/2 right-1/3" 
            gradient="from-green-400 to-cyan-400" 
          />
          <FloatingOrb 
            delay={3} 
            size="w-24 h-24" 
            position="bottom-1/4 left-1/3" 
            gradient="from-yellow-400 to-orange-500" 
          />
          <FloatingOrb 
            delay={4} 
            size="w-14 h-14" 
            position="top-1/3 left-2/3" 
            gradient="from-purple-400 to-pink-600" 
          />
        </div>

        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-500/5 to-transparent pointer-events-none animate-hologram" />

        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 50L100 50L100 100L150 100" stroke="#00ffff" strokeWidth="1" opacity="0.5"/>
            <path d="M200 20L200 80L250 80L250 120" stroke="#ff0080" strokeWidth="1" opacity="0.5"/>
            <path d="M300 60L350 60L350 110L320 110" stroke="#80ff00" strokeWidth="1" opacity="0.5"/>
            <circle cx="100" cy="50" r="3" fill="#00ffff" opacity="0.7"/>
            <circle cx="150" cy="100" r="3" fill="#00ffff" opacity="0.7"/>
            <circle cx="250" cy="80" r="3" fill="#ff0080" opacity="0.7"/>
            <circle cx="320" cy="110" r="3" fill="#80ff00" opacity="0.7"/>
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Glitch effect title */}
            <GlitchText className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-hologram">
              FURNIRO COLLECTION
            </GlitchText>

            {/* Subtitle with neon effect */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the next dimension of style with our 
              <span className="text-cyan-400 font-semibold animate-pulse"> Modern Styled Furniture </span>
              collection that transcends reality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/shop">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 min-w-[200px] animate-pulse-glow">
                  <span className="relative z-10">ENTER THE SHOP</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>
              
              <Link href="/blog">
                <button className="group relative px-8 py-4 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-lg transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-2xl hover:shadow-cyan-400/25 min-w-[200px]">
                  <span className="relative z-10">EXPLORE OUR BLOG</span>
                  <div className="absolute inset-0 bg-cyan-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                </button>
              </Link>
            </div>

            {/* Status indicator */}
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>SYSTEM ONLINE • 24/7 ACTIVE</span>
              </div>
            </div>

            {/* Stats or features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center group">
                <div className="text-2xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300 animate-pulse">100+</div>
                <div className="text-gray-400 text-sm">Furniture Items</div>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2 opacity-50"></div>
              </div>
              <div className="text-center group">
                <div className="text-2xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300 animate-pulse">Best Quality</div>
                <div className="text-gray-400 text-sm">Compatible</div>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mt-2 opacity-50"></div>
              </div>
              <div className="text-center group">
                <div className="text-2xl font-bold text-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300 animate-pulse">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mt-2 opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scanning line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
            style={{
              animation: 'scan 4s linear infinite',
              boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff'
            }}
          />
        </div>

        {/* Corner UI elements */}
        <div className="absolute top-4 left-4 text-cyan-400 font-mono text-xs opacity-60">
          <div>SYS_STATUS: ACTIVE</div>
          <div>CONN: 99.9%</div>
          <div>LAT: &lt;1ms</div>
        </div>

        <div className="absolute top-4 right-4 text-cyan-400 font-mono text-xs opacity-60 text-right">
          <div>Furnituristic_INTERFACE: v2.1</div>
          <div>USERS_ONLINE: 500+</div>
          <div>APP_STATE: STABLE</div>
        </div>

        <div className="absolute bottom-4 left-4 text-cyan-400 font-mono text-xs opacity-60">
          <div>REALITY_INDEX: 0.734</div>
          <div>DIMENSION: C-137</div>
        </div>
      </main>
    </>
  );
}
