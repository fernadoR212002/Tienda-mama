"use client";

import { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagenURL: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchLocalProducts() {
      try {
        const { getProducts } = await import("../utils/api");
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        console.error("Error cargando productos:", e);
      }
    }
    fetchLocalProducts();
  }, []);

  // Pasamos las coordenadas directamente a CSS para 60fps fluidos (Técnica del video)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    headerRef.current.style.setProperty("--mouse-x", `${x}px`);
    headerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black antialiased overflow-x-hidden">
      
      {/* HEADER CON MÁSCARA REVEAL FLUIDA */}
      <header 
        ref={headerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full bg-black h-[75vh] flex flex-col items-center justify-center border-b border-zinc-900 overflow-hidden select-none cursor-crosshair"
        style={{
          // Centro por defecto al cargar la página
          "--mouse-x": "50%",
          "--mouse-y": "50%"
        } as React.CSSProperties}
      >
        {/* REJILLA INTACTA (Fondo Z-0) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] z-0"></div>

        {/* CAPA 1: TEXTO APAGADO (Lo que se ve en la oscuridad) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-zinc-700 font-bold mb-4">
            Atelier Apparel Supply
          </span>
          <h1 className="text-7xl md:text-[13rem] font-[1000] tracking-tighter uppercase italic text-zinc-900 leading-none font-sans">
            ATELIER
          </h1>
          <div className="w-16 h-[1px] bg-zinc-800 my-4"></div>
          <h2 className="text-sm md:text-xl font-medium tracking-[0.3em] uppercase text-zinc-800">
            DROP 01 / 2026
          </h2>
        </div>

        {/* CAPA 2: TEXTO ILUMINADO (La Máscara Reveal con difuminado radial) */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none"
          style={{
            // El secreto del video: mask-image que sigue las variables de CSS
            WebkitMaskImage: `radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black 30%, transparent 100%)`,
            maskImage: `radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black 30%, transparent 100%)`,
          }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-zinc-400 font-bold mb-4">
            Atelier Apparel Supply
          </span>
          <h1 className="text-7xl md:text-[13rem] font-[1000] tracking-tighter uppercase italic text-white leading-none font-sans drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            ATELIER
          </h1>
          <div className="w-16 h-[1px] bg-white my-4"></div>
          <h2 className="text-sm md:text-xl font-bold tracking-[0.3em] uppercase text-white">
            COLECCIÓN 2026
          </h2>
        </div>
      </header>

      {/* SECCIÓN DESCRIPCIÓN */}
      <section className="w-full bg-black py-16 text-center px-6 border-b border-zinc-950">
        <p className="max-w-xl mx-auto text-xs md:text-sm text-zinc-500 tracking-widest font-light leading-relaxed uppercase">
          Piezas de alto rendimiento urbano seleccionadas minuciosamente para el emprendimiento de mamá. 
          Disponibilidad limitada. Diseñado para el entorno urbano diario.
        </p>
      </section>

      {/* GRID PRODUCTOS */}
      <section className="px-6 py-24 md:px-12 max-w-7xl mx-auto">
        {products.length === 0 ? (
          <div className="w-full flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
