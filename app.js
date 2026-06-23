// Application State Manager for BudgetCal
const AppState = {
  username: 'Jessica Doe',
  dailyTarget: 2200,
  waterIntake: 1.8,
  freeScansUsed: 2, // Matches the mockup screen default (2 of 3 used)
  isPremium: false,
  layoutMode: 'scan',
  isProfiled: false, // Set to false to trigger onboarding profiling form on initial run!
  age: 20,
  gender: 'male',
  activityLevel: 1,
  height: 170,
  weight: 60,
  selectedGroceryIds: [], // Track check status for Grocery List
  logs: [
    {
      id: 1,
      name: 'Rice & Black Beans Bowl',
      calories: 480,
      protein: 14,
      carbs: 78,
      fats: 8,
      fiber: 9,
      time: 'Today, 1:24 PM',
      timestamp: Date.now() - 2 * 60 * 60 * 1000
    },
    {
      id: 2,
      name: 'Egg & Spinach Scramble Toast',
      calories: 290,
      protein: 18,
      carbs: 20,
      fats: 15,
      fiber: 3,
      time: 'Yesterday, 8:45 AM',
      timestamp: Date.now() - 27 * 60 * 60 * 1000
    }
  ],
  // Pre-filled history items
  history: {
    october: [
      { id: 101, date: 'Oct 24, 2023', time: '08:45 AM', calories: 2450, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=100&h=100' },
      { id: 102, date: 'Oct 15, 2023', time: '07:12 AM', calories: 2510, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=100&h=100' },
      { id: 103, date: 'Oct 02, 2023', time: '09:30 AM', calories: 2480, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=100&h=100' }
    ],
    september: [
      { id: 201, date: 'Sep 20, 2023', time: '07:05 AM', calories: 2600, img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=100&h=100' },
      { id: 202, date: 'Sep 05, 2023', time: '08:22 AM', calories: 2585, img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=100&h=100' }
    ]
  }
};

// Database of Student Budget Recipes (Under $2)
const BUDGET_MEALS = [
  {
    id: 'bm-1',
    name: 'Oatmeal w/ Banana & Peanut Butter',
    price: '$1.20',
    calories: 380,
    protein: 10,
    carbs: 55,
    fats: 14,
    img: 'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&q=80&w=150&h=100'
  },
  {
    id: 'bm-2',
    name: 'Egg & Spinach Scramble Toast',
    price: '$1.50',
    calories: 290,
    protein: 18,
    carbs: 20,
    fats: 15,
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=150&h=100'
  },
  {
    id: 'bm-3',
    name: 'Rice & Black Beans Bowl',
    price: '$1.80',
    calories: 480,
    protein: 14,
    carbs: 78,
    fats: 8,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150&h=100'
  },
  {
    id: 'bm-4',
    name: 'Tuna Salad Lettuce Wraps',
    price: '$1.95',
    calories: 310,
    protein: 26,
    carbs: 8,
    fats: 18,
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=150&h=100'
  }
];

// Database of Low-Budget, Low-Calorie Groceries
const GROCERY_ITEMS = [
  { id: 'gr-1', name: 'Telur Ayam (6 butir)', price: 1.20, calories: 420, detail: 'Sumber protein murah berkualitas' },
  { id: 'gr-2', name: 'Tahu Putih Sutra (300g)', price: 0.80, calories: 225, detail: 'Sangat rendah kalori & tinggi protein nabati' },
  { id: 'gr-3', name: 'Tempe Block (200g)', price: 0.95, calories: 380, detail: 'Padat nutrisi, berserat tinggi & murah' },
  { id: 'gr-4', name: 'Rolled Oats (500g)', price: 1.50, calories: 1850, detail: 'Karbohidrat kompleks pengenyang lama' },
  { id: 'gr-5', name: 'Bayam Segar (1 ikat)', price: 0.75, calories: 45, detail: 'Kaya zat besi & vitamin, super rendah kalori' },
  { id: 'gr-6', name: 'Tuna Kaleng (in Water)', price: 1.85, calories: 180, detail: 'Protein murni, praktis tanpa lemak tambahan' },
  { id: 'gr-7', name: 'Greek Yogurt Plain (500g)', price: 1.90, calories: 295, detail: 'Tinggi kalsium & protein, bagus untuk pencernaan' },
  { id: 'gr-8', name: 'Dada Ayam Fillet (250g)', price: 1.95, calories: 275, detail: 'Sumber protein hewani paling populer untuk diet' }
];

// Database of Simulated Food Items for Scanner
const SIMULATED_FOODS = [
  {
    name: 'Instant Noodle w/ Egg',
    calories: 420,
    protein: 12,
    carbs: 58,
    fats: 16,
    fiber: 2,
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Peanut Butter Jelly Sandwich',
    calories: 350,
    protein: 9,
    carbs: 48,
    fats: 14,
    fiber: 4,
    img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Boiled Egg & Potatoes',
    calories: 280,
    protein: 10,
    carbs: 38,
    fats: 10,
    fiber: 3,
    img: 'https://images.unsplash.com/photo-1511117496869-d93333333333?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Canned Chili Rice Cup',
    calories: 520,
    protein: 22,
    carbs: 74,
    fats: 15,
    fiber: 8,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

// Document Elements
const DOM = {
  screens: {
    home: document.getElementById('screen-home'),
    insights: document.getElementById('screen-insights'),
    shopping: document.getElementById('screen-shopping'), // Added Shopping screen
    history: document.getElementById('screen-history'),
    profile: document.getElementById('screen-profile')
  },
  tabs: {
    home: document.getElementById('tab-home'),
    scan: document.getElementById('tab-scan'),
    shopping: document.getElementById('tab-shopping'), // Added Shopping tab
    history: document.getElementById('tab-history'),
    profile: document.getElementById('tab-profile')
  },
  tabScanLabel: document.getElementById('tab-scan-label'),
  scanBarcodeIcon: document.getElementById('nav-scan-barcode-icon'),
  scanListIcon: document.getElementById('nav-scan-list-icon'),
  headerAvatarBtn: document.getElementById('header-avatar-btn'),
  headerPremiumDot: document.getElementById('header-premium-dot'),
  headerSettingsBtn: document.getElementById('header-settings-btn'),
  statusTime: document.getElementById('status-time'),

  // Home Screen Elements
  usernameDisplays: document.querySelectorAll('.username-display'),
  targetCaloriesText: document.getElementById('target-calories-text'),
  remainingCaloriesText: document.getElementById('remaining-calories-text'),
  homeProgressBar: document.getElementById('home-progress-bar'),
  macroProteinPct: document.getElementById('macro-protein-pct'),
  macroProteinWeight: document.getElementById('macro-protein-weight'),
  macroCarbsPct: document.getElementById('macro-carbs-pct'),
  macroCarbsWeight: document.getElementById('macro-carbs-weight'),
  macroFatsWeight: document.getElementById('macro-fats-weight'),
  macroFiberWeight: document.getElementById('macro-fiber-weight'),
  waterTrackerCard: document.getElementById('water-tracker-card'),
  waterIntakeText: document.getElementById('water-intake-text'),
  waterWaveFill: document.getElementById('water-wave-fill'),
  scanBannerBtn: document.getElementById('scan-banner-btn'),
  inputBannerBtn: document.getElementById('input-banner-btn'),
  recentActivityList: document.getElementById('home-recent-activity-list'),
  btnViewAll: document.getElementById('btn-view-all'),
  budgetMealsList: document.getElementById('budget-meals-list'),

  // Shopping Screen Elements
  groceryItemsList: document.getElementById('grocery-items-list'),
  shoppingTotalCost: document.getElementById('shopping-total-cost'),
  shoppingTotalCalories: document.getElementById('shopping-total-calories'),
  btnClearGrocery: document.getElementById('btn-clear-grocery'),

  // Insights Screen Elements
  insightsTargetVal: document.getElementById('insights-target-val'),
  insightsActiveBurn: document.getElementById('insights-active-burn'),
  insightsBmr: document.getElementById('insights-bmr'),
  insightsAvgIntake: document.getElementById('insights-avg-intake'),
  freeLimitBadgeCard: document.getElementById('free-limit-badge-card'),
  freeCheckCounter: document.getElementById('free-check-counter'),
  btnCheckCalorieData: document.getElementById('btn-check-calorie-data'),

  // History Screen Elements
  historyItemsOctober: document.getElementById('history-items-october'),
  historyItemsSeptember: document.getElementById('history-items-september'),
  trendAvgCalories: document.getElementById('trend-avg-calories'),
  trendConsistency: document.getElementById('trend-consistency'),
  trendConsistencyFill: document.getElementById('trend-consistency-fill'),

  // Profile Screen Elements
  profileAvatarDisplay: document.getElementById('profile-avatar-display'),
  profileNameText: document.getElementById('profile-name-text'),
  profilePremiumBadge: document.getElementById('profile-premium-status-badge'),
  profileFreeBadge: document.getElementById('profile-free-status-badge'),
  inputDailyTarget: document.getElementById('input-daily-target'),
  inputUsername: document.getElementById('input-username'),
  layoutModeSelector: document.getElementById('layout-mode-selector'),
  btnSaveProfile: document.getElementById('btn-save-profile'),
  btnTriggerReprofile: document.getElementById('btn-trigger-reprofile'),
  premiumPromoPanel: document.getElementById('premium-promo-panel'),
  premiumActivePanel: document.getElementById('premium-active-panel'),
  btnPromoGoPremium: document.getElementById('btn-promo-go-premium'),
  btnResetApp: document.getElementById('btn-reset-app'),
  btnEditAvatar: document.getElementById('btn-edit-avatar'),

  // Overlays / Modals
  overlays: {
    limitReached: document.getElementById('overlay-limit-reached'),
    scanSimulator: document.getElementById('overlay-scan-simulator'),
    manualInput: document.getElementById('overlay-manual-input'),
    premiumCelebration: document.getElementById('overlay-premium-celebration'),
    onboarding: document.getElementById('overlay-onboarding')
  },
  
  // Close / action buttons in overlays
  btnCloseLimitSheet: document.getElementById('btn-close-limit-sheet'),
  btnUnlockUnlimited: document.getElementById('btn-unlock-unlimited'),
  btnCancelScan: document.getElementById('btn-cancel-scan'),
  capturedMealBox: document.getElementById('captured-meal-box'),
  capturedMealImg: document.getElementById('captured-meal-img'),
  scannerStatusText: document.getElementById('scanner-status-text'),
  scannerResultSheet: document.getElementById('scanner-result-sheet'),
  recognizedFoodImg: document.getElementById('recognized-food-img'),
  recognizedFoodName: document.getElementById('recognized-food-name'),
  recognizedFoodCalories: document.getElementById('recognized-food-calories'),
  recProtein: document.getElementById('recognized-protein'),
  recCarbs: document.getElementById('recognized-carbs'),
  recFats: document.getElementById('recognized-fats'),
  btnAddRecognizedFood: document.getElementById('btn-add-recognized-food'),
  btnRetryScan: document.getElementById('btn-retry-scan'),
  btnCloseManualDialog: document.getElementById('btn-close-manual-dialog'),
  manualFoodForm: document.getElementById('manual-food-form'),
  btnSubmitManualFood: document.getElementById('btn-submit-manual-food'),
  btnCloseCelebration: document.getElementById('btn-close-celebration'),
  confettiContainer: document.getElementById('confetti-container'),

  // Onboarding profiling form
  onboardingForm: document.getElementById('onboarding-profile-form'),
  profileAge: document.getElementById('profile-age'),
  genderMale: document.getElementById('gender-male'),
  genderFemale: document.getElementById('gender-female'),
  profileHeight: document.getElementById('profile-height'),
  profileWeight: document.getElementById('profile-weight'),
  profileActivity: document.getElementById('profile-activity'),
  activityValueText: document.getElementById('activity-value-text'),
  btnCalculateCalories: document.getElementById('btn-calculate-calories'),

  // Toast
  toastNotify: document.getElementById('toast-notify')
};

// Global simulated food scan holder
let activeScannedFood = null;

// Initialize app config
function init() {
  loadLocalStorage();
  updateTime();
  setInterval(updateTime, 60000);
  setupEventListeners();
  renderApp();
  
  if (!AppState.isProfiled) {
    openOverlay('onboarding');
  }
}

// Update the phone status bar time
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  DOM.statusTime.textContent = `${hours}:${minutes}`;
}

// Local Storage Handlers
function loadLocalStorage() {
  const savedState = localStorage.getItem('budgetcal_state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      AppState.username = parsed.username || AppState.username;
      AppState.dailyTarget = Number(parsed.dailyTarget) || AppState.dailyTarget;
      AppState.waterIntake = Number(parsed.waterIntake) !== undefined ? Number(parsed.waterIntake) : AppState.waterIntake;
      AppState.freeScansUsed = Number(parsed.freeScansUsed) !== undefined ? Number(parsed.freeScansUsed) : AppState.freeScansUsed;
      AppState.isPremium = parsed.isPremium || false;
      AppState.layoutMode = parsed.layoutMode || AppState.layoutMode;
      AppState.isProfiled = parsed.isProfiled !== undefined ? parsed.isProfiled : AppState.isProfiled;
      AppState.age = Number(parsed.age) || AppState.age;
      AppState.gender = parsed.gender || AppState.gender;
      AppState.activityLevel = Number(parsed.activityLevel) || AppState.activityLevel;
      AppState.height = Number(parsed.height) || AppState.height;
      AppState.weight = Number(parsed.weight) || AppState.weight;
      AppState.selectedGroceryIds = parsed.selectedGroceryIds || AppState.selectedGroceryIds;
      AppState.logs = parsed.logs || AppState.logs;
    } catch (e) {
      console.error('Failed to load local storage state', e);
    }
  }
}

function saveLocalStorage() {
  localStorage.setItem('budgetcal_state', JSON.stringify({
    username: AppState.username,
    dailyTarget: AppState.dailyTarget,
    waterIntake: AppState.waterIntake,
    freeScansUsed: AppState.freeScansUsed,
    isPremium: AppState.isPremium,
    layoutMode: AppState.layoutMode,
    isProfiled: AppState.isProfiled,
    age: AppState.age,
    gender: AppState.gender,
    activityLevel: AppState.activityLevel,
    height: AppState.height,
    weight: AppState.weight,
    selectedGroceryIds: AppState.selectedGroceryIds,
    logs: AppState.logs
  }));
}

// Reset data (demo capability)
function resetApp() {
  localStorage.removeItem('budgetcal_state');
  location.reload();
}

// Toast helper
function showToast(message) {
  DOM.toastNotify.textContent = message;
  DOM.toastNotify.classList.add('show');
  setTimeout(() => {
    DOM.toastNotify.classList.remove('show');
  }, 2500);
}

// Router: Change active screen
function navigateTo(screenId) {
  if (screenId === 'scan') {
    if (AppState.layoutMode === 'scan') {
      openCameraScanner();
    } else {
      openManualInputModal();
    }
    return;
  }

  Object.keys(DOM.screens).forEach(key => {
    DOM.screens[key].classList.remove('active');
  });

  Object.keys(DOM.tabs).forEach(key => {
    DOM.tabs[key].classList.remove('active');
  });

  if (DOM.screens[screenId]) {
    DOM.screens[screenId].classList.add('active');
  }
  if (DOM.tabs[screenId]) {
    DOM.tabs[screenId].classList.add('active');
  }

  const mainScroll = document.querySelector('.app-main-content');
  if (mainScroll) mainScroll.scrollTop = 0;
}

// Event Listeners setup
function setupEventListeners() {
  Object.keys(DOM.tabs).forEach(key => {
    DOM.tabs[key].addEventListener('click', () => navigateTo(key));
  });

  DOM.headerAvatarBtn.addEventListener('click', () => navigateTo('profile'));
  DOM.headerSettingsBtn.addEventListener('click', () => navigateTo('profile'));

  DOM.scanBannerBtn.addEventListener('click', openCameraScanner);
  DOM.inputBannerBtn.addEventListener('click', openManualInputModal);

  DOM.waterTrackerCard.addEventListener('click', trackWater);

  DOM.btnCloseLimitSheet.addEventListener('click', () => closeOverlay('limitReached'));
  DOM.btnCloseManualDialog.addEventListener('click', () => closeOverlay('manualInput'));
  DOM.btnCancelScan.addEventListener('click', closeCameraScanner);

  DOM.btnRetryScan.addEventListener('click', startSimulatedScanProcess);
  DOM.btnAddRecognizedFood.addEventListener('click', logScannedFood);

  DOM.btnUnlockUnlimited.addEventListener('click', triggerUnlockPremium);
  DOM.btnPromoGoPremium.addEventListener('click', triggerUnlockPremium);
  DOM.btnCloseCelebration.addEventListener('click', closeCelebration);

  DOM.manualFoodForm.addEventListener('submit', logManualFood);
  DOM.btnSaveProfile.addEventListener('click', saveProfileSettings);
  DOM.btnResetApp.addEventListener('click', resetApp);
  DOM.btnViewAll.addEventListener('click', () => navigateTo('history'));

  DOM.btnClearGrocery.addEventListener('click', () => {
    AppState.selectedGroceryIds = [];
    saveLocalStorage();
    renderApp();
    showToast('Grocery basket reset');
  });

  DOM.btnTriggerReprofile.addEventListener('click', () => {
    DOM.profileAge.value = AppState.age;
    DOM.profileHeight.value = AppState.height;
    DOM.profileWeight.value = AppState.weight;
    DOM.profileActivity.value = AppState.activityLevel;
    updateActivityDisplay(AppState.activityLevel);
    
    if (AppState.gender === 'male') {
      DOM.genderMale.classList.add('active');
      DOM.genderFemale.classList.remove('active');
    } else {
      DOM.genderFemale.classList.add('active');
      DOM.genderMale.classList.remove('active');
    }

    openOverlay('onboarding');
  });

  DOM.btnCheckCalorieData.addEventListener('click', () => {
    if (AppState.freeScansUsed >= 3 && !AppState.isPremium) {
      openOverlay('limitReached');
    } else {
      openCameraScanner();
    }
  });

  DOM.btnEditAvatar.addEventListener('click', () => {
    const urls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    ];
    const currentSrc = DOM.profileAvatarDisplay.src;
    let nextIndex = urls.indexOf(currentSrc) + 1;
    if (nextIndex >= urls.length || nextIndex === 0) nextIndex = 0;
    DOM.profileAvatarDisplay.src = urls[nextIndex];
    document.getElementById('header-avatar').src = urls[nextIndex];
    showToast('Profile photo updated!');
  });

  DOM.genderMale.addEventListener('click', () => {
    DOM.genderMale.classList.add('active');
    DOM.genderFemale.classList.remove('active');
    AppState.gender = 'male';
  });

  DOM.genderFemale.addEventListener('click', () => {
    DOM.genderFemale.classList.add('active');
    DOM.genderMale.classList.remove('active');
    AppState.gender = 'female';
  });

  DOM.profileActivity.addEventListener('input', (e) => {
    updateActivityDisplay(parseInt(e.target.value));
  });

  DOM.onboardingForm.addEventListener('submit', calculateCaloriesOnboarding);
}

function updateActivityDisplay(val) {
  const levels = ['Sedentary', 'Lightly Active', 'Active', 'Very Active'];
  DOM.activityValueText.textContent = levels[val - 1] || 'Sedentary';
}

// Mifflin-St Jeor Calorie Calculation
function calculateCaloriesOnboarding(e) {
  e.preventDefault();

  const age = parseInt(DOM.profileAge.value);
  const height = parseInt(DOM.profileHeight.value);
  const weight = parseInt(DOM.profileWeight.value);
  const activityVal = parseInt(DOM.profileActivity.value);
  const gender = AppState.gender;

  if (isNaN(age) || isNaN(height) || isNaN(weight)) {
    alert('Please enter valid numerical values.');
    return;
  }

  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const factors = [1.2, 1.375, 1.55, 1.725];
  const factor = factors[activityVal - 1] || 1.2;
  const tdee = Math.round(bmr * factor);

  AppState.age = age;
  AppState.height = height;
  AppState.weight = weight;
  AppState.activityLevel = activityVal;
  AppState.dailyTarget = tdee;
  AppState.isProfiled = true;

  saveLocalStorage();
  renderApp();
  closeOverlay('onboarding');
  showToast(`Profile set! Target: ${tdee} kcal/Day`);
}

// Modal overlays
function openOverlay(overlayId) {
  if (DOM.overlays[overlayId]) {
    DOM.overlays[overlayId].classList.add('open');
  }
}

function closeOverlay(overlayId) {
  if (DOM.overlays[overlayId]) {
    DOM.overlays[overlayId].classList.remove('open');
  }
}

// Water tracker handler
function trackWater() {
  AppState.waterIntake = parseFloat((AppState.waterIntake + 0.25).toFixed(2));
  if (AppState.waterIntake > 5.0) AppState.waterIntake = 0.0;
  saveLocalStorage();
  renderWaterSection();
  showToast('Water logged: +250ml');
}

// Profile settings save handler
function saveProfileSettings() {
  const newTarget = parseInt(DOM.inputDailyTarget.value);
  const newName = DOM.inputUsername.value.trim();
  const selectedMode = DOM.layoutModeSelector.value;

  if (isNaN(newTarget) || newTarget < 100) {
    alert('Please enter a valid daily target calorie count.');
    return;
  }

  if (newName === '') {
    alert('Please enter a display name.');
    return;
  }

  AppState.dailyTarget = newTarget;
  AppState.username = newName;
  AppState.layoutMode = selectedMode;

  saveLocalStorage();
  renderApp();
  showToast('Profile targets saved!');
}

// Premium Upgrade simulation
function triggerUnlockPremium() {
  closeOverlay('limitReached');
  AppState.isPremium = true;
  AppState.freeScansUsed = 0;
  saveLocalStorage();
  renderApp();

  openOverlay('premiumCelebration');
  startConfettiAnimation();
}

function closeCelebration() {
  closeOverlay('premiumCelebration');
  stopConfettiAnimation();
}

let confettiIntervalId = null;
function startConfettiAnimation() {
  DOM.confettiContainer.innerHTML = '';
  const colors = ['#00C964', '#FFD700', '#FF4500', '#1E90FF', '#FF1493', '#ADFF2F'];
  
  confettiIntervalId = setInterval(() => {
    const p = document.createElement('div');
    p.classList.add('confetti-particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = Math.random() * 8 + 4 + 'px';
    p.style.height = Math.random() * 8 + 4 + 'px';
    p.style.animationDuration = Math.random() * 2 + 1 + 's';
    
    DOM.confettiContainer.appendChild(p);
    
    setTimeout(() => {
      p.remove();
    }, 3000);
  }, 100);
}

// Camera Simulator Overlay
function openCameraScanner() {
  if (AppState.freeScansUsed >= 3 && !AppState.isPremium) {
    openOverlay('limitReached');
    return;
  }

  openOverlay('scanSimulator');
  startSimulatedScanProcess();
}

function closeCameraScanner() {
  closeOverlay('scanSimulator');
  DOM.capturedMealBox.classList.add('hidden');
  DOM.scannerResultSheet.classList.remove('open');
  activeScannedFood = null;
}

// Scanner Process Simulation
function startSimulatedScanProcess() {
  DOM.capturedMealBox.classList.add('hidden');
  DOM.scannerResultSheet.classList.remove('open');
  DOM.scannerStatusText.textContent = 'Align meal in frame...';
  activeScannedFood = null;

  setTimeout(() => {
    if (!DOM.overlays.scanSimulator.classList.contains('open')) return;
    
    const index = Math.floor(Math.random() * SIMULATED_FOODS.length);
    activeScannedFood = SIMULATED_FOODS[index];

    DOM.capturedMealImg.src = activeScannedFood.img;
    DOM.capturedMealBox.classList.remove('hidden');
    DOM.scannerStatusText.textContent = 'Analyzing nutrients...';

    setTimeout(() => {
      if (!DOM.overlays.scanSimulator.classList.contains('open')) return;

      DOM.recognizedFoodImg.src = activeScannedFood.img;
      DOM.recognizedFoodName.textContent = activeScannedFood.name;
      DOM.recognizedFoodCalories.textContent = `${activeScannedFood.calories} kcal`;
      DOM.recProtein.textContent = `${activeScannedFood.protein}g`;
      DOM.recCarbs.textContent = `${activeScannedFood.carbs}g`;
      DOM.recFats.textContent = `${activeScannedFood.fats}g`;

      DOM.scannerResultSheet.classList.add('open');
      DOM.scannerStatusText.textContent = 'Analysis Complete';
    }, 1800);

  }, 2000);
}

// Add scanned food
function logScannedFood() {
  if (!activeScannedFood) return;

  const newLog = {
    id: Date.now(),
    name: activeScannedFood.name,
    calories: activeScannedFood.calories,
    protein: activeScannedFood.protein,
    carbs: activeScannedFood.carbs,
    fats: activeScannedFood.fats,
    fiber: activeScannedFood.fiber || 2,
    time: 'Today, ' + formatCurrentTime(),
    timestamp: Date.now()
  };

  AppState.logs.unshift(newLog);
  
  if (!AppState.isPremium) {
    AppState.freeScansUsed += 1;
  }

  saveLocalStorage();
  renderApp();
  closeCameraScanner();
  showToast(`${newLog.name} logged!`);
}

// Manual Input Log
function openManualInputModal() {
  DOM.manualFoodForm.reset();
  openOverlay('manualInput');
}

function logManualFood(e) {
  e.preventDefault();

  const nameVal = document.getElementById('form-food-name').value.trim();
  const calVal = parseInt(document.getElementById('form-calories').value);
  const protVal = parseInt(document.getElementById('form-protein').value) || 0;
  const carbVal = parseInt(document.getElementById('form-carbs').value) || 0;
  const fatVal = parseInt(document.getElementById('form-fats').value) || 0;

  if (nameVal === '' || isNaN(calVal) || calVal < 0) {
    alert('Please enter a valid food name and calorie amount.');
    return;
  }

  const newLog = {
    id: Date.now(),
    name: nameVal,
    calories: calVal,
    protein: protVal,
    carbs: carbVal,
    fats: fatVal,
    fiber: Math.round(carbVal * 0.15) || 1,
    time: 'Today, ' + formatCurrentTime(),
    timestamp: Date.now()
  };

  AppState.logs.unshift(newLog);
  saveLocalStorage();
  renderApp();
  closeOverlay('manualInput');
  showToast(`${newLog.name} added!`);
}

// Log a budget meal card click
function logBudgetMeal(mealIndex) {
  const meal = BUDGET_MEALS[mealIndex];
  if (!meal) return;

  const newLog = {
    id: Date.now(),
    name: meal.name,
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fats: meal.fats,
    fiber: Math.round(meal.carbs * 0.15) || 2,
    time: 'Today, ' + formatCurrentTime(),
    timestamp: Date.now()
  };

  AppState.logs.unshift(newLog);
  saveLocalStorage();
  renderApp();
  showToast(`Budget meal: ${meal.name} logged!`);
}

// Delete log
function deleteLog(id) {
  AppState.logs = AppState.logs.filter(item => item.id !== id);
  saveLocalStorage();
  renderApp();
  showToast('Food entry deleted');
}

function formatCurrentTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

// RENDER APPLICATION
function renderApp() {
  DOM.usernameDisplays.forEach(element => {
    element.textContent = AppState.username;
  });
  
  DOM.targetCaloriesText.textContent = AppState.dailyTarget.toLocaleString('en-US');
  DOM.insightsTargetVal.textContent = AppState.dailyTarget.toLocaleString('en-US');
  
  DOM.inputUsername.value = AppState.username;
  DOM.inputDailyTarget.value = AppState.dailyTarget;
  DOM.profileNameText.textContent = AppState.username;
  DOM.layoutModeSelector.value = AppState.layoutMode;

  if (AppState.layoutMode === 'input') {
    DOM.scanBannerBtn.classList.add('hidden');
    DOM.inputBannerBtn.classList.remove('hidden');
    DOM.tabScanLabel.textContent = 'Input';
    DOM.scanBarcodeIcon.classList.add('hidden');
    DOM.scanListIcon.classList.remove('hidden');
  } else {
    DOM.scanBannerBtn.classList.remove('hidden');
    DOM.inputBannerBtn.classList.add('hidden');
    DOM.tabScanLabel.textContent = 'Scan';
    DOM.scanBarcodeIcon.classList.remove('hidden');
    DOM.scanListIcon.classList.add('hidden');
  }

  if (AppState.isPremium) {
    DOM.headerPremiumDot.style.display = 'block';
    DOM.profilePremiumBadge.classList.remove('hidden');
    DOM.profileFreeBadge.classList.add('hidden');
    DOM.premiumPromoPanel.classList.add('hidden');
    DOM.premiumActivePanel.classList.remove('hidden');
    DOM.freeLimitBadgeCard.style.display = 'none';
  } else {
    DOM.headerPremiumDot.style.display = 'none';
    DOM.profilePremiumBadge.classList.add('hidden');
    DOM.profileFreeBadge.classList.remove('hidden');
    DOM.premiumPromoPanel.classList.remove('hidden');
    DOM.premiumActivePanel.classList.add('hidden');
    DOM.freeLimitBadgeCard.style.display = 'flex';
  }

  DOM.freeCheckCounter.textContent = `${AppState.freeScansUsed}/3 used`;

  renderCalorieCounters();
  renderWaterSection();
  renderRecentActivity();
  renderHistorySection();
  renderBudgetMeals();
  renderGroceryList(); // Render newly added Grocery checklist
}

// Render healthy student budget cards
function renderBudgetMeals() {
  DOM.budgetMealsList.innerHTML = '';
  
  BUDGET_MEALS.forEach((meal, index) => {
    const card = document.createElement('div');
    card.classList.add('meal-card');
    card.setAttribute('data-index', index);
    
    card.innerHTML = `
      <div class="meal-card-img-wrapper">
        <span class="meal-price-badge">${meal.price}</span>
        <img src="${meal.img}" alt="${meal.name}" class="meal-card-img">
      </div>
      <h4>${meal.name}</h4>
      <div class="meal-stats">
        <span>${meal.calories} kcal</span>
        <span>P: ${meal.protein}g</span>
      </div>
      <div class="meal-log-quick-add">+</div>
    `;

    card.addEventListener('click', () => {
      logBudgetMeal(index);
    });

    DOM.budgetMealsList.appendChild(card);
  });
}

// Render budget grocery shopping checklist items
function renderGroceryList() {
  DOM.groceryItemsList.innerHTML = '';
  
  let totalCost = 0.0;
  let totalCalories = 0;

  GROCERY_ITEMS.forEach(item => {
    const row = document.createElement('div');
    row.classList.add('grocery-item');
    
    const isChecked = AppState.selectedGroceryIds.includes(item.id);
    if (isChecked) {
      totalCost += item.price;
      totalCalories += item.calories;
    }

    row.innerHTML = `
      <div class="grocery-left">
        <input type="checkbox" class="grocery-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''}>
        <div class="grocery-info">
          <h4>${item.name}</h4>
          <p>${item.detail} • ${item.calories} kcal</p>
        </div>
      </div>
      <span class="grocery-price">$${item.price.toFixed(2)}</span>
    `;

    // Click checkbox callback to recalculate totals
    row.querySelector('.grocery-checkbox').addEventListener('change', (e) => {
      const itemId = e.target.getAttribute('data-id');
      if (e.target.checked) {
        if (!AppState.selectedGroceryIds.includes(itemId)) {
          AppState.selectedGroceryIds.push(itemId);
        }
      } else {
        AppState.selectedGroceryIds = AppState.selectedGroceryIds.filter(id => id !== itemId);
      }
      saveLocalStorage();
      renderApp(); // Rerenders checklist and updates totals dynamically
    });

    DOM.groceryItemsList.appendChild(row);
  });

  // Render totals
  DOM.shoppingTotalCost.textContent = `$${totalCost.toFixed(2)}`;
  DOM.shoppingTotalCalories.textContent = `${totalCalories.toLocaleString('en-US')} kcal`;
}

function renderCalorieCounters() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  let totalCal = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  let totalFiber = 0;

  AppState.logs.forEach(log => {
    if (log.timestamp >= todayStart.getTime()) {
      totalCal += log.calories;
      totalProtein += log.protein;
      totalCarbs += log.carbs;
      totalFats += log.fats;
      totalFiber += log.fiber;
    }
  });

  const remaining = AppState.dailyTarget - totalCal;
  DOM.remainingCaloriesText.textContent = remaining >= 0 ? remaining.toLocaleString('en-US') : `+${Math.abs(remaining).toLocaleString('en-US')}`;
  
  const descText = document.querySelector('.card-remaining-desc');
  if (remaining >= 0) {
    descText.innerHTML = `<span id="remaining-calories-text">${remaining.toLocaleString('en-US')}</span> kcal remaining`;
    descText.style.color = 'var(--text-sub)';
  } else {
    descText.innerHTML = `<span id="remaining-calories-text">${Math.abs(remaining).toLocaleString('en-US')}</span> kcal surplus`;
    descText.style.color = 'hsl(0, 80%, 55%)';
  }

  const totalLimit = AppState.dailyTarget;
  const progressRatio = totalLimit > 0 ? totalCal / totalLimit : 0;
  
  const baseCircumference = 264;
  let strokeOffset = baseCircumference - (progressRatio * baseCircumference);
  
  if (strokeOffset < 0) strokeOffset = 0;
  if (strokeOffset > baseCircumference) strokeOffset = baseCircumference;
  DOM.homeProgressBar.style.strokeDashoffset = strokeOffset;

  const targetProtein = 160;
  const targetCarbs = 315;

  const protPct = Math.round(targetProtein > 0 ? (totalProtein / targetProtein) * 100 : 0);
  const carbPct = Math.round(targetCarbs > 0 ? (totalCarbs / targetCarbs) * 100 : 0);

  DOM.macroProteinWeight.textContent = `${totalProtein}g`;
  DOM.macroProteinPct.textContent = `${protPct}%`;
  document.querySelector('.macro-box:nth-child(1) .macro-percentage-circle').style.setProperty('--p', protPct);

  DOM.macroCarbsWeight.textContent = `${totalCarbs}g`;
  DOM.macroCarbsPct.textContent = `${carbPct}%`;
  document.querySelector('.macro-box:nth-child(2) .macro-percentage-circle').style.setProperty('--p', carbPct);

  DOM.macroFatsWeight.textContent = `${totalFats}g`;
  DOM.macroFiberWeight.textContent = `${totalFiber}g`;

  const insightsBurnVal = 850;
  const insightsBmrVal = 1250;
  
  DOM.insightsActiveBurn.textContent = insightsBurnVal.toLocaleString('en-US');
  DOM.insightsBmr.textContent = insightsBmrVal.toLocaleString('en-US');
  
  const allLogsCombined = [...AppState.logs];
  let logTotalSum = 0;
  allLogsCombined.forEach(l => logTotalSum += l.calories);
  AppState.history.october.forEach(h => logTotalSum += h.calories);
  
  const totalDaysObserved = 6;
  const averageIntake = Math.round(logTotalSum / totalDaysObserved);
  DOM.insightsAvgIntake.textContent = `${averageIntake.toLocaleString('en-US')} kcal`;
  DOM.trendAvgCalories.textContent = averageIntake.toLocaleString('en-US');
}

function renderWaterSection() {
  DOM.waterIntakeText.textContent = AppState.waterIntake.toFixed(1);
  const targetWater = 3.0;
  let ratio = AppState.waterIntake / targetWater;
  if (ratio > 1.0) ratio = 1.0;
  DOM.waterWaveFill.style.height = (ratio * 100) + '%';
}

function renderRecentActivity() {
  DOM.recentActivityList.innerHTML = '';
  
  if (AppState.logs.length === 0) {
    DOM.recentActivityList.innerHTML = `
      <div class="empty-state-list" style="text-align:center; padding: 24px; color: var(--text-sub); font-size:13px;">
        No student meals logged for today.
      </div>
    `;
    return;
  }

  AppState.logs.forEach(log => {
    const item = document.createElement('div');
    item.classList.add('activity-item');
    
    let thumbUrl = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=80&h=80';
    if (log.name.toLowerCase().includes('salad')) {
      thumbUrl = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('salmon') || log.name.toLowerCase().includes('fish')) {
      thumbUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('toast') || log.name.toLowerCase().includes('egg') || log.name.toLowerCase().includes('oatmeal')) {
      thumbUrl = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('pizza')) {
      thumbUrl = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('beef') || log.name.toLowerCase().includes('rice') || log.name.toLowerCase().includes('beans')) {
      thumbUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('tuna') || log.name.toLowerCase().includes('sushi')) {
      thumbUrl = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=80&h=80';
    }

    item.innerHTML = `
      <div class="activity-left">
        <img src="${thumbUrl}" alt="Food" class="food-thumb">
        <div class="food-details">
          <h4>${log.name}</h4>
          <p>${log.time}</p>
        </div>
      </div>
      <div class="activity-right">
        <span class="calorie-badge">${log.calories} <span class="kcal">kcal</span></span>
        <button class="delete-activity-btn" data-id="${log.id}">
          ✕
        </button>
      </div>
    `;

    item.querySelector('.delete-activity-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const logId = Number(e.currentTarget.getAttribute('data-id'));
      deleteLog(logId);
    });

    DOM.recentActivityList.appendChild(item);
  });
}

function renderHistorySection() {
  DOM.historyItemsOctober.innerHTML = '';
  DOM.historyItemsSeptember.innerHTML = '';

  AppState.history.october.forEach(log => {
    const card = document.createElement('div');
    card.classList.add('history-card');
    card.innerHTML = `
      <div class="history-left">
        <div class="history-icon-box">
          <img src="${log.img}" alt="History photo">
        </div>
        <div class="history-details">
          <h4>${log.date}</h4>
          <p>${log.time}</p>
        </div>
      </div>
      <div class="history-right">
        <span class="history-kcal">${log.calories.toLocaleString('en-US')}</span>
        <span class="history-sub">KCAL / DAY</span>
      </div>
    `;
    DOM.historyItemsOctober.appendChild(card);
  });

  AppState.history.september.forEach(log => {
    const card = document.createElement('div');
    card.classList.add('history-card');
    card.innerHTML = `
      <div class="history-left">
        <div class="history-icon-box">
          <img src="${log.img}" alt="History photo">
        </div>
        <div class="history-details">
          <h4>${log.date}</h4>
          <p>${log.time}</p>
        </div>
      </div>
      <div class="history-right">
        <span class="history-kcal">${log.calories.toLocaleString('en-US')}</span>
        <span class="history-sub">KCAL / DAY</span>
      </div>
    `;
    DOM.historyItemsSeptember.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', init);
