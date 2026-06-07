/* ============================================
   EASYGORENTAL - Complete Application Script
   ============================================ */

// ===== STATE MANAGEMENT =====
const State = {
  isSignUp: false,
  registeredUsers: [],
  currentUser: null,
  nickname: '',
  currentFilter: 'all',
  selectedCar: null,
  bookingActive: false,
  bookingStep: 0,
  profileData: {
    address: '',
    birthday: '',
    age: '',
    licenseImage: null
  },
  selectedPayment: 'gcash',
  ratingGiven: 0
};

// ===== CAR DATA =====
const cars = [
  { id: 1, brand: 'Toyota Vios 1.3 E', category: 'Sedan', rating: 4.8, reviews: 42, features: ['Auto', 'AC', 'GPS'], price: 2500, plate: 'ABC-1234', fuel: 'Gasoline', seats: 5, transmission: 'Automatic', owner: 'Carlos M.', contact: '+63 912 345 6789', address: '213 Rizal Ave, San Pablo City, Laguna', image: 'toyota vios 1.3 E.png' },
  { id: 2, brand: 'Honda City RS', category: 'Sedan', rating: 4.9, reviews: 38, features: ['CVT', 'AC', 'Bluetooth'], price: 3200, plate: 'DEF-5678', fuel: 'Gasoline', seats: 5, transmission: 'CVT', owner: 'Maria S.', contact: '+63 917 890 1234', address: '56 P. Burgos St, Metro Manila', image: 'honda city rs.png' },
  { id: 3, brand: 'Mitsubishi Mirage G4', category: 'Sedan', rating: 4.6, reviews: 29, features: ['M/T', 'AC', 'Eco'], price: 1800, plate: 'GHI-9012', fuel: 'Gasoline', seats: 5, transmission: 'Manual', owner: 'Jose R.', contact: '+63 923 456 7890', address: '12 Mabini St, Cebu City', image: 'mitsubishi mirage g4.png' },
  { id: 4, brand: 'Toyota Wigo', category: 'Hatchback', rating: 4.7, reviews: 35, features: ['Auto', 'AC', 'Compact'], price: 1500, plate: 'JKL-3456', fuel: 'Gasoline', seats: 5, transmission: 'Automatic', owner: 'Ana L.', contact: '+63 908 765 4321', address: '89 Torres St, Davao City', image: 'toyota wigo.png' },
  { id: 5, brand: 'Suzuki Swift GL', category: 'Hatchback', rating: 4.5, reviews: 22, features: ['M/T', 'AC', 'Sporty'], price: 2000, plate: 'MNO-7890', fuel: 'Gasoline', seats: 5, transmission: 'Manual', owner: 'Pedro D.', contact: '+63 915 678 9012', address: '34 Session Rd, Baguio City', image: 'suzuki swift gl.png' },
  { id: 6, brand: 'Honda Brio', category: 'Hatchback', rating: 4.6, reviews: 31, features: ['Auto', 'AC', 'Eco'], price: 1700, plate: 'PQR-1234', fuel: 'Gasoline', seats: 5, transmission: 'Automatic', owner: 'Sofia G.', contact: '+63 920 123 4567', address: '67 Delgado St, Iloilo City', image: 'honda brio.png' },
  { id: 7, brand: 'Toyota Fortuner 2.4 G', category: 'SUV', rating: 4.9, reviews: 56, features: ['Diesel', '4x2', '7-Seater'], price: 5500, plate: 'STU-5678', fuel: 'Diesel', seats: 7, transmission: 'Automatic', owner: 'Ramon B.', contact: '+63 918 765 4321', address: '78 National Highway, Cagayan de Oro', image: 'toyota fortuner 2.4 G.png' },
  { id: 8, brand: 'Mitsubishi Montero Sport', category: 'SUV', rating: 4.8, reviews: 48, features: ['Diesel', '4x4', 'Leather'], price: 6000, plate: 'VWX-9012', fuel: 'Diesel', seats: 7, transmission: 'Automatic', owner: 'Cristina T.', contact: '+63 925 678 9012', address: '45 Diversion Rd, Batangas City', image: 'mitsubishi montero sport.png' },
  { id: 9, brand: 'Nissan Terra VL', category: 'SUV', rating: 4.7, reviews: 33, features: ['Diesel', 'GPS', 'Camera'], price: 5200, plate: 'YZA-3456', fuel: 'Diesel', seats: 7, transmission: 'Automatic', owner: 'Mario F.', contact: '+63 919 012 3456', address: '123 JP Rizal, San Pablo City', image: 'nissan terra vl.png' },
  { id: 10, brand: 'Toyota RAV4 G', category: 'Crossover', rating: 4.8, reviews: 41, features: ['Gas', 'AWD', 'Sunroof'], price: 4500, plate: 'BCD-7890', fuel: 'Gasoline', seats: 5, transmission: 'Automatic', owner: 'Luisa K.', contact: '+63 922 345 6789', address: '90 Sampaguita Ave, Metro Manila', image: 'toyota rav4 G.png' },
  { id: 11, brand: 'Honda CR-V S', category: 'Crossover', rating: 4.7, reviews: 37, features: ['Gas', 'CVT', '7-Seater'], price: 4800, plate: 'EFG-1234', fuel: 'Gasoline', seats: 7, transmission: 'CVT', owner: 'Danny P.', contact: '+63 916 789 0123', address: '23 Escario St, Cebu City', image: 'honda cr-v s.png' },
  { id: 12, brand: 'Mitsubishi Xpander GLS', category: 'Minivan', rating: 4.6, reviews: 44, features: ['Gas', '7-Seat', 'AC'], price: 3500, plate: 'HIJ-5678', fuel: 'Gasoline', seats: 7, transmission: 'Automatic', owner: 'Grace A.', contact: '+63 921 234 5678', address: '56 F. Torres, Davao City', image: 'mitsubishi xpander gls.png' },
  { id: 13, brand: 'Toyota Avanza 1.3 E', category: 'Minivan', rating: 4.5, reviews: 39, features: ['Gas', '7-Seat', 'Eco'], price: 2800, plate: 'KLM-9012', fuel: 'Gasoline', seats: 7, transmission: 'Manual', owner: 'Ricky N.', contact: '+63 913 456 7890', address: '78 Harrison St, Baguio City', image: 'toyota avanza 1.3 E.png' },
  { id: 14, brand: 'BMW 320d', category: 'Luxury', rating: 5.0, reviews: 18, features: ['Diesel', 'Leather', 'Premium'], price: 12000, plate: 'NOP-3456', fuel: 'Diesel', seats: 5, transmission: 'Automatic', owner: 'Vincent T.', contact: '+63 917 890 1234', address: '12 Forbes Town, Metro Manila', image: 'BMW 320d.png' },
  { id: 15, brand: 'Mercedes-Benz C200', category: 'Luxury', rating: 5.0, reviews: 15, features: ['Gas', 'AMG', 'Sunroof'], price: 15000, plate: 'QRS-7890', fuel: 'Gasoline', seats: 5, transmission: 'Automatic', owner: 'Isabel R.', contact: '+63 924 567 8901', address: '34 Ayala Ave, Metro Manila', image: 'mercedes-benz c200.png' },
  { id: 16, brand: 'Toyota Vios 1.3 J', category: 'Economy', rating: 4.4, reviews: 62, features: ['M/T', 'AC', 'Basic'], price: 1200, plate: 'TUV-1234', fuel: 'Gasoline', seats: 5, transmission: 'Manual', owner: 'Efren Q.', contact: '+63 914 678 9012', address: '101 Quezon Blvd, San Pablo City', image: 'toyota vios 1.3 j.png' },
  { id: 17, brand: 'Suzuki Celerio', category: 'Economy', rating: 4.3, reviews: 28, features: ['M/T', 'AC', 'Compact'], price: 1000, plate: 'WXY-5678', fuel: 'Gasoline', seats: 5, transmission: 'Manual', owner: 'Nenita B.', contact: '+63 923 890 1234', address: '55 Luna St, Iloilo City', image: 'suzuki celerio.png' },
  { id: 18, brand: 'Mitsubishi Mirage GLX', category: 'Economy', rating: 4.4, reviews: 33, features: ['M/T', 'AC', 'Eco'], price: 1300, plate: 'ZAB-9012', fuel: 'Gasoline', seats: 5, transmission: 'Manual', owner: 'Tonyo M.', contact: '+63 911 234 5678', address: '88 Rizal Ext, Cagayan de Oro', image: 'mitsubishi mirage glx.png' }
];

