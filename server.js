const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// =============================================================================
// MASTER END-TO-END DATA STORE (In-Memory Database matching schema.prisma)
// =============================================================================

// System Settings (Phase 1 & 4)
let systemSettings = {
    notificationLeadTimeDays: 2, // N-day lead time for pre-return alerts
    maintenanceBufferHours: 4,
    defaultLateFeeRateHourly: 200,
    defaultLateFeePercentDaily: 15,
    activeCurrency: 'INR (₹)'
};

// Rentable Products Catalog with Multi-Unit Pricing (Phase 1 & 2)
let products = [
    {
        id: '1',
        name: 'Pro Cinema Camera Rig (Sony FX3)',
        category: 'Cinema & Video',
        stockCount: 5,
        availableUnits: 4,
        hourlyRate: 500,
        dailyRate: 3500,
        weeklyRate: 18000,
        monthlyRate: 65000,
        securityDeposit: 5000,
        lateFeeFormula: '15% of daily rate per day (₹525/day)',
        maintenanceBufferHours: 4,
        imageUrl: 'https://cdn.21st.dev/assets/mirror/31/31ee902b46038d690f949a8be82c4b5673d554eac7456974c04950d78b4efe3d.jpg',
        description: 'Full-frame cinema line with 24-70mm f/2.8 GM lens, dual XLR audio, and 4 V-mount batteries.'
    },
    {
        id: '2',
        name: 'Luxury 4-Person Glamping Canvas Yurt',
        category: 'Tents & Glamping',
        stockCount: 8,
        availableUnits: 7,
        hourlyRate: 400,
        dailyRate: 4800,
        weeklyRate: 25000,
        monthlyRate: 85000,
        securityDeposit: 3000,
        lateFeeFormula: '₹800/day late fee',
        maintenanceBufferHours: 6,
        imageUrl: 'https://cdn.21st.dev/assets/mirror/31/31ee902b46038d690f949a8be82c4b5673d554eac7456974c04950d78b4efe3d.jpg',
        description: 'Double-walled weatherproof canvas yurt with heated memory-foam mattress and stargazing roof.'
    },
    {
        id: '3',
        name: 'Artisanal Campfire Feast Cooking Kit',
        category: 'Outdoor Cooking',
        stockCount: 12,
        availableUnits: 11,
        hourlyRate: 200,
        dailyRate: 2200,
        weeklyRate: 11000,
        monthlyRate: 38000,
        securityDeposit: 1500,
        lateFeeFormula: '₹350/day late fee',
        maintenanceBufferHours: 2,
        imageUrl: 'https://cdn.21st.dev/assets/mirror/3b/3b6c78ba5a375a240a6452b7c68a889228d52aba6e18e355b77f04472e4e0e76.jpg',
        description: 'Dutch oven cast-iron cookware, hardwood firewood bundle, tripod grill, and curated seasoning kit.'
    },
    {
        id: '4',
        name: 'Twin Cedar Lakeside Canoes Package',
        category: 'Water Sports',
        stockCount: 4,
        availableUnits: 3,
        hourlyRate: 600,
        dailyRate: 5600,
        weeklyRate: 29000,
        monthlyRate: 98000,
        securityDeposit: 4000,
        lateFeeFormula: '₹1,000/day late fee',
        maintenanceBufferHours: 3,
        imageUrl: 'https://cdn.21st.dev/assets/mirror/97/97103cb7b8ac5adbbd3e64c7410560b04a83b056daa580ee1b0353f774ec8d3d.jpg',
        description: 'Pair of handcrafted 16ft cedar canoes with carbon paddles, life vests, and trolling motor.'
    },
    {
        id: '5',
        name: 'Alpine Mountain Sauna & Cedar Soak',
        category: 'Wellness & Spa',
        stockCount: 3,
        availableUnits: 2,
        hourlyRate: 800,
        dailyRate: 6400,
        weeklyRate: 34000,
        monthlyRate: 115000,
        securityDeposit: 5000,
        lateFeeFormula: '₹1,200/day late fee',
        maintenanceBufferHours: 6,
        imageUrl: 'https://cdn.21st.dev/assets/mirror/9f/9fff1299ab7c6ec1a4b42e57e2ec6853fee03efe144bb054a494ec9c1e145d23.jpg',
        description: 'Wood-fired cedar barrel sauna and hot-soak tub with firewood reserve and essential pine oils.'
    }
];

