// components/CarouselBanner.js

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselBanner() {
  return (
    <div style={{ margin: "1rem auto", maxWidth: "800px" }}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        dynamicHeight={false}
      >
        <div>
          <img src="/banner1.jpg" alt="Slide 1" />
          <p className="legend">🔔 Latest Govt Job Notification</p>
        </div>
        <div>
          <img src="/banner2.jpg" alt="Slide 2" />
          <p className="legend">💼 Top Private Hiring This Week</p>
        </div>
        
      </Carousel>
    </div>
  );
}