// ===== DOM REFS =====
const $ = id => document.getElementById(id);

// Screens
const splashScreen = $('splash-screen');
const loginScreen = $('login-screen');
const nameScreen = $('name-screen');
const coreApp = $('core-app');

// Splash
const splashBtn = $('splash-btn');

// Login
const formTitle = $('form-title');
const loginError = $('login-error');
const emailInput = $('email-input');
const passwordInput = $('password-input');
const loginBtn = $('login-btn');
const toggleAuthLink = $('toggle-auth-link');

// Name
const nameInput = $('name-input');
const continueBtn = $('continue-btn');

// Core
const greetingText = $('greeting-text');
const activeBookingPill = $('active-booking-pill');
const profileBtn = $('profile-btn');
const profileAvatarText = $('profile-avatar-text');
const carGrid = $('car-grid');
const carSearch = $('car-search');
const panelPlaceholder = $('panel-placeholder');
const panelContent = $('panel-content');

// ===== SCREEN NAVIGATION =====
function showScreen(screenToShow) {
  [splashScreen, loginScreen, nameScreen, coreApp].forEach(s => {
    s.classList.add('hidden');
  });
  screenToShow.classList.remove('hidden');
}

// ===== SPLASH =====
splashBtn.addEventListener('click', () => {
  showScreen(loginScreen);
});

