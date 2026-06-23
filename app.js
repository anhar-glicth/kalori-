// Application State Manager
const AppState = {
  username: 'Jessica Doe',
  dailyTarget: 1840,
  waterIntake: 1.8,
  freeScansUsed: 2, // Matches the mockup screen default (2 of 3 used)
  isPremium: false,
  layoutMode: 'scan', // 'scan' (default) or 'input' (alternative checklist mode)
  logs: [
    {
      id: 1,
      name: 'Grilled Salmon Bowl',
      calories: 540,
      protein: 38,
      carbs: 45,
      fats: 22,
      fiber: 8,
      time: 'Today, 1:24 PM',
      timestamp: Date.now() - 2 * 60 * 60 * 1000 // 2 hours ago
    },
    {
      id: 2,
      name: 'Avocado Toast & Egg',
      calories: 385,
      protein: 16,
      carbs: 28,
      fats: 21,
      fiber: 6,
      time: 'Yesterday, 8:45 AM',
      timestamp: Date.now() - 27 * 60 * 60 * 1000 // 27 hours ago
    }
  ],
  // Pre-filled history items matching mockup designs
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

// Database of Simulated Food Items for AI Scan
const SIMULATED_FOODS = [
  {
    name: 'Protein Power Beef Bowl',
    calories: 620,
    protein: 42,
    carbs: 55,
    fats: 18,
    fiber: 6,
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Greek Avocado Salad',
    calories: 310,
    protein: 8,
    carbs: 14,
    fats: 26,
    fiber: 7,
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Vibrant Acai Berry Cup',
    calories: 280,
    protein: 6,
    carbs: 58,
    fats: 4,
    fiber: 9,
    img: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Pepperoni Flatbread Pizza',
    calories: 440,
    protein: 18,
    carbs: 48,
    fats: 20,
    fiber: 2,
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Sushi Bento Combination',
    calories: 520,
    protein: 24,
    carbs: 72,
    fats: 12,
    fiber: 3,
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

// Document Elements
const DOM = {
  // Screens
  screens: {
    home: document.getElementById('screen-home'),
    insights: document.getElementById('screen-insights'),
    history: document.getElementById('screen-history'),
    profile: document.getElementById('screen-profile')
  },
  // Nav tabs
  tabs: {
    home: document.getElementById('tab-home'),
    scan: document.getElementById('tab-scan'),
    history: document.getElementById('tab-history'),
    profile: document.getElementById('tab-profile')
  },
  // Tab Bar Sub-Elements
  tabScanLabel: document.getElementById('tab-scan-label'),
  scanBarcodeIcon: document.getElementById('nav-scan-barcode-icon'),
  scanListIcon: document.getElementById('nav-scan-list-icon'),
  
  // Header profile badge
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
    premiumCelebration: document.getElementById('overlay-premium-celebration')
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

  // Toast
  toastNotify: document.getElementById('toast-notify')
};

// Global active simulated food scan holder
let activeScannedFood = null;

// Initialize app config
function init() {
  loadLocalStorage();
  updateTime();
  setInterval(updateTime, 60000); // Update clock status bar every minute
  setupEventListeners();
  renderApp();
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
  const savedState = localStorage.getItem('caloscan_state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      AppState.username = parsed.username || AppState.username;
      AppState.dailyTarget = Number(parsed.dailyTarget) || AppState.dailyTarget;
      AppState.waterIntake = Number(parsed.waterIntake) !== undefined ? Number(parsed.waterIntake) : AppState.waterIntake;
      AppState.freeScansUsed = Number(parsed.freeScansUsed) !== undefined ? Number(parsed.freeScansUsed) : AppState.freeScansUsed;
      AppState.isPremium = parsed.isPremium || false;
      AppState.layoutMode = parsed.layoutMode || AppState.layoutMode;
      AppState.logs = parsed.logs || AppState.logs;
    } catch (e) {
      console.error('Failed to load local storage state, using defaults', e);
    }
  }
}

function saveLocalStorage() {
  localStorage.setItem('caloscan_state', JSON.stringify({
    username: AppState.username,
    dailyTarget: AppState.dailyTarget,
    waterIntake: AppState.waterIntake,
    freeScansUsed: AppState.freeScansUsed,
    isPremium: AppState.isPremium,
    layoutMode: AppState.layoutMode,
    logs: AppState.logs
  }));
}

// Reset data (demo capability)
function resetApp() {
  localStorage.removeItem('caloscan_state');
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
  // If scan is clicked, handle layout routing logic
  if (screenId === 'scan') {
    if (AppState.layoutMode === 'scan') {
      openCameraScanner();
    } else {
      openManualInputModal();
    }
    return;
  }

  // Deactivate all screens
  Object.keys(DOM.screens).forEach(key => {
    DOM.screens[key].classList.remove('active');
  });

  // Deactivate all navigation tabs
  Object.keys(DOM.tabs).forEach(key => {
    DOM.tabs[key].classList.remove('active');
  });

  // Activate target
  if (DOM.screens[screenId]) {
    DOM.screens[screenId].classList.add('active');
  }
  if (DOM.tabs[screenId]) {
    DOM.tabs[screenId].classList.add('active');
  }

  // Scroll target screen to top
  const mainScroll = document.querySelector('.app-main-content');
  if (mainScroll) mainScroll.scrollTop = 0;
}

// Event Listeners setup
function setupEventListeners() {
  // Navigation tabs clicks
  Object.keys(DOM.tabs).forEach(key => {
    DOM.tabs[key].addEventListener('click', () => navigateTo(key));
  });

  // Welcome avatar btn clicks to open Profile tab
  DOM.headerAvatarBtn.addEventListener('click', () => navigateTo('profile'));
  DOM.headerSettingsBtn.addEventListener('click', () => navigateTo('profile'));

  // Home Screen Banners
  DOM.scanBannerBtn.addEventListener('click', openCameraScanner);
  DOM.inputBannerBtn.addEventListener('click', openManualInputModal);

  // Water click tracking
  DOM.waterTrackerCard.addEventListener('click', trackWater);

  // Modal Closures
  DOM.btnCloseLimitSheet.addEventListener('click', () => closeOverlay('limitReached'));
  DOM.btnCloseManualDialog.addEventListener('click', () => closeOverlay('manualInput'));
  DOM.btnCancelScan.addEventListener('click', closeCameraScanner);

  // Scan Retry
  DOM.btnRetryScan.addEventListener('click', startSimulatedScanProcess);

  // Log food recognized in camera
  DOM.btnAddRecognizedFood.addEventListener('click', logScannedFood);

  // Unlock Premium Actions
  DOM.btnUnlockUnlimited.addEventListener('click', triggerUnlockPremium);
  DOM.btnPromoGoPremium.addEventListener('click', triggerUnlockPremium);
  DOM.btnCloseCelebration.addEventListener('click', closeCelebration);

  // Manual Food log submission
  DOM.manualFoodForm.addEventListener('submit', logManualFood);

  // Profile Settings Submit
  DOM.btnSaveProfile.addEventListener('click', saveProfileSettings);

  // Reset App Simulator Button
  DOM.btnResetApp.addEventListener('click', resetApp);
  
  // View All click (sends to history)
  DOM.btnViewAll.addEventListener('click', () => navigateTo('history'));

  // Insights Screen primary trigger button
  DOM.btnCheckCalorieData.addEventListener('click', () => {
    if (AppState.freeScansUsed >= 3 && !AppState.isPremium) {
      openOverlay('limitReached');
    } else {
      openCameraScanner();
    }
  });

  // Edit Avatar dummy trigger
  DOM.btnEditAvatar.addEventListener('click', () => {
    const urls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    ];
    // Cycle avatar pictures on click
    const currentSrc = DOM.profileAvatarDisplay.src;
    let nextIndex = urls.indexOf(currentSrc) + 1;
    if (nextIndex >= urls.length || nextIndex === 0) nextIndex = 0;
    DOM.profileAvatarDisplay.src = urls[nextIndex];
    document.getElementById('header-avatar').src = urls[nextIndex];
    showToast('Profile photo updated!');
  });
}

// Modal open/close overlays utilities
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
  // Add 0.25L water
  AppState.waterIntake = parseFloat((AppState.waterIntake + 0.25).toFixed(2));
  if (AppState.waterIntake > 5.0) AppState.waterIntake = 0.0; // limit and reset for loop tracking
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
  
  // Activate premium
  AppState.isPremium = true;
  AppState.freeScansUsed = 0;
  saveLocalStorage();
  renderApp();

  // Open confetti celebration overlay
  openOverlay('premiumCelebration');
  startConfettiAnimation();
}

