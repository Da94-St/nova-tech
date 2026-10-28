import React from 'react';

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
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onButtonClick?.();
  };

  return (
    <div 
      className="flip-card-component"
      style={{ 
        '--hue': hue,
        '--primary': `hsl(${hue}, 50%, 50%)`,
        '--white-1': 'hsl(0, 0%, 90%)',
        '--white-2': 'hsl(0, 0%, 80%)',
        '--dark': `hsl(${hue}, 25%, 10%)`,
        '--grey': 'hsl(0, 0%, 50%)'
      } as React.CSSProperties}
    >
      <div className="flip-card-component-inner">
        {/* Front of the card */}
        <div className="flip-card-component-front">
          <div className="flip-card-component-figure">
            <div className="flip-card-component-img-bg"></div>
            <img src={imageUrl} alt={caption} />
            <div className="flip-card-component-caption">{caption}</div>
          </div>

          <ul className="flip-card-component-details">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Back of the card */}
        <div className="flip-card-component-back">
          <div className="flip-card-component-figure">
            <div className="flip-card-component-img-bg"></div>
            <img src={imageUrl} alt={caption} />
          </div>

          <button 
            className="flip-card-component-button"
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>

          <div className="flip-card-component-designs">
            {[...Array(8)].map((_, i) => (
              <span key={i} className={`flip-card-component-design flip-card-component-design-${i+1}`}></span>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded styles with scoped class names */}
      <style>{`
        .flip-card-component {
          --hue: 150;
          --primary: hsl(var(--hue), 50%, 50%);
          --white-1: hsl(0, 0%, 90%);
          --white-2: hsl(0, 0%, 80%);
          --dark: hsl(var(--hue), 25%, 10%);
          --grey: hsl(0, 0%, 50%);
          width: 350px;
          height: 520px;
          margin: 40px;

        }
        
        .flip-card-component-inner {
          width: inherit;
          height: inherit;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s ease-in-out;
        }
        
        .flip-card-component:hover .flip-card-component-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-component-front,
        .flip-card-component-back {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          background: var(--dark);
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          backface-visibility: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 20px 20px 40px hsla(var(--hue), 50%, 10%, 0.4),
                8px 8px 24px hsla(var(--hue), 50%, 50%, 0.3),
                0 0 12px hsla(var(--hue), 50%, 50%, 0.2);
        }
        
        .flip-card-component-front {
          transform: rotateY(0deg);
          z-index: 2;
        }
        
        .flip-card-component-back {
          transform: rotateY(180deg);
          z-index: 1;
        }
        
        .flip-card-component-figure {
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .flip-card-component img {
          height: 100%;
          border-radius: 24px;
          object-fit: cover;
          width: 100%;
        }
        
        .flip-card-component-caption {
          display: block;
          width: auto;
          margin-top: 12%;
          padding: 8px 22px;
          font-weight: bold;
          line-height: 1.6;
          letter-spacing: 2px;
          word-spacing: 6px;
          text-align: right;
          position: absolute;
          top: 0;
          right: 12px;
          color: var(--white-1);
          background: hsla(var(--hue), 25%, 10%, .5);
        }
        
        .flip-card-component-img-bg {
          background: hsla(var(--hue), 25%, 10%, .5);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .flip-card-component-front .flip-card-component-img-bg {
          clip-path: polygon(0 20%, 100% 40%, 100% 100%, 0 100%);
        }
        
        .flip-card-component-front .flip-card-component-img-bg::before {
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
          transition: .1s;
        }
        
        .flip-card-component-back .flip-card-component-img-bg {
          clip-path: polygon(0 0, 100% 0, 100% 80%, 0 60%);
        }
        
        .flip-card-component:hover .flip-card-component-front .flip-card-component-img-bg::before {
          width: 6px;
          border-left-color: var(--primary);
          border-right-color: var(--primary);
        }
        
        .flip-card-component-details {
          padding-top: 50%;
          margin: 0 auto;
          width: 70%;
          height: 100%;
          list-style: none;
          color: var(--white-1);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        
        .flip-card-component-details li {
            width: 100%;
            margin-top: 12px;
            padding-bottom: 12px;
            font-size: 14px;
            text-align: center;
            position: relative;
            font-weight: 700;
            text-shadow:
                0.5px 0.5px 1px hsla(var(--hue), 50%, 30%, 0.8),
                1px 1px 2px hsla(var(--hue), 50%, 20%, 0.6),
                2px 2px 3px hsla(var(--hue), 50%, 10%, 0.4);
        }
        
        .flip-card-component-details li:nth-child(2n) {
            color: var(--white-2);
        }
        
        .flip-card-component-details li:not(:last-child)::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: currentColor;
          opacity: 0.2;
        }
        
        .flip-card-component-button {
            font-family: inherit;
            font-weight: bold;
            color: var(--white-1);
            letter-spacing: 3px;
            padding: 9px 20px;
            border: 2px solid var(--white-1);
            border-radius: 1000px;
            background: transparent;
            transition: .3s;
            cursor: pointer;
            background: hsla(var(--hue), 25%, 10%, 0.3);
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            z-index: 2;
            transform: translateZ(25px);
            text-shadow: 
                1px 1px 2px hsla(var(--hue), 50%, 20%, 0.8),
                2px 2px 4px hsla(var(--hue), 50%, 20%, 0.6),
                3px 3px 6px hsla(var(--hue), 50%, 20%, 0.4);
            box-shadow: 
                4px 4px 12px hsla(var(--hue), 50%, 10%, 0.3),
                2px 2px 6px hsla(var(--hue), 50%, 50%, 0.2),
                inset 0 0 8px hsla(var(--hue), 50%, 50%, 0.1);
        }
        
        .flip-card-component-button:hover,
        .flip-card-component-button:focus {
            color: var(--primary);
            background: hsla(var(--hue), 25%, 10%, 0.2);
            border-color: currentColor;
            text-shadow: 0 0 8px hsla(var(--hue), 50%, 50%, 0.6),
                0 0 12px hsla(var(--hue), 50%, 50%, 0.4);
            box-shadow: 6px 6px 16px hsla(var(--hue), 50%, 10%, 0.4),
                3px 3px 8px hsla(var(--hue), 50%, 50%, 0.3);
            transform: translateZ(15px) translateY(-2px);
        }
        
        .flip-card-component-button:active {
          transform: translateZ(20px) translateY(0px);
        }
        
        .flip-card-component-designs {
          --tr: 90;
          --op: .5;
          width: 100%;
          height: 100%;
          background: transparent;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        
        .flip-card-component-design {
          display: block;
          background: var(--grey);
          position: absolute;
          opacity: var(--op);
          transition: .3s;
        }
        
        .flip-card-component-design-1,
        .flip-card-component-design-2,
        .flip-card-component-design-3,
        .flip-card-component-design-4 {
          width: 1px;
          height: 100%;
        }
        
        .flip-card-component-design-1,
        .flip-card-component-design-2 {
          top: 0;
          transform: translateY(-90%);
        }
        
        .flip-card-component-design-1 {
          left: 20%;
        }
        
        .flip-card-component-design-2 {
          left: 80%;
        }
        
        .flip-card-component-design-3,
        .flip-card-component-design-4 {
          bottom: 0;
          transform: translateY(90%);
        }
        
        .flip-card-component-design-3 {
          left: 24%;
        }
        
        .flip-card-component-design-4 {
          left: 76%;
        }
        
        .flip-card-component-design-5,
        .flip-card-component-design-6,
        .flip-card-component-design-7,
        .flip-card-component-design-8 {
          width: 100%;
          height: 1px;
        }
        
        .flip-card-component-design-5,
        .flip-card-component-design-6 {
          left: 0;
          transform: translateX(-90%);
        }
        
        .flip-card-component-design-5 {
          top: 41%;
        }
        
        .flip-card-component-design-6 {
          top: 59%;
        }
        
        .flip-card-component-design-7,
        .flip-card-component-design-8 {
          right: 0;
          transform: translateX(90%);
        }
        
        .flip-card-component-design-7 {
          top: 44%;
        }
        
        .flip-card-component-design-8 {
          top: 56%;
        }
        
        .flip-card-component-button:hover ~ .flip-card-component-designs .flip-card-component-design-1,
        .flip-card-component-button:hover ~ .flip-card-component-designs .flip-card-component-design-2,
        .flip-card-component-button:hover ~ .flip-card-component-designs .flip-card-component-design-3,
        .flip-card-component-button:hover ~ .flip-card-component-designs .flip-card-component-design-4,
        .flip-card-component-button:hover ~ .flip-card-component-designs .flip-card-component-design-5,
        .flip-card-component-button:hover ~ .flip-card-component-designs .flip-card-component-design-6,
        .flip-card-component-button:hover ~ .flip-card-component-designs .flip-card-component-design-7,
        .flip-card-component-button:hover ~ .flip-card-component-designs .flip-card-component-design-8 {
          transform: translate(0);
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default FlipCard;