import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendOTPEmailOptions {
  to: string
  otp: string
}

export async function sendPasswordResetOTP({ to, otp }: SendOTPEmailOptions): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] RESEND_API_KEY not set. Email not sent (dev mode only).')
    console.log(`[DEV OTP for ${to}]: ${otp}`)
    return
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'PrepPro <onboarding@resend.dev>',
      to: [to],
      subject: 'PrepPro - Your Password Reset Code',
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #ffffff; border-radius: 12px;">
          <h1 style="color: #1e3a8a; font-size: 24px; margin: 0 0 16px;">PrepPro Password Reset</h1>
          
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
            You requested to reset your password for your PrepPro account.
          </p>

          <div style="background: #f1f5f9; padding: 24px; border-radius: 10px; text-align: center; margin: 24px 0;">
            <div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">Your 6-digit reset code</div>
            <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #1e40af; font-family: monospace;">
              ${otp}
            </div>
          </div>

          <p style="color: #64748b; font-size: 14px; margin: 0 0 8px;">
            This code will expire in <strong>10 minutes</strong>.
          </p>

          <p style="color: #94a3b8; font-size: 13px; margin: 20px 0 0;">
            If you didn't request this, you can safely ignore this email.
          </p>

          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
            PrepPro Academy • Official Exam Preparation Platform
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('[Resend] Email error:', error)
      throw new Error('Failed to send email')
    }

    console.log(`[Email] Password reset OTP sent to ${to}`)
  } catch (err) {
    console.error('[Email] Failed to send reset email:', err)
    throw err
  }
}