// ===== AUTH STATE TOGGLE =====
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'toggle-auth-link') {
    State.isSignUp = !State.isSignUp;
    loginError.classList.add('hidden');
    if (State.isSignUp) {
      formTitle.textContent = 'Sign Up';
      loginBtn.textContent = 'SIGN UP';
      e.target.textContent = 'Login';
      e.target.parentElement.innerHTML = 'Already have an account? <span id="toggle-auth-link">Login</span>';
    } else {
      formTitle.textContent = 'Login';
      loginBtn.textContent = 'LOGIN';
      e.target.textContent = 'Sign Up';
      e.target.parentElement.innerHTML = "Don't have an account? <span id='toggle-auth-link'>Sign Up</span>";
    }
  }
});

// ===== LOGIN / SIGN UP LOGIC =====
loginBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showError('Please fill in all fields.');
    return;
  }

  if (!email.includes('@')) {
    showError('Please enter a valid email address.');
    return;
  }

  if (State.isSignUp) {
    // Check if already registered
    const exists = State.registeredUsers.find(u => u.email === email);
    if (exists) {
      showError('An account with this email already exists. Please login.');
      return;
    }
    State.registeredUsers.push({ email, password });
    // Auto-switch to login mode
    State.isSignUp = false;
    formTitle.textContent = 'Login';
    loginBtn.textContent = 'LOGIN';
    document.querySelector('.toggle-form').innerHTML = "Don't have an account? <span id='toggle-auth-link'>Sign Up</span>";
    loginError.classList.add('hidden');
    showError('Account created! Please log in.', 'success');
    emailInput.value = '';
    passwordInput.value = '';
    return;
  }

  // Login
  const user = State.registeredUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    showError('That email and password combination is incorrect.');
    return;
  }

  State.currentUser = user;
  loginError.classList.add('hidden');
  showScreen(nameScreen);
});

