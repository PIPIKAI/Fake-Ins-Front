<template>
  <div>
    <v-list-item dense class="pa-0 mx-1">
      <v-list-item-content>
        <v-list-item-title>
            <strong>共有{{ post.LikesCount }}</strong>名用户赞了
        </v-list-item-title>
        <!-- <v-list-item-subtitle v-if="post.Explain">
          <strong> user.Name</strong>
          {{ post.Explain }}
        </v-list-item-subtitle> -->
        <v-list-item-subtitle> 全部{{post.CommentsCount}}条评论 </v-list-item-subtitle>
        <v-list-item-subtitle>
          <strong>守护世界最好的坤坤</strong> 🐓你太美
          <v-icon class="float-right" small> mdi-cards-heart-outline </v-icon>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-actions class="pa-0">
      <el-input
        v-model="textarea1"
        prefix-icon="el-icon-s-comment"
        placeholder="评论"
        maxlength="220"
      >
      </el-input>
      <v-btn color="blue" text @click="reserve"> 发布 </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    textarea1: '',
  }),
  async mounted() {
   
  },
  methods: {
    reserve() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>
<style lang=""></style>
