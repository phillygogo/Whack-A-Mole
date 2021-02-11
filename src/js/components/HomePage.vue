<template>
<div class="container">
  <div class="start" @click="startGame()">
    Start!
  </div>
  <ScoreBoard 
    :score="this.score"
    :gameTime="this.gameTime"
    :gameOver="this.gameOver"
  />
  <div class="mole-grid">
    <Mole
      v-for="mole in moles"
      :key="mole.id"
      :showtime="mole.showtime"
      @im-done="doneFunc(mole.id)"
      v-on:click.native="hitOrMiss(mole)"
    />

  </div>
</div>
</template>

<script>
import Mole from './Mole.vue';
import ScoreBoard from './ScoreBoard.vue';

export default {
  name: 'HomePage',
  components: {
    Mole,
    ScoreBoard,
  },
   data() {
    return {
        score: 0,
        gameTime: 30,
        gameOver: false,
        luckyNumbers: [],
        interval: null,
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
    startGame() {
        this.gameTime = 30;
        this.score = 0;
        this.gameOver = false;

        this.interval = setInterval(() => {
            if(this.gameTime == 0) {
                this.gameOver = true;
                clearInterval(this.interval);
            }
            this.runCycle()
            this.gameTime = this.gameTime -1;
        }, 1000);
    },
    runCycle() {
        //reset all this hits on the moles each game cycle
        this.moles.forEach((mole) => mole.hit = false);

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