function showError(msg, type) {
  loginError.textContent = msg;
  loginError.classList.remove('hidden');
  if (type === 'success') {
    loginError.style.background = 'rgba(16, 185, 129, 0.1)';
    loginError.style.border = '1px solid rgba(16, 185, 129, 0.3)';
    loginError.style.color = '#10B981';
  } else {
    loginError.style.background = 'rgba(239, 68, 68, 0.1)';
    loginError.style.border = '1px solid rgba(239, 68, 68, 0.3)';
    loginError.style.color = '#EF4444';
  }
}

// ===== NAME ENTRY =====
continueBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.style.borderColor = '#EF4444';
    nameInput.focus();
    return;
  }
  nameInput.style.borderColor = '#1E293B';
  State.nickname = name;
  initDashboard();
});

nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') continueBtn.click();
});

// ===== DASHBOARD INIT =====
function initDashboard() {
  profileAvatarText.textContent = State.nickname.charAt(0).toUpperCase();
  greetingText.textContent = `Hello, ${State.nickname}!`;
  showScreen(coreApp);
  renderCarGrid();
  filterCars();
}

// ===== CAR GRID RENDER =====
function renderCarGrid() {
  carGrid.innerHTML = '';
  cars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.dataset.category = car.category;
    card.dataset.id = car.id;

    // Generate star rating
    const fullStars = Math.floor(car.rating);
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) starsHtml += '★';
      else starsHtml += '☆';
    }

    // Features badges
    const featuresHtml = car.features.map(f => `<span class="car-card-feature">${f}</span>`).join('');

    // Use actual image if available, otherwise SVG placeholder
    const carImageHtml = car.image 
      ? `<img src="${car.image}" alt="${car.brand}" style="width: 100%; height: 100%; object-fit: cover;">`
      : `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect x="10" y="30" width="60" height="25" rx="6" fill="#06B6D4" opacity="0.3"/>
      <path d="M15 50L20 38L30 32H50L60 38L65 50H58L54 45H26L22 50H15Z" fill="#06B6D4" opacity="0.5"/>
      <circle cx="28" cy="52" r="7" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5"/>
      <circle cx="52" cy="52" r="7" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5"/>
      <rect x="32" y="38" width="16" height="3" rx="1" fill="#06B6D4" opacity="0.3"/>
    </svg>`;

    card.innerHTML = `
      <div class="car-card-image">${carImageHtml}</div>
      <div class="car-card-body">
        <div class="car-card-title">${car.brand}</div>
        <div class="car-card-rating">
          ${starsHtml} <span>${car.rating} (${car.reviews} reviews)</span>
        </div>
        <div class="car-card-features">${featuresHtml}</div>
        <div class="car-card-price">₱${car.price.toLocaleString()} <small>/ day</small></div>
      </div>
    `;

    card.addEventListener('click', () => {
      selectCar(car);
    });

    carGrid.appendChild(card);
  });
}

// ===== FILTER & SEARCH =====
function setFilter(category, el) {
  State.currentFilter = category;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  filterCars();
}

function filterCars() {
  const query = carSearch.value.toLowerCase().trim();
  const cards = carGrid.querySelectorAll('.car-card');
  cards.forEach(card => {
    const cat = card.dataset.category;
    const carData = cars.find(c => c.id == card.dataset.id);
    const matchesCategory = State.currentFilter === 'all' || cat === State.currentFilter;
    const matchesSearch = !query || carData.brand.toLowerCase().includes(query) || carData.category.toLowerCase().includes(query);
    card.style.display = matchesCategory && matchesSearch ? 'block' : 'none';
  });
}

// ===== CAR SELECTION → RIGHT PANEL (Step 5) =====
function selectCar(car) {
  State.selectedCar = car;
  State.bookingStep = 5;
  renderCarDetails(car);
}

