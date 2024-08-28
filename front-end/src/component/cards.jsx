// src/components/CardsComponent.jsx
import React from "react";

// Updated image URLs
const cardImageUrl1 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd7DN7GUE309tpeu6agGpC0OXFH-mkBhfYmw&s";
const cardImageUrl2 =
  "https://www.alghad.tv/wp-content/uploads/2016/08/jor.jpg";
const cardImageUrl3 = "https://alsaa.net/webp/new_571085_8893_800.webp";
const cardImageUrl4 =
  "https://www.assawsana.com/image.php?token=903ea86cff3778045f9beb566f900e4e&size=";

const CardsComponent = () => {
  // Example card data with the same link for all cards
  const cardData = [
    {
      image: cardImageUrl1, // URL image
      title: "موعد بدء الانتخابات في الأردن", // Election start date
    },
    {
      image: cardImageUrl2, // URL image
      title: "موعد انتهاء الانتخابات في الأردن", // Election end date
    },
    {
      image: cardImageUrl3, // URL image
      title: "تحديثات حول قرارات الانتخابات الأخيرة", // Recent election decisions
    },
    {
      image: cardImageUrl4, // URL image
      title: "تعديلات على القوانين الانتخابية", // Amendments to election laws
    },
  ];

  const handleClick = () => {
    window.location.href =
      "https://www.iec.jo/ar/%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%AA/%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%AA-%D8%A7%D9%84%D9%86%D9%8A%D8%A7%D8%A8%D9%8A%D8%A9";
  };

  return (
    <section className="p-8 bg-gray-50 border-t border-gray-200 mt-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        الأخبار ذات الصلة
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative group max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={handleClick}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-56 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-4">
                <span className="text-white text-lg font-semibold text-center">
                  {card.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsComponent;
