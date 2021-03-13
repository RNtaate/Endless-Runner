jest.mock('../src/support_script/fetchData');
import {fetchScores, postScores} from './__mocks__/fetchData';

let myApi = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/w6SPERY9Zb302Ci7sS5D/scores';

test('Should return an object containing game scores', () => {
  fetchScores(myApi)
  .then((scores) => {
    expect(scores.result instanceof Array).toBeTruthy
    expect(scores.result[0]['user']).not.toBe('Rayhan');
  }).catch((error) => {
      console.log(error);
  })
});

test('Should update game scores on api and return a success message', () => {
  postScores (myApi, {'user': 'Roy', 'score': 43})
  .then((message) => {
    expect(typeof message.result).toBe('string');
    expect(message.result).toBe('Game scores updated successfully');
    expect(message.result).not.toBe('Anything else');
  }).catch((error) => {
    console.log(error);
  })
})