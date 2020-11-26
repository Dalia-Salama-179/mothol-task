<template>
    <div class="login-page">
        <div class="login-form">
            <h4 class="mb-4">Login to account </h4>
            <form @submit.prevent="login">
                <div class="form-group">
                    <input type="text" id="code" class="form-control" placeholder="Code" required
                           v-model="pin_code" @input="errors = null">
                    <p class="text-danger" v-if="errors">{{errors}}</p>
                </div>
                <div class="text-center">
                    <button class="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                pin_code: null,
                errors: null
            }
        },
        methods: {
            login() {
                this.$http.post('https://www.keden-edu.com/kntra/api/login', {pin_code: this.pin_code})
                    .then(res => {
                        this.$store.commit('setUser', res.data.data);
                        this.$router.push('/')
                    }).catch(() => {
                        this.errors = 'Enter valid code !'
                    })
            }
        }
    }
</script>
