<template>
  <div>
    <v-divider> </v-divider>
    <v-container>
      <v-row align="center" justify="center" class="space">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-10">
            <v-window >
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h4 class="text-center"><b>Soqqer Portal</b></h4>
                      <h6 class="text-center grey--text">
                        Log into our Portal
                      </h6>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-text-field
                            label="E-mail"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            class="mt-16"
                            v-model="email"
                          />

                          <v-text-field
                            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show3 ? 'text' : 'password'"
                            label="Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            class="input-group--focused"
                            v-model="password"
                            @click:append="show3 = !show3"
                          />

                          <v-btn
                          style="background-color:#0a7da0;"
                            dark
                            block
                            tile
                            @click="userLogin"
                            autocomplete="false"
                            >Login</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="color rounded-bl-xl">
                    <div style="text-align: center; padding: 180px 0">
                      <v-card-text class="white--text">
                        <h6 class="text-center">
                          Managing the soqqer data
                        </h6>
                      </v-card-text>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
export default {
  data: () => ({
    show3: false,
    email: "",
    password: "",
  }),
  props: {
    source: String,
  },

  async mounted() {
    await this.isNight();
  },

  methods: {
    isNight() {
      this.$vuetify.theme.dark =
        new Date().getHours() >= 17 && new Date().getHours() <= 24;
    },
    melding() {
      this.$swal.fire({
        icon: "error",
        title: "Oops...",
        text: "controleer of alle velden ingevuld!",
      });
    },
    userLogin() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.s$swal.resumeTimer);
        },
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async () => {
          // this.$router.push("/Dashboard");
          const token = await firebase.auth().currentUser.getIdToken(true);
          if (token) axios.defaults.headers.common["fireToken"] = token;
          const response = await axios.get(`http://localhost:3000/api/whoami`);
         
          if (["BEHEERDER"].includes(response.data.accessRight)) {
            this.$router.push("/Dashboard");
          }
          if (["UNDETERMINED"].includes(response.data.accessRight)) {
            this.$router.push("/Inloggen");
            Toast.fire({
              icon: "error",
              title: "Rechten onbekend! Neem contact op met een beheerder.",
            });
            firebase.auth().signOut();
            return;
          }

          Toast.fire({
            icon: "success",
            title: "Succesvol ingelogd",
          });
        })
        //.catch((error) => {
        .catch(() => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gebruikersnaam of wachtwoord is onjuist.!",
            footer:
              '<a href="mailto:info@test.nl?subject=Inloggen%20lukt%20niet%20op%20de%20website">Hulp nodig?</a>',
          });
        });
    },
  },
};
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
.space {
  margin-bottom: 2px;
}
.color {
  background-color: #0a7da0;
}
</style>
