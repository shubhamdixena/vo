"use client"

import { useState } from "react"

const WhyWaterSection = () => {
  const [activeCategory, setActiveCategory] = useState("HEALTH")

  const categories = {
    HEALTH: {
      image: "/assets/assets_2fe4147bb8c843bb8ebba475c8973899_c5aa1dfb86c24d98a0cf079d40f26c01.webp",
      fact: "Access to clean water and basic sanitation can save around 16,000 lives every week.",
      alt: "Woman accessing clean water",
    },
    EDUCATION: {
      image: "/assets/hero-image.jpeg",
      fact: "Children miss 443 million school days each year due to water-related illnesses. Clean water helps keep kids in school.",
      alt: "Children in a classroom",
    },
    WOMEN: {
      image: "/assets/assets_2fe4147bb8c843bb8ebba475c8973899_454f9ac0ec2d4d8d943786cc109b59a4.png",
      fact: "Women and girls spend up to 6 hours every day collecting water. Clean water gives them time for education and opportunity.",
      alt: "Woman collecting water",
    },
    "ECONOMIC GROWTH": {
      image: "/assets/assets_2fe4147bb8c843bb8ebba475c8973899_cbcc89b46e664c09a63f4fc16c6384b5.png",
      fact: "Every $1 invested in clean water and sanitation yields $4-$12 in economic returns. Water is essential for community growth.",
      alt: "People with water container",
    },
  }

  return (
    <section className="bg-[#FBF7EE] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-sm font-medium uppercase tracking-wider text-gray-500">WHY WATER?</span>
        </div>

        <h2 className="font-serif text-center text-4xl md:text-5xl font-bold mb-10">
          Because clean water changes everything
        </h2>

        <div className="max-w-5xl mx-auto mb-12 relative rounded-lg overflow-hidden">
          <img
            src={categories[activeCategory].image || "/placeholder.svg"}
            alt={categories[activeCategory].alt}
            className="w-full object-cover rounded-lg aspect-[16/9]"
            style={{ minHeight: "500px" }}
          />

          <div className="absolute top-0 left-0 right-0 p-4 flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 bg-white px-3 py-2 rounded-full shadow-md">
              {Object.keys(categories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-charity-blue text-white shadow-sm"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="absolute bottom-10 right-10 max-w-xs bg-white p-6 rounded-lg shadow-lg">
            <p className="text-sm font-medium leading-relaxed">{categories[activeCategory].fact}</p>
            <a href="#" className="mt-3 inline-block text-charity-blue font-semibold text-sm uppercase hover:underline">
              LEARN ABOUT LIVES CHANGED
            </a>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-serif text-3xl font-bold mb-4">
            703 million people lack basic access to clean and safe drinking water
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            Our work to end the water crisis impacts every aspect of life. You can help provide education, income,
            dignity, and health — especially for women and children.
          </p>
        </div>
      </div>
    </section>
  )
}

export default WhyWaterSection
