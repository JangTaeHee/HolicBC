<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">라이벌전 토토 이벤트 참가자 등록</h4>
            <p class="category">1. 이름을 기입한다..</p>
            <p class="category">2. 추가 버튼을 클릭한다.</p>
            <p class="category">3. 끝!</p>
          </md-card-header>
          <md-card-content>
          <div>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Name</label>
                    <md-input v-model="name"></md-input>
                  </md-field>
                </div>
              </div>
              <div class="md-layout-item md-size-100 text-center">
                <md-button class="md-raised md-success" @click="submit">추가</md-button>
              </div>
            </md-card-content>
            <md-table v-model="users" table-header-color="green">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
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
      selected: [],
      name: "",
      users:[],
    };
  },
  methods: {
    getList() {
      const tmpList = new Array();
      db.collection('event').doc('rival').collection('user_list').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tmpList.push(doc.data());
        });
        this.users = tmpList;
      });
    },
    inputCheck() {
      if(this.name === null || this.name === undefined || this.name === ""  ){
        return false;
      }else{
        return true;
      }
    },
    async submit() {
      const thisnt = this;
      if(await thisnt.inputCheck()){
        if(await thisnt.userCheck()){
          db.collection('event').doc('rival').collection('user_list').add({
            name: thisnt.name
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
              alert("추가 성공!");
              thisnt.getList();
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
        }
        else{
          alert("등록된 참가자입니다.");
        }
      }else{
        alert("이름을 입력하세요.");
      }
    },
    async userCheck() {
      const thisnt = this;
      let flag = true;
      await db.collection('event').doc('rival').collection('user_list').get().then((querySnapshot) => {
        if(querySnapshot.size > 0 ){
          querySnapshot.forEach((doc) => {
            if(thisnt.name === doc.data().name){
              flag = false;
            }
          });
        }
        else{
          flag = true;
        }
      });
      
      return flag;
    }
  },
  created() {
    this.getList();
  }
};
</script>
