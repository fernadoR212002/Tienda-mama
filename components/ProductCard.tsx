"use client";

import Image from "next/image";

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagenURL: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  // Formatear precio a pesos colombianos de forma limpia
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(product.precio);

  // Crear mensaje personalizado automático para el WhatsApp de tu mamá
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Estoy interesado en el artículo de la tienda: *${product.nombre}* (${product.categoria}) con un valor de ${formattedPrice}. ¿Está disponible?`
  );
  
  // Reemplaza este número por el celular real de tu mamá si quieres que apunte directo
  const whatsappUrl = `https://wa.me/573000000000?text=${whatsappMessage}`;

  return (
    <div className="group relative flex flex-col bg-zinc-950 border border-zinc-900 rounded-none overflow-hidden transition-all duration-500 ease-out hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
      
      {/* CONTENEDOR DE IMAGEN CON ZOOM DINÁMICO */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 border-b border-zinc-900">
        <img
          src={product.imagenURL}
          alt={product.nombre}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
          loading="lazy"
        />
        
        {/* Badge de categoría minimalista */}
        <span className="absolute top-4 left-4 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 border border-zinc-800 pointer-events-none z-10">
          {product.categoria}
        </span>
      </div>

      {/* DETALLES DEL PRODUCTO */}
      <div className="flex flex-col flex-1 p-6 space-y-4 bg-black">
        <div className="flex justify-between items-start space-x-2">
          <h3 className="text-base font-bold uppercase tracking-tight text-white font-sans transition-colors duration-300 group-hover:text-zinc-300">
            {product.nombre}
          </h3>
          <span className="text-base font-black italic text-zinc-300 font-mono shrink-0">
            {formattedPrice}
          </span>
        </div>

        {/* BOTÓN DE COMPRA QUE REACCIONA AL HOVER DE LA TARJETA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white text-black text-center text-xs font-black uppercase tracking-widest py-4 border border-white transition-all duration-300 ease-in-out hover:bg-black hover:text-white group-hover:translate-y-0"
        >
          Adquirir Pieza
        </a>
      </div>
    </div>
  );
}

