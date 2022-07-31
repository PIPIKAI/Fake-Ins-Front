<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <v-btn @click="getdata">

      </v-btn>
      <div>
        data--{{data}}
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  data: () => ({
    data:null
  }),
  methods:{
    async getdata(){
      await this.$authApi.getlist().then((res) => {
        console.log('res:', res.data)
        this.data =res.data
      }).catch(error => {
        console.log('error:', error)
      })
    }
  }
}
</script>
