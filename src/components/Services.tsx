import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MapPin, Lightbulb, Shield } from "lucide-react";
import Services3D from "@/components/Services3D";

const Services = () => {
  const services = [
    {
      icon: Car,
      title: "Vehicle rentals",
      description: "With a diverse fleet of vehicles, we offer flexible rental options tailored to your travel needs, ensuring you have the perfect ride for your journey.",
      color: "text-blue-400"
    },
    {
      icon: MapPin,
      title: "Custom travel planning",
      description: "Our expert travel planners provide personalized itineraries, guiding you through the best destinations and experiences India has to offer, ensuring a memorable trip.",
      color: "text-green-400"
    },
    {
      icon: Lightbulb,
      title: "Local insights",
      description: "We share valuable tips and recommendations on local attractions, dining, and hidden gems, helping you immerse yourself in the rich culture and beauty of each destination.",
      color: "text-yellow-400"
    },
    {
      icon: Shield,
      title: "Safety and comfort",
      description: "At SINGHJI TOUR AND TRAVELS, your safety is our priority. Our vehicles are well-maintained and equipped for a comfortable journey, allowing you to travel with peace of mind.",
      color: "text-red-400"
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Services{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              SINGHJI TOUR AND TRAVELS
            </span>{" "}
            offers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive travel solutions designed to make your journey unforgettable, 
            comfortable, and hassle-free across India.
          </p>
        </div>

        {/* 3D Services Preview */}
        <div className="mb-16">
          <Services3D />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-2"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <service.icon className={`h-8 w-8 ${service.color} group-hover:text-primary transition-colors`} />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-lg shadow-glow">
            Ready to start your adventure? Contact us today!
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;