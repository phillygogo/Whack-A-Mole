<template>
<div class="container">
  <div class="score-grid">
    <div class="score">
      20Points
    </div>
    <div class="start" @click="startGame()">
      Start!
    </div>
  </div>
  <div class="mole-grid">
    <Mole
      v-for="mole in moles"
      :key="mole.id"
      :showtime="mole.showtime"
      @im-done="doneFunc(mole.id)"
      v-on:click.native="hitOrMiss(mole.showtime)"
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
      start: false,
      stepNum: 1,
      stepTimeout: null,
      moleInPlay: null,
      poppingMole: 5,
      moles: [{id: 0, showtime: false}, {id: 1, showtime: false}, {id: 2, showtime: false}, {id: 3, showtime: false}, {id: 4, showtime: false},
      {id: 5, showtime: false}, {id: 6, showtime: false}, {id: 7, showtime: false}]
    };
  },
  methods: {
    hitOrMiss(poppingUp) {
      console.log('hit me or miss : ' + poppingUp);
    },
    startGame() {
      this.interval = setInterval(() => 
        this.runCycle()
      , 1000);
    },
    runCycle() {
      var theMole = Math.floor(Math.random() * Math.floor(8));
      this.moles[theMole].showtime = true;
    },
    doneFunc(mole) {
      this.moles[mole].showtime = false;
    },
  }
};
</script>

<style scoped lang="scss">
  
</style>
