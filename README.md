# Mgmt Portal Temp Backend

## Introduction

A simple Node/Express app you can run locally, making it super easy to set up mock endpoints for the Management Portal. We create a data store in memory and manipulate it directly via the endpoints. In the `capman-mgmt-portal-ui` repo, create your axios functions and react-query hooks as normal, but use `getMockBookingService` instead of `getBookingService` to hit this express app (http://localhost:5000).

```js
// getMockBookingService.ts
import axios from 'axios'

const TIMEOUT = 30000

export const getMockBookingService = () => {
  return axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: TIMEOUT
  })
}
```

## Development

Run `yarn && yarn dev` to start up the server.
