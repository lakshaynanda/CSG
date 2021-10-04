<template>
  <div>
    Hello Worlds
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
        usersPresent: false,
        users: [],
        editable2: true,
        options: [
          { text: 'None', value: 'None' },
          { text: 'Novice', value: 'Novice' },
          { text: 'Proficient', value: 'Proficient'},
          { text: 'Expert', value: 'Expert' }
        ],
        form: {
          age: '',
          name: '',
          rank: '',
          duty: '',
          tac: '',
          loe: '',
          it: ''
        },
        show: true
      }
    },
    created() {
      this.autho()
      // this.getUserData()
    },
    methods: {
      autho () {
        // const data = {
        //   grant_type: 'password',
        //   client_id: '3MVG9Nk1FpUrSQHeLkBUh5k6Rv1yBzQBJrAMx9me7xnT4Zm2tBojknR8ob.sWc8HS18HiLuKaz67J8b7_x2SD',
        //   client_secret: 'F8C3B6B6BF714D4F264D5F7545BDF9746F909843D894CF6DFB87A0E783CB491E',
        //   username: 'csgprotect@gmail.com',
        //   password: '21SC4sansrUWOMqRjbF2JQ4TR7kWGxHv3I'
        // }
        // authApi.getAuth(data.password, data.grant_type, data.client_id, data.client_secret, data.username).then((response) => {
        //   localStorage.setItem('user-token', response.access_token)
        //   console.log(localStorage.getItem('user-token'))
        // })
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
      },
      getUserData () {
        mainApi.getServiceMembers().then((response) => {
          this.usersPresent = true
          this.users = response.data.records
        })
      },
      postUserData() {
        const data = {
          age__c: this.form.age,
          name: this.form.name,
          rank__c: this.form.rank,
          duty__c: this.form.duty,
          tac__c: this.form.tac,
          loe__c: this.form.loe,
          it__c: this.form.it
        }
        mainApi.postServiceMember(data).then((response) => {
          console.log(response)
        })
      },
      showN () {
        console.log(this.name)
      },
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.age = ''
        this.form.name = ''
        this.form.duty = ''
        this.form.rank = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
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
  margin: 3% 10% 10% 10%;
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
