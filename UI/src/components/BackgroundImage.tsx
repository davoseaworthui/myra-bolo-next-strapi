import Image from 'next/image';

const BackgroundImage = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      minHeight: '100vh', // Ensures the background image covers the entire page height
      zIndex: -1,
      opacity: 0.1, // Adjust opacity for translucency
      backgroundImage: "url('/img/shutterstock2688690531.jpg')", // Path to your image
      backgroundRepeat: 'repeat', // Repeats the image to fill the viewport
      backgroundSize: 'auto', // Allows image to retain its original size
      backgroundPosition: 'center', // Centers the background image
    }}
  >
    <Image
      src="/img/shutterstock2688690531.jpg"
      layout="fill"
      objectFit="cover"
      quality={75} // Adjust quality as needed
      alt="Background"
    />
  </div>
);

export default BackgroundImage;
