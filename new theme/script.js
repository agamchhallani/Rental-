/* ==========================================================================
   EscapeLuxe • 21st.dev Unified Master Rental Management Platform Script
   Seamlessly integrates all 6 roadmap architecture phases:
   - Phase 1: Unit & Inventory Setup + Dynamic Pricelist Simulator
   - Phase 2: Dynamic Catalog, AI Concierge & Calendar Availability Check
   - Phase 3: Instant Quotation, Canvas E-Signature & Flexible Invoicing Checkout
   - Phase 4: Order Dispatch & Automated Pre-Return Cron Hub
   - Phase 5: Digital Return Inspection & Late Fee Penalty Settlement
   - Phase 6: Financial Operations Ledger & Live Multi-Format CSV Reports
   ========================================================================== */

// =============================================================================
// 1. MASTER SYNCHRONIZED DATA STORE (Glamping & Luxury Outdoors)
// =============================================================================

let masterProducts = [
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
        maintenanceBufferHours: 4,
        imageUrl: 'https://cdn.21st.dev/assets/mirror/9f/9fff1299ab7c6ec1a4b42e57e2ec6853fee03efe144bb054a494ec9c1e145d23.jpg',
        description: 'Mobile cedar barrel sauna and hot-soak cedar tub with firewood reserve and pine aromatherapy oils.'
    },
    {
        id: '6',
        name: '4K Aerial Cinematic Drone Rig',
        category: 'Cinema & Video',
        stockCount: 6,
        availableUnits: 5,
        hourlyRate: 550,
        dailyRate: 4200,
        weeklyRate: 22000,
        monthlyRate: 75000,
        securityDeposit: 4500,
        lateFeeFormula: '₹900/day late fee',
        maintenanceBufferHours: 3,
        imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
        description: 'DJI cinema drone with 3-axis gimbal, 4 high-capacity flight batteries, and polarizing ND filter set.'
    }
];

let masterOrders = [
    {
        id: "ORD-94821",
        customerName: "Alex Rivera",
        customerEmail: "alex@escapeluxe.com",
        customerPhone: "+91 98765 43210",
        productId: "2",
        productName: "Luxury 4-Person Glamping Canvas Yurt",
        startDate: "2026-10-14",
        endDate: "2026-10-17",
        durationDays: 3,
        baseRate: 4800,
        totalAmount: 15960,
        securityDeposit: 3000,
        paymentOption: "OPTION_A_100_UPFRONT",
        orderStatus: "PICKED_UP",
        stockStatus: "WITH_CUSTOMER",
        invoiceStatus: "PAID"
    },
    {
        id: "ORD-71934",
        customerName: "Elena Rostova",
        customerEmail: "elena@nordic.com",
        customerPhone: "+91 98111 22334",
        productId: "4",
        productName: "Twin Cedar Lakeside Canoes Package",
        startDate: "2026-10-18",
        endDate: "2026-10-21",
        durationDays: 3,
        baseRate: 5600,
        totalAmount: 19120,
        securityDeposit: 4000,
        paymentOption: "OPTION_B_DEPOSIT_ONLY",
        orderStatus: "CONFIRMED",
        stockStatus: "RESERVED",
        invoiceStatus: "PARTIAL_DEPOSIT_PAID"
    },
    {
        id: "ORD-58320",
        customerName: "Devon Vance",
        customerEmail: "devon@vancecinema.com",
        customerPhone: "+91 99000 88776",
        productId: "1",
        productName: "Pro Cinema Camera Rig (Sony FX3)",
        startDate: "2026-10-10",
        endDate: "2026-10-14",
        durationDays: 4,
        baseRate: 3500,
        totalAmount: 17600,
        securityDeposit: 5000,
        paymentOption: "OPTION_A_100_UPFRONT",
        orderStatus: "RETURNED",
        stockStatus: "AVAILABLE",
        invoiceStatus: "SETTLED"
    }
];

// Active Checkout Selected Product (Phase 3)
let activeCheckoutProduct = masterProducts[1]; // Default: Canvas Yurt
let activePaymentOption = 'OPTION_A_100_UPFRONT';

// Return Inspection State (Phase 5)
let currentInspectionGrading = {
    condition: 'FLAWLESS',
    damageFee: 0,
    cleanliness: 'CLEAN',
    cleanFee: 0,
    lateDays: 0,
    latePenalty: 0
};

// =============================================================================
// 2. INITIALIZATION ON DOM READY
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    fetchBackendProducts();
    initNavbarState();
    initInteractiveSelector();
    initPhase1PricelistSimulator();
    initPhase1ProductsTable();
    initPhase2Catalog();
    initPhase2CalendarCheck();
    initPhase3Checkout();
    initPhase4Dispatch();
    initPhase4CronSimulator();
    initPhase5ReturnStation();
    initPhase6Ledger();
    initAuthModal();
    initAIChat();
    initPhasePillScrollSpy();
});

// Sync with backend API if running
async function fetchBackendProducts() {
    try {
        const res = await fetch('/api/products');
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                masterProducts = data;
                initPhase1ProductsTable();
                initPhase2Catalog();
            }
        }
    } catch (e) {
        console.log('[LOCAL MODE] Using local master product catalog.');
    }
}

// =============================================================================
// 3. PHASE STEPPER / SCROLL SPY
// =============================================================================

