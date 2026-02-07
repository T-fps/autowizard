import { NextRequest, NextResponse } from 'next/server';

// You can use Resend, SendGrid, Nodemailer, or any email service
// This example uses Resend - sign up at resend.com and get an API key

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, dates, times, notes, services } = body;

    // Format the dates
    const formattedDates = dates.map((date: string) => 
      new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    ).join(', ');

    // Format the times
    const timeLabels: Record<string, string> = {
      'morning': 'Morning',
      'midday': 'Mid-Day', 
      'afternoon': 'Afternoon'
    };
    const formattedTimes = times.map((t: string) => timeLabels[t] || t).join(', ');

    // Format services
    const serviceLabels: Record<string, string> = {
      'consultation': 'Expert Consultation',
      'customization': 'Customization Support',
      'purchase': 'Purchase Assistance',
      'bundle': 'Full Bundle'
    };
    const formattedServices = services.map((s: string) => serviceLabels[s] || s).join(', ');

    // Email content
    const emailContent = `
Name: ${name}
Email: ${email}
Phone Number: ${phone}

Services Requested: ${formattedServices || 'None selected'}

Booking Requested: ${formattedTimes}
Date(s): ${formattedDates}

Notes:
${notes || 'No additional notes'}
    `.trim();

    // HTML version for better formatting
    const htmlContent = `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <hr />
      <p><strong>Services Requested:</strong> ${formattedServices || 'None selected'}</p>
      <p><strong>Booking Requested:</strong> ${formattedTimes}</p>
      <p><strong>Date(s):</strong> ${formattedDates}</p>
      <hr />
      <p><strong>Notes:</strong></p>
      <p>${notes || 'No additional notes'}</p>
    `;

    // Option 1: Using Resend
    // Sign up at resend.com, get API key, add to .env.local as RESEND_API_KEY
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Auto Wizard <onboarding@resend.dev>', // Use your verified domain in production
          to: ['autowizardcompany@gmail.com'],
          reply_to: email,
          subject: `New Consultation Request from ${name}`,
          text: emailContent,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Resend error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    }

    // Option 2: Fallback - just log the submission (for testing without email service)
    console.log('=== NEW CONSULTATION REQUEST ===');
    console.log(emailContent);
    console.log('================================');
    
    // In production, you'd want to return an error if no email service is configured
    // For now, we'll return success so the form works during development
    return NextResponse.json({ 
      success: true, 
      message: 'Submission received (email service not configured)',
      note: 'Add RESEND_API_KEY to .env.local to enable email sending'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
