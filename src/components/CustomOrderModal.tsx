import React, { useState } from 'react';
import { X, Upload, MessageCircle, CheckCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({
  isOpen,
  onClose,
  prefilledProduct = '',
}) => {
  const { submitCustomOrder, getWhatsAppLink } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState(prefilledProduct || 'Bouquet');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [budget, setBudget] = useState('');
  const [requiredDate, setRequiredDate] = useState('');
  const [description, setDescription] = useState('');
  const [inspirationImage, setInspirationImage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

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
  };

  const handleWhatsAppDirect = () => {
    const details = `${productType} (${color ? 'Colors: ' + color : ''}) for ${name}`;
    const url = getWhatsAppLink('custom', { details });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setColor('');
    setSize('');
    setQuantity(1);
    setBudget('');
    setRequiredDate('');
    setDescription('');
    setInspirationImage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#6B4A3A]/45 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FFFDF8] rounded-3xl shadow-2xl border border-[#F3B6B6]/50 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FFF8EF] border border-[#F3B6B6]/50 text-[#6B4A3A] hover:text-[#B8324A] hover:bg-[#F3B6B6]/30 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation View */
          <div className="p-8 sm:p-12 text-center space-y-5 bg-[#FFFDF8]">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#718B68]/15 text-[#718B68] flex items-center justify-center">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#718B68] font-bold">
                Order #{orderId} Received
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#6B4A3A]">
                Thank You, {name}!
              </h3>
              <p className="text-sm text-[#6B4A3A]/80 max-w-md mx-auto leading-relaxed">
                Your custom order request has been received. Leisure Loopz will review your idea, yarn options, and timeline, and contact you shortly on WhatsApp!
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp Now</span>
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-[#6B4A3A] bg-[#FFF8EF] hover:bg-[#F3B6B6]/30 border border-[#F3B6B6] rounded-xl transition-colors cursor-pointer"
              >
                Close & Browse More
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <div className="p-6 sm:p-8 max-h-[88vh] overflow-y-auto">
            <div className="mb-6 space-y-1 pr-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Handmade Creation</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6B4A3A]">
                Imagine It. We'll Crochet It. 🧶
              </h2>
              <p className="text-xs text-[#6B4A3A]/75">
                Tell us your idea, colors, character, flower, bag design, or gift concept — and we'll handcraft it for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Phone */}
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
                    placeholder="e.g. Sneha Kulkarni"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A]"
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
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A]"
                  />
                </div>
              </div>

              {/* Row 2: Email & Product Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Email <span className="text-[#6B4A3A]/50 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Product Type <span className="text-[#B8324A]">*</span>
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A]"
                  >
                    <option value="Crochet Bouquet">Crochet Bouquet</option>
                    <option value="Crochet Bag / Tote">Crochet Bag / Tote</option>
                    <option value="Crochet Charger Cover">Crochet Charger Cover</option>
                    <option value="Crochet AirPods Case">Crochet AirPods Case</option>
                    <option value="Personalized Gift Set">Personalized Gift Set</option>
                    <option value="Character / Amigurumi">Character / Amigurumi</option>
                    <option value="Other Custom Piece">Other Custom Piece</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Colors & Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Preferred Colors / Palette
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. Lavender & Pale Pink, Ocean Blues"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Size or Specifics
                  </label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="e.g. 5 rose stems, Medium tote, iPhone 15"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A]"
                  />
                </div>
              </div>

              {/* Row 4: Quantity, Budget, Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Estimated Budget <span className="text-[#6B4A3A]/50 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. ₹1,500 - ₹2,000"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Required By Date
                  </label>
                  <input
                    type="date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A]"
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
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your vision, letters/initials charm, gift message, or any special requests..."
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 focus:border-[#B8324A] resize-none"
                />
              </div>

              {/* Inspiration Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Upload Inspiration Image / Sketch <span className="text-[#6B4A3A]/50 font-normal">(Optional)</span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#FFF8EF] border border-dashed border-[#F3B6B6] rounded-xl cursor-pointer hover:bg-[#F3B6B6]/15 transition-colors">
                    <Upload className="w-4 h-4 text-[#B8324A]" />
                    <span className="text-xs font-medium text-[#6B4A3A]">
                      {inspirationImage ? 'Change Image' : 'Select a reference photo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {inspirationImage && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#F3B6B6] shrink-0">
                      <img
                        src={inspirationImage}
                        alt="Inspiration preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setInspirationImage('')}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-6 text-sm font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Submit Custom Order Request
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-[#718B68] bg-[#718B68]/15 hover:bg-[#718B68]/25 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-[#6B4A3A]/70 text-center pt-1">
                🔒 We protect your privacy. Your contact details will only be used to discuss your crochet order.
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
