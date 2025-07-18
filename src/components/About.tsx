import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Shield, Users } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                SINGHJI TOUR AND TRAVELS
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At SINGHJI TOUR AND TRAVELS, we pride ourselves on providing exceptional travel 
              experiences across India. Whether you need a vehicle for a family vacation, business trip, 
              or adventurous getaway, our dedicated team is here to make your travel dreams come true. 
              Experience the beauty of India with comfort and convenience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Expert Planning</h4>
                  <p className="text-sm text-muted-foreground">Personalized itineraries crafted by travel experts</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Safety First</h4>
                  <p className="text-sm text-muted-foreground">Well-maintained vehicles and safety protocols</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Quality Service</h4>
                  <p className="text-sm text-muted-foreground">Award-winning customer service excellence</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Local Expertise</h4>
                  <p className="text-sm text-muted-foreground">Deep knowledge of Indian destinations</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#services">Our Services</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/flagged/photo-1558954157-7104f14c2ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTUzNXwwfDF8c2VhcmNofDJ8fCUyMlRyYXZlbCUyMnxlbnwwfHx8fDE3NTI4NDcwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Travel destination 1" 
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1622487540856-019af4f3b775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTUzNXwwfDF8c2VhcmNofDN8fCUyMlRyYXZlbCUyMnxlbnwwfHx8fDE3NTI4NDcwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Travel destination 2" 
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1663030083159-5a58ca80c4ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTUzNXwwfDF8c2VhcmNofDR8fCUyMlRyYXZlbCUyMnxlbnwwfHx8fDE3NTI4NDcwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Travel destination 3" 
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1640660713374-7b2b04be61d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTUzNXwwfDF8c2VhcmNofDV8fCUyMlRyYXZlbCUyMnxlbnwwfHx8fDE3NTI4NDcwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Travel destination 4" 
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;