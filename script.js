
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
});


function initializeApp() {
    
    updateStatusBarTime();
    

    loadTransactions();
    
    
    loadRewards();
    

    initNavigation();


    initToggleSwitches();
    

    initEventListeners();
    
    
    setInterval(updateStatusBarTime, 60000);
}

function updateStatusBarTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    
    document.querySelectorAll('.time').forEach(el => {
        el.textContent = formattedTime;
    });
}

const transactionsData = [
    {
        id: 1,
        name: "Amazon",
        date: "Today, 11:24 AM",
        amount: -1299.00,
        icon: "🛒"
    },
    {
        id: 2,
        name: "Rahul Sharma",
        date: "Yesterday, 06:15 PM",
        amount: 5000.00,
        icon: "👤"
    },
    {
        id: 3,
        name: "Swiggy",
        date: "28 Mar 2025",
        amount: -450.00,
        icon: "🍔"
    },
    {
        id: 4,
        name: "Electricity Bill",
        date: "25 Mar 2025",
        amount: -2135.50,
        icon: "⚡"
    },
    {
        id: 5,
        name: "Salary Credit",
        date: "01 Mar 2025",
        amount: 45000.00,
        icon: "💼"
    }
];

const rewardsData = [
    {
        id: 1,
        merchant: "Amazon",
        title: "Get 10% cashback on your first purchase",
        points: 500,
        category: "cashback",
        image: "🛒"
    },
    {
        id: 2,
        merchant: "Myntra",
        title: "Special discount of 15% on fashion",
        points: 750,
        category: "exclusive",
        image: "👕"
    },
    {
        id: 3,
        merchant: "Swiggy",
        title: "Free delivery on orders above ₹249",
        points: 300,
        category: "cashback",
        image: "🍕"
    },
    {
        id: 4,
        merchant: "BookMyShow",
        title: "Buy 1 Get 1 on movie tickets",
        points: 800,
        category: "exclusive",
        image: "🎬"
    }
];


function loadTransactions() {
    const transactionsList = document.getElementById('transactions-list');
    if (!transactionsList) return;
    
    transactionsList.innerHTML = '';
    
    transactionsData.forEach(transaction => {
        const isCredit = transaction.amount > 0;
        const formattedAmount = Math.abs(transaction.amount).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        });
        
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        transactionItem.dataset.id = transaction.id;
        
        transactionItem.innerHTML = `
            <div class="transaction-icon">${transaction.icon}</div>
            <div class="transaction-details">
                <div class="transaction-name">${transaction.name}</div>
                <div class="transaction-date">${transaction.date}</div>
            </div>
            <div class="transaction-amount ${isCredit ? 'credit' : 'debit'}">
                ${isCredit ? '+' : '-'} ${formattedAmount}
            </div>
        `;
        
        transactionItem.addEventListener('click', () => {
            showTransactionDetails(transaction);
        });
        
        transactionsList.appendChild(transactionItem);
    });
}


function showTransactionDetails(transaction) {
    console.log(`Showing details for transaction: ${transaction.id}`);
    
    alert(`Transaction Details: ${transaction.name}\nAmount: ${transaction.amount > 0 ? '+' : '-'}₹${Math.abs(transaction.amount)}\nDate: ${transaction.date}`);
}

function loadRewards(category = 'all') {
    const rewardsList = document.getElementById('rewards-list');
    if (!rewardsList) return;
    
    rewardsList.innerHTML = '';
    
    
    let filteredRewards = rewardsData;
    if (category !== 'all') {
        filteredRewards = rewardsData.filter(reward => reward.category === category);
    }
    
    filteredRewards.forEach(reward => {
        const rewardCard = document.createElement('div');
        rewardCard.className = 'reward-card';
        rewardCard.dataset.id = reward.id;
        
        rewardCard.innerHTML = `
            <div class="reward-image">${reward.image}</div>
            <div class="reward-content">
                <div class="reward-merchant">${reward.merchant}</div>
                <div class="reward-title">${reward.title}</div>
                <div class="reward-footer">
                    <div class="reward-points">${reward.points} points</div>
                    <div class="redeem-btn">Redeem</div>
                </div>
            </div>
        `;
        
        rewardsList.appendChild(rewardCard);
    });
    
    
    document.querySelectorAll('.redeem-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const rewardId = parseInt(e.target.closest('.reward-card').dataset.id);
            redeemReward(rewardId);
        });
    });
}


function redeemReward(rewardId) {
    const reward = rewardsData.find(r => r.id === rewardId);
    if (reward) {
        console.log(`Redeeming reward: ${reward.title}`);
        alert(`Redeeming: ${reward.title}\nPoints required: ${reward.points}`);
    }
}