function closeCelebration() {
  closeOverlay('premiumCelebration');
  stopConfettiAnimation();
}

// Confetti effects generator
let confettiIntervalId = null;
function startConfettiAnimation() {
  DOM.confettiContainer.innerHTML = '';
  const colors = ['#00FF00', '#FFD700', '#FF4500', '#1E90FF', '#FF1493', '#ADFF2F'];
  
  confettiIntervalId = setInterval(() => {
    const p = document.createElement('div');
    p.classList.add('confetti-particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = Math.random() * 8 + 4 + 'px';
    p.style.height = Math.random() * 8 + 4 + 'px';
    p.style.animationDuration = Math.random() * 2 + 1 + 's';
    
    DOM.confettiContainer.appendChild(p);
    
    // Auto cleanup particles
    setTimeout(() => {
      p.remove();
    }, 3000);
  }, 100);
}

function stopConfettiAnimation() {
  clearInterval(confettiIntervalId);
  DOM.confettiContainer.innerHTML = '';
}

// Open Camera Simulator Overlay
function openCameraScanner() {
  // Check daily check counts
  if (AppState.freeScansUsed >= 3 && !AppState.isPremium) {
    openOverlay('limitReached');
    return;
  }

  openOverlay('scanSimulator');
  startSimulatedScanProcess();
}

function closeCameraScanner() {
  closeOverlay('scanSimulator');
  // Reset scanner classes
  DOM.capturedMealBox.classList.add('hidden');
  DOM.scannerResultSheet.classList.remove('open');
  activeScannedFood = null;
}

// AI Camera Scanner Process Simulation
function startSimulatedScanProcess() {
  // Initial states
  DOM.capturedMealBox.classList.add('hidden');
  DOM.scannerResultSheet.classList.remove('open');
  DOM.scannerStatusText.textContent = 'Align meal in frame...';
  activeScannedFood = null;

  // Step 1: Wait 2.0s to simulate camera stabilization and then freeze
  setTimeout(() => {
    if (!DOM.overlays.scanSimulator.classList.contains('open')) return; // check if user closed
    
    // Choose a random food to recognized
    const index = Math.floor(Math.random() * SIMULATED_FOODS.length);
    activeScannedFood = SIMULATED_FOODS[index];

    // Show simulated camera capture snapshot
    DOM.capturedMealImg.src = activeScannedFood.img;
    DOM.capturedMealBox.classList.remove('hidden');
    DOM.scannerStatusText.textContent = 'Analyzing nutrients...';

    // Step 2: Wait 1.8s to simulate AI neural network loading details
    setTimeout(() => {
      if (!DOM.overlays.scanSimulator.classList.contains('open')) return;

      // Populate results sheet
      DOM.recognizedFoodImg.src = activeScannedFood.img;
      DOM.recognizedFoodName.textContent = activeScannedFood.name;
      DOM.recognizedFoodCalories.textContent = `${activeScannedFood.calories} kcal`;
      DOM.recProtein.textContent = `${activeScannedFood.protein}g`;
      DOM.recCarbs.textContent = `${activeScannedFood.carbs}g`;
      DOM.recFats.textContent = `${activeScannedFood.fats}g`;

      // Open bottom result slider sheet
      DOM.scannerResultSheet.classList.add('open');
      DOM.scannerStatusText.textContent = 'Analysis Complete';
    }, 1800);

  }, 2000);
}

// Add the food item identified by scanner
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

  AppState.logs.unshift(newLog); // Insert at beginning of log activity array
  
  if (!AppState.isPremium) {
    AppState.freeScansUsed += 1;
  }

  saveLocalStorage();
  renderApp();
  closeCameraScanner();
  showToast(`${newLog.name} logged!`);
}

