<template>
    <div class="score-grid">
        <div class="score">
            {{score}} Points
        </div>
    </div>
</template>

<script>
export default {
    name: 'ScoreBoard',
    props: ['score'],
};
</script>

<style scoped lang="scss">
  
</style>
