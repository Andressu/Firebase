<template>
  <div id ="q-app">
    <div v-if="!username">
      You can't chat without a name. What's your name?
      <br />
      <input type="text" placeholder="Name" v-on:keyup.enter="updateUsername" />
    </div>
    <div v-else>
      From : {{username}}
      <br />Message:
      <br />
      <textarea name="" id="" cols="30" rows="10" placeholder="New Message" v-on:keyup.enter="sendMessage"></textarea>
      <button @click="sendMessage">submit</button>
    </div>
    <hr>
    <div class="messages">
        <h3>Messages</h3>
        <div class="message" v-for="(message, index) in messages" :key="index">
            <strong>{{message.username}}</strong>
            <p>{{message.text}}</p>
        </div>
    </div>
     <div>
        <div class="img-container">
            <img ref="image" :src="src" crossorigin>
        </div>
        <img :src="destination" class="img-preview">
    </div>
  </div>
</template>
<script>
const Vue = require('vue').default;
import fire from './fire.js';
 import Cropper from "cropperjs";

export default {
  name: "app",
  data() {
    return {
        username: '',
        messages: [],
        cropper: {},
        destination: {},
        image: {},
        img: 'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg'
    }
  },
  computed: {
    style() {
      const { height, width, left, top } = this.stencilCoordinates;
      return {
        height: `${height}px`,
        width: `${width}px`,
        left: `${left}px`,
        top: `${top}px`
      };
    }
  },
  methods: {
    updateUsername(e) {
        e.preventDefault();
        if(e.target.value){
            this.username = e.target.value;
        }
    },
    sendMessage(e) {
      console.log(e.target.value);
       e.preventDefault();
        if(e.target.value){
            const message = {
                username: this.username,
                text: e.target.value
            }
            //Push message to firebase reference
            fire.database().ref('messages').push(message);
            e.target.value = ''
        }
    }

  },
  mounted() {
    let vm = this;
    const itemsRef = fire.database().ref('messages');
    itemsRef.on('value', snapshot => {
        let data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach(key => {
            messages.push({
                id: key,
                username: data[key].username,
                text: data[key].text
            });
        });
        vm.messages = messages;
    });
  }
};
</script>