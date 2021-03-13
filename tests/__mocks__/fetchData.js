import 'regenerator-runtime/runtime';
let postScores = (url, data) => {
  return Promise.resolve({result: 'Game scores updated successfully'});
}

let fetchScores = async (url) => {
  return Promise.resolve({result: [{"user": 'Roy', 'score': 43 }]});
}

export {postScores, fetchScores};