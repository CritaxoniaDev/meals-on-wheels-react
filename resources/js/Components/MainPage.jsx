import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const MainPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/welcome-img.jpg',
    '/images/welcome-img2.jpg',
    '/images/welcome-img3.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-start pt-20 text-center text-white bg-cover bg-center relative overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage: `url(${image})`,
              filter: "brightness(0.6)"
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-800/50 to-transparent z-10"></div>
        <motion.div
          className="relative z-20 max-w-5xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-7xl font-extrabold mb-6 text-white leading-tight tracking-tight">
            Welcome to <span className="text-orange-400 inline-block">Meals on Wheels</span>
          </h1>
          <p className="text-2xl mb-12 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Delivering <span className="text-green-400 font-semibold">hope</span>, one meal at a time. We bring
            <span className="text-red-400 font-semibold"> hot</span>,
            <span className="text-blue-400 font-semibold"> nutritious</span> meals to adults unable to cook for themselves.
          </p>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-orange-500 text-white hover:bg-orange-600 transition duration-300 ease-in-out shadow-xl px-10 py-8 rounded-full text-xl font-semibold"
            >
              JOIN OUR MISSION
            </Button>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      </section>

      {/* Why Choose Us Section */}
      <section className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-70"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/why-choose.jpg')" }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-extrabold text-center mb-6 text-gray-800 tracking-tight">Why Choose Meals on Wheels</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Providing nutritious meals and compassionate service to those in need, creating a community of care and support that transforms lives.
          </p>

          <Card className="max-w-4xl mx-auto shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-400 to-pink-500 text-white">
              <CardTitle className="text-3xl font-bold">Nourishing Bodies and Spirits</CardTitle>
            </CardHeader>

            <CardContent className="p-8">
              <AspectRatio ratio={16 / 9} className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/HqOSbjx5_Ng"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </AspectRatio>

              <CardDescription className="mt-6 text-lg text-gray-700 leading-relaxed">
                Meals on Wheels delivers more than just food. We provide warm, nutritious meals, friendly visits, and safety checks that enable seniors to live nourished lives with independence and dignity. Our service is a lifeline for many in our community, offering not just sustenance, but also companionship and peace of mind.
              </CardDescription>
            </CardContent>

            <CardFooter className="bg-gray-50 p-6">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors duration-300">
                Learn More About Our Impact
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Dedicated volunteers delivering meals with care",
                description: "Our volunteers are the heart of Meals on Wheels, bringing nutritious meals and friendly smiles to seniors in need. They're not just delivering food; they're delivering hope and human connection.",
                link: "Meet our incredible volunteers →",
                icon: "👥"
              },
              {
                title: "Nutritious meals tailored to individual needs",
                description: "We provide balanced, healthy meals designed to meet the diverse dietary requirements of our seniors. Our menus are crafted with care, ensuring every meal is as delicious as it is nutritious.",
                link: "Explore our diverse menus →",
                icon: "🍽️"
              },
              {
                title: "Support our mission to nourish and enrich lives",
                description: "Your donation or volunteer time can make a significant difference in the lives of seniors in our community. Join us in our mission to ensure no senior goes hungry or feels forgotten.",
                button: "Donate or Volunteer Now",
                icon: "❤️"
              }
            ].map((feature, index) => (
              <Card key={index} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <p className="text-lg text-gray-700">{feature.description}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 p-6">
                  {feature.link ? (
                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline text-lg font-semibold">{feature.link}</a>
                  ) : (
                    <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors duration-300">
                      {feature.button}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-gray-50 to-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-800 tracking-tight">Latest Updates</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                date: "May 15, 2023",
                title: "Successful Volunteer Drive",
                description: "Over 100 new volunteers joined our mission to serve seniors in our community, bringing fresh energy and compassion to our team.",
                icon: "🤝"
              },
              {
                date: "June 2, 2023",
                title: "One Million Meals Milestone",
                description: "We've delivered our 1 millionth meal this year, a testament to the dedication of our team and the generosity of our supporters.",
                icon: "🍽️"
              },
              {
                date: "June 20, 2023",
                title: "Annual Fundraiser Dinner",
                description: "Join us for our annual fundraiser dinner to support our mission, meet our volunteers, and celebrate the impact we're making together.",
                icon: "🎉"
              }
            ].map((update, index) => (
              <Card key={index} className="flex flex-col hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <div className="text-4xl mb-2">{update.icon}</div>
                  <CardTitle className="text-2xl font-bold">{update.title}</CardTitle>
                  <CardDescription className="text-lg text-blue-100">{update.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <p className="text-lg text-gray-700">{update.description}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 p-6">
                  <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline text-lg font-semibold flex items-center">
                    Read full story
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;