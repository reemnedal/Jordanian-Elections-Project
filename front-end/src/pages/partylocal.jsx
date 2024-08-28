import React from "react";
import { Link } from "react-router-dom";
import { Shield, Users, Building } from "lucide-react";
import { motion } from "framer-motion";
import Nav from "../component/Nav";
import Footer from "../component/footer";

const ElectionCards = () => {
  return (
    <>
      <Nav />
      <div
        className="min-h-screen bg-fixed"
        style={{
          backgroundImage: "url('/picture.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="container mx-auto p-4 pt-24">
          <motion.header
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-3xl font-bold text-[#8E1B3B]">
                الهيئة المستقلـة للانتخابات
              </h1>
              <img
                src="/picture.jpg"
                alt="Map of Jordan"
                className="ml-2 h-10 w-10"
              />
            </div>

            <p className="text-gray-600">الموقع الرسمي للتصويت الإلكتروني</p>
          </motion.header>

          <motion.main
            className="bg-white shadow-lg rounded-lg p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-[#8E1B3B]">
              نظام التصويت الإلكتروني - اختيار نوع القائمة
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <VotingOption
                icon={<Users className="text-[#8E1B3B] mb-4" size={48} />}
                title="القوائم المحلية"
                description="التصويت للمرشحين المحليين في دائرتك الانتخابية"
                link="/listlocal"
              />
              <VotingOption
                icon={<Building className="text-[#8E1B3B] mb-4" size={48} />}
                title="القوائم الحزبية"
                description="التصويت للأحزاب السياسية على المستوى الوطني"
                link="/createparty"
              />
            </div>
          </motion.main>

          <motion.div
            className="mt-8 text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p>يرجى التأكد من أهليتك للتصويت قبل المتابعة.</p>
            <p>
              للمساعدة أو الاستفسارات، يرجى الاتصال بمركز دعم الناخبين على الرقم
              0000-000-0000
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const VotingOption = ({ icon, title, description, link }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link to={link} className="w-full md:w-64 block">
      <motion.div
        className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
        <h3 className="text-xl font-semibold mb-4 text-[#8E1B3B]">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <motion.button
          className="w-full bg-[#8E1B3B] text-white py-2 rounded-md hover:bg-[#72152d] transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          اختر
        </motion.button>
      </motion.div>
    </Link>
  </motion.div>
);

export default ElectionCards;
