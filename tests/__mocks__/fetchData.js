import 'regenerator-runtime/runtime';

const postScores = async () => Promise.resolve({ result: 'Game scores updated successfully' });

const fetchScores = async () => Promise.resolve({ result: [{ user: 'Roy', score: 43 }] });

export { postScores, fetchScores };