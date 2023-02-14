<template lang="">
    <v-card class="mt-5" >
        <v-card-title>
            关于
        </v-card-title>
    </v-card>
</template>
<script>
export default {
    layout: 'navigation',
    middleware: 'auth',
    data: () => ({
      user: {},
    }),
    mounted() {
      this.user = JSON.parse(JSON.stringify(this.$store.state.user))
    },
    methods: {
    },
}
</script>
<style lang="">
    
</style>