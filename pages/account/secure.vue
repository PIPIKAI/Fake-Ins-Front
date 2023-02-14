<template>
    <v-card class="mt-5" flat>

      <v-row  class="ma-auto pa-auto">

        <v-col sm="6" md="4">
        <v-text-field  dense filled v-model="password" label="修改邮箱"></v-text-field>
            
        </v-col>
        <v-col sm="6" md="4">
            <v-btn text outlined large depressed color="primary">保存</v-btn>
        </v-col>
      </v-row>
      <v-row  class="ma-auto pa-auto">
        <v-col sm="6" md="4">
        <v-text-field filled v-model="password" label="修改密码"></v-text-field>
        </v-col>
        <v-col sm="6" md="4">
            <v-btn text outlined large depressed color="primary">保存</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </template>
  <script>
  export default {
    layout: 'navigation',
    middleware: 'auth',
    data: () => ({
      user: {},
      timepiker: false,
      sexvalues: ['男', '女'],
      password:'',
      email: '',
    }),
    mounted() {
      this.user = JSON.parse(JSON.stringify(this.$store.state.user))
    },
    methods: {
      changePhoto(){
          
      }
    },
  }
  </script>
  <style scoped>
  .submit {
    position: absolute;
    bottom: -5%;
    left: 2%;
  }
  </style>
  