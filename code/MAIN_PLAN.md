# 📋 MASTER IMPLEMENTATION PLAN (MAIN PLAN)
## Rental Management Platform — Problem Statement 2

> **Repository**: [https://github.com/agamchhallani/Rental-](https://github.com/agamchhallani/Rental-)  
> **Status**: Complete Unified 6-Phase Architecture with MongoDB Atlas, Razorpay UPI Sandbox, and Google Gemini AI.

---

## 1. Executive Summary & Problem Scope

The **Rental Management Application** streamlines the entire lifecycle of equipment and asset leasing. It replaces disconnected booking tools, manual contracts, and paper delivery sheets with a **unified single-page ecosystem** catering to two distinct roles:

* **Customer**: Browses fleet, engages with Gemini AI for gear recommendations, validates live calendar availability with buffer hours, signs a digital contract via canvas e-signature, and pays securely via Razorpay UPI.
* **End User / Administrator**: Configures multi-unit pricing tiers, executes one-click pickup dispatch, receives automated pre-return cron alerts, performs physical return condition grading, auto-settles late penalty fees, and exports live operational CSV reports.

---

## 2. Technology Stack Blueprint

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend Architecture** | **Unified Single-Page App (HTML5 + Vanilla CSS + JS)** | Zero page-reloads, instant state transitions across all 6 phases, highly responsive. |
| **Design System** | **21st.dev Luxury Gold & Dark Theme** | Ultra-premium visual aesthetic (`#C6A052` gold tokens, glassmorphism, micro-animations). |
| **E-Signature Engine** | **HTML5 Canvas API** | Smooth touch/mouse signature capture for legally binding digital rental contracts. |
| **Backend Runtime** | **Node.js + Express.js** | High-concurrency RESTful micro-service with background cron scheduler. |
| **Database & ODM** | **MongoDB Atlas (Free M0) + Mongoose** | Flexible document modeling for nested inspection checklists and dynamic pricing tiers. |
| **Payment Gateway** | **Razorpay UPI Sandbox** | Simulated UPI QR, Google Pay, PhonePe, and Card gateway with HMAC-SHA256 verification. |
| **GenAI Engine** | **Google Gemini 1.5 Flash (`@google/generative-ai`)** | Real-time conversational AI Concierge with full live inventory context injection. |
| **Hosting & CI/CD** | **Render.com + GitHub Repository** | Free 24/7 cloud hosting with automated continuous deployment on push. |

---

## 3. Master Flow & System Architecture

```text
====================================================================================================
                             UNIFIED RENTAL MANAGEMENT PIPELINE
====================================================================================================

  [CUSTOMER JOURNEY]                                           [ADMIN / OPERATIONS]
          │                                                              │
  1. Browse Fleet OR Chat with Gemini AI                         1. Configure Multi-Unit Pricing
     (Hourly, Daily, Weekly, Monthly)                               (Hr/Day/Wk/Mo, Stock, Buffer)
          │                                                              │
  2. Select Rental Dates & Buffer Check                          2. Monitor Fleet Availability
     (Automated 4-Hour Turnaround Validation)                       (Live calendar conflict check)
          │                                                              │
  3. Dynamic Quotation Breakdown                                 3. Review Quotation Rules
     (Duration discount: 10%, 18%, 25%)                             (Apply seasonal / VIP rules)
          │                                                              │
  4. Digital Contract with E-Signature                           4. View Contract Signatures
     (Live HTML5 Canvas Touch Pad)                                  (Stored with timestamp)
          │                                                              │
  5. Flexible Invoicing & Razorpay UPI                           5. Verify Payment Escrow
     (Option A: 100% Upfront | Option B: Deposit)                   (Crypto HMAC-SHA256 Signature)
          │                                                              │
  6. Atomic Stock Reservation (`CONFIRMED`)                      6. Phase 4: 1-Click Pickup Handover
          │                                                         (Status transitions to PICKED_UP)
          │                                                              │
  7. Automated Pre-Return Notifications                          7. Staff Bay Preparation Notice
     (Cron alerts customer N-days before return)                    (Cron alerts staff to prep return)
          │                                                              │
  8. Return Gear at Scheduled Time                               8. Phase 5: Return Inspection
                                                                    (Grade: Pristine/Wear/Damaged)
                                                                         │
                                                                 9. Auto Late Fee & Settlement
                                                                    (Net refund from deposit escrow)
                                                                         │
                                                                 10. Phase 6: KPI Ledger & CSV
                                                                    (Downloadable RFC-4180 CSV export)
====================================================================================================
```

---

## 4. Phase-by-Phase Technical Specifications

### Phase 1: Product Fleet & Multi-Unit Pricing Engine
* **Multi-Unit Pricing Matrix**: Every item supports configurable rates for **Hourly, Daily, Weekly, and Monthly** intervals.
* **Turnaround Maintenance Buffer**: Enforces an automated **4-hour buffer window** between consecutive rentals to allow for maintenance, cleaning, and preparation.
* **Tiered Duration Discount Simulator**:
  * 1–2 Days: Standard base rate (0% discount).
  * 3–6 Days: **10% Tiered Discount**.
  * 7–13 Days: **18% Weekly Saver Discount**.
  * 14+ Days: **25% Extended Lease Discount**.

---

### Phase 2: Live Inventory Catalog & AI Rental Concierge
* **Availability Engine**: Real-time conflict validation against active bookings and buffer margins.
* **Conversational AI Assistant (Google Gemini 1.5 Flash)**:
  * Natural language requirement parsing (*"I need camera gear for a weekend shoot under ₹10,000"*).
  * System-prompt context injection containing current stock count, rate cards, and policy guidelines.
  * Instant auto-fill links driving the user directly into the booking flow.

---

### Phase 3: Quotation, Digital Contract & Flexible Invoicing
* **Instant Quotation Breakdown**: Visual itemization of base rental fee, duration discount deductions, mandatory security deposit, and net total.
* **Digital Rental Contract with Canvas E-Signature**:
  * Live HTML5 canvas capturing mouse and touch strokes.
  * Encodes legal agreement terms with timestamps and converts signatures to Base64 data URLs.
* **Flexible Invoicing Options**:
  * **Option A (Full 100% Upfront)**: Pays full rental fee + security deposit at booking.
  * **Option B (Partial Deposit Escrow)**: Pays security deposit now; locks reservation; rental fee charged at pickup.
* **Razorpay UPI Gateway**:
  * Generates server-side `order_id` in paise.
  * Opens native modal with simulated UPI IDs (`success@razorpay`).
  * Cryptographic validation using `crypto.createHmac('sha256')`.

---

### Phase 4: Delivery Management & Automated Pre-Return Notifications
* **Pickup Dispatch Handover**:
  * Admin verifies customer identity and generates a secure digital Handover Pass.
  * 1-Click status transition: `CONFIRMED` ➔ `PICKED_UP`.
  * Atomic stock reduction marking items in active circulation.
* **Automated Cron Notification Runner**:
  * Scheduled task running every hour (or manually simulated via `/api/cron/check-notifications`).
  * Scans active orders expiring within $N$ days (customizable lead time, default 2 days).
  * Dispatches dual alerts:
    1. **Customer Alert**: Return reminder with return location and checklist instructions.
    2. **Staff Alert**: Inventory preparation and receiving bay reservation notice.

---

### Phase 5: Returns Handling, Inspections & Deposit Settlement
* **Physical Condition Grading Matrix**:
  * **Pristine Condition**: Zero damage deduction (100% deposit refunded).
  * **Minor Wear / Dirty**: Automated cleaning fee deduction (e.g., ₹500).
  * **Damaged / Missing Parts**: Damage assessment penalty deducted from deposit escrow.
* **Automated Overdue Penalty Calculator**:
  * Calculates overdue hours/days beyond scheduled return time.
  * Formula: Late Fee = Overdue Days × (15% × Daily Rate).
* **Settlement & Restocking**:
  * Net Escrow Refund = Security Deposit - (Late Fees + Damage Deductions).
  * Order status transitions to `RETURNED`.
  * Rented unit count immediately restocked to active catalog.

---

### Phase 6: Reporting, Master Ledger & Analytics
* **Real-Time Operational KPIs**:
  * Active Fleet Utilization Rate (%).
  * Gross Rental Revenue (₹).
  * Active Escrow Deposits Held (₹).
  * On-Time Return Percentage (%).
* **Master Order Ledger**:
  * Filterable and searchable table with status pills (`CONFIRMED`, `PICKED_UP`, `RETURNED`).
  * View printable digital invoices in a modal window.
* **Data Export**: One-click download of all transaction history in RFC-4180 compliant CSV format (`/api/admin/reports/export-csv`).

---

## 5. Complete Database Schemas (MongoDB / Mongoose)

```javascript
// 1. PRODUCT SCHEMA
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  imageUrl: String,
  stockCount: { type: Number, required: true },
  availableUnits: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
  dailyRate: { type: Number, required: true },
  weeklyRate: { type: Number, required: true },
  monthlyRate: { type: Number, required: true },
  securityDeposit: { type: Number, default: 0 },
  maintenanceBufferHours: { type: Number, default: 4 },
  lateFeeFormula: { type: String, default: "15% of daily rate per day" }
}, { timestamps: true });

// 2. ORDER & LIFECYCLE SCHEMA
const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: String,
  durationDays: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  quotation: {
    baseRate: Number,
    discountAmount: Number,
    securityDeposit: Number,
    totalGross: Number
  },
  payment: {
    option: { type: String, enum: ['OPTION_A', 'OPTION_B'], required: true },
    amountPaid: Number,
    balanceDue: Number,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'REFUNDED'], default: 'PAID' }
  },
  contract: {
    signatureDataUrl: String,
    signedAt: { type: Date, default: Date.now }
  },
  lifecycle: {
    status: { 
      type: String, 
      enum: ['CONFIRMED', 'PICKED_UP', 'RETURNED'], 
      default: 'CONFIRMED' 
    },
    pickedUpAt: Date,
    returnedAt: Date,
    preReturnAlertSent: { type: Boolean, default: false }
  },
  inspection: {
    conditionGrade: String,
    cleaningFee: { type: Number, default: 0 },
    damageFee: { type: Number, default: 0 },
    latePenalty: { type: Number, default: 0 },
    netEscrowRefund: { type: Number, default: 0 }
  }
}, { timestamps: true });
```

---

## 6. Complete API Route Matrix

| Endpoint | Method | Purpose | Problem Statement Mapping |
| :--- | :---: | :--- | :--- |
| `/api/products` | `GET` | Fetches all rentable gear with multi-unit rates and stock. | Requirement 1 |
| `/api/products/check-availability` | `POST` | Validates date ranges and 4-hour maintenance buffers. | Requirement 1 & 2 |
| `/api/quotations/create` | `POST` | Computes dynamic quote with duration discounts. | Requirement 2 & 5 |
| `/api/payments/create-order` | `POST` | Generates Razorpay UPI order in paise. | Requirement 3 & 4 |
| `/api/payments/verify` | `POST` | Verifies cryptographic signature & locks reservation. | Requirement 3 & 4 |
| `/api/orders/:id/pickup-handover`| `POST` | 1-Click pickup dispatch: `CONFIRMED` ➔ `PICKED_UP`. | Requirement 3 |
| `/api/cron/check-notifications` | `GET` | Automated cron checking orders $N$ days before return. | Requirement 3 |
| `/api/orders/:id/return-inspection`| `POST` | Condition inspection, penalty auto-calc & stock restore. | Requirement 3, 4, 6 |
| `/api/ai/chat` | `POST` | Google Gemini 1.5 Flash conversational assistant. | GenAI Enhancement |
| `/api/admin/reports/export-csv` | `GET` | Streams RFC-4180 compliant CSV ledger export. | Requirement 7 |

---

## 7. Environment Setup (`.env`)

```env
# Application Port
PORT=3000

# MongoDB Atlas URI (Free M0 Tier)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/rental_platform?retryWrites=true&w=majority

# Razorpay UPI Sandbox
RAZORPAY_KEY_ID=rzp_test_YourKeyIdHere
RAZORPAY_KEY_SECRET=YourKeySecretHere

# Google Gemini API
GEMINI_API_KEY=AIzaSyYourGeminiApiKeyHere

# System Rule Settings
NOTIFICATION_LEAD_TIME_DAYS=2
MAINTENANCE_BUFFER_HOURS=4
```

---

## 8. Verification & Evaluator Testing Checklist

- [x] **Catalog & Multi-Unit Pricing**: View items, change duration slider from 1 to 14 days, observe 10%, 18%, and 25% discount recalculations.
- [x] **AI Concierge**: Type *"I need camping gear under ₹5000"* and verify Gemini recommends the Luxury Canvas Yurt with pricing details.
- [x] **Digital Contract**: Draw signature on canvas pad, submit checkout, verify order appears in Phase 4 Dispatch.
- [x] **Pickup Handover**: Click *"Execute Handover"* in Phase 4, confirm status changes to `PICKED_UP`.
- [x] **Automated Notifications**: Trigger Pre-Return Cron simulator, observe scheduled alerts dispatched for upcoming returns.
- [x] **Return & Inspection**: Select order in Phase 5, choose condition grade (Minor Wear), observe net refund auto-calculated, confirm stock is restocked.
- [x] **Master Ledger & CSV**: Verify Phase 6 table reflects updated statuses and click *"Download CSV Report"* to inspect data file.
