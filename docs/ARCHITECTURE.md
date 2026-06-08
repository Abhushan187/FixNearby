# Architecture Overview

This document describes the high-level architecture of FixNearby.

## System Diagram

```mermaid
graph TD
    Client[React/Vite Client] -->|HTTPS| LoadBalancer[Nginx/Vercel Router]
    LoadBalancer --> API[Express API Server]
    API -->|NoSQL Queries| DB[(MongoDB Database)]
    API -->|Caching| Cache[(Redis Cache Server)]
    API -->|Mailing| Brevo[Brevo SMTP Gateway]
```

## Component Overview
- **Client**: Build on React SPA with Vite, styled using Tailwind CSS.
- **Server**: Express.js REST APIs with robust middleware.
