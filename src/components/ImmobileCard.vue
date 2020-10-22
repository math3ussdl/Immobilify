<template>
  <div class="q-pa-md" style="min-width: 65%" align="center">
    <h4>Detalhamento do Imóvel</h4>
    <q-form
      class="q-gutter-md"
    >
      <q-input
        style="max-width: 35rem;"
        filled
        label="Endereço"
        :value="$props.immobile.address"
      />

      <q-input
        style="max-width: 35rem;"
        filled
        type="number"
        label="Número"
        :value="$props.immobile.number"
      />

      <q-input
        disable
        style="max-width: 35rem;"
        filled
        label="Criado em"
        :value="convertToLocalDate($props.immobile.created_at)"
      />

      <q-input
        disable
        style="max-width: 35rem;"
        filled
        label="Atualizado em"
        :value="convertToLocalDate($props.immobile.updated_at)"
      />

      <q-separator />

      <div class="members">
        <div class="members-header">
          <h6>Membros</h6>

          <q-btn id="add-btn" title="Adicione um Membro" flat round color="primary" icon="person_add" @click="prompt = true" />
        </div>

        <p
          id="no-member"
          v-if="$props.immobile.members.length == 0"
        >
          Nenhum membro cadastrado!
        </p>

        <q-list bordered class="rounded-borders members-list" v-else>
          <q-item
            class="member-item"
            v-for="member in $props.immobile.members"
            :key="member.id"
            v-bind="member"
          >
            <q-item-section avatar top>
              <q-avatar icon="person" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{ member.name }}</q-item-label>
              <q-item-label caption>{{ member.age }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon class="icon-btn" name="info" color="green" title="Mais Detalhes..." />
            </q-item-section>

            <q-item-section side>
              <q-icon class="icon-btn" name="delete" color="negative" title="Remover membro" @click="delMember = true; memberId = member.id" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <q-separator />

      <div class="actions">
        <q-btn color="positive" icon="save" label="Salvar" />
      </div>
    </q-form>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="card-section-flex">
          <div class="text-h6">Novo Membro</div>

          <q-icon color="primary" name="person" size="30px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="member.name"
            autofocus
            label="Nome"
          />

          <q-input
            dense
            v-model="member.age"
            mask="####-##-##"
            hint="Formato: AAAA-MM-DD"
            label="Data de Nascimento"
          />

          <q-select dense v-model="member.gender" :options="opts" label="Gênero" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="positive" icon="save" label="Salvar Membro" @click="createMember()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="delMember" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Você tem certeza que quer remover este membro</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Não!" color="negative" v-close-popup />
         <q-btn flat label="Sim! Pode excluí-lo" color="positive" v-close-popup @click="deleteMember()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .members {
    .members-header {
      display: flex;
      justify-content: space-between;

      margin: .5rem 5rem;

      #add-btn {
        width: 2.5rem;
        height: 2.5rem;

        margin-top: 2.5rem;
      }

      @media screen and (max-width: 768px) {
        margin: .5rem 1.5rem;
      }
    }

    #no-member {
      color: $negative;
      font-weight: bold;

      padding: 1.5rem 0;
    }

    .members-list {
      width: auto;
      max-width: 80%;

      .member-item {
        & + & {
          margin: 1.5rem 0;
        }
      }

      .icon-btn {
        &:hover {
          cursor: pointer;
        }
      }

      @media screen and (max-width: 768px) {
        max-width: 95%;
      }
    }
  }

  h4 {
    margin-bottom: 5rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;

    margin: 1rem 3rem;

    @media screen and (max-width: 768px) {
      margin: 1.5rem 0;
      justify-content: center;
    }
  }

  .card-section-flex {
    display: flex;
    justify-content: space-between;
  }
</style>

<script lang="ts">
  import { IMember, Immobile } from 'src/components/models';
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    props: {
      immobile: Object as () => Immobile
    }
  })
  export default class ImmobileCard extends Vue {
    private prompt = false;
    private delMember = false;

    private member: IMember = {
      name: '',
      age: '',
      gender: ''
    }

    private opts = [
      'MASCULINO', 'FEMININO'
    ]

    private memberId = null;

    async createMember () {
      await this.$axios.post(`immobiles/${this.$props.immobile.id}/members`, this.member)
        .then(() => {
          this.prompt = false;

          this.member = {
            name: '',
            age: '',
            gender: ''
          }

          this.$q.notify({
            message: 'Membro criado com sucesso!',
            color: 'positive'
          });

          window.location.reload();
        })
        .catch(() => {
          this.$q.notify({
            message: 'Não foi possível cadastrar o Membro :(',
            color: 'negative'
          });
        });
    }

    async deleteMember () {
      await this.$axios.delete(`immobiles/${this.$props.immobile.id}/members/${this.memberId}`)
        .then(() => {
          this.$q.notify({
            message: 'Membro removido com sucesso!',
            color: 'positive'
          });

          this.memberId = null;

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(() => {
          this.$q.notify({
            message: 'Não foi possível remover o Membro :(',
            color: 'negative'
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    }

    convertToLocalDate(dateTime: string): string {
      const date = dateTime.substring(0, 10);

      let dd = date.substring(8, 10);
      let mm = date.substring(5, 7);
      let yyyy = date.substring(0, 4);

      return `${yyyy}-${mm}-${dd}`;
    }
  }
</script>
