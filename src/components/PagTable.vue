<template>
  <q-table
    title="Todos os Imóveis"
    :data="tableData"
    :columns="tableColumns"
    row-key="name"
    :filter="filter"
    @row-click="onRowClick"
  >
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisar...">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<style lang="scss" scoped>
div {
  min-width: 95%;
  min-height: 75%;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Immobile } from './models';

@Component
export default class PagTable extends Vue {
  private current = 1;
  private lastPage = 1;

  private filter = '';

  private tableColumns = [
    {
      name: 'id',
      required: true,
      label: 'Id',
      align: 'left',
      field: (row: Immobile) => row.id,
      format: (val: string) => `${val}`,
      sortable: true
    },

    {
      name: 'address',
      required: true,
      label: 'Endereço',
      align: 'left',
      field: (row: Immobile) => row.address,
      format: (val: string) => `${val}`,
      sortable: true
    },

    {
      name: 'number',
      required: true,
      label: 'Número',
      align: 'left',
      field: (row: Immobile) => row.number,
      format: (val: string) => `${val}`,
      sortable: true
    },

    {
      name: 'members',
      required: true,
      label: 'Nº de Membros',
      align: 'left',
      field: (row: Immobile) => row.members,
      format: (val: string) => `${val}`,
      sortable: true
    },

    {
      name: 'created_at',
      required: true,
      label: 'Criado em',
      align: 'left',
      field: (row: Immobile) => this.convertToLocalDate(row.created_at),
      format: (val: string) => `${val}`,
      sortable: true
    },

    {
      name: 'updated_at',
      required: true,
      label: 'Atualizado em',
      align: 'left',
      field: (row: Immobile) => this.convertToLocalDate(row.updated_at),
      format: (val: string) => `${val}`,
      sortable: true
    },
  ];

  private tableData: Immobile[] = [];

  async mounted () {
    const { data: response } =
      await this.$axios.get('immobiles')
        .then((res) => res);

    this.tableData = response;
  }

  onRowClick (evt: Event, row: Immobile): void {
    this.$router.push(`/immobile/${row.id}`);
  }

  convertToLocalDate(dateTime: string): string {
    const date = dateTime.substring(0, 10);

    let dd = date.substring(8, 10);
    let mm = date.substring(5, 7);
    let yyyy = date.substring(0, 4);

    return `${yyyy}-${mm}-${dd}`;
  }
};
</script>
