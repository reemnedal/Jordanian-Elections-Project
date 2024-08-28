// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const auth = (req, res, next) => {
//   // تحقق من وجود الكوكيز أولاً
//   const token = req.cookies && req.cookies.token ? req.cookies.token : null;

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     // تحقق من صحة التوكن
//     const user = jwt.verify(token, process.env.JWT_SECRET);

//     // قم بإضافة المستخدم المفكك إلى الكائن `req`
//     req.user = user;

//     // سجل المستخدم المفكك فقط في وضع التطوير
//     if (process.env.NODE_ENV === "development") {
//       console.log("Decoded user:", user);
//     }

//     next();
//   } catch (error) {
//     // قم بحذف الكوكيز إذا كان التوكن غير صالح
//     res.clearCookie("token");

//     // سجل الخطأ فقط في وضع التطوير
//     if (process.env.NODE_ENV === "development") {
//       console.error("Token verification error:", error);
//     }

//     // أرسل استجابة توضح أن التوكن غير صالح
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = auth;
