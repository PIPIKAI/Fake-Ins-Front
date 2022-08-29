<template>
    <div>
        {{comments}}
    <!-- <v-list three-line>
      <template v-for="(item, index) in comments">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list> -->
    </div>
</template>
<script>
export default {
    name:'PostComments',
    props:[
        'comments'
    ]
}
</script>
<style scoped>
    
</style>