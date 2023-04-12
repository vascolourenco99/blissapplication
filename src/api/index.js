import { QUESTIONS_URL, HEALTH_URL, QUESTIONS_LIMIT } from '../resources/constants';

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

export const getQuestions = async (filterParam) => {
  try {
    const response = await fetch(`${QUESTIONS_URL}?limit=${QUESTIONS_LIMIT}&offset=0&filter=${filterParam}`);
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

export const handleRetry = () => {
  getHealth();
};

export const shareQuestion = async (destinationEmail) => {
  const response = await fetch(`https://private-anon-2c8b79ecec-blissrecruitmentapi.apiary-mock.com/share?destination_email=${destinationEmail}&content_url=${window.location.href}`, {
    method: 'POST'
  });
  
  const data = await response.json();

  return { ok: response.ok, data };
};