function renderCarDetails(car) {
  panelPlaceholder.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelContent.classList.add('active');

  const fullStars = Math.floor(car.rating);
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) starsHtml += '★';
    else starsHtml += '☆';
  }

  // Use actual image if available, otherwise SVG placeholder
  const carImageHtml = car.image 
    ? `<img src="${car.image}" alt="${car.brand}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`
    : `<svg width="100" height="100" viewBox="0 0 80 80" fill="none">
      <rect x="10" y="30" width="60" height="25" rx="6" fill="#06B6D4" opacity="0.3"/>
      <path d="M15 50L20 38L30 32H50L60 38L65 50H58L54 45H26L22 50H15Z" fill="#06B6D4" opacity="0.5"/>
      <circle cx="28" cy="52" r="7" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5"/>
      <circle cx="52" cy="52" r="7" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5"/>
    </svg>`;

  panelContent.innerHTML = `
    <div class="panel-header">
      <div class="panel-title">${car.brand}</div>
      <button class="panel-close" onclick="closePanel()">✕</button>
    </div>
    <div class="detail-car-image">${carImageHtml}</div>
    <div style="display:flex;align-items:center;gap:4px;margin-bottom:16px;font-size:14px;color:#F59E0B;">
      ${starsHtml} <span style="color:#94A3B8;margin-left:4px;">${car.rating} (${car.reviews} reviews)</span>
    </div>
    <div class="detail-section">
      <h4>Specifications</h4>
      <div class="detail-row"><span class="detail-label">Plate Number</span><span class="detail-value">${car.plate}</span></div>
      <div class="detail-row"><span class="detail-label">Fuel Type</span><span class="detail-value">${car.fuel}</span></div>
      <div class="detail-row"><span class="detail-label">Seats</span><span class="detail-value">${car.seats} Seats</span></div>
      <div class="detail-row"><span class="detail-label">Transmission</span><span class="detail-value">${car.transmission}</span></div>
      <div class="detail-row"><span class="detail-label">Owner</span><span class="detail-value">${car.owner}</span></div>
      <div class="detail-row"><span class="detail-label">Contact</span><span class="detail-value">${car.contact}</span></div>
    </div>
    <div class="detail-section">
      <h4>Pickup Address</h4>
      <div class="detail-address">${car.address}</div>
    </div>
    <button class="btn-block neon-btn" onclick="goToPayment()">Book Now</button>
  `;
}

function closePanel() {
  panelContent.classList.add('hidden');
  panelContent.classList.remove('active');
  panelPlaceholder.classList.remove('hidden');
  panelContent.innerHTML = '';
  State.selectedCar = null;
}

// ===== STEP 6: REVIEW & PAYMENT =====
function goToPayment() {
  State.bookingStep = 6;
  const car = State.selectedCar;
  const rentalFee = car ? car.price : 0;
  const serviceFee = Math.round(rentalFee * 0.1);
  const total = rentalFee + serviceFee;

  panelContent.innerHTML = `
    <div class="panel-header">
      <div class="panel-title">Review & Payment</div>
      <button class="panel-close" onclick="closePanel()">✕</button>
    </div>
    <div class="trip-summary">
      <h4>Trip Summary</h4>
      <div class="cost-row"><span class="cost-label">${car ? car.brand : 'Vehicle'}</span><span class="cost-value">1 day</span></div>
      <div class="cost-row"><span class="cost-label">Rental Fee</span><span class="cost-value">₱${rentalFee.toLocaleString()}</span></div>
      <div class="cost-row"><span class="cost-label">Service Fee (10%)</span><span class="cost-value">₱${serviceFee.toLocaleString()}</span></div>
      <div class="cost-row"><span class="cost-label">Total Amount</span><span class="cost-value">₱${total.toLocaleString()}</span></div>
    </div>
    <div class="detail-section">
      <h4>Payment Method</h4>
      <div class="payment-options">
        <label class="payment-option ${State.selectedPayment === 'gcash' ? 'selected' : ''}">
          <input type="radio" name="payment" value="gcash" ${State.selectedPayment === 'gcash' ? 'checked' : ''} onchange="selectPayment('gcash', this)"> GCash
        </label>
        <label class="payment-option ${State.selectedPayment === 'maya' ? 'selected' : ''}">
          <input type="radio" name="payment" value="maya" ${State.selectedPayment === 'maya' ? 'checked' : ''} onchange="selectPayment('maya', this)"> Maya
        </label>
        <label class="payment-option ${State.selectedPayment === 'card' ? 'selected' : ''}">
          <input type="radio" name="payment" value="card" ${State.selectedPayment === 'card' ? 'checked' : ''} onchange="selectPayment('card', this)"> Credit / Debit Card
        </label>
        <label class="payment-option ${State.selectedPayment === 'cash' ? 'selected' : ''}">
          <input type="radio" name="payment" value="cash" ${State.selectedPayment === 'cash' ? 'checked' : ''} onchange="selectPayment('cash', this)"> Pay on Location (Cash to Owner)
        </label>
      </div>
    </div>
    <button class="btn-block neon-btn" onclick="processPayment()">Confirm and Pay</button>
  `;
}