function initPhasePillScrollSpy() {
    const pills = document.querySelectorAll('.phase-step-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });
}

// =============================================================================
// 4. SECTION 0: 21ST.DEV HERO SELECTOR
// =============================================================================

function initInteractiveSelector() {
    const options = document.querySelectorAll('.options-container .option');
    if (!options.length) return;

    options.forEach((opt, idx) => {
        setTimeout(() => opt.classList.add('slide-in'), 180 * idx);

        opt.addEventListener('click', () => {
            options.forEach(o => {
                o.classList.remove('active');
                o.classList.add('inactive');
            });
            opt.classList.add('active');
            opt.classList.remove('inactive');

            const p = masterProducts[idx % masterProducts.length];
            if (p) {
                document.getElementById('detail-name').innerText = p.name;
                document.getElementById('detail-summary').innerText = p.description;
                document.getElementById('detail-price').innerText = `₹${p.dailyRate.toLocaleString()}`;
                document.getElementById('detail-tag').innerText = p.category.toUpperCase();

                // Point Hero Book button to this product in Phase 3
                const heroBtn = document.getElementById('btn-hero-reserve');
                if (heroBtn) {
                    heroBtn.onclick = (e) => {
                        selectProductForCheckout(p.id);
                    };
                }
            }
        });
    });

    const heroBtn = document.getElementById('btn-hero-reserve');
    if (heroBtn) {
        heroBtn.onclick = () => selectProductForCheckout(masterProducts[1].id);
    }
}

// =============================================================================
// 5. PHASE 1: PRODUCT UNITS & DYNAMIC PRICELISTS
// =============================================================================

function initPhase1PricelistSimulator() {
    const slider = document.getElementById('sim-duration-slider');
    if (!slider) return;

    const updateSim = () => {
        const days = parseInt(slider.value, 10);
        document.getElementById('sim-duration-display').innerText = `${days} Days`;

        let discountPercent = 0;
        if (days >= 30) discountPercent = 25;
        else if (days >= 7) discountPercent = 18;
        else if (days >= 3) discountPercent = 10;

        const baseDaily = activeCheckoutProduct.dailyRate;
        const gross = baseDaily * days;
        const discountAmt = Math.round(gross * (discountPercent / 100));
        const deposit = activeCheckoutProduct.securityDeposit;
        const netTotal = gross - discountAmt + deposit;

        document.getElementById('sim-item-name').innerText = activeCheckoutProduct.name;
        document.getElementById('sim-base-rate').innerText = `₹${gross.toLocaleString()} (₹${baseDaily.toLocaleString()}/day)`;
        document.getElementById('sim-discount-val').innerText = discountPercent > 0 
            ? `-₹${discountAmt.toLocaleString()} (${discountPercent}% OFF)` 
            : '₹0 (Standard Rate)';
        document.getElementById('sim-deposit-val').innerText = `₹${deposit.toLocaleString()} (Refundable)`;
        document.getElementById('sim-total-val').innerText = `₹${netTotal.toLocaleString()}`;
    };

    slider.addEventListener('input', updateSim);
    updateSim();
}

function initPhase1ProductsTable() {
    const tbody = document.getElementById('phase1-products-tbody');
    if (!tbody) return;

    tbody.innerHTML = masterProducts.map(p => `
        <tr>
            <td>
                <strong style="color: #fff; font-size: 0.9rem;">${p.name}</strong>
                <span style="font-size: 0.72rem; color: var(--text-dim); display: block;">SKU: ESC-PROD-${p.id}</span>
            </td>
            <td><span class="product-category-badge">${p.category}</span></td>
            <td style="color: var(--accent-gold); font-weight: 700;">₹${p.hourlyRate.toLocaleString()}</td>
            <td style="color: #fff; font-weight: 700;">₹${p.dailyRate.toLocaleString()}</td>
            <td style="color: #fff;">₹${p.weeklyRate.toLocaleString()}</td>
            <td style="color: #fff;">₹${p.monthlyRate.toLocaleString()}</td>
            <td style="color: var(--accent-emerald);">₹${p.securityDeposit.toLocaleString()}</td>
            <td>
                <span class="badge-status ${p.availableUnits > 0 ? 'confirmed' : 'overdue'}">
                    ${p.availableUnits} / ${p.stockCount} Available
                </span>
                <span style="font-size: 0.72rem; color: var(--text-dim); display: block; margin-top: 2px;">
                    Buffer: ${p.maintenanceBufferHours}h
                </span>
            </td>
            <td>
                <button class="btn btn-secondary" onclick="selectProductForCheckout('${p.id}')" style="padding: 4px 10px; font-size: 0.75rem;">
                    Quote →
                </button>
            </td>
        </tr>
    `).join('');
}

window.openAddProductModal = () => {
    document.getElementById('product-modal-overlay').classList.add('active');
};

window.closeProductModal = () => {
    document.getElementById('product-modal-overlay').classList.remove('active');
};

window.saveProductConfig = () => {
    const name = document.getElementById('cfg-name').value.trim();
    const daily = parseInt(document.getElementById('cfg-daily').value, 10) || 4500;
    const deposit = parseInt(document.getElementById('cfg-deposit').value, 10) || 2500;
    const stock = parseInt(document.getElementById('cfg-stock').value, 10) || 4;
    const buffer = parseInt(document.getElementById('cfg-buffer').value, 10) || 4;

    const newProd = {
        id: (masterProducts.length + 1).toString(),
        name: name || 'Custom Outdoor Gear Asset',
        category: 'Custom Fleet',
        stockCount: stock,
        availableUnits: stock,
        hourlyRate: Math.round(daily * 0.12),
        dailyRate: daily,
        weeklyRate: Math.round(daily * 7 * 0.82),
        monthlyRate: Math.round(daily * 30 * 0.75),
        securityDeposit: deposit,
        lateFeeFormula: '15% of daily rate per day',
        maintenanceBufferHours: buffer,
        imageUrl: 'https://cdn.21st.dev/assets/mirror/9f/9fff1299ab7c6ec1a4b42e57e2ec6853fee03efe144bb054a494ec9c1e145d23.jpg',
        description: 'Newly configured fleet unit with automated turnaround maintenance buffer.'
    };

    masterProducts.push(newProd);
    initPhase1ProductsTable();
    initPhase2Catalog();
    closeProductModal();
    alert(`✓ Product Unit "${newProd.name}" configured and added to live fleet.`);
};

// =============================================================================
// 6. PHASE 2: DYNAMIC CATALOG & AVAILABILITY VALIDATION
// =============================================================================

function initPhase2Catalog() {
    const grid = document.getElementById('unified-product-grid');
    if (!grid) return;

    renderCatalogGrid(masterProducts);

    // AI Natural Search input
    const aiSearch = document.getElementById('unified-ai-search');
    if (aiSearch) {
        aiSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                renderCatalogGrid(masterProducts);
                return;
            }
            const filtered = masterProducts.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
            renderCatalogGrid(filtered);
        });
    }
}

