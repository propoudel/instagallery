<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">Dashboard</div>
                    <div class="panel-body">
                        <form class="form-inline" @submit.prevent="search">
                            <div class="form-group">
                                <label for="username">Find Posts </label>
                                <input type="text" class="form-control" v-model="username" id="username" placeholder="Enter a username">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>

                        <div v-if="data.data">
                            <imap :items="data"></imap>
                        </div>


                        <ul v-if="errors && errors.length">
                            <li v-for="error of errors">
                                {{error.message}}
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    import Imap from './Map';
    Vue.use(VueResource);

    const TOKEN = '1362124742.3ad74ca.6df307b8ac184c2d830f6bd7c2ac5644';
    const NUM_PHOTOS = 10;

    export default {
        data (){
            return {
                username: '',
                data: [],
                errors: []
            }
        },

        mounted () {
            //this.search()
        },

        methods: {
            search() {

                let bodyParams = {
                    access_token: TOKEN,
                    count: NUM_PHOTOS,
                };

                let searchBodyParams = {
                    access_token: TOKEN,
                    count: NUM_PHOTOS,
                    q: this.username,
                };
                this.data = [];
                this.$http.jsonp('https://api.instagram.com/v1/users/search', { params: searchBodyParams})
                    .then(response => {
                        this.$http.jsonp('https://api.instagram.com/v1/users/' + response.data.data[0].id + '/media/recent', { params: bodyParams})
                            .then(response => {
                                this.data = response.data;
                            })
                            .catch(e => {
                                this.errors.push(e)
                            })
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });

            },
        },

        components:{
            'imap': Imap
        }

    }

</script>
