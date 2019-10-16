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
      users: [
        {
          id: 1,
          name: "최현욱",
          phone: "010-3641-3514"
        },
        {
          id: 2,
          name: "김태용",
          phone: "010-2558-5974"
        },
        {
          id: 3,
          name: "김모세",
          phone: "010-7979-6630"
        },
        {
          id: 4,
          name: "김남희",
          phone: "010-5179-3041"
        },
        {
          id: 5,
          name: "장태희",
          phone: "010-2745-0819"
        }
      ]
    };
  }
};
</script>
