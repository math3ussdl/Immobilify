<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md" style="min-width: 65%" align="center">
      <h4>Novo Imóvel</h4>
      <q-form
        class="q-gutter-md"
      >
        <q-input
          style="max-width: 35rem;"
          filled
          label="Endereço"
          v-model="immobile.address"
        />

        <q-input
          style="max-width: 35rem;"
          filled
          type="number"
          label="Número"
          v-model="immobile.number"
        />

        <q-separator />

        <div class="actions">
          <q-btn class="cancel" flat color="primary" label="Cancelar" @click="goBack()" />
          <q-btn color="positive" icon="save" label="Salvar" @click="createImmobile()" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
  .actions {
    display: flex;
    justify-content: center;

    margin-top: 2.5rem;

    .cancel {
      margin-right: 1.2rem;
    }
  }
</style>

<script lang="ts">
  import { ImmobileDTO } from 'src/components/models';
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class CreateImmobile extends Vue {
    private immobile: ImmobileDTO = {
      address: '',
      number: 0
    }

    async createImmobile () {
      await this.$axios.post('immobiles', this.immobile)
        .then(() => {
          this.$q.notify({
            message: 'Imóvel criado com sucesso!',
            color: 'positive'
          });

          this.$router.push('/');
        })
        .catch(() => {
          this.$q.notify({
            message: 'Não conseguimos criar o Imóvel :(',
            color: 'negative'
          });
        });
    }

    goBack () {
      this.$router.back();
    }
  }
</script>
