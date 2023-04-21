# my-business-buddy-api

# Features

- Accepts a Business Profile JSON data
- Validate the input data, accepting emails that ends with .com only
- Generate a unique 7 character id for the business
- Generate a qrcode using the unique id that you just generated
- Save the qrcode image to a folder named qrcodes
- Save the record to your database
- Send a message back to the user as a json response containing
  // response = { "link": "http://bus.me/[id]" } where the unique-id is [id] on the link

# Technologies Used

- NodeJS
- Express
- MongoDB Compass

# Libraries

- Joi
- OTP generator
- QRCode Generator

# API Endpoints

- POST "/profile" : submit the business profile
- GET "/" : Basic Home route
