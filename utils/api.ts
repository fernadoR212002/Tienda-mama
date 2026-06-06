export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagenURL: string;
}

// Productos de respaldo por si la hoja de Google Sheets está vacía o tiene un error temporal
const fallbackProducts: Product[] = [
  { id: "1", nombre: "Gorra Urbana Black", categoria: "Gorras", precio: 45000, imagenURL: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800" },
  { id: "2", nombre: "Set Sábanas Satín", categoria: "Sábanas", precio: 120000, imagenURL: "https://images.unsplash.com/photo-1522771730849-fb3d523881c2?q=80&w=800" },
];

export async function getProducts(): Promise<Product[]> {
  // Tu ID de Google Sheets real extraído de tu enlace
  const SHEET_ID = "1owltAcf2JsBuSiCjYujiYPB9sadWTrGe6ACF083-C0M";
  // Consumimos la hoja directamente en formato CSV para máxima velocidad y sin APIs raras de pago
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // Cachea por 60 segundos antes de refrescar
    if (!res.ok) throw new Error("No se pudo conectar con la hoja de Google Sheets");

    const text = await res.text();
    
    // Separamos el CSV en líneas/filas
    const lines = text.split(/\r?\n/);
    if (lines.length <= 1) return fallbackProducts;

    const products: Product[] = [];

    // Función auxiliar para quitar las comillas que Google Sheets añade por defecto
    const cleanCell = (cell: string) => cell.replace(/^"|"$/g, '').trim();

    // Empezamos desde i = 1 para saltarnos la fila 0 (que tiene las cabeceras: Nombre, Categoria, Precio, ImagenURL)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i] ? lines[i].trim() : "";
      if (!line) continue; // Si la línea está totalmente vacía, se la salta
      
      // Separación segura por comas (respeta comas internas si el texto va entre comillas)
      const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(",");
      if (!matches || matches.length < 3) continue; // Si le faltan columnas clave, se la salta

      const nombre = cleanCell(matches[0] || "");
      const categoria = cleanCell(matches[1] || "Sin categoría");
      const precioRaw = cleanCell(matches[2] || "0");
      const imagenURL = matches[3] ? cleanCell(matches[3]) : "";

      // Limpiamos el precio dejando estrictamente solo los números enteros
      const precio = parseInt(precioRaw.replace(/[^0-9]/g, ""), 10) || 0;

      // Validación crítica: Si el producto no tiene nombre, se ignora
      if (!nombre) continue;

      products.push({
        id: `sheet-${i}`,
        nombre,
        categoria,
        precio,
        // Si no subiste foto en el Sheets, le pone una imagen por defecto para que no se rompa el diseño
        imagenURL: imagenURL || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800",
      });
    }

    return products.length > 0 ? products : fallbackProducts;
  } catch (error) {
    console.error("❌ Error leyendo Google Sheets. Cargando datos locales de respaldo:", error);
    return fallbackProducts;
  }
}
