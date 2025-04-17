// eslint-disable-next-line no-unused-vars
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
          text: "Message sent successfully. Thank You :)",
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
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className="flex-grow">
        <div className="lg:pt-20 xl:pt-20 md:pt-20 flex flex-col bg-white dark:bg-black transition-colors duration-300">
          {/* Background subtle pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
          
          <div className="flex flex-col flex-grow items-center justify-center px-4 py-6 md:p-6 relative z-10">
            <Navbar />
            <div className="flex flex-col items-center justify-center max-w-6xl w-full mx-auto mt-4 md:mt-0">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 border border-gray-200 dark:border-gray-700 drop-shadow-md dark:shadow-gray-500">
                {/* Contact Information */}
                <div data-aos="fade-up" className="bg-gray-50 dark:bg-gray-800 p-5 md:p-8 rounded-xl flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full mb-4 md:mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white font-kreon text-center tracking-wider">Contact Information</h2>

                  <div className="space-y-4 md:space-y-5 w-full">
                    <div className="flex items-center space-x-3">
                      <div className="bg-black dark:bg-white p-2 rounded-full flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <a href="mailto:saifuddaulah24@gmail.com" className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition truncate">
                        saifuddaulah24@gmail.com
                      </a>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-black dark:bg-white p-2 rounded-full flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <a href="https://wa.me/6285163614521" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-green-500 transition">
                        +62851 6361 4521
                      </a>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-black dark:bg-white p-2 rounded-full flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">Jakarta, Indonesia</span>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700 w-full text-center">
                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-kreon">Thank You 🙂</p>
                  </div>
                </div>

                {/* Form Message */}
                <div data-aos="fade-up" className="p-5 md:p-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white text-center font-kreon tracking-wider">Form Message</h2>
                  <form onSubmit={sendMessage} className="space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2 font-medium text-sm md:text-base">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Input Name"
                        className="w-full p-2 md:p-3 text-sm md:text-base dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                        onChange={handleChange}
                        value={formData.name}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2 font-medium text-sm md:text-base">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Input Subject"
                        className="w-full p-2 md:p-3 text-sm md:text-base dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                        onChange={handleChange}
                        value={formData.subject}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2 font-medium text-sm md:text-base">Message</label>
                      <textarea
                        name="message"
                        placeholder="Input Message"
                        className="w-full p-2 md:p-3 text-sm md:text-base dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg h-24 md:h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                        onChange={handleChange}
                        value={formData.message}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-black dark:bg-white dark:text-black dark:hover:text-white hover:bg-blue-700 text-white font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 mt-3 md:mt-4 shadow-md text-sm md:text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
