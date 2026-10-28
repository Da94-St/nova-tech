//<Link to="/flip-cards" className="...">Flip Cards</Link>
//<Link to="/gallery" className="...">Frames</Link>
import React, { useEffect } from 'react';

const GalleryPage: React.FC = () => {
  // Add the custom CSS property for the animation
  useEffect(() => {
    // Check if the CSS property is already defined
    try {
      // @ts-expect-error - This is a non-standard API but works in Chrome
      CSS.registerProperty({
        name: '--a',
        syntax: '<angle>',
        inherits: false,
        initialValue: '0deg',
      });
    } catch {
      // Fallback for browsers that don't support registerProperty
      console.log("Browser doesn't support CSS.registerProperty");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-300 pt-24 pb-12 px-4">
      {/* SVG Filters */}
      <svg aria-hidden="true" className="fixed -left-full">
        <filter id="glow-0" x="-25%" y="-25%" width="150%" height="150%">
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 2 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2" />
          <feComponentTransfer result="rond">
            <feFuncA type="table" tableValues="-2 3" />
          </feComponentTransfer>
          <feMorphology operator="dilate" radius="3" />
          <feGaussianBlur stdDeviation="6" />
          <feBlend in="rond" result="glow" />
          <feComponentTransfer in="SourceGraphic">
            <feFuncA type="table" tableValues="0 0 1" />
          </feComponentTransfer>
          <feBlend in2="glow" />
        </filter>
        <filter id="glow-1" x="-25%" y="-25%" width="150%" height="150%">
          <feComponentTransfer in="SourceGraphic" result="grad">
            <feFuncA type="table" tableValues="0 2 0" />
          </feComponentTransfer>
          <feMorphology operator="dilate" radius="3" />
          <feGaussianBlur stdDeviation="6" result="glow" />
          <feTurbulence type="fractalNoise" baseFrequency="7.13" />
          <feDisplacementMap in="glow" scale="12" yChannelSelector="R" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.8" />
          </feComponentTransfer>
          <feBlend in="grad" result="out" />
          <feComponentTransfer in="SourceGraphic">
            <feFuncA type="table" tableValues="0 0 1" />
          </feComponentTransfer>
          <feBlend in2="out" />
        </filter>
      </svg>

      {/* Title */}
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-playwrite mb-14 mx-4">
        Animated Gradient Glow Image Gallery
      </h1>

      {/* Gallery Grid */}
      <div className="max-w-120xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {/* Image 1 */}
          <div className="w-full max-w-[350px] mb-6 aspect-square">
            <img
              src="https://images.unsplash.com/photo-1512206533059-361c5b6c40a4?w=400"
              alt="Image 1"
              className="gallery-image"
            />
          </div>
          
          {/* Image 2 */}
          <div className="w-full max-w-[350px] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1587586062323-836089e60d52?w=400"
              alt="Image 2"
              className="gallery-image glow-1"
              style={{'--l': '#ff45457f, #00ff997f, #006aff7f, #ff00957f, #ff45457f'} as React.CSSProperties}
            />
          </div>
          
          {/* Image 3 */}
          <div className="w-full max-w-[350px] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1495287924875-c158d2e8aafc?w=400"
              alt="Image 3"
              className="gallery-image"
              style={{'--l': '#0000 0% 35%, #24004619, #3c096c32, #5a189a4b, #7b2cbf64, #9d4edd7f'} as React.CSSProperties}
            />
          </div>
          
          {/* Image 4 */}
          <div className="w-full max-w-[350px] mb-6 aspect-square">
            <img
              src="https://images.unsplash.com/photo-1515056140641-c645caffe247?w=400"
              alt="Image 4"
              className="gallery-image glow-1"
              style={{'--l': '#cb997e7f, #ffe8d67f, #a5a58d7f, #6b705c7f, #cb997e7f'} as React.CSSProperties}
            />
          </div>
          
          {/* Image 5 */}
          <div className="w-full max-w-[350px] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1509857820193-a5c67e4c20ab?w=400"
              alt="Image 5"
              className="gallery-image"
              style={{'--l': '#0000 0%, #f7258520, #7209b740, #3a0ca360, #4361ee7f'} as React.CSSProperties}
            />
          </div>
          
          {/* Image 6 */}
          <div className="w-full max-w-[350px] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=400"
              alt="Image 6"
              className="gallery-image glow-1"
              style={{'--l': '#7bdff27f, #b2f7ef7f, #eff7f67f, #f7d6e07f, #f2b5d47f, #7bdff27f'} as React.CSSProperties}
            />
          </div>
          
          {/* Image 7 */}
          <div className="w-full max-w-[350px] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1618741292719-31020a29952c?w=400"
              alt="Image 7"
              className="gallery-image"
              style={{'--l': '#0000 0% 85%, #936bff7f 0%, #b892ff7f, #ffc2e27f, #ff90b37f'} as React.CSSProperties}
            />
          </div>
          
          {/* Image 8 */}
          <div className="w-full max-w-[350px] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1618681317438-a8dd7da06cd4?w=400"
              alt="Image 8"
              className="gallery-image glow-1"
              style={{'--l': '#7801167f, #f7b5387f, #db7c267f, #d8572a7f, #c32f277f, #7801167f'} as React.CSSProperties}
            />
          </div>
          
          {/* Image 9 */}
          <div className="w-full max-w-[350px] mb-6 aspect-square">
            <img
              src="https://images.unsplash.com/photo-1549888834-3ec93abae044?w=400"
              alt="Image 9"
              className="gallery-image"
              style={{'--l': '#0000 0% 25%, #f3b70019 0%, #faa30032, #e57c044b, #ff620164, #f63e027f 50%'} as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Embedded Styles */}
      <style>
        {`
          @property --a {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
          
          @keyframes a {
            to { --a: 1turn; }
          }
          
          .font-playwrite {
            font-family: 'Playwrite IS', cursive;
          }
          
          .gallery-image {
            width: 100%;
            height: 100%;
            border: solid 6px transparent;
            object-fit: cover;
            border-radius: 12px;
            background: repeating-conic-gradient(from var(--a, 0deg), var(--l, #0000 0% 70%, #0000ff7f)) border-box;
            filter: url(#glow-0);
            animation: a 2s linear infinite;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          
          .glow-1 {
            filter: url(#glow-1);
          }
          
          @media (max-width: 768px) {
            .container {
              width: 95%;
              padding: 1rem 0;
            }
            
            .grid {
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 1.5rem;
            }
          }

          @media (max-width: 480px) {
            .grid {
              grid-template-columns: 1fr;
            }
            
            .w-full {
              max-width: 300px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default GalleryPage;
