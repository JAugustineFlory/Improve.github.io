//Honours App
const honours = [
    // Knight's collection
    //Code of Chivalry translated from The Song of Roland 
    knightsCode = [
        'To fear God and maintain His Church',
        'To serve the liege lord in valour and faith',
        'To protect the weak and defenceless',
        'To give succour to widows and orphans',
        'To refrain from the wanton giving of offence',
        'To live by honour and for glory',
        'To despise pecuniary reward',
        'To fight for the welfare of all',
        'To obey those placed in authority',
        'To guard the honour of fellow knights',
        'To eschew unfairness, meanness and deceit',
        'To keep faith',
        'At all times to speak the truth',
        'To persevere to the end in any enterprise begun',
        'To respect the honour of women',
        'Never to refuse a challenge from an equal',
        'Never to turn the back upon a foe'
    ],
    //Knight's Code as determined by the Duke of Burgundy
    knightsCodeBurgandy = [
        'Faith',
        'Charity',
        'Justice',
        'Sagacity',
        'Prudence',
        'Temperance',
        'Resolution',
        'Truth',
        'Liberality',
        'Diligence',
        'Hope',
        'Valor'
    ],
    //Samurai Collection
    bushido = [
        'Justice - 義, gi',
        'Courage - 勇, yū',
        'Benevolence - 仁, jin',
        'Respect - 礼, rei',
        'Integrity - 誠, makoto',
        'Honor - 名誉, meiyo',
        'Loyalty - 忠義, chūgi',
        'Self-Control - 自制, jizai'
    ]
];

// Add category/author names in the same order as honours arrays
const honourCategories = [
    "Knight's Code (Song of Roland)",
    "Knight's Code (Duke of Burgundy)",
    "Bushido"
];


//Wraps all into nice function
function honour() {
    const categoryIndex = Math.floor(Math.random() * honours.length);
    const category = honours[categoryIndex];
    const categoryName = honourCategories[categoryIndex];
    const choiceIndex = Math.floor(Math.random() * category.length);
    const output = category[choiceIndex];
    const h2 = document.getElementById('honourText');
    if (h2) {
        h2.textContent = `${output} — ${categoryName}`;
    }
};

// --- Authentication (client-side demo using localStorage + Web Crypto) ---
/*
    Authentication helpers (client-side demo)

    IMPORTANT: This is a simple client-side demo intended for learning and local
    experimentation only. Storing authentication data in `localStorage` is NOT
    secure for production. A real application must use a server, secure cookies
    or tokens, proper salting, and a trusted password hashing algorithm on the
    server (e.g., bcrypt, Argon2) over HTTPS.

    The functions below implement a minimal experience using:
    - Web Crypto API (`crypto.subtle.digest`) to hash passwords (SHA-256).
    - `localStorage` to keep a map of users (username -> hash) and a `sessionUser` key.
    - Simple UI wiring for the modal to show forms, messages, and a sign-out button.

    Read the inline comments for each helper to understand what it does.
*/

// Hash a UTF-8 password string using SHA-256 and return a hex string.
// Note: SHA-256 is used here for demonstration; use a stronger server-side
// hashing strategy for real applications.
async function hashPassword(password) {
    const enc = new TextEncoder();
    const buf = await crypto.subtle.digest('SHA-256', enc.encode(password));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Read the users object from localStorage. Format: { username: passwordHash, ... }
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '{}');
}

// Save the users object back to localStorage.
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Set the currently signed-in user in localStorage. This simulates a session.
function setSessionUser(username) {
    localStorage.setItem('sessionUser', username);
}

// Clear the simulated session.
function clearSessionUser() {
    localStorage.removeItem('sessionUser');
}

// Create a new user by hashing their password and storing it. Throws if user exists.
async function createUser(username, password) {
    const users = getUsers();
    if (users[username]) throw new Error('User already exists');
    const hash = await hashPassword(password);
    users[username] = hash;
    saveUsers(users);
}

// Verify credentials by hashing the provided password and comparing it to stored hash.
async function verifyUser(username, password) {
    const users = getUsers();
    if (!users[username]) return false;
    const hash = await hashPassword(password);
    return users[username] === hash;
}

// Update the small nav link to either say "Sign In" or show the signed-in username.
function updateAuthUI() {
    const authButton = document.getElementById('authButton');
    const session = localStorage.getItem('sessionUser');
    if (!authButton) return;
    // We update both visible text and an ARIA state so assistive tech can
    // programmatically tell whether the user is signed in. This complements
    // the visual change handled in CSS (e.g., different background when signed).
    if (session) {
        authButton.textContent = `Hello, ${session}`;
        authButton.setAttribute('aria-pressed', 'true');
        authButton.title = `Signed in as ${session}`;
    } else {
        authButton.textContent = 'Sign In';
        authButton.setAttribute('aria-pressed', 'false');
        authButton.title = 'Open sign-in dialog';
    }
}

