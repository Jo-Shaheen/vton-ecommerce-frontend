const API_BASE = ""; // Leave empty; fill later, e.g., 'http://localhost:3000'

export const registerUser = async (name, email, password) => {
  if (!name || !email || !password) {
    return { status: false, output: "All fields are required." };
  }
  if (password.length < 6) {
    return { status: false, output: "Password must be at least 6 characters." };
  }
  // Placeholder: Uncomment API call and set API_BASE when backend is ready
  // try {
  //   const response = await fetch(`${API_BASE}/auth/register`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name, email, password }),
  //   });
  //   const data = await response.json();
  //   if (!response.ok) throw new Error(data.message);
  //   return { status: true, output: 'Account created successfully!', token: data.token };
  // } catch (error) {
  //   return { status: false, output: error.message || 'Registration failed.' };
  // }
  return { status: true, output: "Account created successfully!" }; // Mock for now
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    return { status: false, output: "Email and password are required." };
  }
  // Placeholder: Uncomment API call and set API_BASE when backend is ready
  // try {
  //   const response = await fetch(`${API_BASE}/auth/login`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password }),
  //   });
  //   const data = await response.json();
  //   if (!response.ok) throw new Error(data.message);
  //   return { status: true, output: 'Login successful!', token: data.token };
  // } catch (error) {
  //   return { status: false, output: error.message || 'Login failed.' };
  // }
  return { status: true, output: "Login successful!" }; // Mock for now
};