// Manual Input Log Modal controllers
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
    fiber: Math.round(carbVal * 0.15) || 1, // calculate simulated fiber
    time: 'Today, ' + formatCurrentTime(),
    timestamp: Date.now()
  };

  AppState.logs.unshift(newLog);
  saveLocalStorage();
  renderApp();
  closeOverlay('manualInput');
  showToast(`${newLog.name} added!`);
}

// Delete log handler
function deleteLog(id) {
  AppState.logs = AppState.logs.filter(item => item.id !== id);
  saveLocalStorage();
  renderApp();
  showToast('Food entry deleted');
}

// Helper: Formats local device time to readable format: "1:24 PM"
function formatCurrentTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

// RENDER APPLICATION UI
function renderApp() {
  // Update state displays
  DOM.usernameDisplays.forEach(element => {
    element.textContent = AppState.username;
  });
  
  DOM.targetCaloriesText.textContent = AppState.dailyTarget.toLocaleString('en-US');
  DOM.insightsTargetVal.textContent = AppState.dailyTarget.toLocaleString('en-US');
  
  // Set Profile form inputs value matching state
  DOM.inputUsername.value = AppState.username;
  DOM.inputDailyTarget.value = AppState.dailyTarget;
  DOM.profileNameText.textContent = AppState.username;
  DOM.layoutModeSelector.value = AppState.layoutMode;

  // Toggle layout mode styling buttons / banners
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

  // Handle premium visual configurations
  if (AppState.isPremium) {
    DOM.headerPremiumDot.style.display = 'block';
    DOM.profilePremiumBadge.classList.remove('hidden');
    DOM.profileFreeBadge.classList.add('hidden');
    DOM.premiumPromoPanel.classList.add('hidden');
    DOM.premiumActivePanel.classList.remove('hidden');
    DOM.freeLimitBadgeCard.style.display = 'none'; // hide limitations
  } else {
    DOM.headerPremiumDot.style.display = 'none';
    DOM.profilePremiumBadge.classList.add('hidden');
    DOM.profileFreeBadge.classList.remove('hidden');
    DOM.premiumPromoPanel.classList.remove('hidden');
    DOM.premiumActivePanel.classList.add('hidden');
    DOM.freeLimitBadgeCard.style.display = 'flex';
  }

  // Free Data Check badge count
  const checksLeft = 3 - AppState.freeScansUsed;
  DOM.freeCheckCounter.textContent = `${AppState.freeScansUsed} OF 3 USED`;

  // Render sub sections
  renderCalorieCounters();
  renderWaterSection();
  renderRecentActivity();
  renderHistorySection();
}

