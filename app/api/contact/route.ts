import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = 'qwerty.admin@atelierdiamonds.com'

export async function POST(req: NextRequest) {
  const { name, email, phone, desired, message } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Atelier Diamonds <onboarding@resend.dev>',
    to: TO,
    replyTo: email,
    subject: `New consultation request — ${name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #0C0C0C;">
        <h2 style="font-weight: 300; letter-spacing: 0.1em; border-bottom: 1px solid #B89B6A; padding-bottom: 12px;">
          New Consultation Request
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; width: 160px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #B89B6A;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
          ${desired ? `<tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em;">Vision</td><td style="padding: 8px 0;">${desired}</td></tr>` : ''}
          ${message ? `<tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message}</td></tr>` : ''}
        </table>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
