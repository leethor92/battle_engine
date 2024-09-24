# Battle Engine

## Overview

The Battle Engine is a Node.js application that serves as the backend for a turn-based battle game. It provides APIs for creating players, submitting battles, and ensuring the smooth operation of the game mechanics. The application uses Redis for data storage and Bull for managing background job queues.

## Features

- Create players with unique names and customizable attributes.
- Submit battles between players.
- Health check endpoint to verify the service is running.

## Endpoints

### 1. Health Check

**GET** `/test`

Returns a simple message indicating that the Battle Engine API is running.

**Response:**
```json
{
  "message": "Battle Engine API is running!"
}
```

### 2. Creates a new player in the system

**POST** `/addPlayer`

**Request Body:**
```json
{
  "name": "string",
  "gold": 1000,
  "attackValue": 30,
  "hitPoints": 100,
  "luckValue": 10
}
```

### 3. Submits a battle between two players.

**POST** `/submit`

**Request Body:**
```json
{
  "attackerId": "string",
  "defenderId": "string"
}
```

## Installation
cd battle-engine
npm install
npm run start-all

## Testing
npm test