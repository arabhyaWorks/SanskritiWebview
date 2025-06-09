const API_BASE_URL = 'https://upsanskriti.com/';
const API_TOKEN = 'cultureapisanindiatoken';

export async function loginArtist(mobile: string) {
  try {
    // For development: Return fixed OTP for specific number
    if (mobile === '9452624111') {
      return {
        status: 1,
        msg: "User logged in successfully.",
        data: {
          id: 3,
          mobile: "9452624111", 
          mobile_otp: "111111"
        }
      };
    }

    const response = await fetch(`${API_BASE_URL}/app/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: API_TOKEN,
        mobile: mobile
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}