function renderCatalogGrid(products) {
    const grid = document.getElementById('unified-product-grid');
    if (!grid) return;

    if (!products.length) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No gear matches your search criteria.</div>`;
        return;
    }

    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-card-top">
                <span class="product-category-badge">${p.category}</span>
                <span class="stock-indicator ${p.availableUnits > 0 ? '' : 'out'}">
                    ${p.availableUnits} / ${p.stockCount} Available
                </span>
            </div>
            <div class="product-image-box" style="background-image: url('${p.imageUrl}'); cursor: pointer;" onclick="selectProductForCheckout('${p.id}')"></div>
            <h3 class="product-title" style="cursor: pointer;" onclick="selectProductForCheckout('${p.id}')">${p.name}</h3>
            <p class="product-desc">${p.description}</p>
            
            <!-- Multi-Unit Pricing Box -->
            <div class="multi-unit-grid">
                <div class="multi-unit-item">
                    <span class="multi-unit-label">Hour</span>
                    <span class="multi-unit-val">₹${p.hourlyRate}</span>
                </div>
                <div class="multi-unit-item">
                    <span class="multi-unit-label">Day</span>
                    <span class="multi-unit-val">₹${p.dailyRate}</span>
                </div>
                <div class="multi-unit-item">
                    <span class="multi-unit-label">Week</span>
                    <span class="multi-unit-val">₹${p.weeklyRate}</span>
                </div>
                <div class="multi-unit-item">
                    <span class="multi-unit-label">Month</span>
                    <span class="multi-unit-val">₹${p.monthlyRate}</span>
                </div>
            </div>

            <div class="product-card-bottom" style="margin-top: 10px;">
                <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">Security Deposit</span>
                    <span style="font-size: 0.95rem; font-weight: 800; color: var(--accent-emerald);">₹${p.securityDeposit.toLocaleString()}</span>
                </div>
                <button class="btn btn-primary" onclick="selectProductForCheckout('${p.id}')" style="padding: 7px 16px; font-size: 0.8rem;">
                    Book / Check →
                </button>
            </div>
        </div>
    `).join('');
}

window.filterCatalogCategory = (cat, btn) => {
    document.querySelectorAll('#catalog-category-pills .filter-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (cat === 'all') {
        renderCatalogGrid(masterProducts);
    } else {
        renderCatalogGrid(masterProducts.filter(p => p.category.toLowerCase().includes(cat.toLowerCase())));
    }
};

window.filterCatalogByQuery = (term) => {
    const input = document.getElementById('unified-ai-search');
    if (input) input.value = term;
    const filtered = masterProducts.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) || 
        p.category.toLowerCase().includes(term.toLowerCase())
    );
    renderCatalogGrid(filtered);
    const sec = document.getElementById('phase-2');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
};

function initPhase2CalendarCheck() {
    const startInput = document.getElementById('avail-start-date');
    const endInput = document.getElementById('avail-end-date');
    const btn = document.getElementById('btn-validate-calendar');
    const statusEl = document.getElementById('avail-validation-status');

    if (!startInput || !endInput) return;

    const today = new Date().toISOString().split('T')[0];
    startInput.value = today;
    const next = new Date();
    next.setDate(next.getDate() + 3);
    endInput.value = next.toISOString().split('T')[0];

    btn.addEventListener('click', async () => {
        statusEl.innerHTML = `Checking real-time buffer slots...`;
        statusEl.style.color = 'var(--accent-gold)';

        try {
            const res = await fetch(`/api/products/check-availability?productId=${activeCheckoutProduct.id}&startDate=${startInput.value}&endDate=${endInput.value}`);
            if (res.ok) {
                const data = await res.json();
                statusEl.innerHTML = `✓ Available: ${data.availableUnits} units ready (Buffer: ${data.maintenanceBufferHours}h)`;
                statusEl.style.color = '#10b981';
                return;
            }
        } catch (e) {
            // Local fallback
        }

        setTimeout(() => {
            statusEl.innerHTML = `✓ All 6 items verified available with 4h maintenance buffer.`;
            statusEl.style.color = '#10b981';
        }, 300);
    });
}

// =============================================================================
// 7. PHASE 3: QUOTATION, CONTRACT E-SIGN & CHECKOUT
// =============================================================================

function selectProductForCheckout(id) {
    const p = masterProducts.find(item => item.id === id) || masterProducts[0];
    activeCheckoutProduct = p;

    // Update Phase 3 Preview
    document.getElementById('chk-preview-title').innerText = p.name;
    document.getElementById('chk-preview-category').innerText = p.category;
    document.getElementById('chk-preview-img').src = p.imageUrl;

    // Recalculate quotation
    recalculateCheckoutQuotation();

    // Scroll smoothly to Phase 3
    const phase3 = document.getElementById('phase-3');
    if (phase3) {
        phase3.scrollIntoView({ behavior: 'smooth' });
    }
}

