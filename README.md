# Softuni React project - Custom furniture orders

| Contents
|---
| [General info](#general-info)
| [Technologies](#technologies)
| [Setup](#setup)
| [Authentication](#authentication)

## General info
This project is a REST-API application. The main purpose is to order custom furniture with ideas and image ideas.

## Technologies
Project is created with:
* Node JS
* Express
* Mongo DB
* Mongoose

## Setup
To run this project, install it locally using npm:

To connect to deployed datatabase meke sure that .env file has
`DB_URL_CREDENTIALS` to equal `'mongodb+srv://marians1md:%23-X5vKtVux-VAah@cluster0.skhs2lw.mongodb.net/furniture'` 

```
$ npm install
$ npm run dev
```

### Authentication

The service is initialized with three users, which can be used for immediate testing:
* peter@abv.bg : 123456
* george@abv.bg : 123456
* admin@abv.bg : admin

#### Register
Create a new user by sending a `POST` request to `/users/register` with properties `email` and `password`. You can add any other property that you need, like username, avatar, etc. The service automatically creates a session and returns an authorization token, that can be used for requests.

#### Login
Login by sending a `POST` request with `email` and `password` to `/users/login`. The service will respond with an object, containing a standard string token, that can be used for requests.

#### Logout
Send an authorized `GET` request to `/users/logout`. **The service returns an empty response - if you attempt to parse it as JSON, you will receive an error!** You can check for this type of response by looking at the **status** (204 instead of 200) and the **content-type header** (will not be present).

#### Get User Details
Send an authorized `GET` request to `/users/me`. The service will return the record of the user, associated with the passed-in session token.

#### Authorized Requests
To make an authorized request, add the following header, where `{token}` is the access token, returned by the service upon successful login or registration:
```
X-Authorization: {token}
```
