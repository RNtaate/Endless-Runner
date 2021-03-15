import 'regenerator-runtime/runtime';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const apiKey = 'GRzadLatZp2NcDHxIoxp';

const postScores = async (url, data = {}) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const req = await fetch(url, options);
  const res = await req.json();

  return res;
};

const fetchScores = async (url) => {
  const req = await fetch(url);
  const res = await req.json();

  return res;
};

export {
  apiUrl, apiKey, postScores, fetchScores,
};