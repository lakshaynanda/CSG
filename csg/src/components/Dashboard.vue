<template>
  <div class="hello">
      <div class="widgets">
          <b-card-group deck>
            <b-card header-tag="header">
            <template #header>
                <h6 class="mb-0">Count Service Member</h6>
            </template>
            <b-card-text><h1 style="color: Blue">{{ serviceMem }}</h1></b-card-text>
            </b-card>

            <b-card header-tag="header">
            <template #header>
                <h6 class="mb-0">Count Command Staff Members</h6>
            </template>
            <b-card-text><h1 style="color: green">{{ commandStaff }}</h1></b-card-text>
            </b-card>

            <b-card header-tag="header">
            <template #header>
                <h6 class="mb-0">Count Training Team Members</h6>
            </template>
            <b-card-text><h1 style="color: red">{{ trainingTeam }}</h1></b-card-text>
            </b-card>
            
        </b-card-group>
        <!-- <b-card class="mt-3" header="Count Service Member">
            {{ serviceMem }}
        </b-card>
        <b-card class="mt-3" header="Count Command Staff">
            {{ commandStaff }}
        </b-card>
        <b-card class="mt-3" header="Count Training Team Member">
            {{ trainingTeam }}
        </b-card> -->
      </div>
      <b-form inline>
        <label class="mr-sm-2" for="inline-form-input-name">Name = </label>
        <b-form-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter name"
        v-model="searchName"
        ></b-form-input>

        <b-button class="bbut" variant="primary" @click="getServiceMemberInd">Search By Name</b-button>
        <!-- <b-button class="bbut" variant="danger" @click="getUserData">Reset</b-button> -->
        <label class="mr-sm-2" for="inline-form-custom-select-pref">Rank = </label>
        <b-form-select
        id="inline-form-custom-select-pref"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="['Service Member', 'Training Team', 'Command Staff']"
        v-model="rankVal"
        :value="null"
        ></b-form-select>
        <b-button class="bbut" variant="primary" @click="getRank">Search By Rank</b-button>
        <label class="mr-sm-2" for="inline-form-custom-select-pref">Skill = </label>
        <b-form-select
        id="inline-form-custom-select-pref"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="['loe__c', 'tac__c', 'it__c']"
        v-model="skillChosen"
        :value="null"
        ></b-form-select> = 
        <b-form-select
        id="inline-form-custom-select-pref"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="['None', 'Novice', 'Proficient', 'Expert']"
        v-model="skillVal"
        :value="null"
        ></b-form-select>
        <b-button class="bbut" variant="primary" @click="getSkill">Search By Skill</b-button>
        <b-button class="bbut" variant="danger" @click="getUserData">Reset</b-button>
    </b-form>
    <!-- <b-form inline>
        <label class="mr-sm-2" for="inline-form-custom-select-pref">Rank = </label>
        <b-form-select
        id="inline-form-custom-select-pref"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="['Service Member', 'Training Team', 'Command Staff']"
        v-model="rankVal"
        :value="null"
        ></b-form-select>
        <b-button class="bbut" variant="primary" @click="getRank">Search By Rank</b-button>
    </b-form> -->
    <!-- <b-form inline>
        <label class="mr-sm-2" for="inline-form-custom-select-pref">Skill = </label>
        <b-form-select
        id="inline-form-custom-select-pref"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="['loe__c', 'tac__c', 'it__c']"
        v-model="skillChosen"
        :value="null"
        ></b-form-select> = 
        <b-form-select
        id="inline-form-custom-select-pref"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="['None', 'Novice', 'Proficient', 'Expert']"
        v-model="skillVal"
        :value="null"
        ></b-form-select>
        <b-button class="bbut" variant="primary" @click="getSkill">Search By Skill</b-button>
        <b-button class="bbut" variant="danger" @click="getUserData">Reset</b-button>
    </b-form> -->
      <!-- <b-form-group
        label="Name ="
        label-for="nested-street"
        label-cols-sm="1"
        label-align-sm="right"
        style="margin:0 25% 0 25%"
        > -->
        <!-- "Name":"Srirag","Age__c":24.0,"Rank__c":"Service Member","Duty__c":"Active","TAC__c":"Expert","LoE__c":"Proficient","IT__c":"Novice"} -->
        <!-- <b-form-input v-model="searchName" id="nested-street" class="inputBox"></b-form-input> -->
        <!-- <b-form-select v-model="searchName" :options="allFields" id="nested-street"></b-form-select> -->
        <!-- <b-button variant="outline-primary" @click="getServiceMemberInd">Search</b-button> -->
        <!-- <p v-else>{{ form.name }}</p> -->
      <!-- </b-form-group> -->
      
      <!-- <b-button variant="outline-primary" @click="getUserData" class="">Reset Table</b-button> -->
      <b-card class="mt-3" header="Form Data Result">
        <!-- <pre v-if="usersPresent" class="m-0">Name: {{ user.Name }} Age:{{ user.Age__c }} Rank: {{ user.Rank__c }} Duty: {{ user.Duty__c }} TAC: {{ user.TAC__c }} LOE:{{ user.LoE__c }} IT:{{ user.IT__c }}</pre>
        <pre v-else class="m-0">Service Member Does not Exist</pre> -->
        <b-table striped hover :items="users" :fields="fields"></b-table>
      </b-card>
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
        serviceMem: '',
        commandStaff: '',
        trainingTeam: '',
        user: [],
        searchName: '',
        editable2: true,
        skillChosen: '',
        skillVal: '',
        rankVal: '',
        fields: ['Name', 'Age__c', 'Duty__c', 'LoE__c', 'Rank__c', 'IT__c', 'TAC__c'],
        ranks: [
          { text: 'Name', value: 'Name' },
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
      this.getUserData()
      this.countsGet()
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
      countsGet() {
        mainApi.getCountsService().then((response) => {
            this.serviceMem = response.data.totalSize
        })
        mainApi.getCountsCommand().then((response) => {
            this.commandStaff = response.data.totalSize
        })
        mainApi.getCountsTraining().then((response) => {
            this.trainingTeam = response.data.totalSize
        })
      },
      getServiceMemberInd() {
        mainApi.getServiceMemberByName(this.searchName).then((response) => {
          this.usersPresent = true
          this.users = response.data.records
        })
      },
      getRank () {
        mainApi.getRankList(this.rankVal).then((response) => {
            this.usersPresent = true
            this.users = response.data.records
        })
      },
      getSkill () {
        mainApi.getSkillsList(this.skillChosen, this.skillVal).then((response) => {
            this.usersPresent = true
            this.users = response.data.records
        })
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
.bbut {
    margin: 1%;
}
.hello {
  margin: 3% 10% 10% 10%;
}
.button:hover {
  cursor: pointer;
}
.inputBox {
    width: 70%;
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
