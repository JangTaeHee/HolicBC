<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">라이벌전 토토 이벤트 결과 입력</h4>
            <p class="category">1. 스코어를 기입한다.</p>
            <p class="category">2. 제출 버튼을 선택한다.</p>
            <p class="category">3. 끝!</p>
          </md-card-header>
          <md-card-content>
          <div>
            <md-table v-model="games" table-header-color="green">
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
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

var db = firebase.firestore();

export default {
  data() {
    return {
      selected: [],
      games: [],
      user:{
        name: "정답지",
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

      return true;
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
        alert("모든 스코어를 입력하세요.");
      }
    },
    insertAnswer() {
      db.collection('event').doc('rival').collection('final_result').get().then((querySnapshot) => {
        if(querySnapshot.size <= 0 ){
          this.answer.forEach((item, index) => {
            db.collection('event').doc('rival').collection('final_result').add({
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
          alert("등록 성공!");
        }
        else{
          alert('이미 정답이 등록되었습니다.');
        }
      });
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
