# Endless-Runner (Run Buddy Run)

![Linters](https://github.com/RNtaate/Endless-Runner/workflows/Linters/badge.svg)
[![GitHub Pull Requests](https://img.shields.io/badge/GitHub-Pull%20Requests-blue)]()

## Project Description

> This project is an online endless platformer game built with Phaser 3 Library

## Preview

![](assets/gameGif3.gif)

##  🔧 Built with

- HTML5

- CSS3
- Javascript
- [Phaser 3](http://phaser.io/phaser3)

## About the game

> **Run Buddy Run** is a simple endless-runner platformer game that is all about collecting coins and bringing down missiles.

> The game starts off with the player character already running forward, and your objective is to help her collect as many coins as possible before the health bar  is completely depleted.

## Instructions on how to play the game

- Click on the **Instructions** button on the game's **Main Menu** to read about the rules and objectives of the game, as well as the controls for moving the game's player character.

## 🔴 Live Demo

- [Run Buddy Run](https://raw.githack.com/RNtaate/Endless-Runner/feature-endless/dist/index.html)
- [Run Buddy Run, on Netlify](https://run-buddy-run.netlify.app/)

## Game Development

- ### Ideation
  During the planning phase of the game, I was faced with the conundrum of recognizing that there are plenty of platformer runner games out there most of which share the same ideas. Therefore I decided to proceed with the Idea of creating a runner game that not only relys on one's skills to hit a good score, but also a little bit of luck -- Meaning one's probability of not hitting a high score each session of play is slightly higher than most games due to the luck factor involved.

- ## Designing
  This phase was such a pivotal part of the development process. In it, despite the project being a simple 2D platformer game, I desired for it to capture one's eye by creating quite decent visuals and graphics hence the decision of building a faintly deep **Parallax** of upto 3 layers of scrolling background images, which images along with other assets were obtained from good sources which are mentioned in the `Acknowledgements` section

  The challenge in this was to create an infinite scrolling parallax without consuming extra memory because memory is finite (Which i managed to achieve).

- ## Development
  Working with Phaser 3 was very interesting and after some time, you learn to appreciate the work put into it.

  I listed the main features I wanted in my game and designed them following the Phaser 3 documentation.

  Breifly, below are the steps I followed in development: 

  - Install Phaser using Node Package Manager(npm) and set up the game configuration.

  - Design the Game scene by implementing the following:
    1. Create a game background with associated parallax and optimise it.
    1. Add the player character and associated functionality/features
    1. Add the enemies and other characters with associated features
    1. Add a scoring system

  - Design other supplimentary scenes.
  - Add sound to the game.
  - Add and implement the Leader Board functionality using the scoring api.
  - Finalise.

- ## Deployment
  First the game was deployed on [githack.com](rawcdn.githack.com), and later it will be deployed on Netlify.

## How to deploy the game on your local machine

### Prerequisites
1. Node Package Manager (npm)
2. A local server such as **Live Server**

### Steps to follow

1. Clone the repository to your local machine by running `git clone git@github.com:RNtaate/Endless-Runner.git` in your terminal

1. On your local machine, navigate to the game folder using `cd Endless-Runner` in your terminal

1. Run `npm install` to install **Phaser**, and all the necessary dependencies.

1. Run `npm run build`

1. Open index.html using a local server such as `Live Server`

## How to test the project

1. In your terminal, run `npm test`

## 🤝 Contributions
  There are two ways of contributing to this project:

1. If you see something wrong or not working, please check [the issue tracker section](https://github.com/RNtaate/Endless-Runner/issues), if that problem you met is not in already opened issues then open the issue by clicking on `new issue` button.

2. If you have a solution to that, and you are willing to work on it, follow the below steps to contribute:
    1.  Fork this repository

    1.  Clone it on your local computer by running `git clone git@github.com:RNtaate/Endless-Runner.git` __Replace *RNtaate* with the username you use on github__
    1.  Open the cloned repository which appears as a folder on your local computer with your favorite code editor
    1.  Create a separate branch off the *master branch*,
    1.  Write your codes which fix the issue you found
    1.  Commit and push the branch you created
    1.  Raise a pull request, comparing your new created branch with our original master branch [here](https://github.com/RNtaate/Endless-Runner)

## ✒️  Authors

👤 **Roy Ntaate**

- Github: [@RNtaate](https://github.com/RNtaate)
- Twitter: [@RNtaate](https://twitter.com/RNtaate)
- Linkedin: [roy-ntaate](https://linkedin.com/in/roy-ntaate)

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgements

- [Microverse](https:www.microverse.org)
- [OpenGameArt.org](https://opengameart.org/)
- [CoolText.com](https://cooltext.com/)
- [MarwaMJ](https://marwamj.itch.io/)
- [kenney.nl](https://www.kenney.nl/)
- [Youtube](https://www.youtube.com/)