<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Phone">{{ item.phone }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import firebase from "firebase";
import { firebaseConfig } from "@/firebase/firebase";

// add firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: []
    };
  },
  methods: {
    getList() {
      const tmpList = new Array();
      db.collection("administrator").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tmpList.push(doc.data());
        });
        this.users = tmpList;
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>