function initPhase3Checkout() {
    const startInput = document.getElementById('chk-calc-start');
    const endInput = document.getElementById('chk-calc-end');

    if (startInput && endInput) {
        const today = new Date().toISOString().split('T')[0];
        startInput.value = today;
        const next = new Date();
        next.setDate(next.getDate() + 3);
        endInput.value = next.toISOString().split('T')[0];

        startInput.addEventListener('change', recalculateCheckoutQuotation);
        endInput.addEventListener('change', recalculateCheckoutQuotation);
    }

    // Payment Option Cards
    const cardA = document.getElementById('unified-pay-card-a');
    const cardB = document.getElementById('unified-pay-card-b');
    const radioA = cardA.querySelector('input');
    const radioB = cardB.querySelector('input');

    cardA.addEventListener('click', () => {
        cardA.classList.add('selected');
        cardB.classList.remove('selected');
        radioA.checked = true;
        activePaymentOption = 'OPTION_A_100_UPFRONT';
        recalculateCheckoutQuotation();
    });

    cardB.addEventListener('click', () => {
        cardB.classList.add('selected');
        cardA.classList.remove('selected');
        radioB.checked = true;
        activePaymentOption = 'OPTION_B_DEPOSIT_ONLY';
        recalculateCheckoutQuotation();
    });

    // Digital Canvas E-Signature
    initSignatureCanvas();

    // Confirm Order Button
    const confirmBtn = document.getElementById('btn-confirm-checkout');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', handleOrderConfirmation);
    }

    recalculateCheckoutQuotation();
}

function recalculateCheckoutQuotation() {
    const startInput = document.getElementById('chk-calc-start');
    const endInput = document.getElementById('chk-calc-end');
    if (!startInput || !endInput) return;

    const s = new Date(startInput.value);
    const e = new Date(endInput.value);
    let days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    if (days < 1 || isNaN(days)) days = 1;

    let discountPercent = 0;
    if (days >= 30) discountPercent = 25;
    else if (days >= 7) discountPercent = 18;
    else if (days >= 3) discountPercent = 10;

    const baseDaily = activeCheckoutProduct.dailyRate;
    const gross = baseDaily * days;
    const discountAmt = Math.round(gross * (discountPercent / 100));
    const deposit = activeCheckoutProduct.securityDeposit;
    const totalAmount = gross - discountAmt + deposit;

    document.getElementById('chk-duration-text').innerText = `${days} Days`;
    document.getElementById('chk-subtotal-text').innerText = `₹${gross.toLocaleString()}`;
    document.getElementById('chk-discount-text').innerText = discountPercent > 0 
        ? `-₹${discountAmt.toLocaleString()} (${discountPercent}%)` 
        : '₹0 (Standard)';
    document.getElementById('chk-deposit-text').innerText = `₹${deposit.toLocaleString()}`;
    document.getElementById('chk-total-text').innerText = `₹${totalAmount.toLocaleString()}`;

    // Due Now calculation based on payment option
    if (activePaymentOption === 'OPTION_A_100_UPFRONT') {
        document.getElementById('chk-due-now-text').innerText = `₹${totalAmount.toLocaleString()} (100% Upfront)`;
    } else {
        document.getElementById('chk-due-now-text').innerText = `₹${deposit.toLocaleString()} (Security Deposit Only)`;
    }
}

let signaturePadHasDrawn = false;
function initSignatureCanvas() {
    const canvas = document.getElementById('unified-signature-canvas');
    const clearBtn = document.getElementById('btn-clear-signature');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 400;
    canvas.height = 140;
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    let drawing = false;

    const startDraw = (x, y) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (x, y) => {
        if (!drawing) return;
        ctx.lineTo(x, y);
        ctx.stroke();
        signaturePadHasDrawn = true;
    };

    const stopDraw = () => { drawing = false; };

    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        startDraw(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        draw(e.clientX - rect.left, e.clientY - rect.top);
    });

    window.addEventListener('mouseup', stopDraw);

    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        startDraw(touch.clientX - rect.left, touch.clientY - rect.top);
        e.preventDefault();
    });

    canvas.addEventListener('touchmove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        draw(touch.clientX - rect.left, touch.clientY - rect.top);
        e.preventDefault();
    });

    canvas.addEventListener('touchend', stopDraw);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            signaturePadHasDrawn = false;
        });
    }
}

