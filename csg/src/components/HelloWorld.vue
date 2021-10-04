<template>
  <div>
    <div class="title">
      <h1>CSG Skills Assessment</h1> 
      <hr class="line">
    </div>
    <br>
    <p class="align-left">Please review your Information before submitting</p>
    <div class="hello">
      <b-card bg-variant="light">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Personal Information</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion1" role="tabpanel">
          <b-card-body>
            <!-- <b-form-group
              label-cols-lg="3"
              label="Personal Information"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            > -->
            <b-icon v-if="!editable" style="float:right; margin: 9%" class="button" icon="pencil-square" @click="editable = true"></b-icon>
            <b-icon v-if="editable" style="float:right; margin: 9%" class="button" icon="check2" @click="editable = false"></b-icon>
              <b-form-group
                label="Name:"
                label-for="nested-street"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input v-if="editable" v-model="form.name" id="nested-street"></b-form-input>
                <p v-else>{{ form.name }}</p>
              </b-form-group>

              <b-form-group
                label="Rank:"
                label-for="nested-city"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-select v-if="editable" v-model="form.rank" :options="ranks" id="nested-city"></b-form-select>
                <!-- <b-form-input  v-model="form.rank" id="nested-city"></b-form-input> -->
                <p v-else>{{ form.rank }}</p>
              </b-form-group>

              <b-form-group
                label="Age:"
                label-for="nested-state"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input v-if="editable" v-model="form.age" id="nested-state"></b-form-input>
                <p v-else>{{ form.age }}</p>
              </b-form-group>

              <b-form-group
                label="Current Duty:"
                label-for="nested-country"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input v-if="editable" v-model="form.duty" id="nested-country"></b-form-input>
                <p v-else>{{ form.duty }}</p>
              </b-form-group>
            <!-- </b-form-group> -->
          </b-card-body>
      </b-collapse>
        
      </b-card>
      <br>
      <b-card bg-variant="light">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info">Cyber Analyst I - Skill Ratings</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" visible accordion="my-accordion2" role="tabpanel">
          <b-card-body>
            <b-icon v-if="!editable2" style="float:right; margin: 9%" class="button" icon="pencil-square" @click="editable2 = true"></b-icon>
        <b-icon v-if="editable2" style="float:right; margin: 9%" class="button" icon="check2" @click="editable2 = false"></b-icon>
          <b-form-group
            label="Tactics, Techniques and Procedures:"
            label-for="nested-street"
            label-cols-sm="3"
            v-slot="{ ariaDescribedby1 }"
            label-align-sm="right"
          >
            <b-form-radio-group
              v-if="editable2"
              id="radio-group-1"
              v-model="form.tac"
              :options="options"
              :aria-describedby="ariaDescribedby1"
              name="radio-options"
            ></b-form-radio-group>
            <p v-else>{{ form.tac }}</p>
          </b-form-group>

          <b-form-group
            label="Ability to perform coordinated actions to LoE"
            label-for="nested-city"
            v-slot="{ ariaDescribedby2 }"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-radio-group
              v-if="editable2"
              id="radio-group-2"
              v-model="form.loe"
              :options="options"
              :aria-describedby="ariaDescribedby2"
              name="radio-options2"
            ></b-form-radio-group>
            <p v-else>{{ form.loe }}</p>
          </b-form-group>

          <b-form-group
            label="Knowledge of California State's IT Roles and Requirements:"
            label-for="nested-state"
            v-slot="{ ariaDescribedby3 }"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-radio-group
              v-if="editable2"
              id="radio-group-3"
              v-model="form.it"
              :options="options"
              :aria-describedby="ariaDescribedby3"
              name="radio-options3"
            ></b-form-radio-group>
            <p v-else>{{ form.it }}</p>
          </b-form-group>
          </b-card-body>
        </b-collapse>
        <!-- <b-form-group
          label-cols-lg="3"
          label="Skills Level"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        > -->
        
        <!-- </b-form-group> -->
      </b-card>
      <br>
      <b-button variant="outline-primary" @click="postUserData">Submit</b-button>
      <!-- <b-button variant="outline-primary" @click="getUserData">Get Details</b-button> -->
      <b-card v-if="usersPresent" class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ users }}</pre>
      </b-card>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
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
        usersPresent: false,
        users: [],
        editable2: true,
        ranks: [
          { text: 'Service Member', value: 'Service Member' },
          { text: 'Command Staff', value: 'Command Staff' },
          { text: 'Training Team', value: 'Training Team'}
        ],
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