function selectPayment(val, el) {
  State.selectedPayment = val;
  document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
  el.closest('.payment-option').classList.add('selected');
}

function processPayment() {
  panelContent.innerHTML = `
    <div class="panel-header">
      <div class="panel-title">Processing Payment</div>
    </div>
    <div class="loading-state">
      <div class="spinner"></div>
      <p style="color:#94A3B8;">Waiting for Confirmation...</p>
    </div>
  `;

  setTimeout(() => {
    panelContent.innerHTML = `
      <div class="panel-header">
        <div class="panel-title">Payment Confirmed</div>
        <button class="panel-close" onclick="closePanel()">✕</button>
      </div>
      <div class="confirmed-box">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#10B981" stroke-width="2" fill="none"/>
          <path d="M13 20L18 25L27 15" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div>Confirmed by Host</div>
      </div>
      <div class="trip-summary">
        <h4>Booking Reference</h4>
        <div class="cost-row"><span class="cost-label">Reference #</span><span class="cost-value">EGR-${Math.random().toString(36).substr(2, 8).toUpperCase()}</span></div>
        <div class="cost-row"><span class="cost-label">Status</span><span class="cost-value" style="color:#10B981;">Confirmed</span></div>
      </div>
      <button class="btn-block neon-btn" onclick="goToMap()">Next</button>
    `;
    State.bookingActive = true;
    activeBookingPill.classList.remove('hidden');
  }, 2000);
}

// ===== STEP 7: MAP / ROUTE GUIDANCE =====
function goToMap() {
  State.bookingStep = 7;
  panelContent.innerHTML = `
    <div class="panel-header">
      <div class="panel-title">Route Guidance</div>
      <button class="panel-close" onclick="closePanel()">✕</button>
    </div>
    <div class="map-container">
      <div class="map-grid">
        <div class="map-route"></div>
        <div class="map-pin start">📍</div>
        <div class="map-pin end">🏁</div>
      </div>
    </div>
    <div class="tracking-text">5 mins away (450m)</div>
    <div class="detail-section">
      <h4>Pickup Location</h4>
      <div class="detail-address">${State.selectedCar ? State.selectedCar.address : ''}</div>
    </div>
    <button class="btn-block neon-btn" onclick="goToRating()">I'm Here</button>
  `;
}

