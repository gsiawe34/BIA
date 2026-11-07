# Implementation Plan: Bayelsa International Airport (BIA) Web Portal

A premium, modern, and fully functional airport information and passenger services platform for Bayelsa International Airport. This portal provides real-time flight tracking, VIP service bookings, terminal navigation, and a comprehensive administrative dashboard.

> [!IMPORTANT]
> **Supabase Integration**: As I cannot provision Supabase for you directly, this project will be built with a standard Supabase client configuration. I will provide the complete SQL schema and security policies in a dedicated `/supabase` directory for you to execute in your Supabase SQL Editor.

## 1. Overview & Core Concept
The BIA Web Portal serves as the digital gateway to Bayelsa's aviation hub. It balances the needs of two primary personas:
- **The Traveler**: Needs instant, reliable flight status, terminal maps, and seamless booking for premium services (Lounge, Parking).
- **The Airport Operator**: Needs a secure, real-time dashboard to manage flight operations, commercial listings, and passenger requests.

## 2. User Experience & Visual Design
Inspired by the clean, structured aesthetic of modern international hubs like MMA2 and Heathrow, but with a unique Bayelsa "Glory of All Lands" touch.

- **Aesthetic Direction**: *Minimalist International Luxury*. High-contrast typography, generous whitespace, and a "glassmorphism" influence for interactive elements.
- **Color Palette**:
  - `Royal Navy`: Primary brand color for trust and authority.
  - `Champagne Gold`: Accent color for premium services (VIP Lounge).
  - `Airport Slate`: Neutral grays for data-heavy flight tables.
- **Typography**: 
  - `Plus Jakarta Sans`: Modern geometric sans for UI and body text.
  - `Bricolage Grotesque`: Characterful headings for a distinctive brand voice.
- **Key User Flows**:
  1. **Quick Track**: Hero-section flight search gets the user to their status in 1 click.
  2. **Premium Booking**: A unified flow for Lounge and Parking with real-time availability checks.
  3. **Terminal Discovery**: Filterable directory for shopping and dining.

## 3. Technical Architecture & Data Strategy

### Architecture Diagram
```text
┌─────────────────────────────────────────────────────────┐
│                   React / Vite Frontend                 │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ Public Site │  │ Admin Portal │  │ Auth Wrappers  │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬────────┘  │
└─────────┼────────────────┼──────────────────┼───────────┘
          │                │                  │
          ▼                ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                    Supabase Backend                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ PostgreSQL  │  │ Edge Funct.  │  │ Realtime Bus   │  │
│  │ (RLS Sec)   │  │ (Payments)   │  │ (Flight Upd)   │  │
│  └─────────────┘  └──────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Data Model Highlights
- **`flights`**: Real-time arrival/departure data with status triggers.
- **`bookings`**: Unified table for Lounge and Parking with `service_type` discriminator.
- **`profiles`**: Linked to `auth.users` with `role` (Admin, Ops, Customer).
- **`content`**: Dynamic settings for the airport's name, logo, and contact info.

## 4. Key Product Decisions & Trade-Offs

- **Decision: Real-time Flight Updates**
  - *Approach*: Use Supabase Realtime subscriptions on the `flights` table.
  - *Why*: Ensures passengers see boarding/delay updates without refreshing.
- **Decision: Role-Based Access Control (RBAC)**
  - *Approach*: Database-level RLS policies checking a `user_role` function.
  - *Why*: Prevents even advanced users from bypassing frontend restrictions to modify flight data.
- **Decision: Payment Simulation**
  - *Approach*: Implement a "Checkout" flow that connects to a simulated Paystack/Flutterwave verification hook.
  - *Why*: Allows for full testing of the booking lifecycle before live API keys are provided.

## 5. Phased Execution Roadmap

### Phase 1: Foundation & Design System
- Initialize Supabase client and types.
- Build the "At-a-Glance" Hero section and Flight Information Preview.
- Generate high-fidelity airport photography assets.

### Phase 2: Passenger Services
- Implement Arrival/Departure full-page views with search/filter.
- Build the VIP Lounge and Parking booking forms with state validation.
- Create the Airline and Shopping directories.

### Phase 3: Administrative Core
- Implement Supabase Auth (Sign In / Sign Up).
- Build the Dashboard layout with statistics overview.
- Create CRUD interfaces for Flights, Airlines, and Bookings.

### Phase 4: Polish & Security
- Write and verify PostgreSQL RLS policies.
- Add Framer Motion transitions for a "premium" feel.
- Final SEO and Performance audit.
