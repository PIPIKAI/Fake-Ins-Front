<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="500"
  >
    <v-toolbar-title class="text-h6  pl-0">
                Messages
    </v-toolbar-title>
    <banners/>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <div class="my-4 text-subtitle-1">
        麻花疼和其他用户赞了
      </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        码云 这是评论
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>

    <v-text-field
        class="pa-md-1"
        solo
        flat
        dense
        autofocus
        label="搜索"
        prepend-inner-icon="mdi-map-marker"
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
   data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
}
</script>