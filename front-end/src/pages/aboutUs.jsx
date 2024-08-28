// import React, { useState } from "react";
// import { ChevronRight, ChevronLeft } from "lucide-react";

// const AboutUs = () => {
//   const [fontSize, setFontSize] = useState(16);
//   const increaseFontSize = () => setFontSize(fontSize + 2);
//   const decreaseFontSize = () => setFontSize(fontSize - 2);
//   const resetFontSize = () => setFontSize(16);

//   const [selectedImage, setSelectedImage] = useState(null);

//   const sections = [
//     {
//       title: "مرحبًا بكم في منصة الانتخابات الأردنية",
//       content:
//         "مهمتنا هي تقديم منصة إلكترونية شفافة وآمنة وسهلة الاستخدام مخصصة للعملية الانتخابية الأردنية. نحن ملتزمون بزيادة الوعي الانتخابي، وتشجيع المشاركة، وضمان نزاهة النظام الانتخابي.",
//     },
//     {
//       title: "قصتنا",
//       content:
//         "تأسست منصتنا برؤية لتحديث وتبسيط العملية الانتخابية، وتمثل خطوة هامة نحو تحقيق المزيد من الشفافية والمشاركة في الانتخابات. بقيادة مبادئ النزاهة، والوصول، والأمان، طوّر فريقنا حلاً شاملاً يلبي احتياجات الناخبين، والمترشحين، والإداريين على حد سواء.",
//     },
//     {
//       title: "ماذا نقدم",
//       content:
//         "للمصوتين: توفر منصتنا وصولاً سهلاً إلى العملية الانتخابية، بما في ذلك التسجيل، تصفح القوائم الانتخابية، الإدلاء بالأصوات، وعرض النتائج. يمكن للناخبين الاستمتاع بتجربة سلسة مع التركيز على الوضوح والبساطة.\n\nللمترشحين: يمكن للمترشحين تقديم طلباتهم، عرض حالة ترشحهم، وإدارة ملفاتهم الشخصية. تضمن منصتنا عملية سلسة لطلبات الترشح وإعلانات الانتخابات، بما في ذلك قسم مخصص للخدمات المدفوعة.",
//     },
//     {
//       title: "ميزاتنا",
//       content:
//         "تصميم سهل الاستخدام: تم تصميم موقعنا مع التركيز على سهولة الاستخدام، مما يضمن أن جميع المستخدمين يمكنهم التنقل في المنصة بسهولة.\n\nتسجيل دخول آمن: عملية تحقق متعددة الخطوات تضمن أمان وخصوصية حسابات المستخدمين.\n\nصفحات الانتخابات: يمكن للناخبين الوصول إلى دوائرهم الانتخابية، التصويت في القوائم المحلية والحزبية، وعرض نتائج الانتخابات. يمكن للمترشحين تقديم طلبات الترشح وإدارة إعلاناتهم.\n\nلوحة تحكم المسؤولين: توفر أدوات شاملة لإدارة الانتخابات، حسابات المستخدمين، وأداء النظام العام.\n\nتحسينات مبتكرة: تشمل تحديثات حية لنسب التصويت، مناظرات المترشحين عبر Zoom، دعم الدردشة الحية، وخيارات الدفع المتكاملة للإعلانات.",
//     },
//     {
//       title: "قانون الهيئة المستقلة للانتخاب",
//       content: "قانون الهيئة المستقلة للانتخاب رقم (11) لسنة 2012.",
//     },
//   ];

//   const [activeTab, setActiveTab] = useState("الأخبار");

//   const news = [
//     {
//       id: 1,
//       image: "/P1.png",
//       date: "06 أكتوبر 2023",
//       title: "كُن أنـــت الـقوي",
//       link: "#",
//     },
//     {
//       id: 2,
//       image: "/P2.png",
//       date: "05 أكتوبر 2023",
//       title: "كُن معبراً",
//       link: "#",
//     },
//     {
//       id: 3,
//       image: "/P3.png",
//       date: "03 أكتوبر 2023",
//       title: "كــن مـن يـحـدد نـهاية المـطـاف",
//       link: "#",
//     },
//     {
//       id: 4,
//       image: "/P4.png",
//       date: "03 أكتوبر 2023",
//       title: "كـــن أنــت مـؤثـر وفــاعل فـي الانــتخابـات ",
//       link: "#",
//     },
//     {
//       id: 5,
//       image: "/p5.png",
//       date: "03 أكتوبر 2023",
//       title:
//         "كــن أنت الأثــر الايجـابـي, أختـــار صـح فـي الانتــخابات الـقادمــة",
//       link: "#",
//     },
//   ];

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;

//   // Calculate the number of pages
//   const totalPages = Math.ceil(news.length / itemsPerPage);

