import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useState } from "react";
import Testimonials3D from "@/components/Testimonials3D";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Robert Phillman",
      review: "Traveling with SINGHJI TOUR AND TRAVELS was a fantastic choice. They made the planning process easy and enjoyable. Grateful for their excellent service!",
      rating: 5
    },
    {
      name: "Julianna Rand", 
      review: "SINGHJI TOUR AND TRAVELS made my trip unforgettable! Their team was incredibly helpful in arranging everything, and the vehicle was perfect for our family outing.",
      rating: 5
    },
    {
      name: "Lucas Evans",
      review: "I had an amazing experience with SINGHJI TOUR AND TRAVELS. Their staff was attentive, and they truly catered to my travel needs. Highly recommend their services!",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Travelers Say
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from real travelers who have journeyed with us across India.
          </p>
        </div>

        {/* 3D Testimonials Preview */}
        <div className="mb-16">
          <Testimonials3D />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-60" />
              
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed font-medium">
                "{testimonials[currentIndex].review}"
              </blockquote>
              
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-muted-foreground">Satisfied Customer</p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary shadow-glow' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to create your own success story?
          </h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied travelers who have experienced India with us.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">Start Your Journey</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;