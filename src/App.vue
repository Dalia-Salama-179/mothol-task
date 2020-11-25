<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    window.jQuery = $;
    window.$ = $;

    export default {
        name: 'App',
        computed: {
            ...mapState(['user', 'token',])
        },
        /*mounted() {
            this.$http.post('https://www.keden-edu.com/kntra/api/login', {pin_code: 4000})
                .then((response)=>{
                    console.log(response.data.data.token);
                    this.$http.post('https://www.keden-edu.com/kntra/api/users/1/details', {
                        page: 1
                    }, {
                        headers: {
                            'Authorization': 'Bearer '+ response.data.data.token
                        }
                    }).then(res => {
                        console.log(res)
                    })
            })
        }*/
    }
</script>

