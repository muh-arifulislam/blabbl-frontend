# Blabbl Inc.

A modern real time messaging application for the **Blabbl** project.

## Live Demo

Check out the live site: [https://blabbl.netlify.app/](https://blabbl.netlify.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Build](#build)
- [License](#license)

## Overview

**blabbl-frontend** is the user interface for the blabbl platform. It provides a responsive and interactive experience for users.

## Features

- Modern UI built with [React](https://react.dev/) and [shadcn](https://ui.shadcn.com/)
- Real time chat experience with [Socket.IO](https://socket.io/)
- REST API integration
- Authentication and authorization
- Responsive design
- State management with [Redux](https://redux.js.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (18.0.0+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```bash
git clone https://github.com/muh-arifulislam/blabbl-frontend
cd blabbl-frontend
npm install
```

### Environment Variables

After cloning the project, you need to set up the required environment variables. Create a `.env` file in the root directory and add the following:

```env
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client
VITE_AUTH0_AUDIENCE=your_auth0_audience
```

## Development

To start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## Build

To create a production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## License

This project is licensed under the [MIT License](LICENSE).
