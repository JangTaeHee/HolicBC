<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">라이벌전 토토 이벤트 참여방법</h4>
            <p class="category">1. 이름을 기입한다.</p>
            <p class="category">2. 스코어를 기입한다.</p>
            <p class="category">3. 제출 버튼을 선택한다.</p>
            <p class="category">4. 끝!</p>
          </md-card-header>
          <md-card-content>
            <simple-table table-header-color="green"></simple-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable } from "@/components";

export default {
  components: {
    SimpleTable
  }
};
</script>
