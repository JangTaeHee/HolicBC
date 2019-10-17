<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>운영진 정보</p>
      </sidebar-link>
      <sidebar-link to="/rival_toto_event">
        <md-icon>dashboard</md-icon>
        <p>라이벌전 토토 참가</p>
      </sidebar-link>
      <sidebar-link to="/rival_toto_result">
        <md-icon>dashboard</md-icon>
        <p>라이벌전 토토 결과</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter
  }
};
</script>
