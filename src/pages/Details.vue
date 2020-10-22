<template>
  <q-page class="row items-center justify-evenly">
    <imcard
      :immobile="immobile"
    />
  </q-page>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { Immobile } from 'components/models';
  import ImmobileCard from 'components/ImmobileCard.vue'

  @Component({
    components: { imcard: ImmobileCard }
  })
  export default class PageDetails extends Vue {
    private immobile: Immobile | null = null;

    async mounted () {
      const { data: response } =
        await this.$axios.get(`immobiles/${this.$route.params.id}`)
          .then((res) => res);

      this.immobile = response;
    }
  };
</script>