// Calculate and render all Calorie Ring metrics
function renderCalorieCounters() {
  // Aggregate today's food calorie logs
  // Filters items that are log entries for today only
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  let totalCal = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  let totalFiber = 0;

  // Filter logs registered within today's range
  AppState.logs.forEach(log => {
    if (log.timestamp >= todayStart.getTime()) {
      totalCal += log.calories;
      totalProtein += log.protein;
      totalCarbs += log.carbs;
      totalFats += log.fats;
      totalFiber += log.fiber;
    }
  });

  // Calculate remaining
  const remaining = AppState.dailyTarget - totalCal;
  DOM.remainingCaloriesText.textContent = remaining >= 0 ? remaining.toLocaleString('en-US') : `+${Math.abs(remaining).toLocaleString('en-US')}`;
  
  // Set subheader to surplus if needed
  const descText = document.querySelector('.card-remaining-desc');
  if (remaining >= 0) {
    descText.innerHTML = `<span id="remaining-calories-text">${remaining.toLocaleString('en-US')}</span> kcal remaining`;
    descText.style.color = 'var(--text-sub)';
  } else {
    descText.innerHTML = `<span id="remaining-calories-text">${Math.abs(remaining).toLocaleString('en-US')}</span> kcal surplus`;
    descText.style.color = 'hsl(0, 80%, 55%)';
  }

  // Progress SVG bar calculations
  const totalLimit = AppState.dailyTarget;
  const progressRatio = totalLimit > 0 ? totalCal / totalLimit : 0;
  
  // stroke-dasharray = 264 (Circumference)
  const baseCircumference = 264;
  let strokeOffset = baseCircumference - (progressRatio * baseCircumference);
  
  // Clamp values
  if (strokeOffset < 0) strokeOffset = 0;
  if (strokeOffset > baseCircumference) strokeOffset = baseCircumference;
  DOM.homeProgressBar.style.strokeDashoffset = strokeOffset;

  // Dynamic macros calculations
  // Target macros (Simulate target diets: Protein 160g, Carbs 315g)
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

  // Render insights metrics on Screen 2
  // Simulate active burn values dynamically + BMR constants
  const insightsBurnVal = 850;
  const insightsBmrVal = 1250;
  
  DOM.insightsActiveBurn.textContent = insightsBurnVal.toLocaleString('en-US');
  DOM.insightsBmr.textContent = insightsBmrVal.toLocaleString('en-US');
  
  // Insights Screen average intake calculate
  // Use today logs + prefilled history to determine a mock average intake
  const allLogsCombined = [...AppState.logs];
  let logTotalSum = 0;
  allLogsCombined.forEach(l => logTotalSum += l.calories);
  AppState.history.october.forEach(h => logTotalSum += h.calories);
  
  const totalDaysObserved = 6;
  const averageIntake = Math.round(logTotalSum / totalDaysObserved);
  DOM.insightsAvgIntake.textContent = `${averageIntake.toLocaleString('en-US')} kcal`;
  
  // History trend average sync
  DOM.trendAvgCalories.textContent = averageIntake.toLocaleString('en-US');
}

