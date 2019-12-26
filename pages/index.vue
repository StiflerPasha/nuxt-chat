<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>

      <v-btn @click="message">New message</v-btn>

    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    sockets: {
      connect() {
        console.log('Socket connected');
      }
    },
    methods: {
      message() {
        this.$socket.emit('createMessage', {
          text: 'FROM CLIENT'
        });
      }
    }
  };
</script>
