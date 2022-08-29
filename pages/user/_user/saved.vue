<template>
  <div>
     <v-tab-item >
      <v-card flat>
        saved
      </v-card>
    </v-tab-item>
  </div>
</template>
<script>
export default {
  props:['tab'],
  asyncData({}) {
  },
  data: () => ({
    tab: null,
  }),
}
</script>

<style></style>
