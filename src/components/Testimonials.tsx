import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      position: "Owner, Sri Lakshmi Rice Mills",
      location: "Andhra Pradesh", 
      image: "https://images.unsplash.com/photo-1632560962689-da7c2538fc23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMGluZGlhbiUyMGVudHJlcHJlbmV1cnxlbnwxfHx8fDE3NTk4NDM3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote: "RMMS has transformed our rice mill operations completely. We've reduced manual work by 80% and increased our profit margins by 25%. The inventory management is spot-on!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      position: "Managing Director, Golden Grain Mills",
      location: "Punjab",
      image: "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwaW5kaWFufGVufDF8fHx8MTc1OTg0NDMwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote: "The analytics dashboard gives us insights we never had before. We can now predict demand patterns and optimize our production schedule. Customer support is excellent too!",
      rating: 5
    },
    {
      name: "Suresh Patel",
      position: "General Manager, Harvest Rice Industries",
      location: "Gujarat",
      image: "https://images.unsplash.com/photo-1652795385761-7ac287d0cd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMGluZGlhbnxlbnwxfHx8fDE3NTk4NDQzMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote: "Implementation was smooth and the team provided excellent training. Our billing process is now completely automated and GST compliance is hassle-free. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            What Rice Mill Owners{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from rice mill owners who have transformed their operations with RMMS.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <CardContent className="p-8 space-y-6">
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-600 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                  <div className="flex-shrink-0">
                    <ImageWithFallback 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                    <div className="text-sm text-primary">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-white px-8 py-4 rounded-full shadow-lg border">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
              ))}
            </div>
            <div className="text-gray-600">
              <span className="font-semibold text-foreground">4.9/5</span> average rating from 200+ customers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}