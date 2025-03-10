/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import Swal from "sweetalert2";
import patternBg from "../../assets/images/patternbg.png";

const ChatPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false); // State untuk animasi loading

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

    setIsLoading(true); // Aktifkan loading saat mulai mengirim

    const chatToken = import.meta.env.VITE_CHAT_TOKEN;
    const chatId = import.meta.env.VITE_CHAT_ID;

    console.log(chatToken, chatId); // Debug token dan ID chat
    const text = `📩 *Pesan Baru dari Website:*\n\n👤 Nama: ${name}\n📌 Subjek: ${subject}\n💬 Pesan: ${message}`;

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

        setFormData({ name: "", subject: "", message: "" }); // Reset form
      } else {
        Swal.fire({
          title: "Failed!",
          text: "the message could not be sent. Try again later.",
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
      setIsLoading(false); // Matikan loading setelah selesai
    }
  };

  return (
    <div className="relative pt-15 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-4 sm:p-6 dark:bg-gray-900">
        <div className="bg-white dark:drop-shadow-2xl dark:shadow-2xl dark:shadow-white/30 shadow-lg rounded-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div
            className="bg-blue-100 p-6 rounded-lg text-center items-center justify-center"
            style={{
              backgroundImage: `url(${patternBg})`,
              backgroundSize: "300px", // Menutupi seluruh area
              backgroundPosition: "left",
            }}
          >
            <h2 className="text-lg font-bold mt-20">Contact Information</h2>
            <p className="mb-2 md:text-center">
              📧{" "}
              <a href="mailto:saifuddaulah24@gmail.com" className="text-blue-500 ">
                saifuldaulah24@gmail.com
              </a>
            </p>
            <p className="mb-2 ">📞 +62851 6361 4521</p>
            <p className="mb-2 ">📍 Jakarta, Indonesia</p>
            <p className="mt-4 font-semibold">Thank You :)</p>
          </div>

          {/* Form Message */}
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-center">Form Message</h2>
            <form onSubmit={sendMessage} className="space-y-3">
              <p className="text-black">Name</p>
              <input type="text" name="name" placeholder="Input Name" className="w-full p-2 border rounded" onChange={handleChange} value={formData.name} required />
              <p className="text-black">Subject</p>
              <input type="text" name="subject" placeholder="Input Subject" className="w-full p-2 border rounded" onChange={handleChange} value={formData.subject} required />
              <p className="text-black">Message</p>
              <textarea name="message" placeholder="Input Message" className="w-full p-2 border rounded h-24" onChange={handleChange} value={formData.message} required />

              {/* Tombol dengan animasi loading */}
              <button type="submit" className="w-full bg-black text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform" disabled={isLoading}>
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
      <Footer />
    </div>
  );
};

export default ChatPage;
