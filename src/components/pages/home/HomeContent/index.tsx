import React from "react";
import Image from "next/image";

import BeachImage from "@/assets/salar01.jpg";
import SwimmingPoolImage from "@/assets/piscina01.jpg";
import styles from "./style.module.scss";
import Container from "../../../module/container";
import SliderComponent from "../../../ui/slider";
import SliderImage from "@/assets/01.jpg";

const contentList = [
  {
    content: (
      <p>
        <b>Piscina climatizada de agua salada con sal del salar de Uyuni,</b>
        <br />
        agua de la piscina que se mezcla muy ligeramente con la sal de Uyuni.
        Esto significa que necesita mucho menos cloro y otros productos
        químicos. Al mismo tiempo, la sal es agradable y saludable para el
        cuerpo y la piel. Debido a la calefacción incorporada, el agua salada
        siempre está constantemente caliente.
      </p>
    ),
    image: BeachImage,
  },
  {
    content: (
      <p>
        <b>Piscina infinita panorámica con plexiglás de seguridad</b>
        <br /> A través del plexiglás se tiene una vista impresionante de Santa
        Cruz.
      </p>
    ),
    image: SwimmingPoolImage,
  },
  {
    content: (
      <p>
        Suelos epoxi de alta calidad en todas las viviendas Suelos muy
        utilizados en Europa y otros países. La capa de epoxi hace que el suelo
        sea suave y cómodo. Debido a que es una superficie continua, el piso es
        fácil de limpiar y se ve limpio y liso.
      </p>
    ),
  },
  {
    content: (
      <p>
        Madera de chapa importada para muebles de cocina, baño y sala de estar
        <br />
        La mejor calidad de madera de chapa se utiliza para todos los muebles y
        gabinetes. La madera se pega a partir de al menos 10 capas de paneles de
        madera delgados y, por lo tanto, es mucho más estable y resistente al
        agua que la madera de melanina que se usa generalmente en Bolivia, que
        se pega a partir de astillas de madera. Nuestra chapa de madera está
        protegida adicionalmente con una capa de color madera o blanca. Toda la
        madera es procesada en muebles por un carpintero suizo con el más alto
        estándar aquí en Bolivia.
      </p>
    ),
  },
  {
    content: (
      <p>
        Puertas insonorizadas estables de madera multicapa Nuestras puertas
        están compuestas de forma óptima por diferentes maderas, para que sean
        estables, insonorizadas y duraderas.
      </p>
    ),
  },
  {
    content: (
      <p>
        Ventanas de aluminio insonorizadas con doble acristalamiento: Ventanas
        de última generación según las normas suizas en cuanto a insonorización
        y durabilidad. Nuestras ventanas no solo tienen doble acristalamiento,
        sino que también están llenas de gas entre los cristales, lo que
        proporciona un aislamiento adicional.
      </p>
    ),
  },
  {
    content: (
      <p>
        Sistema de climatización instalado en los techos. 50-70% menos de
        unidades exteriores en fachadas Sistema de climatización de última
        generación. Nuestros dispositivos de exterior pueden hacer funcionar
        varios dispositivos de interior al mismo tiempo. Esto significa que
        nuestros aires acondicionados consumen menos electricidad y, al mismo
        tiempo, la casa tiene un aspecto más agradable porque hay que utilizar
        menos electrodomésticos de exterior. Además, nuestras unidades
        interiores no son objetos voluminosos y torpes que generalmente se
        cuelgan en la pared, sino que las unidades interiores están
        discretamente ocultas en el techo y solo se ven pequeños espacios.
      </p>
    ),
  },
  {
    content: (
      <p>
        Acero estructural antisísmico importado, el mismo que se utiliza para
        construir los edificios más altos del mundo. Utilizamos acero original
        importado que se utiliza para construir los mejores edificios del mundo.
      </p>
    ),
  },
  {
    content: (
      <p>
        Sistema eléctrico instalado por una empresa constructora alemana La
        mejor instalación de calidad alemana.
      </p>
    ),
  },
  {
    content: (
      <p>
        <b>Fachada ventilada</b>
        <br />
        El aislamiento con lana de vidrio asegura que el calor esté donde debe
        estar. En verano es agradable y fresco en el apartamento, en invierno el
        calor se queda en el apartamento. <br /> Además, el aislamiento
        proporciona un excelente aislamiento acústico, protección contra la
        humedad, ecología y durabilidad.
        <br /> Reduce las pérdidas de energía a través de las paredes exteriores
        en un 80%
      </p>
    ),
  },
];

const HomeContent = () => {
  return (
    <Container className={styles.wrapper}>
      <div className="py-4">
        <p className="mb-5">
          <b>En el corazón de Santa Cruz,</b> le espera un edificio de
          apartamentos único.
        </p>
        <p className="mb-8">
          Desde constructores innovadores de Suiza hasta estándares suizos, te
          ofrecemos una nueva sensación de vivir en 10 puntos que es una novedad
          para este tipo de casas en <b>Bolivia</b>.
        </p>
      </div>
      <div className="flex flex-col gap-14 mb-10">
        {contentList.map((item, index) => (
          <div className="grid grid-cols-2 gap-5" key={index}>
            {item.content}
            <div className="w-full">
              {!!item.image ? (
                <Image src={item.image} alt="image" className={styles.image} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <SliderComponent
        child={
          <>
            <div>
              <Image src={SliderImage} alt="test" />
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </>
        }
      />
    </Container>
  );
};

export default HomeContent;