//   // Get the current items based on the current page
//   const currentItems = news.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="bg-gray-100 flex">
//       {/* أزرار التحكم في حجم الخط */}
//       <div className="fixed top-1/4 left-4 bg-white shadow-lg rounded-lg p-4 z-10">
//         <div className="flex flex-col space-y-2">
//           <button
//             onClick={decreaseFontSize}
//             className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600"
//           >
//             <sup>-</sup>A
//           </button>
//           <button
//             onClick={resetFontSize}
//             className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600"
//           >
//             A
//           </button>
//           <button
//             onClick={increaseFontSize}
//             className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600"
//           >
//             <sup>+</sup>A
//           </button>
//         </div>
//       </div>

//       <div className="flex-1">
//         <div
//           className="relative bg-cover bg-center h-64"
//           style={{
//             backgroundImage: `url('/mmmmm.png')`,
//             backgroundSize: "cover",
//             objectFit: "cover",
//           }}
//         >
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//           <div className="relative flex items-center justify-center h-full">
//             <h1 className="text-white text-4xl font-bold">نبذة عن الهيئة</h1>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sections.map((section, index) => (
//               <div
//                 key={index}
//                 className="relative overflow-hidden rounded-lg shadow-lg"
//               >
//                 <div
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{ backgroundImage: `url('/picture.jpg')` }}
//                 ></div>
//                 <div
//                   className="relative bg-white bg-opacity-60 p-6 h-full"
//                   style={{ fontSize: `${fontSize}px` }}
//                 >
//                   <h2
//                     className="text-xl font-semibold mb-4 text-right"
//                     style={{ fontSize: `${fontSize}px` }}
//                   >
//                     {section.title}
//                   </h2>
//                   <p className="text-gray-700 text-right whitespace-pre-line">
//                     {section.content}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* قسم الأخبار */}
//         <div
//           className="container mx-auto px-4 py-8 font-arabic bg-cover bg-center"
//           style={{
//             backgroundImage: `url('/public/Section1.png')`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold">المركز الإعلامي</h1>
//             <button className="text-red-500 flex items-center">
//               <span>عرض الكل</span>
//               <ChevronLeft className="w-4 h-4 ml-1" />
//             </button>
//           </div>

//           <div className="flex justify-end mb-6 space-x-4 space-x-reverse">
//             {["الأخبار", "الصور", "الفيديوهات"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-full ${
//                   activeTab === tab
//                     ? "bg-red-500 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-lg shadow-md p-4 h-64 relative"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer"
//                   onClick={() => handleImageClick(item.image)}
//                 />
//                 <h2 className="text-lg font-bold mb-2">{item.title}</h2>
//                 <p className="text-gray-600">{item.date}</p>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               className={`px-4 py-2 rounded-full bg-gray-200 ${
//                 currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={currentPage === 1}
//             >
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//             </button>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePageChange(index + 1)}
//                 className={`px-4 py-2 rounded-full mx-1 ${
//                   currentPage === index + 1
//                     ? "bg-red-500 text-white"
//                     : "bg-gray-200 text-gray-600"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               className={`px-4 py-2 rounded-full bg-gray-200 ${
//                 currentPage === totalPages
//                   ? "opacity-50 cursor-not-allowed"
//                   : ""
//               }`}
//               disabled={currentPage === totalPages}
//             >
//               <ChevronLeft className="w-4 h-4 text-gray-600" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20"
//           onClick={closeImageModal}
//         >
//           <img
//             src={selectedImage}
//             alt="Expanded View"
//             className="max-w-full max-h-full"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AboutUs;
///////////////////////////////////////////

import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Nav from "../component/Nav";
import Footer from "../component/footer";

