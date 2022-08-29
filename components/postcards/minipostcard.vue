<template lang="">
  <div v-if="post != null">
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover ? 5 : 2" :class="{ 'on-hover': hover }" :to="'/p/'+post.ID">
        <v-img :src="post.ImgUrls[0].Url" aspect-ratio="1">
           <v-container fill-height>
              <div class="ma-auto">
                <v-row>
                  <v-col class="mx-2">
                    <v-row > 
                      <v-icon
                        class="mx-1"
                        :class="{ 'show-btns': hover }"
                        :color="transparent"
                      >
                        mdi-heart
                      </v-icon>
                      <h3 :class="{ 'show-btns': hover }">{{post.LikesCount}}</h3>
                    </v-row>
                  </v-col>
                  <v-col class="mx-2">
                    <v-row > 
                      <v-icon
                        class="mx-1"
                        :class="{ 'show-btns': hover }"
                        :color="transparent"
                      >
                        mdi-comment
                      </v-icon>
                      <h3 :class="{ 'show-btns': hover }">{{post.CommentsCount}}</h3>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
         
          </v-container> 
        </v-img>
      </v-card>
    </v-hover>
  </div>
</template>
<script>
export default {
  name: 'MiniPostCard',
  props: ['post'],
  data: () => ({
    icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
    transparent: 'rgba(255, 255, 255, 0)',
  }),
}
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 1;
}

.v-card .on-hover {
  opacity: 0.8;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
h3{
  color: rgba(255, 255, 255, 0)
}
</style>
