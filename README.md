# 🌍 Wander-Lust  

A **full-stack travel and accommodation platform** built with **Node.js, Express, MongoDB, and EJS**. Wander-Lust allows users to discover, list, and review travel accommodations while providing a seamless and interactive user experience.  

## ✨ Features  

- 🏨 **User Authentication** – Secure sign-up, login, and session handling  
- 📌 **CRUD Listings** – Add, edit, delete, and view accommodations  
- ⭐ **Review System** – Post, edit, and delete reviews for listings  
- 📸 **Image Uploads** – Integrated with **Cloudinary** for media storage  
- 🔍 **Search & Filter** – Find listings easily by location or category  
- 🎨 **Responsive UI** – Styled with custom CSS for a smooth experience  
- ⚡ **Error Handling** – Robust middleware for server- and client-side errors  

## 🛠 Tech Stack  

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Frontend:** EJS templates, CSS, JS  
- **Authentication:** Passport.js & Sessions  
- **Media Storage:** Cloudinary  
- **Utilities:** Express-Validator, WrapAsync, Custom Middleware  

## 📂 Project Structure  

Wander-Lust-project/<br>
│── app.js # Main app entry<br>
│── routes/ # App routes (listings, reviews, users)<br>
│── controllers/ # Business logic for routes<br>
│── models/ # Mongoose schemas (User, Listing, Review)<br>
│── views/ # EJS templates<br>
│── public/ # Static assets (CSS, JS)<br>
│── utils/ # Error handling utilities<br>
│── cloudConfig.js # Cloudinary config<br>
│── package.json # Dependencies & scripts<br>


## 🚀 Getting Started  

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Piyush-Pushpak/Wander-Lust-project
cd Wander-Lust

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment variables
# Create a .env file in the root folder and add:
MONGO_URI=your_mongodb_connection
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret
PORT=5000

# 4️⃣ Run the app
npm start
