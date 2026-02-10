# PSR Customs - API Documentation

Base URL: `http://localhost:5001`

---

## Authentication

### POST /api/auth/login

Admin login. Returns JWT token.

**Request:**
```json
{
  "email": "admin@psrcustoms.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "_id": "...",
  "name": "Admin",
  "email": "admin@psrcustoms.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Protected routes:** Include header: `Authorization: Bearer <token>`

---

### GET /api/auth/me

Get current user (verify token). **Requires Auth.**

**Response:**
```json
{
  "_id": "...",
  "name": "Admin",
  "email": "admin@psrcustoms.com",
  "role": "admin"
}
```

---

## Bookings

### POST /api/bookings

Create new booking (public).

**Request:**
```json
{
  "name": "John Doe",
  "phone": "+919876543210",
  "vehicleType": "car",
  "vehicleModel": "Honda City",
  "service": "<service_id>",
  "date": "2024-02-15",
  "notes": "Optional notes"
}
```

**Vehicle types:** `car`, `bike`, `suv`, `other`

**Response:** Created booking with populated service.

---

### GET /api/bookings

Get all bookings. **Requires Auth (Admin).**

**Response:** Array of bookings with populated service.

---

### GET /api/bookings/:id

Get single booking. **Requires Auth (Admin).**

---

### PUT /api/bookings/:id

Update booking (e.g., status). **Requires Auth (Admin).**

**Request:**
```json
{
  "status": "confirmed"
}
```

**Status values:** `pending`, `confirmed`, `in-progress`, `completed`, `cancelled`

---

### DELETE /api/bookings/:id

Delete booking. **Requires Auth (Admin).**

---

## Services

### GET /api/services

Get all active services (public).

**Response:** Array of services.

---

### GET /api/services/:id

Get single service (public).

---

### POST /api/services

Create service. **Requires Auth (Admin).**

**Request:**
```json
{
  "name": "Ceramic Coating",
  "description": "Premium ceramic coating...",
  "priceMin": 15000,
  "priceMax": 50000
}
```

---

### PUT /api/services/:id

Update service. **Requires Auth (Admin).**

---

### DELETE /api/services/:id

Delete service. **Requires Auth (Admin).**

---

## Health Check

### GET /api/health

Returns `{ status: "OK", message: "PSR Customs API is running" }`

---

## Error Responses

- **400** - Validation error: `{ errors: [...] }`
- **401** - Unauthorized: `{ error: "Invalid email or password" }`
- **404** - Not found: `{ error: "Resource not found" }`
- **500** - Server error: `{ error: "Internal Server Error" }`
