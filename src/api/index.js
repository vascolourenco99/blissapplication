const BLISS_API = process.env.REACT_APP_BLISS_API;

export const QUESTIONS_LIMIT = 3;

const QUESTIONS_URL = `${BLISS_API}/questions`;
const HEALTH_URL = `${BLISS_API}/health`;


export const getHealth = async () => {
  try {
    const response = await fetch(HEALTH_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching health status:', error);
    return { status: 'UNKNOWN' }; // default value for health status
  }
}

export const handleRetry = () => {
  getHealth();
};

export const getQuestions = async (filterParam, offset = 0) => {
  try {
    const response = await fetch(`${QUESTIONS_URL}?limit=${QUESTIONS_LIMIT}&offset=${offset}&filter=${filterParam}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export const getQuestion = async (id) => {
  const url = QUESTIONS_URL + `/` + id;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const putQuestionVote = async (id, updatedQuestion) => {
  fetch(
    QUESTIONS_URL+ "/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({updatedQuestion}),
    }
  );
}

export const shareQuestion = async (destinationEmail) => {
  const response = await fetch(`${BLISS_API}/share?destination_email=${destinationEmail}&content_url=${window.location.href}`, {
    method: 'POST'
  });
  const data = await response.json();
  return data
};