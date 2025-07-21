import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// 🔧 CHANGE THIS EMAIL ADDRESS WHEN NEEDED
const NOTIFICATION_EMAIL = "amansingharaara@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VisitData {
  timestamp: string;
  userAgent?: string;
  referrer?: string;
  location?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const visitData: VisitData = await req.json();
    
    console.log("Sending website visit notification");

    const emailResponse = await resend.emails.send({
      from: "Website Visits <onboarding@resend.dev>",
      to: [NOTIFICATION_EMAIL],
      subject: "🌍 Someone visited your travel website!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">🌍 New Website Visitor!</h2>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #047857;">Visit Details</h3>
            <p><strong>Time:</strong> ${new Date(visitData.timestamp).toLocaleString()}</p>
            ${visitData.location ? `<p><strong>Location:</strong> ${visitData.location}</p>` : ''}
            ${visitData.referrer ? `<p><strong>Came from:</strong> ${visitData.referrer}</p>` : ''}
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #d97706;">Browser Info</h3>
            <p style="font-size: 12px; color: #92400e;">${visitData.userAgent || 'Not available'}</p>
          </div>

          <p style="color: #6b7280; font-size: 14px;">
            This notification was sent automatically when someone visited your travel website.
          </p>
        </div>
      `,
    });

    console.log("Visit notification email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending visit notification:", error);
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