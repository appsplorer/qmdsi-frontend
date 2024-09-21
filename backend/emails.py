import ssl
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Finance1232@1W


password = "Finance1232@1W"
app_password = "gcsuurzogmjpzigh"
username = "aurumfinancial2@gmail.com"
port = 465  # For SSL
context = ssl.create_default_context()


def send_forgot_password_email(receiver_email, reset_link):

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Password Reset Request"
    msg["From"] = username
    msg["To"] = receiver_email

    # HTML email template
    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>Hello,</p>
            <p>It seems like you requested a password reset. Please click the button below to reset your password:</p>
            <a href="{reset_link}" 
               style="background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
               Reset Password
            </a>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p style="color: #777;">Thank you,<br>Aurum Financial``</p>
        </div>
    </body>
    </html>
    """

    # Convert the HTML into a MIMEText object
    part = MIMEText(html, "html")
    msg.attach(part)

    # Send the email via SMTP server
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(username, app_password)
            server.sendmail(username, receiver_email, msg.as_string())
        print("Email sent successfully.")
    except Exception as e:
        print(f"Error sending email: {e}")