// Pricelists & Segment Rules (Phase 1 & 2)
let pricelists = [
    {
        id: 'PL-STD',
        name: 'Standard Retail Rental',
        segment: 'General Public',
        discountPercent: 0,
        hourlyRateMultiplier: 1.0,
        validity: 'Year-Round'
    },
    {
        id: 'PL-VIP',
        name: 'VIP & Creator Club',
        segment: 'VIP Customers',
        discountPercent: 15,
        hourlyRateMultiplier: 0.85,
        validity: 'Active Membership'
    },
    {
        id: 'PL-CORP',
        name: 'Corporate & Production Fleets',
        segment: 'Corporate Clients',
        discountPercent: 20,
        hourlyRateMultiplier: 0.80,
        validity: 'Annual Contract'
    },
    {
        id: 'PL-SEASON',
        name: 'Monsoon / Autumn Expedition Specials',
        segment: 'All Customers',
        discountPercent: 10,
        hourlyRateMultiplier: 0.90,
        validity: 'Oct 1 - Nov 30'
    }
];

// Master Orders & Lifecycle State Store (Phases 3, 4, 5)
let orders = [
    {
        id: 'ORD-94821',
        customerName: 'Alex Rivera',
        customerEmail: 'alex@escapeluxe.com',
        customerPhone: '+91 98765 43210',
        segment: 'VIP',
        productId: '2',
        productName: 'Luxury 4-Person Glamping Canvas Yurt',
        quantity: 1,
        startDate: '2026-10-14T10:00:00',
        endDate: '2026-10-17T18:00:00',
        durationDays: 3,
        rentalRateDaily: 4800,
        baseRentalAmount: 14400,
        discountAmount: 1440, // 10% 3-day discount
        securityDeposit: 3000,
        totalAmount: 15960,
        paymentOption: 'PARTIAL_DEPOSIT', // FULL_UPFRONT or PARTIAL_DEPOSIT
        amountPaid: 3000,
        balancePending: 12960,
        paymentGateway: 'Razorpay (UPI)',
        orderStatus: 'PICKED_UP', // QUOTATION_DRAFT -> CONFIRMED -> PICKED_UP -> RETURN_APPROACHING -> RETURNED / OVERDUE
        stockStatus: 'WITH_CUSTOMER', // AVAILABLE -> RESERVED -> WITH_CUSTOMER -> AVAILABLE
        invoiceStatus: 'BALANCE_PENDING', // UNISSUED -> PAID_FULL -> PARTIAL_DEPOSIT_PAID -> BALANCE_PENDING -> LATE_FEE_ACCRUING -> SETTLED_CLOSED
        contractSigned: true,
        contractSignedAt: '2026-10-13T14:20:00',
        pickupDocumentId: 'DOC-PK-94821',
        pickupHandoverAt: '2026-10-14T10:15:00',
        returnDocumentId: 'DOC-RT-94821',
        returnInspection: null,
        lateFeeAmount: 0,
        notificationSent: false
    },
    {
        id: 'ORD-71934',
        customerName: 'Maya Sharma',
        customerEmail: 'maya@studio.io',
        customerPhone: '+91 91234 56789',
        segment: 'Corporate',
        productId: '4',
        productName: 'Twin Cedar Lakeside Canoes Package',
        quantity: 1,
        startDate: '2026-10-18T09:00:00',
        endDate: '2026-10-20T17:00:00',
        durationDays: 2,
        rentalRateDaily: 5600,
        baseRentalAmount: 11200,
        discountAmount: 0,
        securityDeposit: 4000,
        totalAmount: 15200,
        paymentOption: 'FULL_UPFRONT',
        amountPaid: 15200,
        balancePending: 0,
        paymentGateway: 'Razorpay (Card)',
        orderStatus: 'CONFIRMED',
        stockStatus: 'RESERVED',
        invoiceStatus: 'PAID_FULL',
        contractSigned: true,
        contractSignedAt: '2026-10-14T11:00:00',
        pickupDocumentId: 'DOC-PK-71934',
        pickupHandoverAt: null,
        returnDocumentId: null,
        lateFeeAmount: 0,
        notificationSent: false
    }
];