// Render Water intake status
function renderWaterSection() {
  DOM.waterIntakeText.textContent = AppState.waterIntake.toFixed(1);
  
  // Limit target limit scale is 3.0L
  const targetWater = 3.0;
  let ratio = AppState.waterIntake / targetWater;
  if (ratio > 1.0) ratio = 1.0;
  
  // Wave animation height percent
  DOM.waterWaveFill.style.height = (ratio * 100) + '%';
}

// Render Recent food logs list on Home screen
function renderRecentActivity() {
  DOM.recentActivityList.innerHTML = '';
  
  if (AppState.logs.length === 0) {
    DOM.recentActivityList.innerHTML = `
      <div class="empty-state-list" style="text-align:center; padding: 24px; color: var(--text-sub); font-size:13px;">
        No meals logged for today. Click Scan to add.
      </div>
    `;
    return;
  }

  // Display logs
  AppState.logs.forEach(log => {
    const item = document.createElement('div');
    item.classList.add('activity-item');
    
    // Choose thumbnail placeholder by food name keywords
    let thumbUrl = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=80&h=80'; // fallback healthy food
    if (log.name.toLowerCase().includes('salad')) {
      thumbUrl = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('salmon') || log.name.toLowerCase().includes('fish')) {
      thumbUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('toast') || log.name.toLowerCase().includes('egg') || log.name.toLowerCase().includes('bread')) {
      thumbUrl = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('pizza')) {
      thumbUrl = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('beef') || log.name.toLowerCase().includes('steak') || log.name.toLowerCase().includes('bowl')) {
      thumbUrl = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=80&h=80';
    } else if (log.name.toLowerCase().includes('sushi')) {
      thumbUrl = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=80&h=80';
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
        <button class="delete-activity-btn" data-id="${log.id}" title="Remove entry">
          ✕
        </button>
      </div>
    `;

    // Hook delete click event
    item.querySelector('.delete-activity-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const logId = Number(e.currentTarget.getAttribute('data-id'));
      deleteLog(logId);
    });

    DOM.recentActivityList.appendChild(item);
  });
}

// Render History calendars
function renderHistorySection() {
  DOM.historyItemsOctober.innerHTML = '';
  DOM.historyItemsSeptember.innerHTML = '';

  // Render October logs
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

  // Render September logs
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

// Initialize Application once DOM fully loads
window.addEventListener('DOMContentLoaded', init);
