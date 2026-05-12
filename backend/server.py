from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Alcazar Fort API")
api_router = APIRouter(prefix="/api")


# =========================
# Models
# =========================
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class BookingInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    check_in: str
    check_out: str
    adults: int = 1
    children: int = 0
    rooms: int = 1
    room_type: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BookingInquiryCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    check_in: str
    check_out: str
    adults: int = 1
    children: int = 0
    rooms: int = 1
    room_type: Optional[str] = None
    message: Optional[str] = None


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str


class AvailabilityCheck(BaseModel):
    check_in: str
    check_out: str
    adults: int = 1
    children: int = 0
    rooms: int = 1


# =========================
# Helpers
# =========================
def serialize_doc(doc: dict) -> dict:
    if not doc:
        return doc
    doc.pop("_id", None)
    for k, v in list(doc.items()):
        if isinstance(v, datetime):
            doc[k] = v.isoformat()
    return doc


# =========================
# Static data: Rooms
# =========================
ROOMS = [
    {
        "slug": "premium-lake-view-room",
        "name": "Premium Lake View Room Set",
        "price_from": 15000,
        "currency": "PKR",
        "image": "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.36.35-PM-370x370.jpeg",
        "gallery": [
            "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.36.35-PM.jpeg",
            "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.36.36-PM.jpeg",
            "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.36.33-PM.jpeg"
        ],
        "short": "Premium suites with panoramic lake & valley views, modern decor and en-suite hot water.",
        "description": "Our Premium Lake View Room Set is the crown jewel of Al-Cazar Fort. Sweeping windows frame the serene riverside and majestic mountains of Naran Valley, while the interior offers contemporary furnishings, plush bedding and an en-suite bathroom with hot running water. Perfect for couples and families seeking a luxurious, quiet retreat.",
        "features": ["Lake & valley view", "King size bed", "En-suite bathroom", "24-hour room service", "Hot water", "Complimentary tea/coffee"],
        "max_adults": 3,
        "max_children": 2,
        "size_sqm": 36
    },
    {
        "slug": "deluxe-rooms",
        "name": "Deluxe Rooms",
        "price_from": 10000,
        "currency": "PKR",
        "image": "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.36.38-PM-370x370.jpeg",
        "gallery": [
            "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.36.38-PM.jpeg",
            "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.38.36-PM.jpeg",
            "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.38.37-PM.jpeg"
        ],
        "short": "Spacious deluxe rooms with marble floors, comfortable furnishings and modern amenities.",
        "description": "Our Deluxe Rooms feature elegant marble flooring, contemporary furnishings and large windows that welcome in fresh mountain air. Each room includes an en-suite bathroom with hot water, premium bedding and all the comforts of a modern hotel \u2013 a perfect base from which to explore Naran.",
        "features": ["Mountain view", "Queen bed", "Marble floors", "Hot water", "Wi-Fi", "Room service"],
        "max_adults": 2,
        "max_children": 2,
        "size_sqm": 28
    },
    {
        "slug": "executive-room",
        "name": "Executive Room",
        "price_from": 10000,
        "currency": "PKR",
        "image": "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.38.42-PM-370x370.jpeg",
        "gallery": [
            "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.38.42-PM.jpeg",
            "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.38.38-PM.jpeg",
            "https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.38.26-PM.jpeg"
        ],
        "short": "Executive suites with hot water tubs and refined decor for a truly relaxing getaway.",
        "description": "Designed for the discerning traveller, our Executive Room offers refined decor, generous space and a hot water bathing tub. Whether you're here for business or a romantic escape, you'll enjoy thoughtful touches throughout: bespoke chandeliers, plush linens and prompt 24-hour service.",
        "features": ["River view", "King bed", "Hot water tub", "Work desk", "Wi-Fi", "24-hour service"],
        "max_adults": 2,
        "max_children": 2,
        "size_sqm": 32
    }
]


# =========================
# Routes
# =========================
@api_router.get("/")
async def root():
    return {"message": "Al-Cazar Fort API is running", "version": "1.0.0"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    items = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in items:
        if isinstance(c.get('timestamp'), str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return items


@api_router.get("/rooms")
async def list_rooms():
    return {"rooms": ROOMS}


@api_router.get("/rooms/{slug}")
async def get_room(slug: str):
    for r in ROOMS:
        if r["slug"] == slug:
            return r
    raise HTTPException(status_code=404, detail="Room not found")


@api_router.post("/availability")
async def check_availability(payload: AvailabilityCheck):
    # Simple mock availability: always available, returns the rooms
    return {
        "available": True,
        "check_in": payload.check_in,
        "check_out": payload.check_out,
        "adults": payload.adults,
        "children": payload.children,
        "rooms": payload.rooms,
        "results": ROOMS
    }


@api_router.post("/bookings", response_model=BookingInquiry)
async def create_booking(payload: BookingInquiryCreate):
    booking = BookingInquiry(**payload.model_dump())
    doc = booking.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.bookings.insert_one(doc)
    return booking


@api_router.get("/bookings")
async def list_bookings():
    items = await db.bookings.find({}, {"_id": 0}).to_list(1000)
    return {"bookings": items}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get("/contact")
async def list_contacts():
    items = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    return {"messages": items}


@api_router.get("/testimonials")
async def list_testimonials():
    return {
        "testimonials": [
            {
                "id": "1",
                "name": "Aliza",
                "location": "Pakistan",
                "date": "September 2017",
                "avatar": "https://alcazarfort.pk/wp-content/uploads/2018/12/goa-resort-testimonails-thumb.png",
                "text": "The Alcazar Fort is a five-star gem. The rooms are clean and spacious, with everything one could ask for. Located in one of the nicest areas of Naran. The staff is friendly and helpful. All services seem to be offered on-site or nearby. We especially loved that it is located close enough to shopping, restaurants, and nightlife, but far enough away from all of it so that one can relax during their visit. Overall, highly recommended!"
            },
            {
                "id": "2",
                "name": "Adeel Atif",
                "location": "Pakistan",
                "date": "December 2013",
                "avatar": "https://alcazarfort.pk/wp-content/uploads/2018/12/Male.png",
                "text": "Wonderful place to stay! The rooms were amazing with the modern fashioned charm that perfectly fits their surroundings. Food at any time of day or night was delicious and ample. No complaints at all!"
            },
            {
                "id": "3",
                "name": "Adnan Asim",
                "location": "Pakistan",
                "date": "December 2013",
                "avatar": "https://alcazarfort.pk/wp-content/uploads/2018/12/Male.png",
                "text": "Fantastic in every way. The facilities are beautiful, the service was great, and I had a very restful sleep. I strongly recommend Alcazar for anyone who will be visiting Naran."
            },
            {
                "id": "4",
                "name": "Amir Arsalan",
                "location": "Pakistan",
                "date": "December 2013",
                "avatar": "https://alcazarfort.pk/wp-content/uploads/2018/12/Male.png",
                "text": "We stayed at their gorgeous place for two nights. It was impeccably clean, and we had a very comfortable time. I would recommend staying here if you are in the Naran!"
            },
            {
                "id": "5",
                "name": "Abdullah & Rubab",
                "location": "Pakistan",
                "date": "April 2018",
                "avatar": "https://alcazarfort.pk/wp-content/uploads/2018/12/pairimg.png",
                "text": "The staff was very helpful and courteous. The facilities were great. There is a pool which we didn't get time to use because of all of our travelling adventures. It is located in a beautiful part of town with great views. It is close enough to everything but far enough away, so it isn't busy or noisy on their property. We would stay here again if we came back through Naran!"
            }
        ]
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
