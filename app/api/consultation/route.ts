import { NextRequest, NextResponse } from 'next/server';

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

    // Check for Resend API key
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.log('=== RESEND_API_KEY NOT FOUND ===');
      console.log('Add RESEND_API_KEY to your Vercel environment variables');
      console.log('');
      console.log('=== CONSULTATION REQUEST (logged only) ===');
      console.log(emailContent);
      console.log('==========================================');
      
      // Return success anyway so form works (remove this in production if you want to require email)
      return NextResponse.json({ 
        success: true, 
        message: 'Submission received (email not configured yet)'
      });
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Auto Wizard <onboarding@resend.dev>',
        to: ['autowizardcompany@gmail.com'],
        reply_to: email,
        subject: `New Consultation Request from ${name}`,
        text: emailContent,
        html: htmlContent,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', responseData);
      return NextResponse.json({ 
        error: 'Failed to send email', 
        details: responseData 
      }, { status: 500 });
    }

    console.log('Email sent successfully:', responseData);
    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
