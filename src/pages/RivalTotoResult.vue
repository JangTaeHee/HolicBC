<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">라이벌전 토토 이벤트 결과</h4>
            <p class="category">1. 내 이름을 찾는다.</p>
            <p class="category">2. 총점을 확인한다.</p>
            <p class="category">3. 축하합니다!</p>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="resultList" table-header-color="orange">
                <md-table-row v-show="item.regist" slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="Score">{{ item.score }}점</md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">참가자별 결과</h4>
          </md-card-header>
          <md-card-content>
            <div v-for="result in resultList" :key="result.id">
              <md-field>
                <label>{{result.name}} - {{result.regist == true ? "참가" : "불참"}}</label>
              </md-field>
              <md-table v-model="games" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item, index  }">
                  <md-table-cell v-bind:md-label="'총점('+result.score+'점)'">{{ result.answer[index].score_one == result.answer[index].result_score_one && result.answer[index].score_two == result.answer[index].result_score_two ? "정답" : "-" }}</md-table-cell>
                  <md-table-cell md-label="Player">{{ item.player_one }}</md-table-cell>
                  <md-table-cell md-label="Score">{{ result.answer[index].score_one }} ({{result.answer[index].result_score_one}})</md-table-cell>
                  <md-table-cell md-label="Score">{{ result.answer[index].score_two }} ({{result.answer[index].result_score_two}})</md-table-cell>
                  <md-table-cell md-label="Player">{{ item.player_two }} (+{{ item.hdy }})</md-table-cell>
                </md-table-row>
              </md-table>
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
      games: [],
      users: [],
      userAnswer: [],
      result: [],
      resultList : []
    };
  },
  methods: {
    async getPlayerList() {
      const thisnt = this;
      const tmpList = new Array();
      await db.collection('event').doc('rival').collection('player_list').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tmpList.push(doc.data());
        });
        thisnt.games = tmpList.sort(this.sortByProperty("id"));;
      });
    },
    async getUserList() {
      const thisnt = this;
      const tmpList = new Array();
      await db.collection('event').doc('rival').collection('user_list').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tmpList.push(doc.data());
        });
        thisnt.users = tmpList;
      });
    },
    async  getUserAnswerList() {
      const thisnt = this;
      const resultList = new Array();
      await db.collection('event').doc('rival').collection('user_answer').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docId = doc.id;
          const resultObj = {
            name: doc.data().name
          }
          const tmpList = new Array();
          db.collection('event').doc('rival').collection('user_answer').doc(docId).collection('answer').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const tmpObj = {
                id: doc.data().id,
                score_one: doc.data().score_one,
                score_two : doc.data().score_two
              }
              tmpList.push(tmpObj);
            });
            resultObj.answer = tmpList.sort(thisnt.sortByProperty("id"));
          });
          resultList.push(resultObj);
        });
        thisnt.userAnswer = resultList;
      });
    },
    async getResult() {
      const thisnt = this;
      const tmpList = new Array();
      await db.collection('event').doc('rival').collection('final_result').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tmpList.push(doc.data());
        });
        thisnt.result = tmpList.sort(this.sortByProperty("id"));
      });
    },
    processingDate() {
      const thisnt = this;
      const resultArray = new Array();
      
      thisnt.userAnswer.forEach((userItem) => {
        const answerObj = {
          name: userItem.name,
          regist: false
        }
        thisnt.users.forEach((user) => {
          if(userItem.name === user.name){
            answerObj.regist = true
          }
        })
        const tmpArray = new Array();
        let score = 0;
        thisnt.result.forEach((resultItem, index) => {
          const tmpObj = {
            score_one: userItem.answer[index].score_one,
            score_two: userItem.answer[index].score_two,
            result_score_one: resultItem.score_one,
            result_score_two: resultItem.score_two
          }
          if(userItem.answer[index].score_one == resultItem.score_one && userItem.answer[index].score_two == resultItem.score_two){
            score++;
          }
          tmpArray.push(tmpObj);
        })
        answerObj.score = score;
        answerObj.answer = tmpArray;
        resultArray.push(answerObj);
      })

      thisnt.resultList = resultArray.sort(thisnt.sortByPropertyDesc("score"));
    },
    async summary() {
      await this.getUserAnswerList();
      await this.getResult();
      await this.getPlayerList();
      await this.getUserList();
      await this.processingDate();
    },
    sortByProperty(property){  
      return function(a,b){  
          if(a[property] > b[property])  
            return 1;  
          else if(a[property] < b[property])  
            return -1;  
      
          return 0;  
      }  
    },
    sortByPropertyDesc(property){  
      return function(a,b){  
          if(a[property] > b[property])  
            return -1;  
          else if(a[property] < b[property])  
            return 1;  
      
          return 0;  
      }  
    }
  },
  created() {
    this.summary();
  }
};
</script>
