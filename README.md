# Interview Scheduler

Interview scheduler lets you book, edit and cancel interviews.

## Technical Specifications

React
Webpack, Babel
Axios, WebSockets
Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application. The API server repository is found at https://github.com/RishBar/scheduler-api

Read and follow the README to create, configure, seed and run the database. 

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

After installing dependencies, run
```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Cypress Test Framework

```sh
npm run cypress
```
## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Screen Shots

!["Show"](https://github.com/RishBar/scheduler/blob/master/docs/show.png?raw=true)
!["Form"](https://github.com/RishBar/scheduler/blob/master/docs/form.png?raw=true)
!["New Appointment"](https://github.com/RishBar/scheduler/blob/master/docs/newappointment.png?raw=true)