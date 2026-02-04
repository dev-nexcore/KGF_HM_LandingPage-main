"use client";
import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Bed, Wifi, Camera, Dumbbell, BookOpen, Shield, Moon, Utensils, Check } from 'lucide-react';
import Image from 'next/image';
import { User, Home, MessageSquare, Send } from 'lucide-react';

const Landing = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: '5-bed',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using Formsubmit - no signup required, no branding
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('room_type', formData.roomType);
      formDataObj.append('message', formData.message);
      formDataObj.append('_subject', 'New Hostel Inquiry from KGF Website');
      formDataObj.append('_captcha', 'false'); // Disable captcha
      formDataObj.append('_template', 'table'); // Nice table format

      // Replace 'akshat.g10b14kis' with your email (remove @gmail.com part)
      const response = await fetch('https://formsubmit.co/ajax/kgf@gmail.com', {
        method: 'POST',
        body: formDataObj
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          roomType: '5-bed',
          message: ''
        });
        setTimeout(() => {
          setIsInquiryOpen(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('Formsubmit error:', result.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pricingPlans = [
    { beds: 5, price: 6000, discount: '30%', finalPrice: 4200 },
    { beds: 4, price: 6500, discount: '30%', finalPrice: 4550 },
    { beds: 3, price: 7000, discount: '30%', finalPrice: 4900 }
  ];

  const features = [
    { icon: Shield, text: 'Strict supervision of KGF representative' },
    { icon: Bed, text: '75 Beds/18 Dormitory Rooms' },
    { icon: BookOpen, text: 'Study Room/Library' },
    { icon: Shield, text: 'Warden and Security Guard' },
    { icon: Moon, text: 'Prayer Room' },
    { icon: Wifi, text: 'High Speed Wifi' },
    { icon: Dumbbell, text: 'Recreation Gym/Room' },
    { icon: Camera, text: 'Complete CCTV Surveillance' },
    { icon: Check, text: 'Ensuring Islamic Aesthetics' },
    { icon: Check, text: 'Hygienic and Studious ambience' }
  ];

  const amenities = [
    'Comfortable Single Beds',
    'Cupboards',
    'Washing machine',
    'Electric hotplate',
    'Fridge, Microwave oven',
    'Bathroom geyser',
    'Dining Hall',
    'Electricity charges included in Rent'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
<nav className="bg-white shadow-md fixed w-full top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16 sm:h-20">
      {/* Logo and Branding */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Image
          src="/kgf_2.svg"
          alt="KGF Logo"
          width={64}
          height={64}
          className="object-contain w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
          priority
        />
        <div className="flex flex-col">
          <div className="flex items-baseline space-x-1 sm:space-x-2">
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-800 bg-clip-text text-transparent">
              KGF
            </span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Boys Hostel</span>
          </div>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 leading-tight">Kokan Global Foundation</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex space-x-8">
        <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Home</a>
        <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
        <a href="#facilities" className="text-gray-700 hover:text-blue-600 transition">Facilities</a>
        <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">Pricing</a>
        <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 text-xs sm:text-sm md:text-base"
        >
          Login
        </button>
        <button
          onClick={() => setIsInquiryOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105 text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
          <span className="hidden sm:inline">Inquiry Now</span>
          <span className="sm:hidden">Inquiry</span>
        </button>
      </div>
    </div>
  </div>
</nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <div className="inline-block bg-red-100 text-red-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Grand Opening - 30% Discount!
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                KGF Boys Hostel <span className="text-blue-600">For Students At Panvel</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                Starting From: <span className="text-green-600 font-bold">1st October 2025</span>
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
                Book Your Seat Now at Kokan Global Foundation's premium hostel facility with modern amenities and Islamic aesthetics.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 shadow-lg w-full sm:w-auto"
                >
                  Book Your Seat Now
                </button>
                <a
                  href="#pricing"
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-50 transition text-center w-full sm:w-auto"
                >
                  View Pricing
                </a>
              </div>
            </div>
            <div className="relative mt-6 sm:mt-0">
              <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl p-4 sm:p-8 shadow-2xl">
                <img
                  src="/hostel.jpg"
                  alt="KGF Hostel"
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-base">
                  Limited Time Offer!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Gallery Section - Add this after the Hero section and before the existing Features section */}
<section id="facilities" className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-12 sm:mb-16">
      <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
        Explore Our Facilities
      </div>
      <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
        World-Class Amenities
      </h3>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Experience comfort and convenience with our modern facilities designed for student success
      </p>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-500 mx-auto mt-6"></div>
    </div>

    {/* Features Grid */}
    <div className="space-y-12 sm:space-y-16">
      
     {/* Feature 1: Comfortable Beds - WITH VIDEO */}
<div className="grid md:grid-cols-2 gap-8 items-center">
  <div className="order-2 md:order-1">
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-lg inline-block mb-4">
      <Bed className="w-8 h-8" />
    </div>
    <h4 className="text-3xl font-bold text-gray-900 mb-4">Comfortable Single Beds</h4>
    <p className="text-lg text-gray-700 mb-4">
      Each room features premium quality single beds with orthopedic mattresses ensuring a good night's sleep after a long day of studies. Personal space with individual cupboards for all your belongings.
    </p>
    <ul className="space-y-2 text-gray-700">
      <li className="flex items-center gap-2">
        <Check className="w-5 h-5 text-green-600" />
        <span>Orthopedic mattresses for better sleep</span>
      </li>
      <li className="flex items-center gap-2">
        <Check className="w-5 h-5 text-green-600" />
        <span>Individual storage cupboards</span>
      </li>
      <li className="flex items-center gap-2">
        <Check className="w-5 h-5 text-green-600" />
        <span>Study table and chair in each room</span>
      </li>
    </ul>
  </div>
  <div className="order-1 md:order-2">
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <iframe
        src="https://drive.google.com/file/d/18rikIHDXz7Y6xHVoMNe1QQh2zdQ_wGzB/preview?autoplay=1"
        className="w-full h-80 rounded-2xl"
        allow="autoplay"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</div>

      {/* Feature 2: Modern Kitchen */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="/api/placeholder/600/400"
              alt="Modern Kitchen"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-semibold">Fully Equipped Kitchen</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-3 rounded-lg inline-block mb-4">
            <Utensils className="w-8 h-8" />
          </div>
          <h4 className="text-3xl font-bold text-gray-900 mb-4">Modern Kitchen Facilities</h4>
          <p className="text-lg text-gray-700 mb-4">
            Fully equipped common kitchen with microwave, refrigerator, electric hotplate, and washing machine. Cook your favorite meals and maintain hygiene effortlessly.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Microwave oven for quick meals</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Refrigerator for food storage</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Electric hotplate & washing machine</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Feature 3: Study Room & Library */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 rounded-lg inline-block mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h4 className="text-3xl font-bold text-gray-900 mb-4">Dedicated Study Room & Library</h4>
          <p className="text-lg text-gray-700 mb-4">
            A peaceful and well-lit study room with library facilities to help you focus on your academic goals. Perfect environment for group studies and individual concentration.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Quiet study environment</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Reference books and materials</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Extended study hours</span>
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="/api/placeholder/600/400"
              alt="Study Room"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-semibold">Quiet Study Environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 4: Recreation & Gym */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="/api/placeholder/600/400"
              alt="Gym"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-semibold">Fitness & Recreation</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-3 rounded-lg inline-block mb-4">
            <Dumbbell className="w-8 h-8" />
          </div>
          <h4 className="text-3xl font-bold text-gray-900 mb-4">Recreation Gym & Room</h4>
          <p className="text-lg text-gray-700 mb-4">
            Stay fit and healthy with our well-equipped gym and recreation room. Perfect for stress relief and maintaining physical fitness alongside your studies.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Modern gym equipment</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Indoor games and activities</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Relaxation and entertainment area</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Feature 5: High-Speed WiFi */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-3 rounded-lg inline-block mb-4">
            <Wifi className="w-8 h-8" />
          </div>
          <h4 className="text-3xl font-bold text-gray-900 mb-4">High-Speed WiFi & Inverter Backup</h4>
          <p className="text-lg text-gray-700 mb-4">
            Stay connected 24/7 with high-speed WiFi throughout the hostel. Uninterrupted power supply with inverter backup ensures you never miss important online classes or deadlines.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Unlimited high-speed internet</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Power backup with inverters</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>No electricity outage concerns</span>
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="/api/placeholder/600/400"
              alt="WiFi and Internet"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-semibold">24/7 Connectivity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 6: Security & CCTV */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="/api/placeholder/600/400"
              alt="Security System"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-semibold">Complete Security</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-3 rounded-lg inline-block mb-4">
            <Camera className="w-8 h-8" />
          </div>
          <h4 className="text-3xl font-bold text-gray-900 mb-4">Complete CCTV Surveillance</h4>
          <p className="text-lg text-gray-700 mb-4">
            Your safety is our priority. Complete CCTV surveillance, dedicated security guards, and experienced wardens ensure a secure living environment 24/7.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>24/7 CCTV monitoring</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Dedicated security personnel</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Experienced warden supervision</span>
            </li>
          </ul>
        </div>
      </div>

    </div>

    {/* Call to Action */}
    <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
      <h4 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Ready to Experience Premium Living?
      </h4>
      <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        Book your seat now and enjoy 30% discount on our grand opening
      </p>
      <button
        onClick={() => setIsInquiryOpen(true)}
        className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105 shadow-xl"
      >
        Book Your Seat Now
      </button>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Hostel Salient Features</h3>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-green-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-green-50 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105"
              >
                <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-3 sm:mb-4" />
                <p className="text-gray-800 font-medium text-sm sm:text-base">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Fully Furnished Hostel</h3>
            <p className="text-lg sm:text-xl text-gray-600">Everything you need for comfortable living</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white p-3 sm:p-4 rounded-lg shadow-md flex items-center space-x-3"
              >
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-800 text-sm sm:text-base">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Special Opening Discount</h3>
            <p className="text-base sm:text-xl text-gray-600">30% off on your first year - First come, first served!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 sm:p-8 shadow-xl transform hover:scale-105 transition ${index === 1 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white md:scale-105' : 'bg-white border-2 border-blue-200'
                  }`}
              >
                {index === 1 && (
                  <div className="bg-red-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold inline-block mb-3 sm:mb-4">
                    Most Popular
                  </div>
                )}
                <h4 className={`text-2xl sm:text-3xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-gray-900'}`}>
                  {plan.beds} Bed Room
                </h4>
                <div className="mb-4">
  <span className={`text-xl sm:text-2xl line-through ${index === 1 ? 'text-blue-200' : 'text-gray-400'}`}>
    ₹{plan.price}
  </span>
  <div className="flex items-baseline space-x-2">
    <span className={`text-4xl sm:text-5xl font-bold ${index === 1 ? 'text-white' : 'text-blue-600'}`}>
      ₹{plan.finalPrice}
    </span>
    <span className={`text-sm sm:text-base ${index === 1 ? 'text-blue-100' : 'text-gray-600'}`}>per bed/month</span>
  </div>
  <div className={`mt-2 px-3 py-1 rounded-full inline-block text-sm ${index === 1 ? 'bg-green-500' : 'bg-green-100 text-green-700'}`}>
    Save {plan.discount}
  </div>
</div>
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className={`w-full py-3 rounded-lg font-semibold transition text-sm sm:text-base ${index === 1
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    }`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Get In Touch</h3>
            <p className="text-lg sm:text-xl text-blue-200">We're here to answer your questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <a href="tel:+917510012346" className="text-center block hover:transform hover:scale-105 transition">
              <Phone className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-green-400" />
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Call Us</h4>
              <p className="text-blue-200 text-sm sm:text-base hover:text-white transition">+91 75100 12346</p>
              <p className="text-blue-200 text-sm sm:text-base hover:text-white transition">+91 73900 12346</p>
            </a>
            <a href="mailto:kgf@gmail.com" className="text-center block hover:transform hover:scale-105 transition">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-green-400" />
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Email Us</h4>
              <p className="text-blue-200 text-sm sm:text-base break-all hover:text-white transition">kgf@gmail.com</p>
            </a>
            <a
              href="https://maps.app.goo.gl/KowWiWN1GAkK4kLe6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center block hover:transform hover:scale-105 transition"
            >
              <MapPin className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-green-400" />
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Visit Us</h4>
              <p className="text-blue-200 text-sm sm:text-base hover:text-white transition">Panvel, Maharashtra</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2 text-sm sm:text-base">Let's Join Hands..... Form Unity, Form Strength</p>
          <p className="text-gray-500 text-xs sm:text-sm">© 2025 Kokan Global Foundation (KGF). All rights reserved.</p>
        </div>
      </footer>

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl relative max-h-[95vh] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8 rounded-t-2xl sm:rounded-t-3xl relative">
              <button
                onClick={() => setIsInquiryOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Get in Touch</h3>
              <p className="text-blue-100 text-sm sm:text-base">Fill out the form and we'll get back to you shortly</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Phone Field */}
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm uppercase tracking-wide">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm sm:text-base"
                    placeholder="+91 XXXXX XXXXX"
                  />
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Room Type Field */}
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm uppercase tracking-wide">
                  Room Type
                </label>
                <div className="relative">
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none bg-white cursor-pointer text-sm sm:text-base"
                  >
                    <option value="5-bed">5 Bed Room - ₹4200/month</option>
                    <option value="4-bed">4 Bed Room - ₹4550/month</option>
                    <option value="3-bed">3 Bed Room - ₹4900/month</option>
                  </select>
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Message Field */}
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm uppercase tracking-wide">
                  Message <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none text-sm sm:text-base"
                    placeholder="Any specific requirements or questions?"
                  ></textarea>
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-4" />
                </div>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border-2 border-green-200 text-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Inquiry submitted successfully! We'll contact you soon.</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Failed to submit. Please try again or call us directly.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

{/* Login Modal */}
{isLoginOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl relative p-8">
      <button
        onClick={() => setIsLoginOpen(false)}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      
      <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">Login</h3>
      <p className="text-gray-600 mb-8 text-center">Select your login type</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Parent Login Card */}
        <a
          href="https://kokanglobal.org/parent"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl transform hover:scale-105"
        >
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Parent Login</h4>
            <p className="text-gray-600 text-sm">Access parent portal</p>
            <div className="mt-4 inline-flex items-center text-blue-600 font-semibold">
              Login Now
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </a>

        {/* Student Login Card */}
        <a
          href="https://kokanglobal.org/student"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl transform hover:scale-105"
        >
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Student Login</h4>
            <p className="text-gray-600 text-sm">Access student portal</p>
            <div className="mt-4 inline-flex items-center text-green-600 font-semibold">
              Login Now
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </a>

        {/* Warden Login Card */}

  <a href="https://kokanglobal.org/warden"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl transform hover:scale-105"
>
  <div className="text-center">
    <div className="w-24 h-24 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
      <Shield className="w-12 h-12 text-white" />
    </div>
    <h4 className="text-2xl font-bold text-gray-900 mb-2">Warden Login</h4>
    <p className="text-gray-600 text-sm">Access warden portal</p>
    <div className="mt-4 inline-flex items-center text-purple-600 font-semibold">
      Login Now
      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </div>
</a>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Landing;