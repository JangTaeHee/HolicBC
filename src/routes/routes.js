import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import RivalTotoEvent from "@/pages/RivalTotoEvent.vue";
import RivalTotoAnswer from "@/pages/RivalTotoAnswer.vue";
import RivalTotoResult from "@/pages/RivalTotoResult.vue";
import RivalTotoUser from "@/pages/RivalTotoUser.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "운영진 정보",
        component: Dashboard
      },
      {
        path: "rival_toto_event",
        name: "라이벌전 토토 참가",
        component: RivalTotoEvent
      },
      {
        path: "rival_toto_answer",
        name: "라이벌전 토토 결과 등록",
        component: RivalTotoAnswer
      },
      {
        path: "rival_toto_result",
        name: "라이벌전 토토 결과",
        component: RivalTotoResult
      },
      {
        path: "rival_toto_user",
        name: "라이벌전 토토 이벤트 참가자 추가",
        component: RivalTotoUser
      }
    ]
  }
];

export default routes;
