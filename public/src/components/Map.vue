<template>
    <div>
        <hr>
        <gmap-map
                :center="center"
                :zoom="7"
                style="width: 100%; height: 400px">

            <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.metas"
                    :clickable="true"
                    :draggable="true"
                    @click="center=m.metas">

                <gmap-info-window  :position="m.metas">
                    <a v-on:click="saveMeta(m.metas)" class="btn btn-primary">Save</a>
                </gmap-info-window>

            </gmap-marker>


        </gmap-map>


    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    const VueGoogleMaps = require('vue2-google-maps');

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyA4BzJumBmxgZ0cX34HP-OJQzXT7xygTiE',
            libraries: 'places'
        }
    });

    export default {
        props: ['items'],

        data () {
            return {
                center: {lat: 25.0765837, lng: 54.2914805},
                markers: []
            }
        },

        methods: {
            saveMeta(meta){
                console.log(meta);
                this.$http.post('api/post/store', meta);

            }
        },

        mounted(){
            let posts = this.items.data;
            let mrks = this.markers;
            posts.forEach(function (value) {
                mrks.push({
                    metas: {
                        id: value.id,
                        lat: value.location.latitude,
                        lng: value.location.longitude,
                        caption: value.caption.text,
                        created_at: value.created_time,
                        image: value.images.standard_resolution.url,
                        link: value.link
                    }
                });
            });
            this.markers = mrks;
            console.log(this.markers);
        }

    }


</script>

<style>
    .map-container {
        width: 500px;
        height: 300px;
    }
</style>