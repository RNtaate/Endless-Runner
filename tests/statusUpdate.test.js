import updateSoundStatus from '../src/support_script/statusUpdate';

test('It should update the boolean value of provided', () => {
  const gameStatus = {
    music: true,
    sound: false,
  };

  gameStatus.music = updateSoundStatus(null, gameStatus.music);
  expect(gameStatus.music).toBe(false);
  expect(gameStatus.music).not.toBe(true);
});