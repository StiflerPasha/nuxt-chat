<template>
  <v-layout class="login" xs12 column justify-center align-center>
    <v-flex>
      <v-card min-width="320">
        <v-card-title>
          <h2>Nuxt чат</h2>
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Ваше имя"
              solo-inverted
              required
            />

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Введите комнату"
              solo-inverted
              required
            />

            <v-btn
              :disabled="!valid"
              color="primary"
              @click="submit"
            >
              Войти
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-snackbar
        v-model="snackbar"
        :timeout="5000"
        top
      >
        {{ message }}
        <v-btn
          color="pink"
          text
          @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    layout: 'empty',
    head: {
      title: 'Добро пожаловать в Nuxt чат'
    },
    sockets: {
      connect() {
        console.log('Socket connected');
      }
    },
    data() {
      return {
        snackbar: false,
        message: '',
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Введите имя',
          v => (v && v.length <= 16) || 'Имя не должно превышать 16 символов'
        ],
        room: '',
        roomRules: [
          v => !!v || 'Введите комнату'
        ]
      };
    },
    methods: {
      ...mapMutations(['setUser']),
      submit() {
        if (this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room
          };

          this.$socket.emit('userJoined', user, data => {
            if (typeof data === 'string') {
              console.error(data);
            } else {
              user.id = data.userId;
              this.setUser(user);
              this.$router.push('/chat');
            }
          });
        }
      }
    },
    mounted() {
      const { message } = this.$route.query;
      if (message === 'noUser') {
        this.message = 'Пользователь не найден';
      } else if (message === 'leftChat') {
        this.message = 'Вы вышли из чата';
      }

      this.snackbar = !!this.message;
    }
  };
</script>

<style lang="scss" scoped>
  .login {
    margin-top: 100px;
  }
</style>