// Show or hide the auth modal by toggling `aria-hidden`. We keep modal in DOM
// so focus order and screen reader context remains stable.
function showModal(open) {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
}

// Switch the modal between Sign In and Sign Up tabs. Also clears any previous message.
function switchToTab(tab) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const tabSignIn = document.getElementById('tabSignIn');
    const tabSignUp = document.getElementById('tabSignUp');
    const title = document.getElementById('authTitle');
    const authMessage = document.getElementById('authMessage');
    authMessage.textContent = '';
    if (tab === 'signup') {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
        tabSignIn.classList.remove('active');
        tabSignUp.classList.add('active');
        title.textContent = 'Create Account';
    } else {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
        tabSignIn.classList.add('active');
        tabSignUp.classList.remove('active');
        title.textContent = 'Sign In';
    }
}

// When a user is signed in, show a small signed-in area with a sign-out button
// inside the modal. This keeps the modal as a central place to manage auth state.
function renderSignedInView() {
    const session = localStorage.getItem('sessionUser');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const title = document.getElementById('authTitle');
    const authMessage = document.getElementById('authMessage');
    authMessage.textContent = '';
    if (session) {
        // hide forms and show signed-in summary
        signInForm.style.display = 'none';
        signUpForm.style.display = 'none';
        title.textContent = `Signed in as ${session}`;
        const content = document.createElement('div');
        content.id = 'signedInArea';
        content.innerHTML = `<p>Signed in as <strong>${session}</strong></p><button id="signOutBtn">Sign Out</button>`;
        const modalContent = document.querySelector('.modal-content');
        const existing = document.getElementById('signedInArea');
        if (existing) existing.remove();
        modalContent.appendChild(content);
        document.getElementById('signOutBtn').addEventListener('click', () => {
            // Remove session and reset UI
            clearSessionUser();
            const el = document.getElementById('signedInArea'); if (el) el.remove();
            updateAuthUI();
            switchToTab('signin');
            showModal(false);
        });
    }
}

// Close the modal and clear any messages.
function closeModalClean() {
    showModal(false);
    const authMessage = document.getElementById('authMessage'); if (authMessage) authMessage.textContent = '';
}

// Wire up the auth UI: button clicks, tab switches, form submits, and keyboard/overlay close.
function initAuth() {
    // Make sure nav reflects any existing session
    updateAuthUI();

    // Capture important elements once so handlers can reference them
    const authButton = document.getElementById('authButton');
    const authModal = document.getElementById('authModal');
    const authClose = document.getElementById('authClose');
    const tabSignIn = document.getElementById('tabSignIn');
    const tabSignUp = document.getElementById('tabSignUp');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const authMessage = document.getElementById('authMessage');

    if (!authButton || !authModal) return; // nothing to wire if modal or button missing

    // Clicking the nav authButton opens the modal. If already signed in, show signed-in view.
    authButton.addEventListener('click', (e) => {
        e.preventDefault();
        const session = localStorage.getItem('sessionUser');
        if (session) {
            showModal(true);
            renderSignedInView();
        } else {
            showModal(true);
            switchToTab('signin');
        }
    });

    // Close button inside the modal
    authClose.addEventListener('click', () => closeModalClean());

    // Tab clicks
    tabSignIn.addEventListener('click', () => switchToTab('signin'));
    tabSignUp.addEventListener('click', () => switchToTab('signup'));

    // Sign-up flow: validate fields, create user, and sign them in.
    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const u = document.getElementById('su-username').value.trim();
        const p = document.getElementById('su-password').value;
        const pc = document.getElementById('su-password-confirm').value;
        if (!u || !p) { authMessage.textContent = 'Please provide username and password.'; return; }
        if (p !== pc) { authMessage.textContent = 'Passwords do not match.'; return; }
        try {
            await createUser(u, p);
            setSessionUser(u);
            updateAuthUI();
            closeModalClean();
        } catch (err) {
            authMessage.textContent = err.message || 'Could not create user.';
        }
    });

    // Sign-in flow: verify credentials and create a session on success.
    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const u = document.getElementById('si-username').value.trim();
        const p = document.getElementById('si-password').value;
        if (!u || !p) { authMessage.textContent = 'Please provide username and password.'; return; }
        const ok = await verifyUser(u, p);
        if (ok) {
            setSessionUser(u);
            updateAuthUI();
            closeModalClean();
        } else {
            authMessage.textContent = 'Invalid username or password.';
        }
    });

    // Allow closing by clicking the overlay (outside the modal content)
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) closeModalClean();
    });

    // Allow closing with the ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModalClean();
    });

    // Ensure the nav reflects any existing session now that handlers are in place
    updateAuthUI();
}