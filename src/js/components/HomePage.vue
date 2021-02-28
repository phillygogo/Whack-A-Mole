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

    <div class="countDown" id="countDown"></div>
    <div class="mole-grid">
        <Mole
        v-for="mole in moles"
        :key="mole.id"
        :showtime="mole.showtime"
        :hit="mole.hit"
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
        gameTime: 3,
        countDownTimer: 3,
        gameOver: false,
        luckyNumbers: [],
        gameInterval: null,
        countdownInterval: null,
        moles: [{id: 0, showtime: false, hit: false}, {id: 1, showtime: false, hit: false}, {id: 2, showtime: false, hit: false}, {id: 3, showtime: false, hit: false},
        {id: 4, showtime: false, hit: false}, {id: 5, showtime: false, hit: false}, {id: 6, showtime: false, hit: false}, {id: 7, showtime: false, hit: false, hit: false}]
    };
  },
  methods: {
    hitOrMiss(mole) {
        if(mole.showtime && !mole.hit) {
            mole.hit = true;
            this.score = this.score +1;
        }
    },
    countDown() {
        this.addHighScore();
        // this.resetGame();
        // this.countdownInterval = setInterval(() => {
        //     var startButton = document.getElementById('start');
        //     var countDownSpot = document.getElementById('countDown');
        //     startButton.style.backgroundImage = "url("+ "https://i.imgur.com/MMfzy74.png"+")";

        //     switch(this.countDownTimer) {
        //         case 3:
        //             countDownSpot.style.backgroundImage = "url("+ "https://i.imgur.com/FooSE5H.png"+")";
        //             break;
        //         case 2:
        //             countDownSpot.style.backgroundImage = "url("+ "https://i.imgur.com/P80EYDh.png"+")";
        //             break;
        //         case 1:
        //             countDownSpot.style.backgroundImage = "url("+ "https://i.imgur.com/ydVwsRD.png"+")";
        //             break;
        //         case 0:
        //             countDownSpot.style.backgroundImage = "url("+ "https://i.imgur.com/26Lj92W.png"+")";
        //             clearInterval(this.countdownInterval);
        //             this.startGame();
        //             break;
        //     };
        //     this.countDownTimer = this.countDownTimer -1;
        // }, 1000);
    },
    // highscores() {
    //     fetch("/highscores.txt")
    //         .then(response => response.arrayBuffer())
    //         .then(arrayBuffer => {

    //             var blobby = new Blob([arrayBuffer]);

    //             var file = new File([blobby], 'highscores.txt');
    //             let reader = new FileReader(file);

    //             reader.onload = e => console.log(e.target.result);
    //             reader.readAsText(file);

    //             console.log(reader);
    //         })
    //         .catch(err => console.log(err));
    // },
    addHighScore() {
        //fetch the file from the server
        fetch("/highscores.txt")

            //convert file to arrayBuffer
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {

                //create blob from arrayBugger
                var blobby = new Blob([arrayBuffer]);

                //create file from Blob
                var file = new File([blobby], 'highscores.txt');
                let reader = new FileReader(file);

                //get the results from the reader
                reader.onload = result => {

                    // console.log(e.target.result);
                    //split the file on comma, and save to array.
                    var fileText = result.target.result.split(',');
                    
                    //push my new value to the array
                    fileText.push('Phillip - 20,');
                    console.log(fileText);


                    //push file back to the filesytem.

                }
                reader.readAsText(file);

            })
            .catch(err => console.log(err));
    },
    startGame() {
        this.gameInterval = setInterval(() => {
            if(this.gameTime == 0) {
                this.gameOver = true;
                this.gameTime = 30;
                clearInterval(this.gameInterval);
                return;
            }
            this.runCycle()
            this.gameTime = this.gameTime -1;
            var countDownSpot = document.getElementById('countDown');
            countDownSpot.style.backgroundImage = "none";
            
        }, 1000);
    },
    runCycle() {
        //reset all this hits on the moles each game cycle
        this.moles.forEach((mole) => {
            mole.hit = false;
            // mole.style.backgroundImage = "url("+ "https://i.imgur.com/bl4VaaU.png"+")";
        });

        //pick the mole to appear
        var theMole = this.diceRoll();
        this.moles[theMole].showtime = true;
        
        //roll the lucky roll
        this.luckyNumbers = [this.diceRoll(),this.diceRoll()];

        //Generate a lucky roll!
        if(this.luckyNumbers.includes(theMole)) {
            this.luckyRoll(theMole);
        }
    },
    resetGame() {
        this.countDownTimer = 3;
        this.gameTime = 3;
        this.score = 0;
        this.gameOver = false;
    },
    doneFunc(mole) {
        this.moles[mole].showtime = false;
    },
    luckyRoll(theMole) {
        //pick the second mole to appear
        var doubleMole = this.diceRoll();

        if (doubleMole !== theMole) {
            this.moles[doubleMole].showtime = true;
        }
    },
    diceRoll() {
        return Math.floor(Math.random() * Math.floor(8));
    }
  }
};
</script>

<style scoped lang="scss">
  
</style>
