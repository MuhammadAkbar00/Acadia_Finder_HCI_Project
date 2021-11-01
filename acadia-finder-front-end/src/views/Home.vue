<template>
  <v-carousel 
    height="95vh"
    cycle 
    interval="3000" 
    show-arrows-on-hover>
    <v-carousel-item 
      v-for="(item,i) in items" 
      :key="i" 
      :src="item.src">
      <v-row 
        class="fill-height" 
        align="center" 
        justify="center">
        <div 
          class="title" 
          align="center" 
          justify="center" >
          {{ item.title }}
      </div>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        src: require('../assets/homepage_slide1.jpeg'),
        title: "It's all at your finger tips",
      },
      {
        src: require('../assets/homepage_slide2.jpg'),
        title: "Upload and browse for textbooks and notes",
      },
      {
        src: require('../assets/homepage_slide3.jpg'),
        title: "Connect with students in your Program",

      },
    ],
  }),
};
</script>
<style scoped>
  .title{
    position:absolute;
    bottom: 80px;
    background-color: rgba(0,0,0,0.8);
    color: white;
    font-size: 10pt;
    padding: 15px;
}
</style>