const AboutUs = () => {
  const [fontSize, setFontSize] = useState(16);
  const increaseFontSize = () => setFontSize(fontSize + 2);
  const decreaseFontSize = () => setFontSize(fontSize - 2);
  const resetFontSize = () => setFontSize(16);

  const [selectedMedia, setSelectedMedia] = useState(null); // Combined for image and video
  const [activeTab, setActiveTab] = useState("الصور"); // Default to images tab

  const sections = [
    {
      title: "مرحبًا بكم في منصة الانتخابات الأردنية",
      content:
        "مهمتنا هي تقديم منصة إلكترونية شفافة وآمنة وسهلة الاستخدام مخصصة للعملية الانتخابية الأردنية. نحن ملتزمون بزيادة الوعي الانتخابي، وتشجيع المشاركة، وضمان نزاهة النظام الانتخابي.",
    },
    {
      title: "قصتنا",
      content:
        "تأسست منصتنا برؤية لتحديث وتبسيط العملية الانتخابية، وتمثل خطوة هامة نحو تحقيق المزيد من الشفافية والمشاركة في الانتخابات. بقيادة مبادئ النزاهة، والوصول، والأمان، طوّر فريقنا حلاً شاملاً يلبي احتياجات الناخبين، والمترشحين، والإداريين على حد سواء.",
    },
    {
      title: "ماذا نقدم",
      content:
        "للمصوتين: توفر منصتنا وصولاً سهلاً إلى العملية الانتخابية، بما في ذلك التسجيل، تصفح القوائم الانتخابية، الإدلاء بالأصوات، وعرض النتائج. يمكن للناخبين الاستمتاع بتجربة سلسة مع التركيز على الوضوح والبساطة.\n\nللمترشحين: يمكن للمترشحين تقديم طلباتهم، عرض حالة ترشحهم، وإدارة ملفاتهم الشخصية. تضمن منصتنا عملية سلسة لطلبات الترشح وإعلانات الانتخابات، بما في ذلك قسم مخصص للخدمات المدفوعة.",
    },
  ];

  const images = [
    {
      id: 1,
      image: "/P1.png",
      date: "06 أكتوبر 2023",
      title: "كُن أنـــت الـقوي",
    },
    {
      id: 2,
      image: "/P2.png",
      date: "05 أكتوبر 2023",
      title: "كُن معبراً",
    },
    {
      id: 3,
      image: "/P3.png",
      date: "03 أكتوبر 2023",
      title: "كــن مـن يـحـدد نـهاية المـطـاف",
    },
    {
      id: 4,
      image: "/P4.png",
      date: "03 أكتوبر 2023",
      title: "كـــن أنــت مـؤثـر وفــاعل فـي الانــتخابـات ",
    },
    {
      id: 5,
      image: "/p5.png",
      date: "03 أكتوبر 2023",
      title:
        "كــن أنت الأثــر الايجـابـي, أختـــار صـح فـي الانتــخابات الـقادمــة",
    },
  ];

  const videos = [
    {
      id: 1,
      videoUrl: "/video1.mp4",
      date: "01 أكتوبر 2023",
      title: "بــلدك.. مـحافظـاتك..بـلديتك..مـسؤولـيتك",
    },
    {
      id: 2,
      videoUrl: "/video2.mp4",
      date: "02 أكتوبر 2023",
      title: "اختار صح في الانتخابات القادمة",
    },
    {
      id: 3,
      videoUrl: "/video3.mp4",
      date: "03 أكتوبر 2023",
      title: "الخيال يرسم المستقبل، وأنت تحوله لواقع",
    },
  ];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the number of pages
  const totalPages = Math.ceil(images.length / itemsPerPage);

  // Get the current items based on the current page and active tab
  const currentItems =
    activeTab === "الصور"
      ? images.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : videos;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Navigate to the first page when tab is clicked
  };

  return (
    <>
      <Nav />
      <div className="bg-gray-100 flex">
        {/* أزرار التحكم في حجم الخط */}
        <div className="fixed top-1/4 left-4 bg-white shadow-lg rounded-lg p-4 z-10">
          <div className="flex flex-col space-y-2">
            <button
              onClick={decreaseFontSize}
              className="bg-neutral-400 text-white py-1 px-2 rounded-lg hover:bg-emerald-700"
            >
              <sup>-</sup>A
            </button>
            <button
              onClick={resetFontSize}
              className="bg-neutral-400 text-white py-1 px-2 rounded-lg hover:bg-emerald-700"
            >
              A
            </button>
            <button
              onClick={increaseFontSize}
              className="bg-neutral-400 text-white py-1 px-2 rounded-lg hover:bg-emerald-700"
            >
              <sup>+</sup>A
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div
            className="relative bg-cover bg-center h-64"
            style={{
              backgroundImage: `url('/mmmmm.png')`,
              backgroundSize: "cover",
              objectFit: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex items-center justify-center h-full">
              <h1 className="text-white text-4xl font-bold">نبذة عن الهيئة</h1>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/picture.jpg')` }}
                  ></div>
                  <div
                    className="relative bg-white bg-opacity-60 p-6 h-full"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    <h2
                      className="text-xl font-semibold mb-4 text-right"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {section.title}
                    </h2>
                    <p className="text-gray-700 text-right whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* قسم الصور والفيديوهات */}
          <div className="container mx-auto px-4 py-8 font-arabic">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-right" dir="rtl">
                المركز الإعلامي
              </h1>
              <button className="text-red-500 flex items-center">
                <ChevronLeft className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="flex justify-end mb-6 space-x-4 space-x-reverse">
              {["الصور", "الفيديوهات"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded-full ${
                    activeTab === tab
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 h-64 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "الصور" ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer"
                      onClick={() => handleMediaClick(item.image)}
                    />
                  ) : (
                    <video
                      src={item.videoUrl}
                      controls
                      className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer"
                      onClick={() => handleMediaClick(item.videoUrl)}
                    />
                  )}
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </motion.div>
              ))}
            </div>

            {/* Pagination controls */}
            {activeTab === "الصور" && totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l"
                >
                  <ChevronLeft />
                </button>
                <span className="px-4 py-2 bg-gray-200 text-gray-700">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r"
                >
                  <ChevronRight />
                </button>
              </div>
            )}

            {/* Media Modal */}
            {selectedMedia && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={closeMediaModal}
              >
                <div
                  className="relative bg-white p-4 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  {activeTab === "الصور" ? (
                    <img
                      src={selectedMedia}
                      alt="Selected"
                      className="w-full h-auto"
                    />
                  ) : (
                    <video
                      src={selectedMedia}
                      controls
                      className="w-full h-auto"
                    />
                  )}
                  <button
                    className="absolute top-2 right-2 text-gray-800"
                    onClick={closeMediaModal}
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
