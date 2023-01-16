<template>
  <div style="position: relative; display: unset">
    <div class="topnav" id="myTopnav">
      <router-link to="/">
        <img
          class="logo"
          src="@/assets/logo.png"
          alt="Topdesk"
          title="Topdesk interne wedstrijden"
      /></router-link>
      <div class="links">
        <router-link class="menu-item" :to="{ name: 'Ranking' }"
          >Ranking</router-link
        >

        <router-link class="menu-item" :to="{ name: 'Speluitleg' }"
          >Game rules</router-link
        >

        <router-link class="menu-item" :to="{ name: 'Events' }"
          >Up coming events</router-link
        >

      <router-link
          class="menu-item"
          :to="{ name: 'Login' }"
          v-if="!isLoggedIn"
        >
          Inloggen</router-link
        >

        <router-link
          class="menu-item"
          :to="{ name: 'Dashboard' }"
          v-if="isLoggedIn"
        >
          Portaal</router-link
        >

        <router-link
          v-if="isLoggedIn"
          :to="{ name: 'Login' }"
          v-slot="{ navigate, href }"
        >
          <a
            :href="href"
            class="menu-item"
            @click="
              () => {
                logOut();
                navigate();
              }
            "
            >Uitloggen</a
          >
        </router-link>

        
      </div>

      <div id="hamburger" @click="openSidebar()">
        <div @click="openSidebar()"></div>
        <div @click="openSidebar()"></div>
        <div @click="openSidebar()"></div>
      </div>
    </div>
    <div id="sidebar">
      <div id="cross" @click="closeSidebar()">
        <span>&times;</span>
      </div>

      <router-link class="menu-item" :to="{ name: 'Ranking' }"
        >Ranking</router-link
      >

      <router-link class="menu-item" :to="{ name: 'Speluitleg' }"
        >Speluitleg</router-link
      >
      <router-link class="menu-item" :to="{ name: 'Events' }"
        >Up coming events</router-link
      >

      
       <router-link
          class="menu-item"
          :to="{ name: 'Login' }"
          v-if="!isLoggedIn"
        >
          Inloggen</router-link
        >

        <router-link
          class="menu-item"
          :to="{ name: 'Dashboard' }"
          v-if="isLoggedIn"
        >
          Portaal</router-link
        >

        <router-link
          v-if="isLoggedIn"
          :to="{ name: 'Login' }"
          v-slot="{ navigate, href }"
        >
          <a
            :href="href"
            class="menu-item"
            @click="
              () => {
                logOut();
                navigate();
              }
            "
            >Uitloggen</a
          >
        </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
            isLoggedIn: false,
    };
  },
    async created() {
    await this.getUser();
  },

  mounted() {
    document
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", this.closeSidebar));
  },
  methods: {
    openSidebar() {
      document.getElementById("sidebar").style.display = "flex";
    },
    closeSidebar() {
      document.getElementById("sidebar").style.display = "none";
    },
 
       getUser() {
      firebase.auth().onAuthStateChanged(async (user) => {
        console.log({ user: firebase.auth().currentUser });
        this.isLoggedIn = !!user;
        this.user = user ? user : null;
      });
    },

    async logOut() {
      await firebase.auth().signOut();
    },
  },
};
</script>

<style scoped>
img {
  height: 35px;
  width: 35px;
}
#cross {
  width: 100%;
  margin: 10px 0px;
  cursor: pointer;
  position: relative;
}
#cross span {
  font-size: 40px;
  color: green;
  float: right;
  margin-right: 5%;
}
#sidebar {
  position: fixed;
  top: 0px;
  right: 0%;
  display: none;
  flex-direction: column;
  width: 250px;
  height: 100vh;
  background-color: #0a7da0;
  z-index: 1000;
}
#hamburger {
  display: none;
  margin-right: 5%;
  cursor: pointer;
}
#hamburger div {
  width: 30px;
  height: 4px;
  margin-top: 5px;
  border-radius: 5px;
  background: black;
}
#hamburger div:first-child {
  margin-top: 0px;
}
.topnav {
  background-color: #0a7da0;
  display: flex;
  position: sticky;
  font-size: 100;
  font-weight: 100;

  font-family: "open_sanssemibold";
  top: 0;
  width: 100%;
  z-index: 100;
  align-items: center;
  justify-content: space-between;
}
.logo {
  width: 200px;

  margin-left: 5%;
}
.links {
  margin-left: auto;
  margin-right: 5%;
  color: white;
}
.menu-item {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
}
.menu-item:hover {
  /* background-color: white; */
  opacity: 0.2;
  color: white;
}
.menu-item a:active {
  background-color: #0a7da0 !important;
  color: #0a7da0;
}
.menu-item .active {
  background-color: green !important;
}
.menu-item.router-link-exact-active.router-link-active {
  color: gainsboro;
}
.topnav .icon {
  display: none;
}
@media screen and (max-width: 768px) {
  #hamburger {
    display: block;
  }
  .links {
    display: none;
  }
  #sidebar {
    display: none;
  }
}
</style>
