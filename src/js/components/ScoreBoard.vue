<template>
    <div class="score-grid">
        <div class="gameOver"
            v-if="gameOver">
            GAME OVER!!
        </div>
        <div class="timer"
            v-if="gameTime >= 0">
            {{gameTime}} Seconds Left!
        </div>
        <div class="score">
            {{score}} Points
        </div>
    </div>
</template>

<script>
export default {
    name: 'ScoreBoard',
    props: ['score', 'gameTime', 'gameOver'],
};
</script>

<style scoped lang="scss">
  
</style>
