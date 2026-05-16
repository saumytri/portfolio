import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

// Validation helpers
const validateForm = ({ name, email, message }) => {
  if (!name.trim() || name.trim().length < 2)
    return "Please enter your full name (at least 2 characters).";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return "Please enter a valid email address.";
  if (!message.trim() || message.trim().length < 10)
    return "Message must be at least 10 characters.";
  return null;
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const error = validateForm(formData);
    if (error) {
      Swal.fire({
        title: "Validation Error",
        text: error,
        icon: "warning",
        confirmButtonColor: "#0ea5e9",
      });
      return;
    }

    setIsSubmitting(true);
    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we send your message.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const webhookUrl = "https://discord.com/api/webhooks/1500239749946933300/5s2ekUqASGeG6c4BFsbGSwvp4jm8IoCnu0xieNHpDXf1XqVidEOaKAfQAGYWulq5ehUW";
      const messageData = {
        embeds: [
          {
            title: "📬 New Portfolio Contact Message",
            color: 0x0ea5e9,
            fields: [
              {
                name: "Name",
                value: formData.name,
                inline: true,
              },
              {
                name: "Email",
                value: formData.email,
                inline: true,
              },
              {
                name: "Message",
                value: formData.message,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      Swal.fire({
        title: "Message Sent! 🎉",
        text: "Thanks for reaching out! I'll get back to you soon.",
        icon: "success",
        confirmButtonColor: "#0ea5e9",
        timer: 3000,
        timerProgressBar: true,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Discord webhook error:", err);
      Swal.fire({
        title: "Failed to Send",
        text: "Something went wrong. Please try again later or contact me via LinkedIn.",
        icon: "error",
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4]"
        >
          Contact Me
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Got a question or a project idea? Send me a message and I'll get back to you soon.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] max-w-4xl mx-auto">
          {/* Contact Form */}
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[#0ea5e9]/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4]">
                  Get in Touch
                </h2>
                <p className="text-gray-400">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#0ea5e9] opacity-50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name */}
              <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#0ea5e9] transition-colors" />
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  minLength={2}
                  required
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/40 transition-all duration-300 hover:border-[#0ea5e9]/30 disabled:opacity-50"
                />
              </div>

              {/* Email */}
              <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#0ea5e9] transition-colors" />
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/40 transition-all duration-300 hover:border-[#0ea5e9]/30 disabled:opacity-50"
                />
              </div>

              {/* Message */}
              <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#0ea5e9] transition-colors" />
                <textarea
                  name="message"
                  id="contact-message"
                  placeholder="Your Message (min. 10 characters)"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  minLength={10}
                  required
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/40 transition-all duration-300 hover:border-[#0ea5e9]/30 h-[9.9rem] disabled:opacity-50"
                />
              </div>

              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                id="contact-submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#0ea5e9]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;