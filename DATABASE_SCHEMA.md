# PSR Customs - Database Schema

MongoDB collections and validation rules.

---

## User (Admin)

| Field    | Type   | Required | Validation        |
|----------|--------|----------|-------------------|
| email    | String | ✓        | Unique, lowercase  |
| password | String | ✓        | Min 6 chars, hashed |
| name     | String | ✓        | Trimmed            |
| role     | String | -        | Enum: ['admin'], default: 'admin' |
| createdAt| Date   | -        | Auto               |
| updatedAt| Date   | -        | Auto               |

---

## Booking

| Field      | Type     | Required | Validation                            |
|------------|----------|----------|---------------------------------------|
| name       | String   | ✓        | Min 2 chars                           |
| phone      | String   | ✓        | Valid phone format                    |
| vehicleType| String   | ✓        | Enum: car, bike, suv, other           |
| vehicleModel| String  | ✓        | Trimmed                               |
| service    | ObjectId | ✓        | Ref: Service                          |
| date       | Date     | ✓        | ISO8601                               |
| status     | String   | -        | pending, confirmed, in-progress, completed, cancelled |
| notes      | String   | -        | Trimmed                               |
| createdAt  | Date     | -        | Auto                                  |
| updatedAt  | Date     | -        | Auto                                  |

---

## Service

| Field     | Type   | Required | Validation   |
|-----------|--------|----------|--------------|
| name      | String | ✓        | Unique       |
| description| String| ✓        | Trimmed      |
| priceMin  | Number | ✓        | Min 0        |
| priceMax  | Number | ✓        | Min 0        |
| imageUrl  | String | -        | Trimmed      |
| duration  | Number | -        | Default: 2 (hours) |
| isActive  | Boolean| -        | Default: true |
| createdAt | Date   | -        | Auto         |
| updatedAt | Date   | -        | Auto         |

---

## Seed Data (Services)

1. Ceramic Coating - ₹15,000 - ₹50,000
2. Paint Protection Film (PPF) - ₹25,000 - ₹80,000
3. Car Washing & Detailing - ₹500 - ₹2,000
4. Interior Cleaning - ₹2,000 - ₹8,000
5. Scratch & Paint Correction - ₹5,000 - ₹25,000

---

## Admin User (Seed)

- Email: admin@psrcustoms.com
- Password: admin123 (change in production!)
