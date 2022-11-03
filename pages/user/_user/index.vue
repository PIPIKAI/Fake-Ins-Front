<template>
  <div>
      <div v-if="tab == 'post'" >

        <v-row  v-for="r in Math.ceil(posts.length / 3)" class="ma-0 pa-0" :key="r">
          <v-col class="ma-1 pa-0"   v-for="i in 3" :key="i"  @click="click(posts[(r-1) * 3+ i -1])">
            <MiniPostCard :hidden="(posts[(r-1) * 3+ i -1]) == null" :post="posts[(r-1) * 3+ i -1]"></MiniPostCard>
          </v-col>
       
        </v-row>
        
      </div>
      <div v-else-if="tab == 'saved'">
        saved
      </div>
      <div v-else-if="tab == 'marked'">
      marked
      </div>

  </div>
</template>
<script>
import MiniPostCard from '@/components/postcards/MiniPostCard'
export default {
  components:{
    MiniPostCard,
  },
  props:['tab','uid'],
  data: () => ({
    posts:[]
  }),
  async mounted() {
      await this.$store.dispatch('getPostModule/getPostsByUid',this.uid).then(res=>{
          this.posts = res.data
      }).catch(err=>{
          console.log(err)
      })
      
  },
  methods:{
    click(data){
      console.log(data)
    }
  }
}
</script>

<style></style>
