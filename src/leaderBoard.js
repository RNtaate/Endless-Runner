import Phaser from 'phaser';
import {gameState} from './boot';
import CustomButton from './support_script/CustomButton';
import {setText} from './gameOver';
import * as fetchScoreData from './support_script/fetchData';
import 'regenerator-runtime/runtime.js';

class LeaderBoard extends Phaser.Scene {
  constructor() {
    super({key: 'Leader'});
  }

  preload() {

  }

  create() {

    let height = 75;
    let myScores = [];
    let myUrl = fetchScoreData.api_url + fetchScoreData.api_key + '/scores'

    console.log(myUrl);

    this.add.image(gameState.sceneWidth / 2, gameState.sceneHeight / 2, 'sky').setScale(0.5);

    this.add.rectangle(gameState.sceneWidth / 4, 0, gameState.sceneWidth / 2, gameState.sceneHeight, 0x000000, 0.8).setOrigin(0);

    this.add.image(gameState.sceneWidth/ 2, gameState.sceneHeight/ 2, 'logo2').setScale(0.8).setAlpha(0.2);

    setText(this, gameState.sceneWidth / 2, 25, 'Leader Board', '50px', "#ffffff", '#00ff00', 0.5);

    fetchScoreData.fetchScores(myUrl)
    .then((scores) => {
      myScores = scores.result;
      console.log(myScores);

      for(let i = 0; i < myScores.length; i += 1){
        if (i >= 8) {
          break;
        }
        height += 50
        setText(this, gameState.sceneWidth / 4 + 10, height, myScores[i]['user'], '30px', "#ffffff", '#0000ff', 0, 0.5);
        setText(this, gameState.sceneWidth * 3 / 4 - 10, height, myScores[i]['score'].toString(), '30px', "#ffffff", '#000000', 1, 0.5);
      }
    }).catch((error) => {
      console.log('a bad error');
      setText(this, gameState.sceneWidth / 2, gameState.sceneHeight / 2, 'failed to collect Scores!', '30px', "#ffffff", '#ff0000', 0.5, 0.5);
    })

    const backBtn = new CustomButton(this, gameState.sceneWidth - 100, gameState.sceneHeight - 50, 'mainMenu', 'mainMenuHover');
    this.add.existing(backBtn);

    backBtn.setInteractive().on('pointerup', () => {
      this.scene.stop();
      this.scene.start('Menu');
    })
  }
}

export default LeaderBoard;