// ===== STEP 8: RATING & RETURN REVIEW =====
function goToRating() {
  State.bookingStep = 8;
  panelContent.innerHTML = `
    <div class="panel-header">
      <div class="panel-title">Return & Review</div>
      <button class="panel-close" onclick="closePanel()">✕</button>
    </div>
    <div class="success-banner">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#10B981" stroke-width="2" fill="none"/>
        <path d="M16 24L21 29L32 18" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h3>Car Successfully Returned!</h3>
    </div>
    <div class="detail-section">
      <h4>Rate Your Experience</h4>
      <div class="stars-container" id="rating-stars">
        <span class="star" data-val="1" onmouseover="hoverStar(1)" onmouseout="resetStars()" onclick="setRating(1)">★</span>
        <span class="star" data-val="2" onmouseover="hoverStar(2)" onmouseout="resetStars()" onclick="setRating(2)">★</span>
        <span class="star" data-val="3" onmouseover="hoverStar(3)" onmouseout="resetStars()" onclick="setRating(3)">★</span>
        <span class="star" data-val="4" onmouseover="hoverStar(4)" onmouseout="resetStars()" onclick="setRating(4)">★</span>
        <span class="star" data-val="5" onmouseover="hoverStar(5)" onmouseout="resetStars()" onclick="setRating(5)">★</span>
      </div>
    </div>
    <div class="detail-section">
      <h4>Leave a Review</h4>
      <textarea class="review-textarea" id="review-text" placeholder="Share your experience..."></textarea>
    </div>
    <button class="btn-block neon-btn" onclick="submitReview()">Submit Review</button>
  `;
  State.ratingGiven = 0;
}

function hoverStar(val) {
  const stars = document.querySelectorAll('.star');
  stars.forEach(s => {
    const sv = parseInt(s.dataset.val);
    s.classList.toggle('active', sv <= val);
  });
}

function resetStars() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(s => {
    const sv = parseInt(s.dataset.val);
    s.classList.toggle('active', sv <= State.ratingGiven);
  });
}

function setRating(val) {
  State.ratingGiven = val;
  resetStars();
}

function submitReview() {
  // Reset booking state
  State.bookingActive = false;
  State.bookingStep = 0;
  State.selectedCar = null;
  activeBookingPill.classList.add('hidden');
  closePanel();
  // Show brief confirmation
  const original = greetingText.textContent;
  greetingText.textContent = 'Review submitted! Thank you!';
  setTimeout(() => {
    greetingText.textContent = original;
  }, 2000);
}

// ===== SHOW ACTIVE BOOKING =====
function showActiveBooking() {
  if (!State.selectedCar && State.bookingActive) {
    // If we lost the selected car but booking is active, restart from map
    goToMap();
    return;
  }
  if (State.selectedCar) {
    if (State.bookingStep === 5 || !State.bookingStep) {
      renderCarDetails(State.selectedCar);
    } else if (State.bookingStep === 6) {
      goToPayment();
    } else if (State.bookingStep === 7) {
      goToMap();
    } else if (State.bookingStep === 8) {
      goToRating();
    }
  }
}

// ===== PROFILE PANEL =====
function openProfilePanel() {
  const initial = State.nickname.charAt(0).toUpperCase();
  const licenseHtml = State.profileData.licenseImage
    ? `<img src="${State.profileData.licenseImage}" alt="Driver's License">`
    : '<p style="color:#64748B;font-size:13px;">No image selected</p>';

  panelPlaceholder.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelContent.classList.add('active');

  panelContent.innerHTML = `
    <div class="panel-header">
      <div class="panel-title">My Profile</div>
      <button class="panel-close" onclick="closePanel()">✕</button>
    </div>
    <div class="profile-header">
      <div class="profile-avatar-large">${initial}</div>
      <div class="profile-name">${State.nickname}</div>
      <div class="verified-badge">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#10B981" stroke-width="2"/></svg>
        Verified
      </div>
    </div>
    <div class="profile-field">
      <label>Home Address</label>
      <input type="text" id="profile-address" placeholder="Where are you from?" value="${State.profileData.address}">
    </div>
    <div class="profile-field">
      <label>Birthday</label>
      <input type="date" id="profile-birthday" value="${State.profileData.birthday}">
    </div>
    <div class="profile-field">
      <label>Age</label>
      <input type="number" id="profile-age" placeholder="Your age" value="${State.profileData.age}" min="18" max="120">
    </div>
    <div class="profile-field">
      <label>Driver's License Photo</label>
      <input type="file" id="license-upload" accept="image/*" onchange="handleLicenseUpload(event)">
      <div class="driver-license-preview" id="license-preview">
        ${licenseHtml}
      </div>
    </div>
    <button class="btn-save" onclick="saveProfile()">Save & Back</button>
    <button class="btn-logout" onclick="logout()">LOGOUT</button>
  `;
}

function handleLicenseUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      State.profileData.licenseImage = event.target.result;
      const preview = document.getElementById('license-preview');
      if (preview) {
        preview.innerHTML = `<img src="${event.target.result}" alt="Driver's License">`;
      }
    };
    reader.readAsDataURL(file);
  }
}

function saveProfile() {
  const addr = document.getElementById('profile-address');
  const bday = document.getElementById('profile-birthday');
  const age = document.getElementById('profile-age');
  if (addr) State.profileData.address = addr.value;
  if (bday) State.profileData.birthday = bday.value;
  if (age) State.profileData.age = age.value;
  closePanel();
}

// ===== LOGOUT =====
function logout() {
  State.currentUser = null;
  State.nickname = '';
  State.selectedCar = null;
  State.bookingActive = false;
  State.bookingStep = 0;
  State.ratingGiven = 0;
  State.profileData = { address: '', birthday: '', age: '', licenseImage: null };
  State.currentFilter = 'all';
  State.selectedPayment = 'gcash';
  activeBookingPill.classList.add('hidden');
  closePanel();
  emailInput.value = '';
  passwordInput.value = '';
  nameInput.value = '';
  showScreen(loginScreen);
}

// ===== NAVIGATION TABS =====
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    this.classList.add('active');
    const tab = this.dataset.tab;
    if (tab === 'dashboard') {
      // Already on dashboard
    } else if (tab === 'profile') {
      openProfilePanel();
    } else if (tab === 'bookings') {
      showBookingsPanel();
    } else if (tab === 'return-car') {
      if (State.bookingActive) {
        goToRating();
      } else {
        panelPlaceholder.classList.add('hidden');
        panelContent.classList.remove('hidden');
        panelContent.classList.add('active');
        panelContent.innerHTML = `
          <div class="panel-header">
            <div class="panel-title">Return Car</div>
            <button class="panel-close" onclick="closePanel()">✕</button>
          </div>
          <p style="color:#94A3B8;text-align:center;padding:40px 0;">No active rental to return.</p>
        `;
      }
    }
  });
});

// ===== BOOKINGS PANEL =====
function showBookingsPanel() {
  panelPlaceholder.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelContent.classList.add('active');

  if (State.bookingActive) {
    const ref = 'EGR-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    panelContent.innerHTML = `
      <div class="panel-header">
        <div class="panel-title">My Bookings</div>
        <button class="panel-close" onclick="closePanel()">✕</button>
      </div>
      <div style="background:rgba(6,182,212,0.1);border:1px solid rgba(6,182,212,0.2);border-radius:12px;padding:16px;margin-bottom:12px;">
        <div style="font-size:14px;font-weight:600;color:#06B6D4;margin-bottom:8px;">Active Booking</div>
        <div style="font-size:13px;color:#94A3B8;">${State.selectedCar ? State.selectedCar.brand : 'Vehicle'}</div>
        <div style="font-size:13px;color:#94A3B8;">Ref: ${ref}</div>
        <div style="font-size:12px;color:#10B981;margin-top:6px;">● Confirmed</div>
      </div>
      <button class="btn-block neon-btn" onclick="showActiveBooking()">View Details</button>
    `;
  } else {
    panelContent.innerHTML = `
      <div class="panel-header">
        <div class="panel-title">My Bookings</div>
        <button class="panel-close" onclick="closePanel()">✕</button>
      </div>
      <p style="color:#94A3B8;text-align:center;padding:40px 0;">No bookings yet. Browse cars to start renting!</p>
    `;
  }
}

// ===== KEYBOARD SUPPORT =====
loginScreen.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') loginBtn.click();
});

// ===== ENTER KEY FOR SEARCH =====
carSearch.addEventListener('keyup', (e) => {
  filterCars();
});

// ===== INITIAL RENDER =====
// Pre-populate car grid when app loads
document.addEventListener('DOMContentLoaded', () => {
  renderCarGrid();
});