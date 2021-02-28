<template>
    <div class="hole" ></div>
</template>

<script>
export default {
    name: 'Mole',
    props: ['showtime', 'hit', 'speed'],
    data() {
        return {
            stepNum: 1,
            stepTimeout: null,
        };
    },
    watch: { 
      	showtime: function(newVal, oldVal) { // watch it
            if(newVal) {
                this.popup();
            }
        },
        hit: function(newVal, oldVal) { // watch it
            if(newVal) {
                this.whacked();
                this.stepNum = 4;
                this.$el.style.backgroundPosition = "0px " + (144 * this.stepNum) + "px";
                this.stepNum = 1;
                clearTimeout(this.stepTimeout);
                this.$emit('im-done');
            } else {
                this.unwhack();
            }
        }
    },
    methods: {
        popup() {
            this.$el.style.backgroundPosition = "0px " + (144 * this.stepNum) + "px";
            this.stepTimeout = setTimeout(this.popup, this.speed);
            
            if(this.stepNum == 4) {
                clearTimeout(this.stepTimeout);
                this.$emit('im-done');
            }
            this.stepNum = (this.stepNum === 4) ? this.stepNum = 1 : this.stepNum + 1;
        },
        whacked() {
            this.$el.style.backgroundImage = "url("+ "https://i.imgur.com/xb6Dvwe.png"+")";
        },
        unwhack(){
            this.$el.style.backgroundImage = "url("+ "https://i.imgur.com/bl4VaaU.png"+")";
        }
    }
};
</script>

<style scoped lang="scss">
  
</style>
