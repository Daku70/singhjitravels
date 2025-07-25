import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL") || "admin@travelagency.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingNotification {
  from_location: string;
  to_location: string;
  travel_date: string;
  person_name: string;
  phone_number: string;
  email: string;
  created_at: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingNotification = await req.json();
    
    console.log("Sending booking notification for:", booking.person_name);

    const emailResponse = await resend.emails.send({
      from: "Travel Bookings <onboarding@resend.dev>",
      to: [NOTIFICATION_EMAIL],
      subject: `New Booking: ${booking.from_location} → ${booking.to_location}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🎯 New Travel Booking Received!</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Journey Details</h3>
            <p><strong>From:</strong> ${booking.from_location}</p>
            <p><strong>To:</strong> ${booking.to_location}</p>
            <p><strong>Travel Date:</strong> ${booking.travel_date}</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Customer Information</h3>
            <p><strong>Name:</strong> ${booking.person_name}</p>
            <p><strong>Email:</strong> <a href="mailto:${booking.email}">${booking.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${booking.phone_number}">${booking.phone_number}</a></p>
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Booking Time:</strong> ${new Date(booking.created_at).toLocaleString()}</p>
          </div>

          <p style="color: #6b7280; font-size: 14px;">
            This notification was sent automatically when a new booking was submitted through your travel website.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending booking notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);