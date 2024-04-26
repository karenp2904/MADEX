import React, { useState, useEffect, useRef } from 'react';


interface Card {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  link: string;
}

const SwipeCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([
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

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const swipeCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const swipeCardsElement = swipeCardsRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDown(true);
      setStartX(e.pageX - swipeCardsElement!.offsetLeft);
      setScrollLeft(swipeCardsElement!.scrollLeft);
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
      const x = e.pageX - swipeCardsElement!.offsetLeft;
      const walk = (x - startX) * 1;
      swipeCardsElement!.scrollLeft = scrollLeft - walk;
    };

    swipeCardsElement!.addEventListener('mousedown', handleMouseDown);
    swipeCardsElement!.addEventListener('mouseleave', handleMouseLeave);
    swipeCardsElement!.addEventListener('mouseup', handleMouseUp);
    swipeCardsElement!.addEventListener('mousemove', handleMouseMove);

    return () => {
      swipeCardsElement!.removeEventListener('mousedown', handleMouseDown);
      swipeCardsElement!.removeEventListener('mouseleave', handleMouseLeave);
      swipeCardsElement!.removeEventListener('mouseup', handleMouseUp);
      swipeCardsElement!.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDown, startX, scrollLeft]);

  return (
    <div className="swipe-cards overflow-x-scroll scrollbar-hide mb-4 relative px-0.5" ref={swipeCardsRef}>
      <div className="flex snap-x snap-mandatory gap-4">
        {cards.map((card) => (
          <div className="flex-none w-64 snap-center" key={card.id}>
            <div className="bg-white border-1 border border-gray-200 rounded-lg overflow-hidden mb-4">
              <img src={card.image} alt="" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg leading-6 font-bold text-gray-900">{card.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{card.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-extrabold text-gray-900">
                    ${(card.price).toFixed(2)}
                  </span>
                  <a
                    href={card.link}
                    className="text-white bg-fuchsia-950 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" ref={swipeCardsRef}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25l9-19.5M7.5 14.25l9 19.5"
                      />
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
};

export default SwipeCards;