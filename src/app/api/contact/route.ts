import { NextResponse } from "next/server";
import { COMPANY_INFO } from "@/lib/constants";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, company, phone, service, message, consent, recaptchaToken } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { message: "Missing required fields. Please fill in all required fields." },
                { status: 400 }
            );
        }

        // Validate consent
        if (!consent) {
            return NextResponse.json(
                { message: "Please agree to the privacy policy to submit the form." },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        // Verify reCAPTCHA if token is provided
        if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
            const recaptchaResponse = await fetch(
                `https://www.google.com/recaptcha/api/siteverify`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
                }
            );
            const recaptchaData = await recaptchaResponse.json();
            if (!recaptchaData.success) {
                return NextResponse.json(
                    { message: "reCAPTCHA verification failed. Please try again." },
                    { status: 400 }
                );
            }
        }

        // Save to database
        try {
            await db.contactSubmission.create({
                data: {
                    name,
                    email,
                    company: company || null,
                    phone: phone || null,
                    service: service || null,
                    message,
                },
            });
        } catch (dbError) {
            console.error("Database error:", dbError);
            // Continue to send email even if DB save fails
        }

        // Check Resend API key
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            console.log("DEV MODE: Email not sent because RESEND_API_KEY is missing.");
            console.log("--- EMAIL CONTENTS ---");
            console.log(`To: ${COMPANY_INFO.email}`);
            console.log(`Subject: New Contact Form Inquiry: ${service} - ${name}`);
            console.log(`Message: ${message}`);
            console.log("----------------------");

            return NextResponse.json(
                { message: "Development mode: Email logged to console." },
                { status: 200 }
            );
        }

        // Send email using Resend
        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "CGC Website <onboarding@resend.dev>", // You'll need to verify your domain with Resend
                to: COMPANY_INFO.email,
                reply_to: email,
                subject: `New Contact Form Inquiry: ${service} - ${name}`,
                text: `
New Contact Form Submission

Name: ${name}
Company: ${company || "Not provided"}
Email: ${email}
Phone: ${phone || "Not provided"}
Service Interest: ${service}

Message:
${message}

---
This email was sent from the CGC website contact form.
Reply directly to this email to respond to ${name} at ${email}.
                `,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #419745; border-bottom: 2px solid #419745; padding-bottom: 10px;">
                            New Contact Form Submission
                        </h2>
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #031926;">Name:</td>
                                <td style="padding: 8px 0; color: #333;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #031926;">Company:</td>
                                <td style="padding: 8px 0; color: #333;">${company || "Not provided"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #031926;">Email:</td>
                                <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #031926;">Phone:</td>
                                <td style="padding: 8px 0; color: #333;">${phone || "Not provided"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #031926;">Service Interest:</td>
                                <td style="padding: 8px 0; color: #333;">${service}</td>
                            </tr>
                        </table>
                        <div style="margin: 20px 0;">
                            <h3 style="color: #031926; margin-bottom: 10px;">Message:</h3>
                            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #419745; white-space: pre-wrap;">
                                ${message.replace(/\n/g, "<br>")}
                            </div>
                        </div>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
                        <p style="color: #666; font-size: 12px;">
                            This email was sent from the CGC website contact form.<br>
                            Reply directly to this email to respond to ${name} at ${email}.
                        </p>
                    </div>
                `,
            }),
        });

        if (!resendResponse.ok) {
            const errorData = await resendResponse.json();
            console.error("Resend API error:", errorData);
            throw new Error(errorData.message || "Failed to send email");
        }

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { message: "Failed to send email. Please try again later or contact us directly." },
            { status: 500 }
        );
    }
}
