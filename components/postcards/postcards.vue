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
        size="30"
        class="mx-1"
      >
      <img :src='user.Photo'>
      </v-avatar> 
      {{user.Name}}
      <v-spacer></v-spacer>
      <v-icon @click="1">
        mdi-dots-horizontal
      </v-icon>
  </v-card-actions>
  <!-- 轮播图 -->
    <v-carousel  
    hide-delimiter-background
    delimiter-icon="mdi-minus"
    height="auto"
    min-height="200"
    >
    
    <v-carousel-item 
      v-for="(item,i) in postContend.ImgUrls"
      :key="i"
      eager
      height="auto"
      :src="item.Url"
    ></v-carousel-item>
  </v-carousel>
  <!-- <el-carousel trigger="click"  :autoplay="false" :loop="false">
      <el-carousel-item v-for="(item,i) in postContend.ImgUrls" :key="i">
        <el-image
        style="width: 100%; height: 100%"
      :src="item.Url"
      fit="cover"></el-image>
      </el-carousel-item>
      
    </el-carousel> -->
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
        <v-list-item-subtitle v-if="postContend.Comments[0]">
          <strong>{{getuser(postContend.Comments[0].UserID).Name}}</strong> {{postContend.Comments[0].Content}}
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
         <el-input
         v-model="textarea1"
          prefix-icon="el-icon-s-comment"
          placeholder="评论"
          maxlength="220">
        </el-input>
        
      <v-btn
        color="blue"
        text
        @click="reserve"
      >
        发布
      </v-btn> 
    </v-card-actions>
    <!-- {{postContend}} -->
  </v-card>
 
</template>
<script>
export default {
    name: 'PostCards',
    components:{

    },  
    props:{
      postContend :{
        type: Object,
        required:true
      }
    },
   data: () => ({
      loading: false,
      selection: 1,
      textarea1:'',
    }),
    computed:{
      user (){
        return  this.$store.state.userMap.get(this.postContend.UserID)
      },
      
    },
    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      getuser(uid){
        return  this.$store.state.userMap.get(uid)
      }
    }
}
</script>
<style scoped>
.right{
  float: right;
}
</style>