"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"; // Certifique-se de incluir o CSS de paginação

import { Pagination } from "swiper/modules";
import Image from "next/image";

interface ImageObject {
  filePath: string; // Agora, cada item é um objeto com a propriedade 'filePath'
}

interface SlideCarrouselImovelProps {
  images: ImageObject[]; // Agora 'images' é um array de objetos com a propriedade 'filePath'
}

const SlideCarrouselImovel = ({ images }: SlideCarrouselImovelProps) => {
  return (
    <Swiper
      slidesPerView={1} // Exibe apenas um slide de cada vez, ajustando conforme a tela
      spaceBetween={10} // Espaço entre os slides
      centeredSlides={true} // Garante que o slide ativo esteja centralizado
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-60">
            {" "}
            {/* Ajustando o contêiner da imagem */}
            <Image
              src={`http://localhost:3333/${image.filePath}`}
              alt="Imagem do imóvel"
              layout="fill" // Faz com que a imagem ocupe todo o contêiner
              objectFit="cover" // Garantindo que a imagem se ajuste sem distorcer
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideCarrouselImovel;
