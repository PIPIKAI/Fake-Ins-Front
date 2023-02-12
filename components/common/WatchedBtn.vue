<template>
    <div>
        <v-btn :small="Small" :color=btnColor @click="clickBtn" outlined>
            {{ discrip }}
        </v-btn>
    </div>
</template>
<script>
export default {
    props: {
        Uid: {
            type: Number,
            required: true,
        },
        Small: {
            type: Boolean,
            required: true,
        }
    },
    data: () => ({
        wathed: false,
        bewatched: false,
        btnColor: "gray",
        discrip: ''
    }),
    async mounted() {
        this.wathed = await this.$store.dispatch("UserModule/watchedOrNot", this.Uid)
            .then((res) => {
                return res.data.data
            })
        this.bewatched = await this.$store.dispatch("UserModule/beWatchedOrNot", this.Uid)
            .then((res) => {
                return res.data.data
            })
        if (this.wathed) {
            if (this.bewatched) {
                this.btnColor = "pink"
                this.discrip = "互相关注"
            } else {
                this.btnColor = "primary"
                this.discrip = "已关注"
            }
        } else {
            this.btnColor = "gray"
            this.discrip = "未关注"

        }
    },
    methods: {
        async clickBtn() {
            if (this.wathed) {
                await this.$store.dispatch('UserModule/unWatchUser', this.Uid).then(res => {
                    if (res.code === 200) {
                        this.$message.success("取关成功！")
                        this.btnColor = "gray"
                        this.discrip = "未关注"
                        this.wathed = false
                    } else {
                        this.$message.error(res.response.data.msg)
                    }
                })
            } else {
                await this.$store.dispatch('UserModule/watchUser', this.Uid).then(res => {
                    if (res.code === 200) {
                        this.$message.success("关注成功！")
                        if (this.bewatched) {
                            this.btnColor = "pink"
                            this.discrip = "互相关注"
                        } else {
                            this.btnColor = "primary"
                            this.discrip = "已关注"
                        }
                        this.wathed = true

                    } else {
                        this.$message.error(res.response.data.msg)
                    }
                })
            }
        }
    },
}
</script>
<style lang="">
    
</style>