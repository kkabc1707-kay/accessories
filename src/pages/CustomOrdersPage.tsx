import React, { useState } from 'react';
import { Sparkles, MessageCircle, Upload, CheckCircle, HeartHandshake, ShieldCheck, Clock, Palette } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomOrdersPage: React.FC = () => {
  const { submitCustomOrder, getWhatsAppLink } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState('Crochet Bouquet');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [budget, setBudget] = useState('');
  const [requiredDate, setRequiredDate] = useState('');
  const [description, setDescription] = useState('');
  const [inspirationImage, setInspirationImage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInspirationImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !description.trim()) {
      alert('Please fill in your name, phone number, and a description of your custom idea.');
      return;
    }

    const createdId = submitCustomOrder({
      name,
      phone,
      email: email || undefined,
      product_type: productType,
      color: color || undefined,
      size: size || undefined,
      quantity,
      budget: budget || undefined,
      required_date: requiredDate || undefined,
      description,
      inspiration_image_url: inspirationImage || undefined,
    });

    setOrderId(createdId);
    setIsSubmitted(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleWhatsAppDirect = () => {
    const details = `${productType} (${color ? 'Colors: ' + color : ''}) for ${name}`;
    const url = getWhatsAppLink('custom', { details });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-[#FFF8EF] min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section of Custom Orders */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8324A] bg-[#FFFDF8] px-3.5 py-1.5 rounded-full border border-[#F3B6B6]/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Handmade Crafts</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#6B4A3A]">
            Imagine It. We'll Crochet It. 🧶
          </h1>
          <p className="text-sm sm:text-base text-[#6B4A3A]/80 leading-relaxed">
            Have a dream flower bouquet with your favorite person's initials? A tote bag in custom pastel stripes? Or a charger cover shaped like your favorite comic superhero? Tell us your vision, and we'll loop it to life.
          </p>
        </div>

        {/* 4-Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#F3B6B6]/30 shadow-2xs">
            <span className="font-serif text-2xl font-bold text-[#B8324A] block mb-1">01</span>
            <h3 className="font-serif text-sm font-bold text-[#6B4A3A]">Share Your Idea</h3>
            <p className="text-xs text-[#6B4A3A]/75 mt-1 leading-relaxed">
              Upload photos, color swatches, or describe what you have in mind.
            </p>
          </div>
          <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#F3B6B6]/30 shadow-2xs">
            <span className="font-serif text-2xl font-bold text-[#718B68] block mb-1">02</span>
            <h3 className="font-serif text-sm font-bold text-[#6B4A3A]">Confirm Details</h3>
            <p className="text-xs text-[#6B4A3A]/75 mt-1 leading-relaxed">
              We chat on WhatsApp to finalize yarn shades, size, price, and deadline.
            </p>
          </div>
          <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#F3B6B6]/30 shadow-2xs">
            <span className="font-serif text-2xl font-bold text-[#B8324A] block mb-1">03</span>
            <h3 className="font-serif text-sm font-bold text-[#6B4A3A]">Handmade With Care</h3>
            <p className="text-xs text-[#6B4A3A]/75 mt-1 leading-relaxed">
              Every loop is crocheted stitch by stitch in our Mumbai studio.
            </p>
          </div>
          <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#F3B6B6]/30 shadow-2xs">
            <span className="font-serif text-2xl font-bold text-[#718B68] block mb-1">04</span>
            <h3 className="font-serif text-sm font-bold text-[#6B4A3A]">Safely Delivered</h3>
            <p className="text-xs text-[#6B4A3A]/75 mt-1 leading-relaxed">
              Packed in protective gift wrapping and shipped across India.
            </p>
          </div>
        </div>

        {/* Custom Order Form Container */}
        <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border border-[#F3B6B6]/50 shadow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#718B68]/15 text-[#718B68] flex items-center justify-center">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#718B68] font-bold">
                  Inquiry #{orderId} Successfully Registered
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#6B4A3A]">
                  Thank You, {name}!
                </h2>
                <p className="text-sm text-[#6B4A3A]/80 max-w-md mx-auto leading-relaxed">
                  Your custom order request has been received. Leisure Loopz will contact you shortly on WhatsApp to confirm yarn availability and delivery date.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect Immediately on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 text-sm font-semibold text-[#6B4A3A] bg-[#FFF8EF] hover:bg-[#F3B6B6]/30 border border-[#F3B6B6] rounded-xl transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-[#F3B6B6]/30 pb-4">
                <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                  Custom Order Inquiry Form
                </h2>
                <p className="text-xs text-[#6B4A3A]/75 mt-0.5">
                  Fill in your details below and we'll reply with pricing and timelines.
                </p>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Your Full Name <span className="text-[#B8324A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sneha Kulkarni"
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

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Email <span className="text-[#6B4A3A]/50 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                  />
                </div>
              </div>

              {/* Order specifics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Product Type <span className="text-[#B8324A]">*</span>
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                  >
                    <option value="Crochet Bouquet">Crochet Bouquet</option>
                    <option value="Crochet Bag / Tote">Crochet Bag / Tote</option>
                    <option value="Crochet Charger Cover">Crochet Charger Cover</option>
                    <option value="Crochet AirPods Case">Crochet AirPods Case</option>
                    <option value="Personalized Anniversary Gift">Personalized Anniversary Gift</option>
                    <option value="Amigurumi Toy / Keyring">Amigurumi Toy / Keyring</option>
                    <option value="Other Custom Piece">Other Custom Piece</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Preferred Colors / Palette
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. Red, Cream, Olive Green"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Size / Dimensions
                  </label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="e.g. 5 stems, Large tote, AirPods Pro 2"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                  />
                </div>
              </div>

              {/* Quantity, Budget, Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Budget (INR)
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. ₹1,200 - ₹1,800"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Need By Date
                  </label>
                  <input
                    type="date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Custom Description & Details <span className="text-[#B8324A]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your vision: particular flower stems, initials charms (e.g. 'S' & 'K'), special gift notes, or custom size requirements..."
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Inspiration Image or Sketch
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#FFF8EF] border border-dashed border-[#F3B6B6] rounded-xl cursor-pointer hover:bg-[#F3B6B6]/20 transition-colors">
                    <Upload className="w-4 h-4 text-[#B8324A]" />
                    <span className="text-xs font-medium text-[#6B4A3A]">
                      {inspirationImage ? 'Change uploaded photo' : 'Select a reference photo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {inspirationImage && (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#F3B6B6]">
                      <img
                        src={inspirationImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-6 text-sm font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Submit Custom Order
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-[#718B68] bg-[#718B68]/15 hover:bg-[#718B68]/25 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuss via WhatsApp</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
