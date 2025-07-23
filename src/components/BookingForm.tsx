import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  from: z.string().min(1, "Origin location is required"),
  to: z.string().min(1, "Destination is required"),
  date: z.date({
    required_error: "Travel date is required",
  }),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
});

type FormData = z.infer<typeof formSchema>;

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna",
  "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivali",
  "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad",
  "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
  "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad", "Tiruchirappalli", "Bareilly", "Mysore",
  "Tiruppur", "Gurgaon", "Aligarh", "Jalandhar", "Bhubaneswar", "Salem", "Mira-Bhayandar", "Warangal",
  "Thiruvananthapuram", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida",
  "Jamshedpur", "Bhilai", "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur",
  "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni",
  "Siliguri", "Jhansi", "Ulhasnagar", "Jammu", "Sangli-Miraj & Kupwad", "Mangalore", "Erode", "Belgaum",
  "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala"
];

const BookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const { toast } = useToast();
  
  const filterCities = (input: string) => {
    if (!input) return [];
    return indianCities.filter(city => 
      city.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 5);
  };

  const handleFromChange = (value: string) => {
    const suggestions = filterCities(value);
    setFromSuggestions(suggestions);
    setShowFromSuggestions(suggestions.length > 0 && value.length > 0);
  };

  const handleToChange = (value: string) => {
    const suggestions = filterCities(value);
    setToSuggestions(suggestions);
    setShowToSuggestions(suggestions.length > 0 && value.length > 0);
  };
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            from_location: data.from,
            to_location: data.to,
            travel_date: data.date.toISOString().split('T')[0],
            person_name: data.name,
            phone_number: data.phone,
            email: data.email,
          }
        ]);

      if (error) {
        throw error;
      }

      // Send email notification
      try {
        await supabase.functions.invoke('send-booking-notification', {
          body: {
            from_location: data.from,
            to_location: data.to,
            travel_date: data.date.toISOString().split('T')[0],
            person_name: data.name,
            phone_number: data.phone,
            email: data.email,
            created_at: new Date().toISOString(),
          },
        });
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
        // Don't fail the booking if email fails
      }

      toast({
        title: "Booking submitted successfully!",
        description: "We'll contact you soon with details about your journey.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error submitting booking",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      className="pt-24 pb-20 px-4 relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e425?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3506&q=80')"
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="max-w-2xl mx-auto animate-fade-in relative z-10">
        <Card className="shadow-2xl hover-scale">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-scale-in">
              Book Your Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>From</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Origin location" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              handleFromChange(e.target.value);
                            }}
                            onFocus={() => handleFromChange(field.value)}
                            onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                          />
                        </FormControl>
                        {showFromSuggestions && (
                          <div className="absolute top-full left-0 right-0 z-50 bg-popover border border-border rounded-md shadow-lg mt-1">
                            {fromSuggestions.map((city, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm"
                                onClick={() => {
                                  field.onChange(city);
                                  setShowFromSuggestions(false);
                                }}
                              >
                                {city}
                              </div>
                            ))}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>To</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Destination" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              handleToChange(e.target.value);
                            }}
                            onFocus={() => handleToChange(field.value)}
                            onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                          />
                        </FormControl>
                        {showToSuggestions && (
                          <div className="absolute top-full left-0 right-0 z-50 bg-popover border border-border rounded-md shadow-lg mt-1">
                            {toSuggestions.map((city, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm"
                                onClick={() => {
                                  field.onChange(city);
                                  setShowToSuggestions(false);
                                }}
                              >
                                {city}
                              </div>
                            ))}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Travel Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Your phone number" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {isLoading ? "Submitting..." : "Submit Booking Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;