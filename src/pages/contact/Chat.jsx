/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import Swal from "sweetalert2";

const ChatPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { name, subject, message } = formData;

    if (!name || !subject || !message) {
      Swal.fire({
        title: "Oops!",
        text: "Harap isi semua kolom sebelum mengirim!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const botToken = "7903020140:AAE0CPfIDPeyL4Ke-GyF3ULatKLiv-yLizs";
    const chatId = "1553255732";
    const text = `📩 *Pesan Baru dari Website:*\n\n👤 Nama: ${name}\n📌 Subjek: ${subject}\n💬 Pesan: ${message}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });

      const result = await response.json();
      if (result.ok) {
        Swal.fire({
          title: "Berhasil!",
          text: "Pesan telah dikirim ke Telegram!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Reset form setelah sukses kirim
        setFormData({ name: "", subject: "", message: "" });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan, coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Tidak dapat mengirim pesan.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-4 sm:p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-blue-100 p-6 rounded-lg text-center md:text-left">
            <h2 className="text-lg font-bold mb-4">Contact Information</h2>
            <p className="mb-2">📧 <a href="mailto:saifuddaulah24@gmail.com" className="text-blue-500">saifuddaulah24@gmail.com</a></p>
            <p className="mb-2">📞 +62851 6361 4521</p>
            <p className="mb-2">📍 Jakarta, Indonesia</p>
            <p className="mt-4 font-semibold">Thank You :)</p>
          </div>

          {/* Form Message */}
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-center md:text-left">Form Message</h2>
            <form onSubmit={sendMessage} className="space-y-3">
              <input 
                type="text" 
                name="name" 
                placeholder="Input Name" 
                className="w-full p-2 border rounded" 
                onChange={handleChange} 
                value={formData.name} 
                required 
              />
              <input 
                type="text" 
                name="subject" 
                placeholder="Input Subject" 
                className="w-full p-2 border rounded" 
                onChange={handleChange} 
                value={formData.subject} 
                required 
              />
              <textarea 
                name="message" 
                placeholder="Input Message" 
                className="w-full p-2 border rounded h-24" 
                onChange={handleChange} 
                value={formData.message} 
                required 
              />
              <button 
                type="submit" 
                className="w-full bg-black text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                Send Message
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
