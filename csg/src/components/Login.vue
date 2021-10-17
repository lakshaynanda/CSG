<template>
  <div>
    <div class="title">
      <h1>Login</h1> 
      <hr class="line">
      <div class="hello">
        <!-- <p v-if="alertT">Incorrect</p> -->
        <b-alert v-if="alertT" show variant="danger">Incorrect Email or Password</b-alert>
        <b-form>
            <label class="sr-only" for="inline-form-input-username">Username</label>
            <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                <b-form-input id="inline-form-input-username" placeholder="Email" v-model="name"></b-form-input>
            </b-input-group>
            <!-- <label for="text-password">Password</label> -->
            <br>
            <br>
            <b-form-input v-model="password" type="password" id="text-password" placeholder="Password" aria-describedby="password-help-block"></b-form-input>
            <br>
            <b-button variant="primary" @click="login">Login</b-button>
        </b-form>
        
        </div>
    </div>
  </div>
  
</template>

<script>
import mainApi from '../apis/mainApi'
import qs from 'qs'
import axios from 'axios'
// import authApi from '../apis/auth'
export default {
  data() {
      return {
        editable: true,
        name: '',
        password: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        alertT: false
      }
    },
    created() {
      this.autho()
      // this.getUserData()
    },
    methods: {
        
      login() {
        mainApi.checkLogin(this.name, this.password).then((response) => {
            if (response.data.totalSize >= 1) {
                this.$router.push('Dashboard')
            } else {
                this.alertT = true
            }
        })
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
      autho () {
        axios({
          method: 'post',
          url: 'https://csg-cyber.my.salesforce.com/services/oauth2/token',
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: qs.stringify({
            grant_type: 'password',
            client_id: '3MVG9Nk1FpUrSQHeLkBUh5k6Rv1yBzQBJrAMx9me7xnT4Zm2tBojknR8ob.sWc8HS18HiLuKaz67J8b7_x2SD',
            client_secret: 'F8C3B6B6BF714D4F264D5F7545BDF9746F909843D894CF6DFB87A0E783CB491E',
            username: 'csgprotect@gmail.com',
            password: '21SC4sansrUWOMqRjbF2JQ4TR7kWGxHv3I'
          })
        })
        .then((response) => {
          localStorage.setItem('user-token', response.data.access_token)
          console.log(localStorage.getItem('user-token'))
        });
      }
    },
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button:hover {
  cursor: pointer;
}
.align-left{
  text-align: left;
  margin: 0 10% 0 10%;
}
.hello {
  margin: 3% 40% 10% 40%;
}
.line{
  margin: 0 10% 0 10%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
