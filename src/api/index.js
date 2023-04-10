import { QUESTIONS_URL, HEALTH_URL } from '../resources/constants';

export const getHealth = async () => {
  try {
    const response = await fetch(HEALTH_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching health status:', error);
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

// finish this refactor
/* export const shareQuestion = async (destinationEmail) => {
  await fetch(`https://private-anon-2c8b79ecec-blissrecruitmentapi.apiary-mock.com/share?destination_email=${destinationEmail}&content_url=${window.location.href}`, {
      method: 'POST'
    });
} */