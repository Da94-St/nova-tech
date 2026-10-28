import React, { useState } from 'react';
//             <Router>

interface FlipCardProps {
  hue?: number;
  imageUrl: string;
  caption: string;
  details: string[];
  buttonText?: string;
  onButtonClick?: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({
  hue = 220,
  imageUrl,
  caption,
  details,
  buttonText = "Book",
  onButtonClick
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onButtonClick?.();
  };

  return (
    <div 
      className="w-[310px] h-[500px] m-10 perspective-1000 cursor-pointer"
      style={{ 
        '--hue': hue,
        '--primary': `hsl(${hue}, 50%, 50%)`,
        '--white-1': 'hsl(0, 0%, 90%)',
        '--white-2': 'hsl(0, 0%, 80%)',
        '--dark': `hsl(${hue}, 25%, 10%)`,
        '--grey': 'hsl(0, 0%, 50%)'
      } as React.CSSProperties}
      onClick={handleCardClick}
    >
      <div className={`relative w-full h-full preserve-3d transition-transform duration-600 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of the card */}
        <div className="absolute w-full h-full rounded-3xl bg-[var(--dark)] overflow-hidden flex justify-center items-center backface-hidden">
          <figure className="absolute top-0 left-0 w-full h-full z-[-1]">
            <div className="absolute top-0 left-0 w-full h-full bg-[hsla(var(--hue),25%,10%,0.5)] clip-polygon-front" />
            <img 
              src={imageUrl} 
              alt={caption} 
              className="h-full w-full object-cover rounded-3xl" 
            />
            <figcaption className="block w-auto mt-[12%] py-2 px-6 font-bold leading-6 tracking-wide text-right absolute top-0 right-3 text-[var(--white-1)] bg-[hsla(var(--hue),25%,10%,0.5)]">
              {caption}
            </figcaption>
          </figure>

          <ul className="pt-[50%] mx-auto w-[70%] h-full list-none text-[var(--white-1)] flex justify-center items-center flex-col">
            {details.map((detail, index) => (
              <li 
                key={index} 
                className={`w-full mt-3 pb-3 text-sm text-center relative ${index % 2 === 1 ? 'text-[var(--white-2)]' : ''}`}
              >
                {detail}
                {index !== details.length - 1 && (
                  <div className="absolute bottom-0 left-0 w-full h-px bg-current opacity-20" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full rounded-3xl bg-[var(--dark)] overflow-hidden flex justify-center items-center backface-hidden rotate-y-180">
          <figure className="absolute top-0 left-0 w-full h-full z-[-1]">
            <div className="absolute top-0 left-0 w-full h-full bg-[hsla(var(--hue),25%,10%,0.5)] clip-polygon-back" />
            <img 
              src={imageUrl} 
              alt={caption} 
              className="h-full w-full object-cover rounded-3xl" 
            />
          </figure>

          <button 
            className="font-bold text-[var(--white-1)] tracking-wide py-2 px-5 border border-[var(--grey)] rounded-full bg-transparent transition-colors duration-300 z-10 hover:text-[var(--primary)] hover:bg-[hsla(var(--hue),25%,10%,0.2)] hover:border-current active:translate-y-0.5"
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>

          {/* Design elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <span 
                key={i}
                className={`absolute block bg-[var(--grey)] opacity-50 transition-opacity duration-300 design-${i+1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Embedded styles for the complex effects */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .clip-polygon-front {
          clip-path: polygon(0 20%, 100% 40%, 100% 100%, 0 100%);
        }
        .clip-polygon-back {
          clip-path: polygon(0 0, 100% 0, 100% 80%, 0 60%);
        }
        .clip-polygon-front::before {
          content: "";
          position: absolute;
          top: 34%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(18deg);
          width: 100%;
          height: 6px;
          border: 1px solid var(--primary);
          border-left-color: transparent;
          border-right-color: transparent;
          transition: width 0.1s;
        }
        .design-1, .design-2, .design-3, .design-4 {
          width: 1px;
          height: 100%;
        }
        .design-1, .design-2 {
          top: 0;
          transform: translateY(-90%);
        }
        .design-1 {
          left: 20%;
        }
        .design-2 {
          left: 80%;
        }
        .design-3, .design-4 {
          bottom: 0;
          transform: translateY(90%);
        }
        .design-3 {
          left: 24%;
        }
        .design-4 {
          left: 76%;
        }
        .design-5, .design-6, .design-7, .design-8 {
          width: 100%;
          height: 1px;
        }
        .design-5, .design-6 {
          left: 0;
          transform: translateX(-90%);
        }
        .design-5 {
          top: 41%;
        }
        .design-6 {
          top: 59%;
        }
        .design-7, .design-8 {
          right: 0;
          transform: translateX(90%);
        }
        .design-7 {
          top: 44%;
        }
        .design-8 {
          top: 56%;
        }
        button:hover ~ div .design-1,
        button:hover ~ div .design-2,
        button:hover ~ div .design-3,
        button:hover ~ div .design-4,
        button:hover ~ div .design-5,
        button:hover ~ div .design-6,
        button:hover ~ div .design-7,
        button:hover ~ div .design-8 {
          transform: translate(0);
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default FlipCard;