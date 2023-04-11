// Import the BLISS_API environment variable from .env.local
const BLISS_API = process.env.REACT_APP_BLISS_API;

// Create the API_URL constant using the BLISS_API variable
export const API_URL = BLISS_API;

export const QUESTIONS_URL = `${API_URL}/questions`;
export const HEALTH_URL = `${API_URL}/health`;
export const QUESTIONS_LIMIT = 3;
//export const QUESTIONS_OFFSET = 2; */