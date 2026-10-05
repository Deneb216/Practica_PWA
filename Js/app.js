const coffees = [
  { 
    name: "Americano Clásico", 
    image: "Images/coffee1.JPG",
    description: "Café negro tradicional servido en taza blanca con plato, ideal para disfrutar su sabor puro.",
    extraInfo: "☕ Origen: Chiapas | 🔥 Tueste: Medio-Oscuro. Perfecto para acompañar con un pan dulce."
  },
  { 
    name: "Café de Grano", 
    image: "Images/coffee2.JPG",
    description: "Café negro intenso rodeado de granos tostados, perfecto para despertar por las mañanas.",
    extraInfo: "☕ Origen: Veracruz | 🔥 Tueste: Oscuro. Alto en cafeína con notas a madera."
  },
  { 
    name: "Latte Oscuro", 
    image: "Images/coffee3.JPG",
    description: "Suave combinación de espresso y leche vaporizada con arte latte en taza negra.",
    extraInfo: "🥛 1/3 Espresso, 2/3 Leche. Textura cremosa ideal para paladares dulces."
  },
  { 
    name: "Capuchino con Corazón", 
    image: "Images/coffee4.JPG",
    description: "Espumoso capuchino decorado con un corazón de arte latte sobre un plato texturizado.",
    extraInfo: "☁️ Espuma extra gruesa espolvoreada con un ligero toque de canela orgánica."
  },
  { 
    name: "Espresso Intenso", 
    image: "Images/coffee5.JPG",
    description: "Carga concentrada de café con una característica capa de crema dorada y burbujeante.",
    extraInfo: "⚡ Extracción rápida de 25 segundos. Sabor puro y directo al grano."
  },
  { 
    name: "Latte Macchiato", 
    image: "Images/coffee6.JPG",
    description: "Bebida lechosa servida en taza de cristal que resalta su suave textura y color claro.",
    extraInfo: "🍯 Servido en capas: primero la leche caliente y al final un shot de espresso."
  },
  { 
    name: "Flat White Esmeralda", 
    image: "Images/coffee7.JPG",
    description: "Equilibrio perfecto de café y leche microespumada servido en una elegante taza verde.",
    extraInfo: "🌿 Estilo australiano. Más café que un latte y leche mucho más sedosa."
  },
  { 
    name: "Latte Rústico", 
    image: "Images/coffee8.JPG",
    description: "Hermoso diseño de arte latte presentado sobre una base rústica de madera natural.",
    extraInfo: "🎨 Preparado con leche de avena para resaltar el dulzor natural sin azúcar añadida."
  },
  { 
    name: "Café con Leche", 
    image: "Images/coffee9.JPG",
    description: "Taza clásica de café claro y suave, servida sobre una mesa de madera tradicional.",
    extraInfo: "☕ Mezcla de la casa con un 50% de café filtrado y 50% de leche entera caliente."
  },
  { 
    name: "Capuchino Artesanal", 
    image: "Images/coffee10.JPG",
    description: "Elaborado con maestría, destacando un intrincado diseño de tulipán en la espuma.",
    extraInfo: "🏆 Preparado por nuestro barista usando granos de especialidad con notas florales."
  }
];

const container = document.querySelector(".container");
const detalleContainer = document.querySelector(".detalle-container");

if (container) {
  const showCoffees = () => {
    let output = "";
    coffees.forEach(({ name, description, image }, index) => {
      output += `
        <div class="card">
          <img src="${image}" alt="${name}" />
          <h2>${name}</h2>
          <p>${description}</p>
          <button class="btn-ver-mas" data-id="${index}">Ver más</button>
        </div>
      `;
    });
    container.innerHTML = output;
  };

  document.addEventListener("DOMContentLoaded", showCoffees);

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-ver-mas")) {
      const coffeeId = e.target.getAttribute("data-id");
      window.location.href = `detalles.html?id=${coffeeId}`;
    }
  });
}

if (detalleContainer) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id !== null && coffees[id]) {
    const coffee = coffees[id];
    detalleContainer.innerHTML = `
      <div class="card" style="max-width: 500px; margin: 2rem auto; padding: 2rem; box-shadow: 0 8px 20px rgba(0,0,0,0.08); border-radius: 12px;">
        <img src="${coffee.image}" alt="${coffee.name}" style="height: 250px; width: 100%; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem;" />
        
        <h2 style="font-size: 1.8rem; color: rgb(35, 47, 220); margin-bottom: 0.8rem;">${coffee.name}</h2>
        
        <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 1.5rem;">
          ${coffee.description}
        </p>
        
        <div style="background-color: #f4f6fa; padding: 1.2rem; border-radius: 8px; border-left: 4px solid rgb(35, 47, 220); text-align: left; margin-bottom: 2rem;">
          <p style="color: #444; font-size: 0.95rem; line-height: 1.5; margin: 0;">
            <strong style="color: #222; font-size: 1rem;">Información adicional:</strong><br><br>
            ${coffee.extraInfo}
          </p>
        </div>
        
        <button class="btn-ver-mas" onclick="window.location.href='index.html'" style="display: inline-block; width: auto; padding: 0.5rem 1.8rem; border: 1px solid rgb(35, 47, 220); color: rgb(35, 47, 220); background-color: transparent; border-radius: 20px; font-size: 0.95rem; cursor: pointer;">
          ← Regresar al Menú
        </button>
      </div>
    `;
  } else {
    detalleContainer.innerHTML = `
      <div class="card" style="max-width: 400px; margin: 3rem auto; padding: 2rem; text-align: center;">
        <h2 style="color: #d9534f; margin-bottom: 1rem;">Café no encontrado</h2>
        <p style="color: #555; margin-bottom: 2rem;">No se seleccionó ningún café válido.</p>
        <button class="btn-ver-mas" onclick="window.location.href='index.html'" style="display: inline-block; width: auto; padding: 0.5rem 1.8rem;">
          ← Volver al inicio
        </button>
      </div>
    `;
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceworker.js") // <-- Se agregó un punto aquí
      .then(res => console.log("Service Worker registrado con éxito", res))
      .catch(err => console.log("Error al registrar el Service Worker", err));
  });
}