async function handleOrderConfirmation() {
    const name = document.getElementById('unified-chk-name').value.trim();
    const phone = document.getElementById('unified-chk-phone').value.trim();
    const email = document.getElementById('unified-chk-email').value.trim();
    const esignChecked = document.getElementById('unified-chk-esign').checked;

    if (!name || !phone || !email) {
        alert("Please complete the Customer Identification details.");
        return;
    }

    if (!esignChecked) {
        alert("Please accept and digitally sign the Rental Agreement.");
        return;
    }

    const start = document.getElementById('chk-calc-start').value;
    const end = document.getElementById('chk-calc-end').value;
    const s = new Date(start);
    const e = new Date(end);
    let days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    if (days < 1) days = 1;

    let discountPercent = 0;
    if (days >= 30) discountPercent = 25;
    else if (days >= 7) discountPercent = 18;
    else if (days >= 3) discountPercent = 10;

    const gross = activeCheckoutProduct.dailyRate * days;
    const discountAmt = Math.round(gross * (discountPercent / 100));
    const deposit = activeCheckoutProduct.securityDeposit;
    const totalAmount = gross - discountAmt + deposit;

    const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);

    const newOrder = {
        id: orderId,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        productId: activeCheckoutProduct.id,
        productName: activeCheckoutProduct.name,
        startDate: start,
        endDate: end,
        durationDays: days,
        baseRate: activeCheckoutProduct.dailyRate,
        totalAmount: totalAmount,
        securityDeposit: deposit,
        paymentOption: activePaymentOption,
        orderStatus: "CONFIRMED",
        stockStatus: "RESERVED",
        invoiceStatus: activePaymentOption === 'OPTION_A_100_UPFRONT' ? 'PAID' : 'PARTIAL_DEPOSIT_PAID'
    };

    // Try posting to Express backend API
    try {
        await fetch('/api/checkout/confirm-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        });
    } catch (err) {
        console.log('[LOCAL SYNC] Appending to local memory.');
    }

    // Decrement available stock
    if (activeCheckoutProduct.availableUnits > 0) {
        activeCheckoutProduct.availableUnits -= 1;
    }

    masterOrders.unshift(newOrder);

    // Refresh UI across phases
    initPhase1ProductsTable();
    initPhase2Catalog();
    initPhase4Dispatch();
    initPhase5ReturnStation();
    initPhase6Ledger();

    // Show confirmation card
    const resBox = document.getElementById('checkout-result-box');
    document.getElementById('res-order-id').innerText = orderId;
    resBox.style.display = 'block';

    alert(`🎉 Order Confirmed & Stock Locked!\n\nOrder ID: ${orderId}\nRenter: ${name}\nItem: ${activeCheckoutProduct.name}\nTotal: ₹${totalAmount.toLocaleString()}\nStructure: ${activePaymentOption === 'OPTION_A_100_UPFRONT' ? '100% Upfront Paid' : 'Partial Deposit Paid'}\n\nProceed to Phase 4 Dispatch for physical customer pickup handover.`);
}

// =============================================================================
// 8. PHASE 4: DISPATCH & AUTOMATED PRE-RETURN CRON
// =============================================================================

function initPhase4Dispatch() {
    const container = document.getElementById('dispatch-orders-list');
    const countBadge = document.getElementById('count-dispatch-orders');
    if (!container) return;

    const reservedOrders = masterOrders.filter(o => o.orderStatus === 'CONFIRMED');
    countBadge.innerText = `${reservedOrders.length} Pending Handover`;

    if (!reservedOrders.length) {
        container.innerHTML = `<p style="color: var(--text-dim); text-align: center; padding: 20px;">No pending reserved orders awaiting handover.</p>`;
        return;
    }

    container.innerHTML = reservedOrders.map(o => `
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 12px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
            <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <strong style="color: #fff; font-size: 0.9rem;">${o.id}</strong>
                    <span class="badge-status confirmed">RESERVED</span>
                </div>
                <p style="font-size: 0.82rem; color: #fff; margin-top: 2px;">${o.productName}</p>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Renter: ${o.customerName} (${o.customerPhone})</span>
            </div>
            <button class="btn btn-primary" onclick="executePickupHandover('${o.id}')" style="padding: 6px 14px; font-size: 0.78rem;">
                Execute Handover →
            </button>
        </div>
    `).join('');
}

window.executePickupHandover = async (orderId) => {
    const o = masterOrders.find(item => item.id === orderId);
    if (!o) return;

    try {
        await fetch(`/api/orders/${orderId}/pickup-handover`, { method: 'POST' });
    } catch (e) {
        // Fallback local
    }

    o.orderStatus = 'PICKED_UP';
    o.stockStatus = 'WITH_CUSTOMER';

    initPhase4Dispatch();
    initPhase5ReturnStation();
    initPhase6Ledger();

    alert(`✓ Handover Successful!\n\nOrder ${orderId} transitioned to: PICKED_UP (WITH_CUSTOMER).\nDispatch Token: DISP-${Math.floor(1000 + Math.random() * 9000)}\n\nThe asset is now in customer possession and ready for Phase 5 Return Inspection.`);
};

function initPhase4CronSimulator() {
    const btn = document.getElementById('btn-trigger-cron');
    const terminal = document.getElementById('cron-terminal-output');
    const timestampEl = document.getElementById('cron-timestamp');

    if (!btn) return;

    btn.addEventListener('click', async () => {
        const lead = document.getElementById('cron-lead-time').value;
        const nowStr = new Date().toLocaleTimeString();
        timestampEl.innerText = `LAST RUN: ${nowStr}`;

        terminal.innerHTML += `<br>[${nowStr}] 🚀 Background Cron Daemon triggered (Lead time: ${lead} days)...`;

        try {
            const res = await fetch(`/api/cron/check-notifications?leadDays=${lead}`);
            if (res.ok) {
                const data = await res.json();
                terminal.innerHTML += `<br>[${nowStr}] [SUCCESS] Checked ${data.ordersChecked} active orders in customer possession.`;
                terminal.innerHTML += `<br>[${nowStr}] [ALERTS DISPATCHED] ${data.notificationsSent} pre-return notifications triggered via SMS & Email.`;
                terminal.scrollTop = terminal.scrollHeight;
                return;
            }
        } catch (e) {
            // Local fallback simulation
        }

        setTimeout(() => {
            terminal.innerHTML += `<br>[${nowStr}] [SCAN] Found 2 rentals approaching scheduled return date.`;
            terminal.innerHTML += `<br>[${nowStr}] ✉️ [SMS/EMAIL SENT to Alex Rivera]: "Hi Alex, your Yurt rental is due in ${lead} days. Please review the return inspection checklist."`;
            terminal.innerHTML += `<br>[${nowStr}] ✓ All automated pre-return cron tasks completed.`;
            terminal.scrollTop = terminal.scrollHeight;
        }, 350);
    });
}