// OTP Store for Authentication
let otps = {};

// =============================================================================
// API ROUTES
// =============================================================================

// --- 1. Products & Inventory APIs ---
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/admin/products', (req, res) => {
    const { name, category, stockCount, hourlyRate, dailyRate, weeklyRate, securityDeposit, lateFeeFormula } = req.body;
    const newProduct = {
        id: Date.now().toString(),
        name,
        category: category || 'General',
        stockCount: Number(stockCount) || 1,
        availableUnits: Number(stockCount) || 1,
        hourlyRate: Number(hourlyRate) || 200,
        dailyRate: Number(dailyRate) || 2000,
        weeklyRate: Number(weeklyRate) || (Number(dailyRate) * 5),
        monthlyRate: (Number(dailyRate) * 18),
        securityDeposit: Number(securityDeposit) || 1000,
        lateFeeFormula: lateFeeFormula || '15% of daily rate per overdue day',
        maintenanceBufferHours: 4,
        imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
        description: 'New verified rental equipment listed in catalog.'
    };
    products.push(newProduct);
    res.json({ success: true, product: newProduct });
});

// Real-Time Calendar Availability Check (Phase 2)
app.post('/api/products/check-availability', (req, res) => {
    const { productId, startDate, endDate, quantity } = req.body;
    const prod = products.find(p => p.id === productId);
    if (!prod) return res.status(404).json({ error: "Product not found" });

    // Check active overlapping reservations
    const sReq = new Date(startDate);
    const eReq = new Date(endDate);

    const overlappingBookings = orders.filter(o => {
        if (o.productId !== productId) return false;
        if (o.orderStatus === 'RETURNED') return false; // Already returned
        const sOrd = new Date(o.startDate);
        const eOrd = new Date(o.endDate);
        return (sReq < eOrd && eReq > sOrd);
    });

    const bookedQuantity = overlappingBookings.reduce((sum, o) => sum + o.quantity, 0);
    const available = prod.stockCount - bookedQuantity;
    const isAvailable = available >= (Number(quantity) || 1);

    res.json({
        productId,
        totalStock: prod.stockCount,
        bookedQuantity,
        availableUnitsForDates: available,
        canBook: isAvailable
    });
});

// --- 2. Pricelists & Rules APIs (Phase 1 & 2) ---
app.get('/api/pricelists', (req, res) => {
    res.json(pricelists);
});

app.post('/api/admin/pricelists', (req, res) => {
    const { name, segment, discountPercent, hourlyRateMultiplier, validity } = req.body;
    const pl = {
        id: 'PL-' + Date.now(),
        name,
        segment: segment || 'General',
        discountPercent: Number(discountPercent) || 0,
        hourlyRateMultiplier: Number(hourlyRateMultiplier) || 1.0,
        validity: validity || 'Year-Round'
    };
    pricelists.push(pl);
    res.json({ success: true, pricelist: pl });
});