function initNavigation() {
    // Handle bottom navigation clicks
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', () => {
            const targetScreen = navItem.dataset.screen;
            navigateToScreen(targetScreen);
            
            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            navItem.classList.add('active');
        });
    });
    
    // Handle back button in settings
    const backButton = document.getElementById('back-to-home');
    if (backButton) {
        backButton.addEventListener('click', () => {
            navigateToScreen('home');
            
            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(item => {
                if (item.dataset.screen === 'home') {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }
    
    // Handle "View All" transactions link
    const viewAllTransactions = document.getElementById('view-all-transactions');
    if (viewAllTransactions) {
        viewAllTransactions.addEventListener('click', () => {
            alert('View all transactions functionality would go here');
        });
    }
}

function navigateToScreen(screenId) {
    // Hide
    document.querySelectorAll('.screen-container').forEach(screen => {
        screen.classList.add('hidden');
    });
    
    // Show the target
    const targetScreen = document.getElementById(`${screenId}-screen`);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }
}

// Initialize toggle
function initToggleSwitches() {
    
    const notificationsToggle = document.getElementById('notifications-toggle');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.classList.remove('off');
    } else {
        if (darkModeToggle) darkModeToggle.classList.add('off');
    }
    
    
    if (notificationsToggle) {
        notificationsToggle.addEventListener('click', () => {
            notificationsToggle.classList.toggle('off');
            const isEnabled = !notificationsToggle.classList.contains('off');
            console.log(`Notifications ${isEnabled ? 'enabled' : 'disabled'}`);
        });
    }
    
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            darkModeToggle.classList.toggle('off');
            document.body.classList.toggle('dark-mode');
            
        
            const isDarkModeEnabled = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkModeEnabled);
        });
    }
}


function initEventListeners() {
    // Handle rewards
    document.querySelectorAll('.rewards-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.tab;
            
            
            document.querySelectorAll('.rewards-tab').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            
        
            loadRewards(category);
        });
    });
    
    
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                alert('Logged out successfully');
                // In a real app, this would redirect to login screen
            }
        });
    }
    
    
    const sendMoneyButton = document.getElementById('send-money');
    if (sendMoneyButton) {
        sendMoneyButton.addEventListener('click', () => {
            openSendMoneyModal();
        });
    }
    

    const receiveMoneyButton = document.getElementById('receive-money');
    if (receiveMoneyButton) {
        receiveMoneyButton.addEventListener('click', () => {
            openReceiveMoneyModal();
        });
    }
    
    
    document.querySelectorAll('.action-item').forEach(item => {
        item.addEventListener('click', () => {
            const actionId = item.id;
            handleQuickAction(actionId);
        });
    });
    

    const editProfileButton = document.getElementById('edit-profile');
    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            alert('Edit profile functionality would go here');
        });
    }
    
    
    document.querySelectorAll('.settings-item').forEach(item => {
        if (item.id && !item.querySelector('.toggle-switch')) {
            item.addEventListener('click', () => {
                handleSettingsItemClick(item.id);
            });
        }
    });
}


function handleQuickAction(actionId) {
    const actions = {
        'mobile-recharge': 'Mobile Recharge',
        'electricity-bill': 'Electricity Bill Payment',
        'movie-tickets': 'Movie Tickets Booking',
        'more-actions': 'More Actions'
    };
    
    if (actions[actionId]) {
        alert(`${actions[actionId]} functionality would go here`);
    }
}

function handleSettingsItemClick(itemId) {
    const settingsPages = {
        'personal-info': 'Personal Information',
        'security-privacy': 'Security & Privacy',
        'payment-methods': 'Payment Methods',
        'upi-settings': 'UPI Settings',
        'contact-support': 'Contact Support',
        'terms': 'Terms & Conditions',
        'faqs': 'FAQs'
    };
    
    if (settingsPages[itemId]) {
        alert(`${settingsPages[itemId]} page would open here`);
    }
}

function openSendMoneyModal() {
    alert('Send Money functionality would open here');
    
}


function openReceiveMoneyModal() {
    alert('Receive Money functionality would open here');
    
}


function showSplashScreen() {
    const splashOverlay = document.createElement('div');
    splashOverlay.style.position = 'fixed';
    splashOverlay.style.top = '0';
    splashOverlay.style.left = '0';
    splashOverlay.style.width = '100%';
    splashOverlay.style.height = '100%';
    splashOverlay.style.backgroundColor = '#5046e5';
    splashOverlay.style.display = 'flex';
    splashOverlay.style.justifyContent = 'center';
    splashOverlay.style.alignItems = 'center';
    splashOverlay.style.zIndex = '9999';
    splashOverlay.style.transition = 'opacity 0.5s';
    
    const logo = document.createElement('div');
    logo.textContent = 'OneBanc';
    logo.style.color = 'white';
    logo.style.fontSize = '32px';
    logo.style.fontWeight = 'bold';
    
    splashOverlay.appendChild(logo);
    document.body.appendChild(splashOverlay);
    
    
    setTimeout(() => {
        splashOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(splashOverlay);
        }, 500);
    }, 1500);
}

showSplashScreen();