<template>
  <v-app app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list subheader>
        <v-subheader>Список людей в комнате</v-subheader>

        <v-list-item
          v-for="user in users"
          :key="user.id"
          @click.prevent=""
        >
          <!--<v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>-->

          <v-list-item-content>
            <v-list-item-title v-text="user.name"/>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="user.id === 2 ? 'primary' : 'grey'">chat_bubble</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn icon @click="exit">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-content>

  </v-app>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        drawer: false,
        users: [
          { id: 1, name: 'Andrey' },
          { id: 2, name: 'Katya' },
          { id: 3, name: 'Dima' }
        ]
      };
    },
    computed: mapState(['user']),
    methods: {
      ...mapMutations(['clearData']),
      exit() {
        this.$router.push('/?message=leftChat');
        this.clearData();
      }
    }
  };
</script>