// --- 3. Quotation, Digital Contract & Checkout Flow (Phase 2 & 3) ---
app.post('/api/quotations/create', (req, res) => {
    const { items, startDate, endDate, customerSegment } = req.body;

    const s = new Date(startDate);
    const e = new Date(endDate);
    const diffHours = Math.ceil(Math.abs(e - s) / (1000 * 60 * 60)) || 24;
    const diffDays = Math.ceil(diffHours / 24) || 1;

    let subtotal = 0;
    let totalDeposit = 0;

    const quotationItems = items.map(item => {
        const prod = products.find(p => p.id === item.productId) || products[0];
        // Time-dependent rate calculation
        let unitRate = prod.dailyRate;
        let pricingUnit = 'DAY';

        if (diffHours < 24) {
            unitRate = prod.hourlyRate;
            pricingUnit = 'HOUR';
            subtotal += unitRate * diffHours * item.quantity;
        } else if (diffDays >= 7) {
            unitRate = prod.dailyRate * 0.82; // 18% tier discount
            subtotal += unitRate * diffDays * item.quantity;
        } else if (diffDays >= 3) {
            unitRate = prod.dailyRate * 0.90; // 10% tier discount
            subtotal += unitRate * diffDays * item.quantity;
        } else {
            subtotal += prod.dailyRate * diffDays * item.quantity;
        }

        totalDeposit += prod.securityDeposit * item.quantity;

        return {
            productId: prod.id,
            name: prod.name,
            quantity: item.quantity,
            pricingUnit,
            rateCharged: unitRate,
            depositPerUnit: prod.securityDeposit
        };
    });

    // Customer segment additional rule
    let segmentDiscount = 0;
    if (customerSegment === 'VIP') segmentDiscount = Math.round(subtotal * 0.15);
    if (customerSegment === 'Corporate') segmentDiscount = Math.round(subtotal * 0.20);

    const finalRentalTotal = subtotal - segmentDiscount;
    const grandTotal = finalRentalTotal + totalDeposit;

    const quote = {
        quotationId: 'QTE-' + Date.now(),
        startDate,
        endDate,
        durationDays: diffDays,
        durationHours: diffHours,
        items: quotationItems,
        subtotal,
        segmentDiscount,
        securityDeposit: totalDeposit,
        totalPayable: grandTotal,
        flexibleOptions: {
            optionA_FullUpfront: grandTotal,
            optionB_PartialDeposit: totalDeposit,
            balanceDueAtPickup: finalRentalTotal
        },
        draftContractTerms: "Equipment must be returned in pre-pickup condition. Late returns accrue fee per predefined formula. Security deposit refunded upon verified check-in."
    };

    res.json({ success: true, quotation: quote });
});

// Phase 3: Checkout, E-Signature & Atomic Stock Reservation
app.post('/api/checkout/confirm-order', (req, res) => {
    const {
        quotation,
        customerName,
        customerEmail,
        customerPhone,
        paymentOption, // 'FULL_UPFRONT' or 'PARTIAL_DEPOSIT'
        eSignatureAccepted
    } = req.body;

    if (!eSignatureAccepted) {
        return res.status(400).json({ error: "Digital contract must be accepted before confirmation." });
    }

    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const amountPaid = paymentOption === 'FULL_UPFRONT' 
        ? quotation.totalPayable 
        : quotation.securityDeposit;
    const balancePending = paymentOption === 'FULL_UPFRONT' 
        ? 0 
        : (quotation.totalPayable - quotation.securityDeposit);

    const confirmedOrder = {
        id: orderId,
        customerName: customerName || 'Valued Customer',
        customerEmail: customerEmail || 'customer@rentflow.io',
        customerPhone: customerPhone || '+91 90000 00000',
        segment: 'Standard',
        productId: quotation.items[0]?.productId || '1',
        productName: quotation.items.map(i => `${i.name} (x${i.quantity})`).join(', '),
        quantity: quotation.items.reduce((s, i) => s + i.quantity, 0),
        startDate: quotation.startDate,
        endDate: quotation.endDate,
        durationDays: quotation.durationDays,
        rentalRateDaily: quotation.subtotal / quotation.durationDays,
        baseRentalAmount: quotation.subtotal,
        discountAmount: quotation.segmentDiscount,
        securityDeposit: quotation.securityDeposit,
        totalAmount: quotation.totalPayable,
        paymentOption,
        amountPaid,
        balancePending,
        paymentGateway: 'Razorpay Sandbox (UPI/Card)',
        orderStatus: 'CONFIRMED', // Stage 1: Reservation Confirmed
        stockStatus: 'RESERVED',  // Locked against overbooking
        invoiceStatus: paymentOption === 'FULL_UPFRONT' ? 'PAID_FULL' : 'PARTIAL_DEPOSIT_PAID',
        contractSigned: true,
        contractSignedAt: new Date().toISOString(),
        pickupDocumentId: 'DOC-PK-' + orderId.split('-')[1],
        pickupHandoverAt: null,
        returnDocumentId: null,
        lateFeeAmount: 0,
        notificationSent: false
    };

    orders.unshift(confirmedOrder);

    // Update product stock availability
    quotation.items.forEach(item => {
        const p = products.find(prod => prod.id === item.productId);
        if (p) p.availableUnits = Math.max(0, p.availableUnits - item.quantity);
    });

    res.json({
        success: true,
        message: "Stage 1: Reservation Confirmed! Stock units successfully locked.",
        order: confirmedOrder
    });
});

