# Air Quality API

## Description

The Air Quality API provides information about air quality based on latitude and longitude. It also tracks the most polluted times in Paris and stores air quality records in a MongoDB database.

## Features

- Get air quality data based on latitude and longitude.
- Retrieve the most polluted time in Paris.
- Automatically fetch and store Paris air quality data every minute using a cron job.

## Getting Started

### Prerequisites

- Node.js
- npm 
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AndrewNagyNemr/air-quality.git
   cd air-quality-api
   
2. **Install dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
   - Create a .env file in the root of your project and add the following:
    ```bash
    AIR_VISUAL_API_KEY="a8bb2e31-e86b-4999-b1aa-2aad531f69c9"
    AIR_VISUAL_BASE_URL="https://api.airvisual.com"
    MONGODB_URI="mongodb://localhost/air-quality"
    
4. **Run the application:**
   ```bash
   npm run start

### API Documentation
The API documentation is available via Swagger. After running the application, navigate to http://localhost:3000/api to view the Swagger UI.

### Running the Cron Job
The application includes a cron job that checks and records the air quality in Paris every minute.

