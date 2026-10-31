# WanderLyn

A full-stack Airbnb-style web app where users can browse, create and review travel stays. Built with Node.js, Express, MongoDB and EJS.

## Features

- User sign up, log in and log out (Passport.js, sessions stored in MongoDB)
- Create, edit and delete listings (only the owner can edit or delete)
- Image uploads to Cloudinary
- Automatic geocoding of each listing's location, shown on an interactive map (Leaflet + OpenStreetMap)
- Star-rated reviews (only logged-in users can post, only the author can delete)
- Search listings by location
- Server-side validation with Joi, plus Bootstrap form validation
- Flash messages and a custom error page
- Responsive layout with Bootstrap 5

## Tech stack

| Area | Tools |
|---|---|
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas, Mongoose |
| Views | EJS, ejs-mate (layouts), Bootstrap 5 |
| Auth | Passport.js, passport-local, passport-local-mongoose, express-session, connect-mongo |
| Uploads | Multer, Cloudinary |
| Maps | node-geocoder (OpenStreetMap), Leaflet |
| Validation | Joi |

## Getting started

### Prerequisites

- Node.js 20 or newer
- A MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works)
- A free [Cloudinary](https://cloudinary.com/) account

### Installation

```bash
git clone https://github.com/P5-Tamanna/WanderLyn.git
cd WanderLyn
npm install
```

### Environment variables

Create a `.env` file in the project root (see `.env.example`):

```
ATLASDB_URL=your_mongodb_connection_string
SECRET=a_long_random_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Never commit your `.env` file.

### Run the app

```bash
node app.js
```

Then open http://localhost:8080/listings

### Optional: add sample data

`init/data.js` contains sample listings and `init/index.js` loads them. Before running it, make sure the database URL and the `owner` user id in `init/index.js` point to your own database and an existing user. Geocoding uses OpenStreetMap, which allows about one request per second, so seeding may take a little while.

```bash
node init/index.js
```

## Project structure

```
controllers/   Route logic (listings, reviews, users)
init/          Sample data and seeding script
models/        Mongoose schemas (Listing, Review, User)
public/        Static files (CSS, client-side JS)
routes/        Express routers
utils/         Helpers (geocoder, async wrapper, custom error class)
views/         EJS templates (layouts, partials, pages)
app.js         App setup and middleware
cloudConfig.js Cloudinary storage config
middleware.js  Auth, ownership and validation middleware
schema.js      Joi validation schemas
```

## Routes

| Method | Path | Description |
|---|---|---|
| GET | `/listings` | All listings (supports `?location=`) |
| GET | `/listings/new` | New listing form (login required) |
| POST | `/listings` | Create listing (login required) |
| GET | `/listings/:id` | Listing details, map and reviews |
| GET | `/listings/:id/edit` | Edit form (owner only) |
| PUT | `/listings/:id` | Update listing (owner only) |
| DELETE | `/listings/:id` | Delete listing (owner only) |
| POST | `/listings/:id/reviews` | Add a review (login required) |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review (author only) |
| GET/POST | `/signup`, `/login` | Authentication |
| GET | `/logout` | Log out |

## Author

Made by [Tamanna Gupta](https://github.com/P5-Tamanna)