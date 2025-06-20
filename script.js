// Combined Register & Login logic for index.html landing page

// Helper: Show alert and optionally reload or redirect
function showAlert(msg, reload = false, redirect = null) {
    alert(msg);
    if (reload) location.reload();
    if (redirect) location.href = redirect;
}

// Register Form Logic
const regForm = document.getElementById('registerForm');
if (regForm) {
    regForm.onsubmit = function (e) {
        e.preventDefault();
        const username = document.getElementById('regUsername').value.trim();
        const mob = document.getElementById('regMobile').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirm_password = document.getElementById('regConfirmPassword').value;
        let valid = true;
        // Validation
        if (!username) {
            document.getElementById('regUsernameError').textContent = 'Username is required.';
            valid = false;
        } else {
            document.getElementById('regUsernameError').textContent = '';
        }
        if (!mob) {
            document.getElementById('regMobileError').textContent = 'Mobile number is required.';
            valid = false;
        } else if (!/^\d{10}$/.test(mob)) {
            document.getElementById('regMobileError').textContent = 'Enter a valid 10-digit mobile number.';
            valid = false;
        } else {
            document.getElementById('regMobileError').textContent = '';
        }
        if (!password) {
            document.getElementById('regPasswordError').textContent = 'Password is required.';
            valid = false;
        } else if (password.length < 6) {
            document.getElementById('regPasswordError').textContent = 'Password must be at least 6 characters.';
            valid = false;
        } else {
            document.getElementById('regPasswordError').textContent = '';
        }
        if (!confirm_password) {
            document.getElementById('regConfirmPasswordError').textContent = 'Please confirm your password.';
            valid = false;
        } else if (password !== confirm_password) {
            document.getElementById('regConfirmPasswordError').textContent = 'Passwords do not match.';
            valid = false;
        } else {
            document.getElementById('regConfirmPasswordError').textContent = '';
        }
        let users = window.localStorage.getItem('users');
        users = users ? JSON.parse(users) : [];
        if (users.some(u => u.name === username)) {
            document.getElementById('regUsernameError').textContent = 'Username already exists. Please choose another.';
            valid = false;
        }
        if (!valid) return;
        users.push({ name: username, mobile: mob, password: password });
        window.localStorage.setItem('users', JSON.stringify(users));
        showAlert('User registered successfully! Please login.');
        // Switch to login tab
        if (typeof showTab === 'function') showTab('login');
        regForm.reset();
    };
}

// Login Form Logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.onsubmit = function (e) {
        e.preventDefault();
        const user_name = document.getElementById('loginUsername').value.trim();
        const user_password = document.getElementById('loginPassword').value;
        let valid = true;
        if (!user_name) {
            document.getElementById('loginUsernameError').textContent = 'Username is required.';
            valid = false;
        } else {
            document.getElementById('loginUsernameError').textContent = '';
        }
        if (!user_password) {
            document.getElementById('loginPasswordError').textContent = 'Password is required.';
            valid = false;
        } else {
            document.getElementById('loginPasswordError').textContent = '';
        }
        if (!valid) return;
        let reg_user_list = window.localStorage.getItem('users');
        reg_user_list = reg_user_list ? JSON.parse(reg_user_list) : [];
        let user_found = reg_user_list.find(v => v.name === user_name && v.password === user_password);
        if (user_found) {
            localStorage.setItem('loggedInUser', user_name);
            showAlert('Login successful!', false, 'products/index.html');
        } else {
            document.getElementById('loginPasswordError').textContent = 'Invalid username or password.';
        }
    };
}

// Real-time validation (optional, can be expanded)
document.querySelectorAll('#registerForm input').forEach(input => {
    input.addEventListener('input', () => {
        document.getElementById(input.id + 'Error').textContent = '';
    });
});
document.querySelectorAll('#loginForm input').forEach(input => {
    input.addEventListener('input', () => {
        document.getElementById(input.id + 'Error').textContent = '';
    });
});