<template>
<div class="container">
    <div class="gameOverContainer" v-if="this.gameOver">
        <div class="gameOver" />
        <div class="gameOverScore">
            Score: {{score}}
        </div>
        <div class="start" @click="countDown()" />
    </div>
    <div class="scoreBoard">
        <div class="timer">
            <div class="time">
                {{this.gameTime}}
            </div>
        </div>
        <div class="start" id="start" @click="countDown()" />
        <div class="score">
            <div class="points">
                {{score}}
            </div>
        </div>
    </div>
    <div class="difficulty">
        <div
            class="simple"
            id="simple"
            @click="toggleDifficulty('simple')"
        />
        <div
            class="normal"
            id="normal"
            @click="toggleDifficulty('normal')"
        />
        <div
            class="heavy"
            id="heavy"
            @click="toggleDifficulty('heavy')"
        />
    </div>
    <div class="countDown" id="countDown"></div>
    <div class="mole-grid">
        <Mole
            v-for="mole in moles"
            :key="mole.id"
            :showtime="mole.showtime"
            :hit="mole.hit"
            :speed="moleSpeed()"
            @im-done="doneFunc(mole.id)"
            v-on:click.native="hitOrMiss(mole)"
        />

    </div>
</div>
</template>

<script>
import Mole from './Mole.vue';

export default {
  name: 'HomePage',
  components: {
    Mole
  },
   data() {
    return {
        db: null,
        score: 0,
        highscores: null,
        gameTime: 30,
        countDownTimer: 3,
        gameOver: false,
        difficultyLevel: 'simple',
        difficulty: {
            simple: {moleSpeed: 1000, gameSpeed: 1500},
            normal: { moleSpeed: 400, gameSpeed: 1000},
            heavy: { moleSpeed: 300, gameSpeed: 1000},
        },
        luckyNumbers: [],
        gameInterval: null,
        countdownInterval: null,
        moles: [{id: 0, showtime: false, hit: false}, {id: 1, showtime: false, hit: false}, {id: 2, showtime: false, hit: false}, {id: 3, showtime: false, hit: false},
        {id: 4, showtime: false, hit: false}, {id: 5, showtime: false, hit: false}, {id: 6, showtime: false, hit: false}, {id: 7, showtime: false, hit: false, hit: false}]
    };
  },
  methods: {
    moleSpeed() {
        return this.difficulty[this.difficultyLevel].moleSpeed;
    },
    hitOrMiss(mole) {
        if(mole.showtime && !mole.hit) {
            mole.hit = true;
            this.score = this.score +1;
        }
    },
    countDown() {
        this.resetGame();
        this.countdownInterval = setInterval(() => {
            var startButton = document.getElementById('start');
            var countDownSpot = document.getElementById('countDown');
            startButton.style.backgroundImage = "url("+ "https://i.imgur.com/MMfzy74.png"+")";

            switch(this.countDownTimer) {
                case 3:
                    countDownSpot.style.backgroundImage = "url("+ "https://i.imgur.com/FooSE5H.png"+")";
                    break;
                case 2:
                    countDownSpot.style.backgroundImage = "url("+ "https://i.imgur.com/P80EYDh.png"+")";
                    break;
                case 1:
                    countDownSpot.style.backgroundImage = "url("+ "https://i.imgur.com/ydVwsRD.png"+")";
                    break;
                case 0:
                    countDownSpot.style.backgroundImage = "url("+ "https://i.imgur.com/26Lj92W.png"+")";
                    clearInterval(this.countdownInterval);
                    this.startGame();
                    break;
            };
            this.countDownTimer = this.countDownTimer -1;
        }, 1000);
    },
    startGame() {
        this.gameInterval = setInterval(() => {
            if(this.gameTime == 0) {
                this.gameOver = true;
                this.gameTime = 30;
                clearInterval(this.gameInterval);
                return;
            }
            this.runCycle();

            if(this.difficultyLevel == 'normal') {
                //roll a 1 in 3 chance, for more moles
                if(this.diceRoll(3) == 2) {
                    this.runCycle();
                }
            }

            if(this.difficultyLevel == 'heavy') {
                this.runCycle();
            }
                
            this.gameTime = this.gameTime -1;
            var countDownSpot = document.getElementById('countDown');
            countDownSpot.style.backgroundImage = "none";
            
        }, this.difficulty[this.difficultyLevel].gameSpeed);
    },
    runCycle() {
        //reset all this hits on the moles each game cycle
        this.moles.forEach((mole) => {
            mole.hit = false;
            // mole.style.backgroundImage = "url("+ "https://i.imgur.com/bl4VaaU.png"+")";
        });

        //pick the mole to appear
        var theMole = this.diceRoll(8);
        this.moles[theMole].showtime = true;
        
        //roll the lucky roll
        this.luckyNumbers = [this.diceRoll(8),this.diceRoll(8)];

        //Generate a lucky roll!
        if(this.luckyNumbers.includes(theMole)) {
            this.luckyRoll(theMole);
        }
    },
    toggleDifficulty(diffLevel) {
        this.difficultyLevel = diffLevel;

        var difficultyImageSimple = document.getElementById('simple');
        var difficultyImageNormal = document.getElementById('normal');
        var difficultyImageHeavy = document.getElementById('heavy');

        if(diffLevel === 'simple'){
            difficultyImageSimple.style.backgroundImage = "url("+ "https://i.imgur.com/kugMMfs.png"+")";
            difficultyImageNormal.style.backgroundImage = "url("+ "https://i.imgur.com/wDP7AI7.png"+")";
            difficultyImageHeavy.style.backgroundImage = "url("+ "https://i.imgur.com/ja1fVub.png"+")";
        }

        if(diffLevel === 'normal'){
            difficultyImageSimple.style.backgroundImage = "url("+ "https://i.imgur.com/wOsECh7.png"+")";
            difficultyImageNormal.style.backgroundImage = "url("+ "https://i.imgur.com/wYbE1Kl.png"+")";
            difficultyImageHeavy.style.backgroundImage = "url("+ "https://i.imgur.com/ja1fVub.png"+")";
        }

        if(diffLevel === 'heavy'){
            difficultyImageSimple.style.backgroundImage = "url("+ "https://i.imgur.com/wOsECh7.png"+")";
            difficultyImageNormal.style.backgroundImage = "url("+ "https://i.imgur.com/wDP7AI7.png"+")";
            difficultyImageHeavy.style.backgroundImage = "url("+ "https://i.imgur.com/HmDJeBR.png"+")";
        }
    },
    resetGame() {
        this.countDownTimer = 3;
        this.gameTime = 30;
        this.score = 0;
        this.gameOver = false;
    },
    doneFunc(mole) {
        this.moles[mole].showtime = false;
    },
    luckyRoll(theMole) {
        //pick the second mole to appear
        var doubleMole = this.diceRoll(8);

        if (doubleMole !== theMole) {
            this.moles[doubleMole].showtime = true;
        }
    },
    diceRoll(num) {
        return Math.floor(Math.random() * Math.floor(num));
    }
  }
};
</script>

<style scoped lang="scss">
  
</style>
