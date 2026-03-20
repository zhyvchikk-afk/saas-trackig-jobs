from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
from sqlalchemy.orm import Session
from .db import Base, engine, SessionLocal
from . import models
from .auth import hash_password, verify_password, create_token, create_verification_token
from .config import SECRET_KEY, ALGORITHM, FRONTEND_URL
from .email_service import send_verification_email
from .schemas import JobCreate, JobUpdate

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://saas-trackig-jobs.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "API працює🚀"}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    user_id = payload.get("user_id")

    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user

@app.post("/jobs")
def create_job(
    job: JobCreate, 
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
    ):
    
    new_job = models.Job(
        title=job.title, 
        price=job.price, 
        user_id=user.id
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

@app.put("/jobs/{job_id}")
def update_job(
    job_id: int,
    job_data: JobUpdate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    job = db.query(models.Job).filter(
        models.Job.id == job_id,
        models.Job.user_id == user.id
    ).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job.title = job_data.title
    job.price = job_data.price

    db.commit()
    db.refresh(job)

    return job

@app.get("/jobs")
def get_jobs(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    return db.query(models.Job).filter(models.Job.user_id == user.id).all()

@app.delete("/jobs/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    job = db.query(models.Job).filter(
        models.Job.id == job_id,
        models.Job.user_id == user.id
    ).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    db.delete(job)
    db.commit()

    return {"message": "Job deleted"}



@app.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    verification_token = create_verification_token()

    user = models.User(
        email=email,
        password = hash_password(password),
        is_verified = False,
        verification_token = verification_token
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    verify_link = f"{FRONTEND_URL}/verify-email?token={verification_token}"
    send_verification_email(user.email, verify_link)

    return {"message": "User created. Check your email."}

@app.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.verification_token == token).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid verification token")
    
    user.is_verified = True
    user.verification_token = None

    db.commit()

    return {"message": "Email verified successfully"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Wrong credentials")
    
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Please verify your email")
    
    token = create_token({"user_id": user.id})
    return {"access_token": token, "token_type": "bearer"}
