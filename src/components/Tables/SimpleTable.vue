<template>
  <div>
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Name</label>
            <md-input v-model="user.name"></md-input>
          </md-field>
        </div>
      </div>
    </md-card-content>
    <md-table v-model="games" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item, index  }">
        <md-table-cell md-label="Player">{{ item.player_one }}</md-table-cell>
        <md-table-cell md-label="Score"><input class="table_input" type="number" v-bind:id="'score_one_'+index"/></md-table-cell>
        <md-table-cell md-label="Score"><input class="table_input" type="number" v-bind:id="'score_two_'+index"/></md-table-cell>
        <md-table-cell md-label="Player">{{ item.player_two }} (+{{ item.hdy }})</md-table-cell>
      </md-table-row>
    </md-table>
    <md-card-content>
      <div class="md-layout-item md-size-100 text-center">
        <md-button class="md-raised md-success" @click="submit">제출</md-button>
      </div>
    </md-card-content>
  </div>
</template>

<script>
import firebase from "firebase";

var db = firebase.firestore();

export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      games: [],
      user:{
        name: "",
        phone: ""
      },
      answer: {},
      score: {
        score_one: [],
        score_two: []
      }
    };
  },
  methods: {
    getList() {
      const tmpList = new Array();
      db.collection('event').doc('rival').collection('player_list').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tmpList.push(doc.data());
        });
        this.games = tmpList.sort(this.sortByProperty("id"));;
      });
    },
    inputCheck() {
      const oneRE = /^score_one_/;
      const twoRE = /^score_two_/;
      const score_one=[],els_one=document.getElementsByTagName('*');
      const score_two=[],els_two=document.getElementsByTagName('*');
      for (let i=0; i<els_one.length; i++){
        if (oneRE.test(els_one[i].id)){
          if(els_one[i].value === null || els_one[i].value === undefined || els_one[i].value === ""){
            return false;
          }else{
            score_one.push(els_one[i]);
          }
        }
      }
      for (let i=0; i<els_two.length; i++){
        if (twoRE.test(els_two[i].id)){
          if(els_two[i].value === null || els_two[i].value === undefined || els_two[i].value === ""){
            return false;
          }else{
            score_two.push(els_two[i]);
          }
        }
      } 
      this.score.score_one = score_one;
      this.score.score_two = score_two;

      if(this.user.name === null || this.user.name === undefined || this.user.name === ""){
        return false;
      }else{
        return true;
      }
    },
    async submit() {
      if(await this.inputCheck()){
        const resultObj = [];
        
        this.score.score_one.forEach((item, index) => {
          const tmpObj = {}
          tmpObj.score_one = item.value;
          tmpObj.score_two = this.score.score_two[index].value;
          resultObj.push(tmpObj);
        });
        this.answer = resultObj;
        this.insertAnswer();
      }else{
        alert("모든 필드를 입력하세요.");
      }
    },
    async insertAnswer() {
      const thisnt = this;
      if(await this.docCheck() <= 0){
            db.collection('event').doc('rival').collection('user_answer').add({
              name:thisnt.user.name
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                thisnt.answer.forEach((item, index) => {
                  db.collection('event').doc('rival').collection('user_answer').doc(docRef.id).collection('answer').add({
                    id:index,
                    score_one: item.score_one,
                    score_two: item.score_two
                  })
                  .then(function(docRef) {
                      console.log("Document written with ID: ", docRef.id);
                  })
                  .catch(function(error) {
                      console.error("Error adding document: ", error);
                  });
                });
                alert("제출 성공!");
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
      }else{
          alert('이미 제출된 회원입니다.');
      }
    },
    async docCheck() {
      const thisnt = this;
      let cnt = 0;
      await db.collection('event').doc('rival').collection('user_answer').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(thisnt.user.name === doc.data().name){
              cnt++;
            }
        });
      })
      return cnt;
    },
    sortByProperty(property){  
      return function(a,b){  
          if(a[property] > b[property])  
            return 1;  
          else if(a[property] < b[property])  
            return -1;  
      
          return 0;  
      }  
    }
  },
  created() {
    this.getList();
  }
};
</script>
