import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import "../../styles/swiper-custom.css";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    hdlGetImage();
  }, []);

  const hdlGetImage = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=20")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Swiper
        pagination={false} // Disable pagination dots
        modules={[Autoplay]} // Remove Pagination module
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper h-80 object-cover rounded-md mb-4"
        style={{
          '--swiper-theme-color': 'transparent',
          '--swiper-pagination-color': 'transparent'
        }}
      >
        {data?.map((item) => (
          // ❗️ 1. เพิ่ม key={item.id} ตรงนี้
          <SwiperSlide key={item.id}>
            <img src={item.download_url} alt={`Random image ${item.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={false} // Disable pagination dots
        navigation={false} // Disable navigation arrows
        modules={[Autoplay]} // Remove Pagination and Navigation modules
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper object-cover rounded-md"
        style={{
          '--swiper-theme-color': 'transparent',
          '--swiper-navigation-color': 'transparent',
          '--swiper-pagination-color': 'transparent'
        }}
      >
        {data?.map((item) => (
          // ❗️ 2. และเพิ่ม key={item.id} ตรงนี้ด้วย
          <SwiperSlide key={item.id}>
            <img 
              className="rounded-md"
              src={item.download_url} 
              alt={`Thumbnail image ${item.id}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;