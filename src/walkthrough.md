# Walkthrough - You Say I Deliver MERN Web Application

We have successfully designed, built, and verified a premium, fully responsive MERN stack web application for the brand **"You Say I Deliver"**.

Due to a macOS system port collision on port `5000` (occupied by default by macOS AirPlay Receiver), we configured the backend to bind to port **`5001`**. The frontend automatically proxies `/api` calls to this port in development.

---

## 🛠️ System Architecture & Changes

### 1. Client Inquiry Feature Suite [NEW]
To support high-growth client acquisition and robust workflow coordination, we implemented a complete **Client Inquiry Flow** spanning database schemas, REST APIs, email/WhatsApp notification log outboxes, and visual dashboard interfaces:
- **Backend Schema (`backend/models/Inquiry.js`)**: Defines inquiry structures with `name`, `companyName`, `email` (mandatory), `location` (mandatory), `phone`, `details` (mandatory), and `status` ('Pending', 'Reviewed', 'Replied').
- **REST Endpoints (`backend/routes/inquiryRoutes.js`)**:
  - `POST /api/inquiries`: Public submission validation. Triggers background notification outbox logs.
  - `GET /api/inquiries`: Admin list ledger.
  - `PUT /api/inquiries/:id`: Admin updates inquiry state.
  - `DELETE /api/inquiries/:id`: Admin cleans up/deletes inquiry record.
- **Inquiry Controller (`backend/controllers/inquiryController.js`)**: Coordinates database insertions and issues simulated outbox notification console displays for admin awareness.
- **Inquiry Page (`frontend/src/pages/Inquiry.jsx`)**: A premium customer-facing portal that validates mandatory fields, submits payloads to the backend, and displays custom success confirmation screens.
- **Global CTA Re-routing**: Updated **all** occurrences of the legacy "Book Consultation" / "/book" pathways to direct users to the new "/inquiry" form. This updates:
  - Header Navbar (`Navbar.jsx`): "Inquire Now" and "Send Inquiry".
  - Hero Section (`Home.jsx`): "Send Inquiry".
  - Timeline Steps (`Home.jsx`): "Inquire about this stage".
  - Services & Combo cards (`Services.jsx`): "AUTHORIZE & SETUP BUNDLE/SERVICES" and "INQUIRE ABOUT FULL PACKAGE".
  - FAQ section (`FAQ.jsx`): "Send Inquiry".
  - About closing segment (`About.jsx`): "Partner with Us".
- **Admin Inquiries Ledger Tab (`AdminDashboard.jsx`)**: Added an **Inquiries** tab listing client details, email links, phone numbers, descriptive project requests, and a status dropdown (Pending/Reviewed/Replied), along with a delete command button.

### 2. Dual-Mode Services Layout (`Services.jsx`)
Redesigned the Services layout to support two pricing viewing modes:
- **Discounted Bundles Mode**: Displays the three Phase cards side-by-side with bulk discounted pricing tags (e.g. `₹5,000` instead of `₹6,000`).
- **Individual Services Mode**: Replaces the phase pricing row with a subheader declaring `"DELIVERABLE-BASED CUSTOM PRICING"`. Each checklist item transforms into a dedicated card detailing the specific deliverable title, description, and its individual cost on the right.
- **Restored Elite Combo Package Banner**: The elite horizontal scale-up bundle displays unconditionally at the bottom of the page, horizontally aligned, under **both** `"Discounted Bundles"` and `"Individual Services"` selections.
- **Removed Capsule Filters**: Removed the sub-navigation filters row (`ALL SERVICES` | `PHASE 1` | `PHASE 2` | `PHASE 3`) completely to match the requested direct layout spacing.

### 3. Global Floating WhatsApp Button & Custom CSS Tooltip (`App.jsx`)
Active at number `+91 93134 82177`, themed in crimson red, with edge-safe tooltips.

### 4. Breathing Animations
Synced breathing pulsing scale transitions on the Hero Badge and WhatsApp button.

---

## 🧪 Verification & Database Results

We ran automated integration tests confirming the inquiries subsystem is fully operational:

### 1. Inquiries API test (`backend/scripts/test-inquiries.js`)
- **Missing validation checks**: Request without location/email returns **`400 Bad Request`** => PASS.
- **Inquiry registration**: Valid request registers in MongoDB under ID: `6a421f18cb045078c7abb8ac` => PASS.
- **Admin Authentication & Fetch**: Retrieves list and locates record Tony Stark => PASS.
- **Status Change**: Modifies status to "Reviewed" => PASS.
- **Cleanup deletion**: Deletes test inquiry successfully => PASS.

---

## 📸 Visual Verification of Layouts

### 1. Client Inquiry Flow

#### A. Inquiry Submitted Success View (Steve Rogers)
Here is the captured browser screenshot after a customer submits an inquiry on `/inquiry`:

![Inquiry Submitted Success](/Users/harshbagadai/.gemini/antigravity-ide/brain/18ea5140-a09d-4c2e-b1ba-d3ee22dc3f57/inquiry_submitted_1782718358739.png)

#### B. Admin Inquiries Ledger Pane
Here is the admin dashboard inquiries ledger showing the new request from Steve Rogers:

![Admin Inquiries Ledger](/Users/harshbagadai/.gemini/antigravity-ide/brain/18ea5140-a09d-4c2e-b1ba-d3ee22dc3f57/admin_inquiries_ledger_1782718430850.png)

Here is the subagent validation session recording showing the inquiries flow:
![Inquiries E2E Session](/Users/harshbagadai/.gemini/antigravity-ide/brain/18ea5140-a09d-4c2e-b1ba-d3ee22dc3f57/inquiries_e2e_flow_1782718239442.webp)

---

## 🚀 How to Run Locally

### 1. Prerequisites
- **Node.js**: (v18+)
- **MongoDB**: Make sure your local MongoDB server is active.

### 2. Startup Commands
From the workspace root directory (`/Users/harshbagadai/Website`):

1. **Seed default data & Admin user**:
   ```bash
   npm run seed
   ```
   *Creates admin account credentials: username **admin** and password **admin123**.*

2. **Launch development servers**:
   ```bash
   npm run dev
   ```
   *Launches both backend (port 5001) and frontend (port 5173) concurrently.*

3. **Inquiries Test script**:
   ```bash
   node backend/scripts/test-inquiries.js
   ```
