<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">라이벌전 토토 이벤트 참여방법</h4>
            <p class="category">1. 이름과 연락처를 기입한다.</p>
            <p class="category">2. 스코어를 기입한다.</p>
            <p class="category">3. 제출 버튼을 선택한다.</p>
            <p class="category">4. 끝!</p>
          </md-card-header>
          <md-card-content>
            <simple-table table-header-color="green"></simple-table>
          </md-card-content>
        </md-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">Table on Plain Background</h4>
            <p class="category">Here is a subtitle for this table</p>
          </md-card-header>
          <md-card-content>
            <ordered-table></ordered-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { OrderedTable } from "@/components";

export default {
  components: {
    OrderedTable
  }
};
</script>
