import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Contact Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to embark on your next adventure? Get in touch with our travel experts 
            and let's plan your perfect journey across India.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Get in Touch</h3>
            
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-2xl bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Phone Number</h4>
                      <p className="text-muted-foreground mb-2">Ready to help you 24/7</p>
                      <a 
                        href="tel:6203765098" 
                        className="text-primary hover:text-primary-glow font-semibold text-lg transition-colors"
                      >
                        6203765098
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-2xl bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Address</h4>
                      <p className="text-muted-foreground mb-2">Visit our office</p>
                      <p className="text-foreground font-medium">
                        SONARI MANGO<br />
                        PIN - 831011
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-2xl bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Operating Hours</h4>
                      <p className="text-muted-foreground mb-2">We're here when you need us</p>
                      <p className="text-foreground font-medium">
                        Mon - Sun: 6:00 AM - 10:00 PM<br />
                        Emergency: 24/7 Support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col justify-center">
            <Card className="bg-gradient-primary p-1 shadow-glow">
              <div className="bg-card rounded-lg p-8 h-full">
                <CardHeader className="text-center p-0 mb-6">
                  <CardTitle className="text-3xl font-bold text-foreground mb-4">
                    Let's embark on your adventure today!
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Whether you're planning a family vacation, business trip, or adventurous getaway, 
                    we're here to make your travel dreams come true.
                  </p>
                </CardHeader>
                
                <CardContent className="p-0 space-y-4">
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <a href="tel:6203765098" className="flex items-center justify-center space-x-2">
                      <Phone className="h-5 w-5" />
                      <span>Call Us Now</span>
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href="#services">View Our Services</a>
                  </Button>
                  
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      Free consultation • Instant quotes • Expert advice
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;