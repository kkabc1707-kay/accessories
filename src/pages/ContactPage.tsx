import React, { useState } from 'react';
import { MessageCircle, Instagram, MapPin, Send, CheckCircle2, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { siteSettings, submitMessage, getWhatsAppLink } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    submitMessage({
      name,
      phone,
      email,
      message,
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="w-full bg-[#FFF8EF] min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
            Direct Reach
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#6B4A3A]">
            Let's Create Something Together
          </h1>
          <p className="text-sm text-[#6B4A3A]/80 leading-relaxed">
            Have questions about prices, custom colors, or shipping timelines? We love speaking with customers directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 bg-[#FFFDF8] p-8 rounded-3xl border border-[#F3B6B6]/40 shadow-xs space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
              Connect With Us
            </h2>

            <div className="space-y-4 text-sm text-[#6B4A3A]/85">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#718B68]/10 text-[#718B68] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#6B4A3A]/60 uppercase tracking-wider block">
                    WhatsApp & Phone
                  </span>
                  <a
                    href={getWhatsAppLink('general')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#718B68] hover:underline text-base"
                  >
                    +91 {siteSettings.phone}
                  </a>
                  <p className="text-xs text-[#6B4A3A]/70 mt-0.5">
                    Fastest way to get price quotes and custom updates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#B8324A]/10 text-[#B8324A] flex items-center justify-center shrink-0 mt-0.5">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#6B4A3A]/60 uppercase tracking-wider block">
                    Instagram Direct Message
                  </span>
                  <a
                    href={siteSettings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#B8324A] hover:underline text-base"
                  >
                    {siteSettings.instagram_handle}
                  </a>
                  <p className="text-xs text-[#6B4A3A]/70 mt-0.5">
                    DM us your design reels, photos, or inspiration posts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF8EF] border border-[#F3B6B6] text-[#6B4A3A] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#B8324A]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#6B4A3A]/60 uppercase tracking-wider block">
                    Location & Delivery
                  </span>
                  <p className="font-semibold text-[#6B4A3A]">{siteSettings.location}</p>
                  <p className="text-xs text-[#6B4A3A]/70 mt-0.5">
                    {siteSettings.shipping_information}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-xl shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Direct Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 bg-[#FFFDF8] p-8 rounded-3xl border border-[#F3B6B6]/40 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#718B68]/15 text-[#718B68] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                  Message Sent!
                </h3>
                <p className="text-sm text-[#6B4A3A]/80 max-w-sm mx-auto">
                  Thank you for reaching out. We will get back to you shortly via WhatsApp or email.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#B8324A] underline pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                  Send an Inquiry
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                      Your Name <span className="text-[#B8324A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Pooja Mehta"
                      className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                      Phone / WhatsApp <span className="text-[#B8324A]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9869462859"
                      className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Email Address <span className="text-[#6B4A3A]/50 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Message <span className="text-[#B8324A]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about product availability, customization options, express shipping, or corporate gifting..."
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
