import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PokemonView from "../views/PokemonView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/pokemon/:id",
    name: "pokemon",
    component: PokemonView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
