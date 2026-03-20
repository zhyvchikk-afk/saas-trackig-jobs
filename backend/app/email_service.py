import resend
from .config import RESEND_API_KEY, EMAIL_FROM

resend.api_key = RESEND_API_KEY

def send_verification_email(to_email: str, verify_link: str):
    params = {
        "from": EMAIL_FROM,
        "to": [to_email],
        "subject": "Підтвердіть свою пошту",
        "html": f"""
        <h2>Підтверди email</h2>
        <a href="{verify_link}">Підтвердити</a>
        """
    }

    return resend.Emails.send(params)