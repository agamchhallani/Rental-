/* ==========================================================================
   RentFlow • 21st.dev Core JavaScript Engine
   Features:
   - Luxury White & Gold Auth Modal with sliding User/Seller pill
   - Real backend OTP integration with instant test autofill
   - Navbar User Profile state management
   - AI Search & quick recommendation chips
   - Interactive Bento Dynamic Pricing calculator
   - Category filtering
   - Theme toggle (White & Gold default vs Obsidian & Gold)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Dynamic Auth Modal Injection (21st.dev White & Gold Edition)
    // -------------------------------------------------------------------------
    const modalHTML = `
        <div id="auth-overlay" class="modal-overlay">
            <div class="auth-modal">
                <div class="role-toggle-container">
                    <div class="role-toggle-slider" id="role-slider"></div>
                    <button type="button" class="role-btn active" id="btn-user">User</button>
                    <button type="button" class="role-btn" id="btn-seller">Seller</button>
                </div>
                
                <h2 id="auth-title" style="margin-bottom: 8px; font-size: 1.75rem; font-weight: 800; letter-spacing: -0.02em;">Log in to RentFlow</h2>
                <p id="auth-subtitle" style="color: var(--text-muted); margin-bottom: 24px; font-size: 0.92rem;">Enter your email or phone number to receive an instant OTP.</p>
                
                <!-- Step 1: Login -->
                <div id="auth-step-1">
                    <input type="text" class="auth-input" id="auth-identifier" placeholder="Email or Mobile Number (e.g., alex@rentflow.io)" autocomplete="username">
                    <button type="button" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 1rem; margin-top: 6px;" id="login-continue">Continue →</button>
                    <p style="margin-top: 18px; font-size: 0.88rem; color: var(--text-muted);">
                        New here? <span id="switch-to-signup" style="color: var(--gold-600); cursor: pointer; font-weight: 700; text-decoration: underline;">Create an account</span>
                    </p>
                </div>

                <!-- Step 1b: Sign-up Flow -->
                <div id="auth-signup" style="display: none;">
                    <input type="text" class="auth-input" id="auth-name" placeholder="Full Legal Name" autocomplete="name">
                    <input type="text" class="auth-input" id="auth-new-identifier" placeholder="Email or Mobile Number" autocomplete="email">
                    <button type="button" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 1rem; margin-top: 6px;" id="signup-continue">Send Verification Code →</button>
                    <p style="margin-top: 18px; font-size: 0.88rem; color: var(--text-muted);">
                        Already have an account? <span id="switch-to-login" style="color: var(--gold-600); cursor: pointer; font-weight: 700; text-decoration: underline;">Log in</span>
                    </p>
                </div>

                <!-- Step 2: OTP Verification -->
                <div id="auth-step-2" style="display: none;">
                    <div id="otp-helper-container" style="display: none;" class="otp-helper-card">
                        <div>
                            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Simulated SMS / Email OTP</div>
                            <div class="otp-helper-code" id="otp-code-preview">123456</div>
                        </div>
                        <button type="button" class="otp-autofill-btn" id="btn-autofill-otp">Auto-Fill Code</button>
                    </div>

                    <p style="color: #10b981; margin-bottom: 15px; font-size: 0.88rem; font-weight: 600;">✦ OTP dispatched to your registered address!</p>
                    <input type="text" class="auth-input" id="auth-otp" placeholder="Enter 6-digit OTP" maxlength="6" style="text-align: center; letter-spacing: 4px; font-size: 1.2rem; font-weight: 700;">
                    <button type="button" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 1rem; margin-top: 8px;" id="login-submit">Verify & Login</button>
                    
                    <p style="margin-top: 15px; font-size: 0.85rem; color: var(--text-muted);">
                        Didn't receive code? <span id="resend-otp-btn" style="color: var(--gold-600); cursor: pointer; font-weight: 600; text-decoration: underline;">Resend</span>
                    </p>
                </div>

                <p style="margin-top: 22px; font-size: 0.88rem; color: var(--text-muted); cursor: pointer;" id="close-modal">Cancel</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const authOverlay = document.getElementById('auth-overlay');
    const step1 = document.getElementById('auth-step-1');
    const step2 = document.getElementById('auth-step-2');
    const signupStep = document.getElementById('auth-signup');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const otpHelperContainer = document.getElementById('otp-helper-container');
    const otpCodePreview = document.getElementById('otp-code-preview');
    const btnAutofillOtp = document.getElementById('btn-autofill-otp');
    
    // -------------------------------------------------------------------------
    // 2. Role Toggle Logic (User vs Seller sliding pill)
    // -------------------------------------------------------------------------
    const btnUser = document.getElementById('btn-user');
    const btnSeller = document.getElementById('btn-seller');
    const roleSlider = document.getElementById('role-slider');
    let currentRole = localStorage.getItem('rentflow_role') || 'user';

    const setRole = (role) => {
        currentRole = role;
        if (role === 'seller') {
            roleSlider.style.transform = 'translateX(100%)';
            btnSeller.classList.add('active');
            btnUser.classList.remove('active');
            authTitle.innerText = 'Seller Portal Access';
            authSubtitle.innerText = 'Manage inventory, verify returns, and review payout invoices.';
        } else {
            roleSlider.style.transform = 'translateX(0)';
            btnUser.classList.add('active');
            btnSeller.classList.remove('active');
            authTitle.innerText = 'Log in to RentFlow';
            authSubtitle.innerText = 'Enter your email or phone number to receive an instant OTP.';
        }
    };

    btnUser.addEventListener('click', () => setRole('user'));
    btnSeller.addEventListener('click', () => setRole('seller'));

    // -------------------------------------------------------------------------
    // 3. User Profile State in Navbar
    // -------------------------------------------------------------------------
    const updateNavbarAuthStatus = () => {
        const user = localStorage.getItem('rentflow_user');
        const role = localStorage.getItem('rentflow_role') || 'user';

        if (user) {
            document.querySelectorAll('.nav-actions').forEach(nav => {
                const loginBtn = Array.from(nav.querySelectorAll('button')).find(b => 
                    b.innerText.includes('Log in') || b.innerText.includes('Sign in')
                );
                if (loginBtn) {
                    loginBtn.style.display = 'none';
                }

                if (!nav.querySelector('.user-profile')) {
                    const firstLetter = (user.charAt(0) || 'U').toUpperCase();
                    const roleLabel = role === 'seller' ? 'Seller' : 'Renter';
                    const profileHTML = `
                        <div class="user-profile" id="nav-user-profile" title="Click to view details or log out">
                            <div class="user-avatar-circle">${firstLetter}</div>
                            <div style="display: flex; flex-direction: column; text-align: left; line-height: 1.2;">
                                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">${user.length > 15 ? user.substring(0, 12) + '...' : user}</span>
                                <span class="user-badge-role">${roleLabel}</span>
                            </div>
                        </div>
                    `;
                    nav.insertAdjacentHTML('beforeend', profileHTML);
                    
                    const profileEl = nav.querySelector('#nav-user-profile');
                    profileEl.addEventListener('click', () => {
                        const action = confirm(`Logged in as: ${user} (${roleLabel})\n\nClick OK to Log Out, or Cancel to remain signed in.`);
                        if (action) {
                            localStorage.removeItem('rentflow_user');
                            localStorage.removeItem('rentflow_role');
                            window.location.reload();
                        }
                    });
                }
            });
        }
    };
    
    updateNavbarAuthStatus();

    // -------------------------------------------------------------------------
    // 4. Modal Open & Close Triggers
    // -------------------------------------------------------------------------
    const openModal = () => {
        step1.style.display = 'block';
        step2.style.display = 'none';
        signupStep.style.display = 'none';
        setRole(currentRole);
        authOverlay.classList.add('active');
    };

    document.querySelectorAll('.btn-primary, .btn-secondary, #bento-test-auth').forEach(btn => {
        if (
            btn.id === 'navbar-login-btn' ||
            btn.id === 'bento-test-auth' ||
            btn.innerText.trim() === 'Log in' ||
            btn.innerText.trim() === 'Sign in' ||
            btn.innerText.trim() === 'Get Started'
        ) {
            btn.addEventListener('click', (e) => {
                const user = localStorage.getItem('rentflow_user');
                if (!user) {
                    e.preventDefault();
                    openModal();
                }
            });
        }
    });

    document.getElementById('switch-to-signup').addEventListener('click', () => {
        step1.style.display = 'none';
        signupStep.style.display = 'block';
        authTitle.innerText = 'Create an Account';
        authSubtitle.innerText = 'Join RentFlow Luxe to rent equipment and earn as an owner.';
    });

    document.getElementById('switch-to-login').addEventListener('click', () => {
        signupStep.style.display = 'none';
        step1.style.display = 'block';
        setRole(currentRole);
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        authOverlay.classList.remove('active');
    });

    authOverlay.addEventListener('click', (e) => {
        if (e.target === authOverlay) {
            authOverlay.classList.remove('active');
        }
    });

    // -------------------------------------------------------------------------
    // 5. OTP Dispatch & Verification
    // -------------------------------------------------------------------------
    let lastGeneratedOtp = '';

    const handleSendOtp = async (identifier) => {
        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier })
            });
            const data = await res.json();
            
            lastGeneratedOtp = data.mockDelivery;
            step1.style.display = 'none';
            signupStep.style.display = 'none';
            step2.style.display = 'block';
            
            // Show the elegant 21st.dev test OTP card
            if (otpHelperContainer && otpCodePreview) {
                otpCodePreview.innerText = lastGeneratedOtp;
                otpHelperContainer.style.display = 'flex';
            }
            
            // Focus OTP field
            document.getElementById('auth-otp').focus();
        } catch (err) {
            alert("Connection error. Make sure server is active.");
        }
    };

    document.getElementById('login-continue').addEventListener('click', () => {
        const val = document.getElementById('auth-identifier').value.trim();
        if (val.length >= 3) {
            handleSendOtp(val);
        } else {
            alert("Please enter a valid email or mobile number.");
        }
    });

    document.getElementById('signup-continue').addEventListener('click', () => {
        const val = document.getElementById('auth-new-identifier').value.trim();
        const name = document.getElementById('auth-name').value.trim();
        if (val.length >= 3 && name.length >= 2) {
            document.getElementById('auth-identifier').value = val;
            handleSendOtp(val);
        } else {
            alert("Please provide both your name and email/mobile number.");
        }
    });

    btnAutofillOtp.addEventListener('click', () => {
        if (lastGeneratedOtp) {
            document.getElementById('auth-otp').value = lastGeneratedOtp;
        }
    });

    document.getElementById('resend-otp-btn').addEventListener('click', () => {
        const val = document.getElementById('auth-identifier').value.trim();
        if (val) {
            handleSendOtp(val);
        }
    });

    document.getElementById('login-submit').addEventListener('click', async () => {
        const identifier = document.getElementById('auth-identifier').value.trim();
        const otp = document.getElementById('auth-otp').value.trim();
        
        if (!otp) {
            alert("Please enter the 6-digit OTP.");
            return;
        }

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, otp })
            });
            
            if (res.ok) {
                authOverlay.classList.remove('active');
                localStorage.setItem('rentflow_user', identifier);
                localStorage.setItem('rentflow_role', currentRole);
                updateNavbarAuthStatus();
                
                // Clear fields
                document.getElementById('auth-otp').value = '';
                document.getElementById('auth-identifier').value = '';
                
                // Subtle feedback
                setTimeout(() => {
                    alert(`Welcome to RentFlow, ${identifier}! You are logged in as a ${currentRole.toUpperCase()}.`);
                }, 100);
            } else {
                const err = await res.json();
                alert(`Authentication failed: ${err.message || 'Invalid OTP'}`);
            }
        } catch (err) {
            alert("Error communicating with server.");
        }
    });

    // -------------------------------------------------------------------------
    // 6. 21st.dev Theme Toggle (White & Gold Default <-> Obsidian & Gold)
    // -------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('rentflow_theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) themeToggleBtn.innerText = '🌙';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeToggleBtn) themeToggleBtn.innerText = '☀️';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggleBtn.innerText = isDark ? '🌙' : '☀️';
            localStorage.setItem('rentflow_theme', isDark ? 'dark' : 'light');
        });
    }

    // -------------------------------------------------------------------------
    // 7. AI Search Engine & Trending Chips
    // -------------------------------------------------------------------------
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('ai-search');

    const triggerSearch = (query) => {
        const q = (query || (searchInput ? searchInput.value : '')).trim();
        if (!q) {
            if (searchInput) {
                searchInput.style.borderColor = '#ef4444';
                setTimeout(() => { searchInput.style.borderColor = ''; }, 1000);
            }
            return;
        }

        if (searchBtn) {
            searchBtn.innerHTML = `<span>Matching Gear...</span>`;
            searchBtn.style.opacity = '0.8';
        }

        setTimeout(() => {
            window.location.href = `products.html?q=${encodeURIComponent(q)}`;
        }, 500);
    };

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => triggerSearch());
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                triggerSearch();
            }
        });
    }

    // Trending Search Chips
    document.querySelectorAll('.chip[data-query]').forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            if (searchInput) searchInput.value = query;
            triggerSearch(query);
        });
    });

    // -------------------------------------------------------------------------
    // 8. 21st.dev Bento Grid Dynamic Pricing Slider Demo
    // -------------------------------------------------------------------------
    const bentoSlider = document.getElementById('bento-slider');
    const durationVal = document.getElementById('duration-val');
    const discountBadge = document.getElementById('discount-badge');
    const calcPriceDisplay = document.getElementById('calc-price-display');

    if (bentoSlider && durationVal && discountBadge && calcPriceDisplay) {
        const baseRate = 3500;
        bentoSlider.addEventListener('input', (e) => {
            const days = parseInt(e.target.value, 10);
            durationVal.innerText = `${days} Day${days > 1 ? 's' : ''}`;

            let discount = 0;
            if (days >= 14) discount = 25;
            else if (days >= 7) discount = 18;
            else if (days >= 3) discount = 10;
            else if (days >= 2) discount = 5;

            const discountedPrice = Math.round(baseRate * (1 - discount / 100));
            
            if (discount > 0) {
                discountBadge.innerText = `${discount}% Dynamic Discount`;
                discountBadge.style.display = 'inline-block';
                calcPriceDisplay.innerHTML = `₹${discountedPrice.toLocaleString()} / day <span style="font-size: 0.75rem; text-decoration: line-through; color: var(--text-dim); margin-left: 6px;">₹${baseRate.toLocaleString()}</span>`;
            } else {
                discountBadge.innerText = `Standard Rate`;
                calcPriceDisplay.innerHTML = `₹${baseRate.toLocaleString()} / day`;
            }
        });
    }

    // -------------------------------------------------------------------------
    // 9. Homepage Featured Inventory Category Filtering
    // -------------------------------------------------------------------------
    const catPills = document.querySelectorAll('.cat-pill');
    const featuredCards = document.querySelectorAll('#homepage-featured-grid .product-card');

    catPills.forEach(pill => {
        pill.addEventListener('click', () => {
            catPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            const category = pill.getAttribute('data-cat');
            featuredCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 10. Navbar Glass Scroll Elevation
    // -------------------------------------------------------------------------
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.style.background = 'var(--navbar-bg-scrolled)';
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.background = 'var(--navbar-bg)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
});
