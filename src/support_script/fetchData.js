
const api_url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const api_key = 'w6SPERY9Zb302Ci7sS5D';

let postScores = async(url, data={}) => {
  let options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  let req = await fetch(url, options);
  let res = await req.json();

  return res;
}

let fetchScores = async (url) => {
  let req = await fetch(url);
  let res = await req.json();
  
  return res;
}

export {api_url, api_key, postScores, fetchScores};