const updateSoundStatus = (object, audioStatus) => {
  let myStatus = audioStatus;
  if (audioStatus) {
    if (object != null) {
      object.setVisible(false);
    }
    myStatus = false;
  } else {
    if (object != null) {
      object.setVisible(true);
    }
    myStatus = true;
  }
  return myStatus;
};

export default updateSoundStatus;