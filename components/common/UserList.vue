<template>
  <div>
    <v-list-item class="ma-1 pa-0" v-for="item in UserLists" :key="item.ID">
      <v-row class="ml-2" @click="$emit('clickUser',item.UserName)">
        <v-list-item-avatar>
          <img :src="item.Photo" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.UserName"></v-list-item-title>
          <v-list-item-subtitle>{{ item.Name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-row>

      <v-list-item-action>
        <WatchedBtn :Uid="item.ID" :Small="true"></WatchedBtn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>
<script>
import WatchedBtn from '~/components/common/WatchedBtn.vue'

export default {
  components:{WatchedBtn},
  props: {
    UserLists: {
      type: Array,
      required: true,
    },
    methods: {
    },
  },
}
</script>
<style lang=""></style>
