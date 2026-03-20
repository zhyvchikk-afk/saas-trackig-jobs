import resend
from .config import RESEND_API_KEY, EMAIL_FROM

resend.api_key = RESEND_API_KEY

def send_verification_email(to_email: str, verify_link: str):
    params = {
        "from": EMAIL_FROM,
        "to": [to_email],
        "subject": "Підтвердіть свою пошту",
        "html": f"""
        <div style="font-family: Arial, sans-serif;">
            <h2>Підтвердження пошти</h2>
            <p>Для підтвердження пошти натисніть кнопку нижче</p>
            <p>
                <a href="{verify_link}" style="
                    display:inline-block;
                    padding:12px 18px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:8px;
                ">
                    Підтвердити пошту
                </a>
            </p>
            <p>Або відкрий це посилання вручну: </p>
            <p>{verify_link}</p>
        </div>
        """
    }

    return resend.Emails.send(params)