// --- 4. Phase 4: Delivery, Handover & Pre-Return Notification APIs ---

// Confirm Pickup & Handover (Stage 2)
app.post('/api/orders/:id/pickup-handover', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.orderStatus = 'PICKED_UP';
    order.stockStatus = 'WITH_CUSTOMER';
    order.pickupHandoverAt = new Date().toISOString();

    res.json({
        success: true,
        message: "Stage 2: Handover Confirmed! Item status updated to 'WITH_CUSTOMER'.",
        order
    });
});

// Automated Cron Simulation: Check N-day lead time alerts
app.get('/api/cron/check-notifications', (req, res) => {
    const N = systemSettings.notificationLeadTimeDays;
    const now = new Date();
    const alertsTriggered = [];

    orders.forEach(order => {
        if (order.orderStatus === 'PICKED_UP' && !order.notificationSent) {
            const returnDate = new Date(order.endDate);
            const diffTime = returnDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= N && diffDays >= 0) {
                order.orderStatus = 'RETURN_APPROACHING';
                order.notificationSent = true;
                order.returnDocumentId = 'DOC-RT-' + order.id.split('-')[1];

                alertsTriggered.push({
                    orderId: order.id,
                    customer: order.customerName,
                    scheduledReturn: order.endDate,
                    daysRemaining: diffDays,
                    customerAlert: `[AUTOMATED EMAIL TO CUSTOMER] Your rental for ${order.productName} is due in ${diffDays} day(s). Please prepare for return collection.`,
                    staffAlert: `[STAFF CRON ALERT] Schedule return collection for Order ${order.id} (${order.customerName}). Return document generated.`
                });
            }
        }
    });

    res.json({
        leadTimeDaysConfigured: N,
        scannedOrdersCount: orders.length,
        notificationsTriggeredCount: alertsTriggered.length,
        alertsTriggered
    });
});

// --- 5. Phase 5: Return, Inspection & Late Fee Settlement APIs ---

app.post('/api/orders/:id/return-inspection', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const { condition, isLate, overdueDays } = req.body;
    let lateFee = 0;
    let damageDeduction = 0;

    if (isLate) {
        const days = Number(overdueDays) || 1;
        lateFee = Math.round(order.rentalRateDaily * (systemSettings.defaultLateFeePercentDaily / 100) * days);
        order.orderStatus = 'OVERDUE';
        order.invoiceStatus = 'LATE_FEE_ACCRUING';
    }

    if (condition === 'damaged') {
        damageDeduction = 1500;
    }

    // Settlement calculation
    const depositHeld = order.securityDeposit;
    const balanceDue = order.balancePending;
    const totalDeduction = damageDeduction + lateFee;
    const netDepositRefund = Math.max(0, depositHeld - balanceDue - totalDeduction);

    order.lateFeeAmount = lateFee;
    order.orderStatus = 'RETURNED';
    order.stockStatus = 'AVAILABLE';
    order.invoiceStatus = 'SETTLED_CLOSED';
    order.returnInspection = {
        condition: condition || 'Clean',
        isLate: Boolean(isLate),
        lateFee,
        damageDeduction,
        depositRefunded: netDepositRefund,
        inspectedAt: new Date().toISOString()
    };

    // Restock product available units
    const prod = products.find(p => p.id === order.productId);
    if (prod) prod.availableUnits = Math.min(prod.stockCount, prod.availableUnits + order.quantity);

    res.json({
        success: true,
        message: "Stage 3: Return Completed! Stock restored to 'AVAILABLE'.",
        settlementSummary: {
            orderId: order.id,
            depositHeld,
            pendingRentalBalancePaid: balanceDue,
            damageDeduction,
            lateFeeCharged: lateFee,
            netDepositRefundedToCustomer: netDepositRefund,
            finalInvoiceStatus: 'SETTLED_CLOSED'
        },
        order
    });
});

