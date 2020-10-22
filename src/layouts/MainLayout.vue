<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
    <q-toolbar>
      <q-btn flat round color="white" icon="arrow_back" @click="goBack()" v-if="$route.path !== '/'" />

      <q-btn flat round color="white" icon="home" v-else />

      <q-toolbar-title>
        Immobilify
      </q-toolbar-title>

      <q-btn color="positive" icon="add" label="Novo Imóvel" @click="redirect('/immobile/new')" v-if="$route.path === '/'" />
    </q-toolbar>
  </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="footer">
      <q-toolbar>
        <q-toolbar-title class="title">
          <a
            href="http://www.qsintelligence.com.br/#"
            target="_blank"
            rel="noopener noreferrer"
          >
            @QSIntelligence
          </a>
        </q-toolbar-title>

        <span>v{{ appVersion }}</span>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
  .header {
    height: 3.5rem;

    padding: 0 .8rem;
    display: flex;
  }

  .footer {
    height: 2rem;

    padding: 0 .5rem;
    display: flex;
    align-items: center;

    .title {
      font-size: 1.2rem;
      font-weight: 800;

      a {
        text-decoration: none;
        color: $text;

        &:hover {
          cursor: pointer;
          color: $text-hover;
        }
      }
    }
  }
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { version } from '../../package.json';

@Component({
  components: {}
})
export default class MainLayout extends Vue {
  appVersion = version;

  redirect(path: string) {
    this.$router.push(path);
  }

  goBack() {
    this.$router.back();
  }
}
</script>
