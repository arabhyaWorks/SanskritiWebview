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


export async function fetchEventList() {
  try {
    const response = await fetch(`${API_BASE_URL}app/event-list`, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: API_TOKEN }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function fetchEventDetails(event_id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}app/event-details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: API_TOKEN, event_id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
}