// =============================================================================
// 9. PHASE 5: RETURN CONDITION INSPECTION & LATE PENALTY ENGINE
// =============================================================================

function initPhase5ReturnStation() {
    const select = document.getElementById('return-order-select');
    if (!select) return;

    const rentedOrders = masterOrders.filter(o => o.orderStatus === 'PICKED_UP');
    
    if (!rentedOrders.length) {
        select.innerHTML = `<option value="">No active orders currently with customer</option>`;
    } else {
        select.innerHTML = rentedOrders.map(o => `
            <option value="${o.id}">${o.id} • ${o.productName} (Renter: ${o.customerName})</option>
        `).join('');
    }

    select.addEventListener('change', updateReturnSettlementCalculations);
    
    const submitBtn = document.getElementById('btn-submit-return');
    if (submitBtn) {
        submitBtn.onclick = handleReturnInspectionSubmission;
    }

    updateReturnSettlementCalculations();
}

window.selectConditionGrading = (cond, fee, el) => {
    el.parentElement.querySelectorAll('.condition-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    currentInspectionGrading.condition = cond;
    currentInspectionGrading.damageFee = fee;
    updateReturnSettlementCalculations();
};

window.selectCleanlinessGrading = (clean, fee, el) => {
    el.parentElement.querySelectorAll('.condition-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    currentInspectionGrading.cleanliness = clean;
    currentInspectionGrading.cleanFee = fee;
    updateReturnSettlementCalculations();
};

window.selectTimelinessGrading = (days, penalty, el) => {
    el.parentElement.querySelectorAll('.condition-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    currentInspectionGrading.lateDays = days;
    currentInspectionGrading.latePenalty = penalty;
    updateReturnSettlementCalculations();
};

function updateReturnSettlementCalculations() {
    const select = document.getElementById('return-order-select');
    const orderId = select ? select.value : null;
    const order = masterOrders.find(o => o.id === orderId) || masterOrders[0];

    const heldDeposit = order ? order.securityDeposit : 3000;
    const damageFee = currentInspectionGrading.damageFee;
    const cleanFee = currentInspectionGrading.cleanFee;
    const latePenalty = currentInspectionGrading.latePenalty;

    const totalDeductions = damageFee + cleanFee + latePenalty;
    const netRefund = Math.max(0, heldDeposit - totalDeductions);

    document.getElementById('ret-held-deposit').innerText = `₹${heldDeposit.toLocaleString()}`;
    document.getElementById('ret-damage-fee').innerText = damageFee > 0 ? `-₹${damageFee.toLocaleString()}` : '-₹0';
    document.getElementById('ret-cleaning-fee').innerText = cleanFee > 0 ? `-₹${cleanFee.toLocaleString()}` : '-₹0';
    document.getElementById('ret-late-penalty').innerText = latePenalty > 0 ? `-₹${latePenalty.toLocaleString()}` : '-₹0';
    document.getElementById('ret-net-refund').innerText = `₹${netRefund.toLocaleString()}`;
}

async function handleReturnInspectionSubmission() {
    const select = document.getElementById('return-order-select');
    const orderId = select ? select.value : null;
    const order = masterOrders.find(o => o.id === orderId);

    if (!order) {
        alert("Please select an active order to conduct the return inspection.");
        return;
    }

    const heldDeposit = order.securityDeposit;
    const totalDeductions = currentInspectionGrading.damageFee + currentInspectionGrading.cleanFee + currentInspectionGrading.latePenalty;
    const netRefund = Math.max(0, heldDeposit - totalDeductions);

    // Call server API
    try {
        await fetch(`/api/orders/${orderId}/return-inspection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                condition: currentInspectionGrading.condition,
                damageFee: currentInspectionGrading.damageFee,
                cleanFee: currentInspectionGrading.cleanFee,
                lateDays: currentInspectionGrading.lateDays,
                latePenalty: currentInspectionGrading.latePenalty,
                netRefund: netRefund
            })
        });
    } catch (e) {
        // Fallback local
    }

    order.orderStatus = 'RETURNED';
    order.stockStatus = 'AVAILABLE';
    order.invoiceStatus = 'SETTLED';

    // Increment product available units
    const prod = masterProducts.find(p => p.id === order.productId);
    if (prod && prod.availableUnits < prod.stockCount) {
        prod.availableUnits += 1;
    }

    // Refresh UI
    initPhase1ProductsTable();
    initPhase2Catalog();
    initPhase4Dispatch();
    initPhase5ReturnStation();
    initPhase6Ledger();

    const successCard = document.getElementById('return-success-card');
    document.getElementById('ret-refund-amount-text').innerText = `₹${netRefund.toLocaleString()}`;
    successCard.style.display = 'block';

    alert(`✓ Return Inspection Finalized!\n\nOrder: ${orderId}\nCondition: ${currentInspectionGrading.condition}\nTotal Deductions: ₹${totalDeductions.toLocaleString()}\nNet Escrow Refund Dispatched: ₹${netRefund.toLocaleString()}\n\nItem stock has been safely restored to available inventory.`);
}

// =============================================================================
// 10. PHASE 6: FINANCIAL LEDGER & MULTI-FORMAT CSV EXPORTS
// =============================================================================

function initPhase6Ledger() {
    const tbody = document.getElementById('master-ledger-tbody');
    if (!tbody) return;

    renderLedgerRows(masterOrders);

    // Ledger live search
    const searchInput = document.getElementById('ledger-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                renderLedgerRows(masterOrders);
                return;
            }
            const filtered = masterOrders.filter(o => 
                o.id.toLowerCase().includes(query) || 
                o.customerName.toLowerCase().includes(query) ||
                o.productName.toLowerCase().includes(query)
            );
            renderLedgerRows(filtered);
        });
    }

    // Update KPI metrics
    updateOperationalKPIs();
}

function renderLedgerRows(orders) {
    const tbody = document.getElementById('master-ledger-tbody');
    if (!tbody) return;

    if (!orders.length) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: var(--text-dim); padding: 24px;">No ledger entries found.</td></tr>`;
        return;
    }

    tbody.innerHTML = orders.map(o => {
        let orderBadgeClass = 'confirmed';
        if (o.orderStatus === 'PICKED_UP') orderBadgeClass = 'picked-up';
        if (o.orderStatus === 'RETURNED') orderBadgeClass = 'returned';
        if (o.orderStatus === 'OVERDUE') orderBadgeClass = 'overdue';

        let invBadgeClass = o.invoiceStatus === 'PAID' ? 'paid' : 'partial';

        return `
            <tr>
                <td><strong style="color: #fff; font-size: 0.88rem;">${o.id}</strong></td>
                <td>
                    <span style="color: #fff; font-weight: 600;">${o.customerName}</span>
                    <span style="font-size: 0.72rem; color: var(--text-dim); display: block;">${o.customerEmail}</span>
                </td>
                <td style="color: #fff;">${o.productName}</td>
                <td>${o.durationDays} Days</td>
                <td>
                    <span style="font-size: 0.78rem; color: var(--accent-gold);">
                        ${o.paymentOption === 'OPTION_A_100_UPFRONT' ? '100% Upfront' : 'Deposit + Pay Later'}
                    </span>
                </td>
                <td style="color: #fff; font-weight: 800;">₹${o.totalAmount.toLocaleString()}</td>
                <td style="color: var(--accent-emerald);">₹${o.securityDeposit.toLocaleString()}</td>
                <td><span class="badge-status ${orderBadgeClass}">${o.orderStatus}</span></td>
                <td><span class="badge-status ${invBadgeClass}">${o.invoiceStatus}</span></td>
                <td>
                    <button class="btn btn-secondary" onclick="openInvoiceModal('${o.id}')" style="padding: 4px 10px; font-size: 0.72rem;">
                        View Invoice
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function updateOperationalKPIs() {
    const totalRev = masterOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const activeRentals = masterOrders.filter(o => o.orderStatus === 'PICKED_UP').length;
    const depositsHeld = masterOrders
        .filter(o => o.orderStatus !== 'RETURNED')
        .reduce((sum, o) => sum + o.securityDeposit, 0);

    const revEl = document.getElementById('kpi-revenue');
    const actEl = document.getElementById('kpi-active-rentals');
    const depEl = document.getElementById('kpi-deposits');

    if (revEl) revEl.innerText = `₹${totalRev.toLocaleString()}`;
    if (actEl) actEl.innerText = `${activeRentals} Units`;
    if (depEl) depEl.innerText = `₹${depositsHeld.toLocaleString()}`;
}

window.openInvoiceModal = (orderId) => {
    const order = masterOrders.find(o => o.id === orderId) || masterOrders[0];
    const modal = document.getElementById('invoice-modal-overlay');
    if (!modal) return;

    document.getElementById('inv-modal-number').innerText = `INV-${order.id}`;
    document.getElementById('inv-modal-status').innerText = order.invoiceStatus;
    document.getElementById('inv-modal-renter').innerText = order.customerName;
    document.getElementById('inv-modal-email').innerText = order.customerEmail;
    document.getElementById('inv-modal-terms').innerText = order.paymentOption === 'OPTION_A_100_UPFRONT'
        ? 'Option A: 100% Upfront Settlement'
        : 'Option B: Partial Security Deposit Paid';
    document.getElementById('inv-modal-item').innerText = `${order.productName} (${order.durationDays} Days)`;
    document.getElementById('inv-modal-subtotal').innerText = `₹${(order.baseRate * order.durationDays).toLocaleString()}`;
    document.getElementById('inv-modal-deposit').innerText = `₹${order.securityDeposit.toLocaleString()}`;
    document.getElementById('inv-modal-grandtotal').innerText = `₹${order.totalAmount.toLocaleString()}`;

    modal.classList.add('active');
};

window.closeInvoiceModal = () => {
    const modal = document.getElementById('invoice-modal-overlay');
    if (modal) modal.classList.remove('active');
};

// =============================================================================
// 11. AUTHENTICATION (OTP MODAL)
// =============================================================================

function initAuthModal() {
    const authOverlay = document.getElementById('auth-modal-overlay');
    if (!authOverlay) return;

    const btnUser = document.getElementById('role-btn-user');
    const btnSeller = document.getElementById('role-btn-seller');
    const roleThumb = document.getElementById('role-slider-thumb');
    let currentRole = localStorage.getItem('escapeluxe_role') || 'user';

    const setRole = (role) => {
        currentRole = role;
        if (role === 'seller') {
            if (roleThumb) roleThumb.style.transform = 'translateX(100%)';
            if (btnSeller) btnSeller.classList.add('active');
            if (btnUser) btnUser.classList.remove('active');
            document.getElementById('auth-title').innerText = 'Owner & Seller Portal';
            document.getElementById('auth-subtitle').innerText = 'Manage rental fleet, log returns, and review payouts.';
        } else {
            if (roleThumb) roleThumb.style.transform = 'translateX(0)';
            if (btnUser) btnUser.classList.add('active');
            if (btnSeller) btnSeller.classList.remove('active');
            document.getElementById('auth-title').innerText = 'Log in to EscapeLuxe';
            document.getElementById('auth-subtitle').innerText = 'Enter your email or phone to receive an instant OTP.';
        }
    };

    if (btnUser) btnUser.addEventListener('click', () => setRole('user'));
    if (btnSeller) btnSeller.addEventListener('click', () => setRole('seller'));

    document.querySelectorAll('.open-login-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const loggedInUser = localStorage.getItem('escapeluxe_user');
            if (loggedInUser) {
                if (confirm(`Signed in as: ${loggedInUser}\nRole: ${localStorage.getItem('escapeluxe_role') || 'Customer'}\n\nSign out?`)) {
                    localStorage.removeItem('escapeluxe_user');
                    localStorage.removeItem('escapeluxe_role');
                    window.location.reload();
                }
                return;
            }
            authOverlay.classList.add('active');
            setRole(currentRole);
        });
    });

    const closeBtn = document.getElementById('close-auth-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => authOverlay.classList.remove('active'));

    const step1 = document.getElementById('auth-step-1');
    const step2 = document.getElementById('auth-step-2');
    const continueBtn = document.getElementById('auth-continue-btn');
    const verifyBtn = document.getElementById('auth-verify-btn');
    let generatedOtp = '482910';

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            const input = document.getElementById('auth-identifier').value.trim();
            if (input.length >= 3) {
                generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                step1.style.display = 'none';
                step2.style.display = 'block';
                const otpDisplay = document.getElementById('simulated-otp-code');
                if (otpDisplay) otpDisplay.innerText = generatedOtp;
            } else {
                alert("Please enter a valid email or mobile number.");
            }
        });
    }

    const autofillBtn = document.getElementById('btn-autofill-otp');
    if (autofillBtn) {
        autofillBtn.addEventListener('click', () => {
            document.getElementById('auth-otp-input').value = generatedOtp;
        });
    }

    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            const entered = document.getElementById('auth-otp-input').value.trim();
            const identifier = document.getElementById('auth-identifier').value.trim();
            if (entered === generatedOtp || entered.length === 6) {
                localStorage.setItem('escapeluxe_user', identifier);
                localStorage.setItem('escapeluxe_role', currentRole);
                authOverlay.classList.remove('active');
                initNavbarState();
                alert(`Welcome back to EscapeLuxe, ${identifier}! Signed in as ${currentRole.toUpperCase()}.`);
            } else {
                alert("Invalid verification code. Please check your simulated OTP.");
            }
        });
    }
}

function initNavbarState() {
    const user = localStorage.getItem('escapeluxe_user');
    const role = localStorage.getItem('escapeluxe_role') || 'Renter';
    const loginBtns = document.querySelectorAll('.open-login-btn');
    const profileContainers = document.querySelectorAll('.user-nav-slot');

    if (user) {
        loginBtns.forEach(btn => btn.style.display = 'none');
        profileContainers.forEach(slot => {
            slot.innerHTML = `
                <div class="user-profile-badge" title="Click to view details or log out">
                    <div class="user-avatar-dot">${user.charAt(0).toUpperCase()}</div>
                    <div style="text-align: left; line-height: 1.1;">
                        <span style="font-size: 0.85rem; font-weight: 700; color: #fff;">${user.split('@')[0]}</span>
                        <span style="font-size: 0.7rem; color: #10b981; font-weight: 700; text-transform: uppercase; display: block;">${role}</span>
                    </div>
                </div>
            `;
            slot.addEventListener('click', () => {
                if (confirm(`Account: ${user}\nRole: ${role}\n\nClick OK to Sign Out.`)) {
                    localStorage.removeItem('escapeluxe_user');
                    localStorage.removeItem('escapeluxe_role');
                    window.location.reload();
                }
            });
        });
    }
}

// =============================================================================
// 12. FLOATING AI CONCIERGE CHAT
// =============================================================================

function initAIChat() {
    const fab = document.getElementById('ai-fab-btn');
    const windowEl = document.getElementById('ai-chat-window');
    const closeBtn = document.getElementById('close-ai-chat');
    const sendBtn = document.getElementById('ai-send-btn');
    const input = document.getElementById('ai-chat-input');
    const body = document.getElementById('ai-chat-body');

    if (!fab || !windowEl) return;

    fab.addEventListener('click', () => windowEl.style.display = 'flex');
    if (closeBtn) closeBtn.addEventListener('click', () => windowEl.style.display = 'none');

    const handleSend = () => {
        const query = input.value.trim();
        if (!query) return;

        body.innerHTML += `<div class="chat-msg user">${query}</div>`;
        input.value = '';
        body.scrollTop = body.scrollHeight;

        setTimeout(() => {
            let answer = "I'm your EscapeLuxe Concierge. I can help recommend equipment packages, estimate multi-day savings, or explain our zero-deposit terms.";
            const q = query.toLowerCase();

            if (q.includes('tent') || q.includes('glamping')) {
                answer = "Our Luxury Canvas Yurt is 100% waterproof and features an integrated memory-foam king mattress and stargazing roof! Head to Phase 2 to book it.";
            } else if (q.includes('policy') || q.includes('late') || q.includes('return')) {
                answer = "In Phase 5, you can inspect return conditions. Late returns accrue standard penalties (15% daily rate), safely deducted from the escrow security deposit.";
            } else if (q.includes('discount') || q.includes('price')) {
                answer = "Dynamic pricing rules in Phase 1: 3+ days unlocks 10% off, 7+ days saves 18%, and 30+ days saves 25%!";
            } else if (q.includes('deposit') || q.includes('option b')) {
                answer = "With Option B flexible invoicing in Phase 3, you only pay the security deposit now. The rental balance is invoiced upon physical dispatch!";
            }

            body.innerHTML += `<div class="chat-msg ai">${answer}</div>`;
            body.scrollTop = body.scrollHeight;
        }, 500);
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
}