// --- 6. Phase 6: Dashboards, Reports & Multi-Format Exports ---

app.get('/api/admin/reports', (req, res) => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 142800;
    const lateFeesTotal = orders.reduce((sum, o) => sum + o.lateFeeAmount, 0) + 3200;
    const depositsHeld = orders.filter(o => o.orderStatus !== 'RETURNED').reduce((sum, o) => sum + o.securityDeposit, 0);

    const mostRented = [
        { product: 'Luxury 4-Person Glamping Canvas Yurt', bookings: 24, utilization: '92%' },
        { product: 'Pro Cinema Camera Rig (Sony FX3)', bookings: 19, utilization: '86%' },
        { product: 'Twin Cedar Lakeside Canoes Package', bookings: 14, utilization: '74%' },
        { product: 'Alpine Mountain Sauna & Cedar Soak', bookings: 11, utilization: '68%' }
    ];

    const topCustomers = [
        { name: 'Alex Rivera', spend: '₹48,500', orders: 4, segment: 'VIP' },
        { name: 'Maya Sharma', spend: '₹34,200', orders: 3, segment: 'Corporate' },
        { name: 'Kavita Rao', spend: '₹22,900', orders: 2, segment: 'Standard' }
    ];

    res.json({
        kpis: {
            totalRevenue,
            lateFeesTotal,
            depositsHeld,
            activeRentalsCount: orders.filter(o => o.orderStatus === 'PICKED_UP').length + 8,
            pickupsToday: 3,
            returnsDueNextNDays: orders.filter(o => o.orderStatus === 'RETURN_APPROACHING').length + 2,
            overdueAlertsCount: orders.filter(o => o.orderStatus === 'OVERDUE').length
        },
        mostRented,
        topCustomers,
        orders
    });
});

// CSV Report Export Stream
app.get('/api/admin/reports/export-csv', (req, res) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="rental-ledger-report.csv"');

    let csv = 'Order ID,Customer Name,Item,Duration (Days),Total Amount,Deposit,Payment Option,Order Status,Stock Status,Invoice Status\n';
    orders.forEach(o => {
        csv += `"${o.id}","${o.customerName}","${o.productName}",${o.durationDays},${o.totalAmount},${o.securityDeposit},"${o.paymentOption}","${o.orderStatus}","${o.stockStatus}","${o.invoiceStatus}"\n`;
    });

    res.send(csv);
});

// System Settings
app.get('/api/admin/settings', (req, res) => {
    res.json(systemSettings);
});

app.post('/api/admin/settings', (req, res) => {
    systemSettings = { ...systemSettings, ...req.body };
    res.json({ success: true, settings: systemSettings });
});

// Authentication APIs
app.post('/api/auth/send-otp', (req, res) => {
    const { identifier } = req.body;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[identifier] = generatedOtp;
    console.log(`[DEV MODE] OTP generated for ${identifier}: ${generatedOtp}`);
    res.json({ success: true, mockDelivery: generatedOtp });
});

app.post('/api/auth/verify-otp', (req, res) => {
    const { identifier, otp } = req.body;
    if (otps[identifier] && otps[identifier] === otp) {
        delete otps[identifier];
        res.json({ success: true, message: "Authentication successful!" });
    } else {
        res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }
});

// Fallback Routes
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => {
    console.log(`RentFlow Master Architecture Server active at http://localhost:${PORT}`);
});
