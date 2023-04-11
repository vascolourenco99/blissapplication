const BLISS_API = process.env.REACT_APP_BLISS_API;

export const API_URL = BLISS_API;

export const QUESTIONS_URL = `${API_URL}/questions`;
export const HEALTH_URL = `${API_URL}/health`;
export const QUESTIONS_LIMIT = 10;
export const QUESTIONS_OFFSET = 10;