import resend
from .config import RESEND_API_KEY, EMAIL_FROM

resend.api_key = RESEND_API_KEY

def send_verification_email(to_email: str, verify_link: str):

    if not resend.api_key:
        raise ValueError("RESEND_API_KEY is not set")
    
    mess = {
        "from": EMAIL_FROM,
        "to": [to_email],
        "subject": "Підтвердіть свою пошту",
        "html": f"""
        <h2>Підтверди email</h2>
        <p><a href="{verify_link}">Підтвердити</a></p>
        """
    }

    print("EMAIL RESPONSE: ", resend.Emails.send(mess))
    return resend.Emails.send(mess)