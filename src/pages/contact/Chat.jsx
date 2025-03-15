/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import Swal from "sweetalert2";

const ChatPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { name, subject, message } = formData;

    if (!name || !subject || !message) {
      Swal.fire({
        title: "Oops!",
        text: "Please fill in all fields before submitting!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsLoading(true);

    const chatToken = import.meta.env.VITE_CHAT_TOKEN;
    const chatId = import.meta.env.VITE_CHAT_ID;

    const text = `📩 *Pesan Baru dari Website:*
👤 Nama: ${name}
📌 Subjek: ${subject}
💬 Pesan: ${message}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${chatToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });

      const result = await response.json();
      if (result.ok) {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully.Thank You :)",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({ name: "", subject: "", message: "" });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "The message could not be sent. Try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Failed!",
        text: "Unable to send message. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="chat" className="lg:pt-20 xl:pt-20 md:pt-20 min-h-screen flex flex-col bg-gradient-to-b from-blue-300 via-purple-100 to-pink-100 dark:bg-gradient-to-b dark:from-indigo-900 dark:via-cyan-800 dark:to-purple-900 dark:text-white">
      {/* Wrapper utama agar footer tetap di bawah */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        {/* Floating 3D Elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-14 h-14 bg-opacity-40 rounded-full blur-xl animate-float"
            style={{
              backgroundColor: ["#3b82f6", "#8b5cf6", "#f43f5e", "#22c55e", "#eab308", "#f97316"][i % 6],
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 3}s`,
            }}
          ></div>
        ))}
        <Navbar />

        <div className="flex flex-col items-center justify-center flex-grow p-6 inset-0 bg-cover bg-center">
          <div className="bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-lg rounded-xl p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 dark:shadow-white">
            {/* Contact Information */}
            <div data-aos="fade-up" className="bg-white/20 dark:bg-black/20 p-6 rounded-xl text-center flex flex-col items-center border-gray-500 shadow-md dark:shadow-md dark:shadow-white">
              <h2 className="font-bold text-gray-900 mt-10 dark:text-white font-kreon tracking-wider text-3xl ">Contact Information</h2>
              <p className="mb-2 text-gray-700 mt-3">
                📧{" "}
                <a href="mailto:saifuddaulah24@gmail.com" className="text-blue-600 hover:underline dark:text-white">
                  saifuldaulah24@gmail.com
                </a>
              </p>
              <p className="mb-2 text-gray-700 dark:text-white mt-3">📞 +62851 6361 4521</p>
              <p className="mb-2 text-gray-700 mt-3 dark:text-white">📍 Jakarta, Indonesia</p>
              <p className="font-bold text-gray-900 mt-5 dark:text-white font-kreon tracking-wider text-2xl">Thank You 🙂</p>
            </div>

            {/* Form Message */}
            <div data-aos="fade-up" className="p-3">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white font-kreon tracking-wider">Form Message</h2>
              <form onSubmit={sendMessage} className="space-y-4">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Input Name"
                  className="w-full p-3 border border-gray-900 dark:border-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
                <p>Subject</p>
                <input
                  type="text"
                  name="subject"
                  placeholder="Input Subject"
                  className="w-full p-3 border border-gray-900 dark:border-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onChange={handleChange}
                  value={formData.subject}
                  required
                />
                <p>Message</p>
                <textarea
                  name="message"
                  placeholder="Input Message"
                  className="w-full p-3 border border-gray-900 dark:border-white rounded-lg h-24 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onChange={handleChange}
                  value={formData.message}
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-stone-950 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:text-white transition"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
