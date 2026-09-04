import React from "react";
import { Reveal } from "@/components/Reveal";
import { PageOrnaments } from "@/components/Ornaments";

// Replace these placeholders with your actual generated artwork files
import goaBeachImg from "../assets/beach_center_img.png";
import shell1 from "../assets/shell1.png";
import starfish from "../assets/shell2.png";
import wave from "../assets/shell3.png";
import shell2 from "../assets/shell4.png";
import palmLeaf from "../assets/shell5.png";
import boat from "../assets/shell6.png";

// Add or remove items from this array based on how many icons you generate
const orbitItems = [shell1, starfish, wave, shell2, palmLeaf, boat];

export function VenueOrbitReveal() {
  return (
    <section id="venue-reveal" className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center bg-paper overflow-hidden">
      <PageOrnaments />
      
      <Reveal variant="fade" className="flex flex-col items-center">
        <h3 className="mb-2 font-heading text-3xl font-semibold text-text-heading md:text-4xl">
          Where our story continues...
        </h3>
        <p className="mb-20 font-accent text-3xl text-text-secondary">
          Under the golden Goa sun
        </p>

        <div className="relative flex items-center justify-center h-80 w-80 md:h-96 md:w-96">
          {/* Center Beach Image */}
          <div className="absolute z-10 flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-gold/30 bg-paper-tint p-1 shadow-lg md:h-64 md:w-64">
            <img 
              src={goaBeachImg} 
              alt="Beach Sunset" 
              className="h-full w-full rounded-full object-cover opacity-95"
            />
          </div>

          {/* Orbiting Elements */}
          <div className="absolute inset-0 animate-[spin_35s_linear_infinite]">
            {orbitItems.map((item, i) => {
              const angle = (i * 360) / orbitItems.length;
              return (
                <div 
                  key={i} 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `rotate(${angle}deg) translateY(-170px)` }}
                >
                  {/* The reverse spin keeps the icons upright as they travel */}
                  <img 
                    src={item} 
                    alt="" 
                    className="h-12 w-12 object-contain mix-blend-multiply drop-shadow-sm animate-[spin_35s_linear_infinite_reverse] md:h-16 md:w-16" 
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}