<template>
    <div>
        jdfn
    </div>
</template>

<script>
    export default {
        name: "users",
        mounted() {
            this.$http.post('https://www.keden-edu.com/kntra/api/departments/dropdown/list', {

            }, {
                headers: {
                    'Authorization': 'Bearer '+ this.$store.state.token
                }
            }).then(res => {
                console.log(res)
            })
            this.$http.post('https://www.keden-edu.com/kntra/api/users/list', {
                page: 1
            }, {
                headers: {
                    'Authorization': 'Bearer '+ this.$store.state.token
                }
            }).then(res => {
                console.log(res)
            })
        }
    }
</script>

<style scoped>

</style>