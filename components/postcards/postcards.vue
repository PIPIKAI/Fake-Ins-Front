<template>
  <v-card
    :loading="loading"
    flat
    rounded="lg"
     outlined
    class="mx-auto my-5 pa-0"
    max-width="500"
  >
  <v-card-actions class="pa-1">
    <v-avatar
        color="primary"
        size="30"
        class="mx-1"
      ></v-avatar> 
      Username
      <v-spacer></v-spacer>
      <v-icon @click="1">
        mdi-dots-horizontal
      </v-icon>
  </v-card-actions>
  <!-- 轮播图 -->
    <v-carousel  
    hide-delimiter-background
    delimiter-icon="mdi-minus"
    >
    <v-carousel-item 
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
  <v-card-actions class="pa-1 mx-1" >
       <v-icon @click="1">mdi-cards-heart-outline</v-icon>
       <v-icon @click="1">mdi-chat-outline</v-icon>
       <v-icon @click="1">mdi-send-outline</v-icon>
       <v-spacer></v-spacer>
       <v-icon @click="1">mdi-bookmark-outline</v-icon>
      
    </v-card-actions>

    <v-list-item dense class="pa-0 mx-1">
      <v-list-item-content>
        <v-list-item-title>
          <strong>麻花腾</strong>和<strong>其他用户</strong>赞了</v-list-item-title>
        <v-list-item-subtitle>
          <strong>码云</strong> 小黑子树脂666🤣
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          全部4399条评论
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <strong>真ikun</strong> 苏珊
          <v-icon class="float-right"  small>
            mdi-cards-heart-outline
          </v-icon>
        </v-list-item-subtitle>
         
    
        <v-list-item-subtitle>
          <strong>守护世界最好的坤坤</strong> 🐓你太美
          
          <v-icon class="float-right"  small>
            mdi-cards-heart-outline
          </v-icon>
        
        </v-list-item-subtitle>
      </v-list-item-content>
      
    </v-list-item>

    <v-divider></v-divider>
    <v-card-actions class="pa-0" >
          <v-text-field
        label="评论"
        dense
        solo
        flat
        prepend-inner-icon="mdi-emoticon-cool-outline"
        
        ></v-text-field>
        
      <v-btn
        color="blue"
        text
        @click="reserve"
      >
        发布
      </v-btn> 
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'PostCards',
    components:{

    },
   data: () => ({
      loading: false,
      selection: 1,
      items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
    }),  
    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
}
</script>
<style scoped>
.right{
  float: right;
}
</style>