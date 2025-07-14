import React from "react";

import icon1 from "@/assets/buildingDescription/1.png";
import icon2 from "@/assets/buildingDescription/2.png";
import icon3 from "@/assets/buildingDescription/3.png";
import icon4 from "@/assets/buildingDescription/4.png";
import icon5 from "@/assets/buildingDescription/5.png";
import icon6 from "@/assets/buildingDescription/6.png";
import icon7 from "@/assets/buildingDescription/7.png";
import icon8 from "@/assets/buildingDescription/8.png";

import styles from "./style.module.scss";
import Image from "next/image";

const BuildingDescription = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContent}>
        <p>
          {`Welcome to our construction description page ! Here you'll find a comprehensive overview of the high-quality
          materials and construction methods we use in our projects. Every detail is carefully selected to ensure
          longevity and maximum living comfort.`}
        </p>
        <p>
          Our construction specifications define the standards you can expect from us – from solid foundations and
          energy-efficient facades to the exquisite interior finishes. We value transparency and quality at every step
          of the construction process.
        </p>
        <p>
          {`Discover the technical specifications and features that will distinguish your future building. We're happy to
          answer any questions you may have.`}
        </p>
      </div>
      <h1>Building description</h1>
      <div className={styles.content}>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon1} alt="icon1" className="w-6 h-6" />
            <h2>Generally</h2>
          </div>
          <p>
            The structure will be constructed in accordance with the regulations of the local authorities and the SIA
            standards. This is considered a general description; the execution plans are authoritative.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon2} alt="icon2" className="w-6 h-8" />
            <h2>sewerage</h2>
          </div>
          <p>
            All pipes are made of PE, including floor drains and inspection chambers. Connection to the municipal sewer
            system is in accordance with the approved project. Terrace and roof water is collected and used as utility
            water.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon3} alt="icon1" className="w-6 h-6" />
            <h2>basement</h2>
          </div>
          <p>
            {`Foundations according to geological requirements. Reinforced concrete walls 25 cm thick, interior walls made
            of sand-lime brick or concrete. Waterproofing as a "white tank." Ceilings 25–48 cm thick. Prefabricated
            staircases with porcelain stoneware.`}
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon4} alt="icon1" className="w-6 h-6" />
            <h2>Ground floor to attic floor</h2>
          </div>
          <p>
            Exterior walls are made of brick or reinforced concrete with thermal insulation, plastered or with a
            ventilated facade. Window sills and horizontal components are made of cast stone. Interior walls are made of
            plastered bricks or drywall, load-bearing walls are made of concrete. Ceilings are made of reinforced
            concrete. Staircases are carpeted. Standards: SIA 180 (heat), SIA 181 (sound), SIA 260/261 (earthquake).
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon5} alt="icon1" className="w-6 h-3" />
            <h2>flat roof</h2>
          </div>
          <p>
            Concrete ceiling with vapor barrier, thermal insulation, and a waterproof bituminous barrier layer.
            Extensive greening. SIA Standard 271.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon6} alt="icon1" className="w-6 h-6" />
            <h2>Balconies / Terraces</h2>
          </div>
          <p>
            {`Sloped concrete slabs, porcelain stoneware on pedestals. Waterproofing as for a flat roof. Flooring of the
            contractor's choice. Steel railings, exposed concrete parapets.`}
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon7} alt="icon1" className="w-6 h-3" />
            <h2>Window</h2>
          </div>
          <p>
            Wood-metal windows with double-glazed insulated units and tilt-and-turn functionality. Glass-fiber
            reinforced concrete window sills.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon8} alt="icon1" className="w-6 h-6" />
            <h2>Plumbing work</h2>
          </div>
          <p>
            Made of stainless steel or aluminum according to the color scheme. Roof edges, spouts, gutters, etc. in
            sheet thickness 0.6–0.8 mm. SIA Standard 232.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon1} alt="icon1" className="w-6 h-6" />
            <h2>Interior design</h2>
          </div>
          <p>
            Interior plaster, gypsum ceilings, high-quality wall and floor coverings. Wet rooms with porcelain
            stoneware. Walls in exposed concrete or plastered. Sound insulation according to standards.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon2} alt="icon1" className="w-6 h-8" />
            <h2>Kitchen / Bathrooms</h2>
          </div>
          <p>
            Modern fitted kitchens with granite or engineered stone countertops. Brand-name fixtures. Mirrored cabinets
            and vanities included.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon3} alt="icon1" className="w-6 h-6" />
            <h2>Heating / Ventilation</h2>
          </div>
          <p>
            Air-to-water heat pump with underfloor heating. Controls for each room. Controlled ventilation in bathrooms
            and kitchens.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon4} alt="icon1" className="w-6 h-6" />
            <h2>Electrical installation</h2>
          </div>
          <p>
            Outlets, switches, and multimedia connections in all rooms. Intercom system. Preparations for fiber optic
            and solar panels.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon5} alt="icon1" className="w-6 h-3" />
            <h2>Surroundings / Development</h2>
          </div>
          <p>
            Driveways, parking spaces, and illuminated gardens. Fencing as per plan. Wheelchair-accessible main
            entrance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuildingDescription;
