# Mgmt Portal Temp Backend

## Introduction

A simple Node/Express app that allows you to quickly mock up some endpoints for the Management Portal. We create a data store in memory and manipulate it directly via the endpoints. In the `capman-mgmt-portal-ui` repo, create your axios functions and react-query hooks as normal, but use `getMockBookingService` instead of `getBookingService` to hit this express app (http://localhost:5000).

Run `yarn && yarn dev` to start up the server
