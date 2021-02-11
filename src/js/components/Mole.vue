<template>
    <div class="hole" ></div>
</template>

<script>
export default {
    name: 'Mole',
    props: ['showtime'],
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
        }
    },
    methods: {
    popup() {
        this.$el.style.backgroundPosition = "0px " + (144 * this.stepNum) + "px";
        this.stepTimeout = setTimeout(this.popup, 750/4);
        
        if(this.stepNum == 4) {
            clearTimeout(this.stepTimeout);
            this.$emit('im-done');
        }
        this.stepNum = (this.stepNum === 4) ? this.stepNum = 1 : this.stepNum + 1;
    },
  }
};
</script>

<style scoped lang="scss">
  
</style>
