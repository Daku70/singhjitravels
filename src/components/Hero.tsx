import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Scenic travel destination" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary font-medium text-sm mb-6">
              <Star className="h-4 w-4 mr-2" />
              Premium Travel Experience
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                SINGHJI TOUR
              </span>
              <br />
              <span className="text-foreground">AND TRAVELS</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Explore the world with us. From scenic road trips to cultural excursions, 
              we offer a variety of travel services to suit every adventurer's needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" asChild>
                <a href="#about" className="flex items-center space-x-2">
                  <span>About us</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline-hero" size="lg" asChild>
                <a href="#services">Our Services</a>
              </Button>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8">
            <div className="text-center lg:text-left bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-border/20">
              <div className="text-4xl font-bold text-primary mb-2">10000</div>
              <div className="text-muted-foreground">Satisfied travelers</div>
            </div>
            <div className="text-center lg:text-left bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-border/20">
              <div className="text-4xl font-bold text-primary mb-2">5000</div>
              <div className="text-muted-foreground">Memorable journeys</div>
            </div>
            <div className="text-center lg:text-left bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-border/20">
              <div className="text-4xl font-bold text-primary mb-2">2500</div>
              <div className="text-muted-foreground">Happy customer feedback</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;