
const AnimatedGradientGallery = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1512206533059-361c5b6c40a4?w=400",
      alt: "Image 1",
      filter: "glow-0",
      gradient: ""
    },
    {
      src: "https://images.unsplash.com/photo-1587586062323-836089e60d52?w=400",
      alt: "Image 2",
      filter: "glow-1",
      gradient: "--l: #ff45457f, #00ff997f, #006aff7f, #ff00957f, #ff45457f"
    },
    {
      src: "https://images.unsplash.com/photo-1495287924875-c158d2e8aafc?w=400",
      alt: "Image 3",
      filter: "glow-0",
      gradient: "--l: #0000 0% 35%, #24004619, #3c096c32, #5a189a4b, #7b2cbf64, #9d4edd7f"
    },
    {
      src: "https://images.unsplash.com/photo-1515056140641-c645caffe247?w=400",
      alt: "Image 4",
      filter: "glow-1",
      gradient: "--l: #cb997e7f, #ffe8d67f, #a5a58d7f, #6b705c7f, #cb997e7f"
    },
    {
      src: "https://images.unsplash.com/photo-1509857820193-a5c67e4c20ab?w=400",
      alt: "Image 5",
      filter: "glow-0", 
      gradient: "--l: #0000 0%, #f7258520, #7209b740, #3a0ca360, #4361ee7f"
    },
    {
      src: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=400",
      alt: "Image 6",
      filter: "glow-1",
      gradient: "--l: #7bdff27f, #b2f7ef7f, #eff7f67f, #f7d6e07f, #f2b5d47f, #7bdff27f"
    },
    {
      src: "https://images.unsplash.com/photo-1618741292719-31020a29952c?w=400",
      alt: "Image 7",
      filter: "glow-0",
      gradient: "--l: #0000 0% 85%, #936bff7f 0%, #b892ff7f, #ffc2e27f, #ff90b37f"
    },
    {
      src: "https://images.unsplash.com/photo-1618681317438-a8dd7da06cd4?w=400",
      alt: "Image 8",
      filter: "glow-1",
      gradient: "--l: #7801167f, #f7b5387f, #db7c267f, #d8572a7f, #c32f277f, #7801167f"
    },
    {
      src: "https://images.unsplash.com/photo-1549888834-3ec93abae044?w=400",
      alt: "Image 9",
      filter: "glow-0",
      gradient: "--l: #0000 0% 25%, #f3b70019 0%, #faa30032, #e57c044b, #ff620164, #f63e027f 50%"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-300 py-8 px-4">
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
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-playwrite mb-8 mx-4">
        Animated Gradient Glow Image Gallery
      </h1>

      {/* Gallery Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {images.map((image, index) => (
            <div key={index} className="w-full max-w-[400px] aspect-square">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-xl border-8 border-transparent shadow-lg"
                style={{
                  background: `repeating-conic-gradient(from var(--a, 0deg), ${image.gradient.includes('--l:') ? image.gradient.split('--l: ')[1] : '#0000 0% 70%, #0000ff7f'}) border-box`,
                  filter: image.filter ? `url(#${image.filter})` : undefined,
                  border: 'solid 6px #0000',
                  animation: 'a 2s linear infinite'
                }}
              />
            </div>
          ))}
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
        `}
      </style>
    </div>
  );
};

export default AnimatedGradientGallery;