<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-primary">
                    <div class="panel-heading">Login</div>
                    <div class="panel-body">

                <form @submit.prevent="login(user)">
                    <div class="text-left">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Your email" v-model="user.email">
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Your password" v-model="user.password">
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="btn btn-primary">Login</button>

                        <router-link :to="{ name: 'Register' }">
                            Create an account!
                        </router-link>
                    </div>
                </form>
                    </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    email: null,
                    password: null,
                },
            }
        },
        methods: {
            login(user) {

                Store.dispatch('login', user)
                    .then(response => {
                        console.log('response from success login', response)
                        this.$router.push('Dashboard')
                    })
                    .catch(response => {
                        let errorMessage = response.response.data.message

                        alert(errorMessage)
                    })
            }
        },
    }
</script>
