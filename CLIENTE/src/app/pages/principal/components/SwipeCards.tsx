import React, { useState, useEffect, useRef } from 'react';


interface Card {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  link: string;
}


const productos= ([
  {
    id: 1,
    image: `https://source.unsplash.com/random/300x200?${encodeURIComponent('Cocktail')}`,
    title: 'Cocktail',
    description: 'Tropical mix of flavors, perfect for parties.',
    price: 8.99,
    link: 'https://lqrs.com'
  },
  {
    id: 2,
    image: `https://source.unsplash.com/random/300x200?${encodeURIComponent('Smoothie')}`,
    title: 'Smoothie',
    description: 'Refreshing blend of fruits and yogurt.',
    price: 5.49,
    link: 'https://lqrs.com'
  },
  {
    id: 3,
    image: `https://source.unsplash.com/random/300x200?${encodeURIComponent('Iced Coffee')}`,
    title: 'Iced Coffee',
    description: 'Cold brewed coffee with a hint of vanilla.',
    price: 4.99,
    link: 'https://lqrs.com'
  },
  {
    id: 4,
    image: `https://source.unsplash.com/random/300x200?${encodeURIComponent('Mojito')}`,
    title: 'Mojito',
    description: 'Classic Cuban cocktail with mint and lime.',
    price: 7.99,
    link: 'https://lqrs.com'
  },
  {
    id: 5,
    image: `https://source.unsplash.com/random/300x200?${encodeURIComponent('Matcha Latte')}`,
    title: 'Matcha Latte',
    description: 'Creamy green tea latte, rich in antioxidants.',
    price: 6.49,
    link: 'https://lqrs.com'
  },
  {
    id: 6,
    image: `https://source.unsplash.com/random/300x200?${encodeURIComponent('Fruit Punch')}`,
    title: 'Fruit Punch',
    description: 'Sweet and tangy punch, bursting with fruity flavors.',
    price: 3.99,
    link: 'https://lqrs.com'
  },
  {
    id: 7,
    image: `https://source.unsplash.com/random/300x200?${encodeURIComponent('Bubble Tea')}`,
    title: 'Bubble Tea',
    description: 'Chewy tapioca pearls in a sweet milk tea base.',
    price: 4.99,
    link: 'https://lqrs.com'
  }

]);
const SwipeCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([
    {
        id: 1,
        image: `https://madecentro.com/cdn/shop/files/pmskkt7ihr-_281_29_564x564.jpg?v=1694016022`,
        title: 'Asiento Oslo',
        description: 'El asiento acolchado de la silla "Oslo" proporciona un experiencia de asiento cómoda y ergonómica',
        price: '200.000',
        link: ''
      },
      {
        id: 2,
        image: `https://madecentro.com/cdn/shop/products/CLW2978-ComedorVolder-Wengue-Ambientada_898x674.jpg?v=1666217979`,
        title: 'Comedor Azalea',
        description: ' Con acabado Wegué, ofrece un punto focal impresionante para tus comidas familiares o reuniones con amigos',
        price: '1.500.000',
        link: ''
      },
      {
        id: 3,
        image: `https://madecentro.com/cdn/shop/products/BLC4457-BarEsquineroCeleste-Chocolate-Ambientado-C-RTA-Virtual-Muebles-VM-Hogar_897x673.jpg?v=1666216354`,
        title: 'Bar Esquinero',
        description: 'Construido con materiales de alta calidad, el bar garantiza durabilidad y resistencia para resistir el uso diario',
        price: '710.000',
        link: ''
      },
      {
        id: 4,
        image: `https://madecentro.com/cdn/shop/products/AMH3505-MesaAuxiliarRecibidorAureli-CaobayMiel-Ambientada-C_801x601.jpg?v=1666215660`,
        title: 'Mesa Aureli',
        description: 'Añade un toque de elegancia y funcionalidad a la entrada de tu hogar con la mesa auxiliar "Aureli" en miel y blanco',
        price: '460.000',
        link: ''
      },
      {
        id: 5,
        image: `https://madecentro.com/cdn/shop/products/VLW3800Veladormultifuncional_consolasanmartin__Wwngue1500x1500_897x897.jpg?v=1666217384`,
        title: 'Tocador Zaha',
        description: 'Equipado con un espejo grande y práctico, te ofrece un lugar conveniente para arreglarte y prepararte para el día',
        price: '400.000',
        link: ''
      },
      {
        id: 6,
        image: `https://maderkit.vtexassets.com/arquivos/ids/166628-800-auto?v=638332388344770000&width=800&height=auto&aspect=true`,
        title: 'Mesa de Centro',
        description: 'Transforma tu sala de estar en un oasis de elegancia moderna con nuestra mesa de centro con vidrio "Hood"',
        price: '250.000',
        link: ''
      },
      {
        id: 7,
        image: `https://madecentro.com/cdn/shop/products/ZLB7107-CALGARYSHOERACK-DARKBROWNAbierta_FM_897x897.jpg?v=1666217012`,
        title: 'Zapatero Lida',
        description: 'Garantiza durabilidad y resistencia para soportar el peso de tus zapatos y mantenerlos ordenados',
        price: '240.000',
        link: ''
      }
    
  ]);

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const swipeCardsRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {
    const swipeCardsElement = swipeCardsRef.current;
  
    if (!swipeCardsElement) return; // Verifica si swipeCardsElement es null
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsDown(true);
      setStartX(e.pageX - swipeCardsElement.offsetLeft);
      setScrollLeft(swipeCardsElement.scrollLeft);
    };
  
    const handleMouseLeave = () => {
      setIsDown(false);
    };
  
    const handleMouseUp = () => {
      setIsDown(false);
    };
  
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - swipeCardsElement.offsetLeft;
      const walk = (x - startX) * 1;
      swipeCardsElement.scrollLeft = scrollLeft - walk;
    };
  
    swipeCardsElement.addEventListener('mousedown', handleMouseDown);
    swipeCardsElement.addEventListener('mouseleave', handleMouseLeave);
    swipeCardsElement.addEventListener('mouseup', handleMouseUp);
    swipeCardsElement.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      swipeCardsElement.removeEventListener('mousedown', handleMouseDown);
      swipeCardsElement.removeEventListener('mouseleave', handleMouseLeave);
      swipeCardsElement.removeEventListener('mouseup', handleMouseUp);
      swipeCardsElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDown, startX, scrollLeft]);

  /*const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  } */
  
  return (
    <div className="swipe-cards overflow-x-scroll scrollbar-hide mb-4 relative px-0.5">
      <div className="flex snap-x snap-mandatory gap-4">
        {cards.map((card) => (
          <div className="flex-none w-64 snap-center" key={card.id}>
            <div className="bg-white border-1 border border-gray-200 rounded-lg overflow-hidden mb-4">
              <img src={card.image} alt="" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg leading-6 font-bold text-gray-900">{card.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{card.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-extrabold text-gray-900">
                    ${(card.price)}
                  </span>
                  <a href={card.link} className="text-white bg-ardilla hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg 
                      fill="white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      id="Bold" 
                      viewBox="0 0 24 24" 
                      width="20" 
                      height="20"
                    >
                      <circle cx="7" cy="22" r="2"/>
                      <circle cx="17" cy="22" r="2"/>
                      <path d="M22.984,6.018A3.675,3.675,0,0,0,20.364,5H5.654L5.391,2.938A3.328,3.328,0,0,0,2.087,0H1.5A1.5,1.5,0,0,0,0,1.5H0A1.5,1.5,0,0,0,1.5,3h.587a.331.331,0,0,1,.326.3l1.5,11.759A3.327,3.327,0,0,0,7.217,18H17.339a5.5,5.5,0,0,0,5.3-4.042l1.246-4.531A3.489,3.489,0,0,0,22.984,6.018ZM19.75,13.163A2.508,2.508,0,0,1,17.339,15H7.217a.329.329,0,0,1-.325-.3L6.037,8H20.514A.5.5,0,0,1,21,8.632Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}  
export default SwipeCards;