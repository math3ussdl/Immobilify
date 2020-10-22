<template>
  <q-page class="row items-center justify-evenly">
    <pagtable></pagtable>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import PagTable from '../components/PagTable.vue';

@Component({
  components: {
    pagtable: PagTable
  }
})
export default class PageIndex extends Vue {
  private current = 6;
};
</script>
