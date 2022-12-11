<template>
  <v-app>
    <v-container>
      <v-btn
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        color="primary"
      >
        Change background color
      </v-btn>
      <div>
        <v-dialog
          v-model="dialog"
          max-width="600px"
          transition="dialog-top-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="secondary"
              style="color:white;border-bottom: 4px solid #127359;margin-bottom:50px;margin-top:10px"
              block
            >
              Enter match</v-btn
            >
          </template>
          <v-card>
            <v-toolbar color="primary" dark>
              <h4>Enter match</h4>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-card-title> </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-row
                    ><span style="color:#0a7da0;">
                      <h5>Team Blauw</h5></span
                    ></v-row
                  >

                  <v-row>
                    <v-autocomplete
                      required
                      outlined
                      clearable
                      style="margin: 5px;"
                      :items="userScores.flat()"
                      v-model="player1"
                      item-text="name"
                      item-value="id"
                      label="Speler 1"
                    ></v-autocomplete>
                  </v-row>

                  <v-row>
                    <v-autocomplete
                      required
                      outlined
                      clearable
                      style="margin: 5px;"
                      :items="userScores.flat()"
                      v-model="player2"
                      item-text="name"
                      item-value="id"
                      label="Speler 2"
                    ></v-autocomplete>
                  </v-row>

                  <v-row>
                    <v-text-field
                      v-model="score_left"
                      label="Score"
                      required
                      outlined
                      clearable
                      number
                      style="margin: 5px;"
                    ></v-text-field>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row
                    ><span style="color:#c35b6a;">
                      <h5>Team Rood</h5></span
                    ></v-row
                  >

                  <v-row>
                    <v-autocomplete
                      required
                      outlined
                      clearable
                      style="margin: 5px;"
                      :items="userScores.flat()"
                      v-model="player3"
                      item-text="name"
                      item-value="id"
                      label="Speler 3"
                    ></v-autocomplete>
                  </v-row>
                  <v-row>
                    <v-autocomplete
                      required
                      outlined
                      clearable
                      style="margin: 5px;"
                      :items="userScores.flat()"
                      v-model="player4"
                      item-text="name"
                      item-value="id"
                      label="Speler 4"
                    ></v-autocomplete>
                  </v-row>

                  <v-row>
                    <v-text-field
                      v-model="score_right"
                      label="Score"
                      outlined
                      clearable
                      style="margin: 5px;"
                      required
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-btn color="#48bf86" block @click="addPlayersScore()">
                  <span style="color:white"> Submit</span></v-btn
                >
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-row>
          <v-col cols="12" md="7" xs="12" sm="7" lg="7">
            <div style="margin-bottom: 30px;">
              <v-toolbar color="blue">
                <h4 style="color:white">RANKING</h4>

                <v-spacer></v-spacer>

                <v-btn @click="stats = !stats">
                  {{ stats ? "Show Stats " : "Hide Stats" }}
                </v-btn>
              </v-toolbar>
            </div>
            <v-data-table
              :headers="hideHeaders"
              :items="userScores"
              disable-pagination
              :sort-by="['position', 'score']"
              :sort-desc="[false, true]"
              :hide-default-footer="true"
              class="elevation-1"
            >
              <template
                v-for="h in hideHeaders"
                v-slot:[`header.${h.value}`]="{ header }"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ h.text }}</span>
                  </template>
                  <span>{{ h.title }}</span>
                </v-tooltip>
              </template>

              <template #[`item.position`]="{index}">
                # {{ index + 1 }}
              </template>

              <template #[`item.GW`]="{item}">
                {{ item.w + item.v }}
              </template>

              <template #[`item.D`]="{item}">
                {{ item.w + item.v / item.score }}%
              </template>
            </v-data-table>
          </v-col>

          <v-col cols="12" md="5" xs="12" sm="5" lg="5">
            <div style="margin-bottom: 30px;text-align: center;">
              <v-toolbar
                color="blue"
                dense
                elevation="24"
                flat
                outlined
                rounded
                shaped
              >
                <h4 style="color:white">MATCHES</h4></v-toolbar
              >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <th style="padding-bottom:1rem;padding-top:1rem">
                      Last 10 matches
                    </th>
                  </thead>
                  <tbody>
                    <tr v-for="games in lastGames" :key="games.id">
                      <td>
                        <span class="team"
                          >{{ games.player1 }} <br />{{ games.player2 }}</span
                        >
                      </td>

                      <td>
                        <img
                          src="@/assets/beker.png"
                          v-show="games.score_left > games.score_right"
                        />
                      </td>
                      <td>
                        <span class="score_blue">{{ games.score_left }}</span>
                      </td>

                      <td>
                        -
                        <span class="date">
                          {{
                            games.createDate
                              ? new Date(games.createDate).toLocaleDateString()
                              : ""
                          }}
                        </span>
                      </td>
                      <td>
                        <span class="score_red">{{ games.score_right }}</span>
                      </td>
                      <td>
                        <img
                          src="@/assets/beker.png"
                          v-show="games.score_right > games.score_left"
                        />
                      </td>
                      <td>
                        <span class="team"
                          >{{ games.player3 }} <br />{{ games.player4 }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      stats: true,
      dialog: false,
      player1: "",
      player2: "",
      player3: "",
      player4: "",
      score_left: null,
      score_right: null,
      userScores: [],
      lastGames: [],
      headers: [
        {
          text: "Positie",
          value: "position",
          title: "Speler positie",
          sortable: true,
        },
        {
          text: "Speler",
          value: "name",
          title: "Speler naam",
          sortable: true,
        },
        {
          text: "Score",
          value: "score",
          title: "Score",
          sortable: true,
        },
        {
          text: "GW",
          value: "GW",
          title: "Gespeelde wedstrijden",
          sortable: true,
        },
        {
          text: "W",
          value: "w",
          title: "winst",
          sortable: true,
        },
        {
          text: "V",
          value: "v",
          title: "Verlies",
          sortable: true,
        },
        {
          text: "D",
          value: "D",
          title: "Punten ratio",
          sortable: true,
        },
      ],
      loading: false,
      items: [],
      search: null,
      select: null,
      names: [],
    };
  },

  async mounted() {
    await this.getData();
    await this.getLastGames();
    await this.isNight();
  },

  computed: {
    hideHeaders() {
      let headers = [];
      headers.push({
        text: "Positie",
        value: "position",
        title: "Speler positie",
      });
      headers.push({ text: "Spelers", value: "name", title: "Speler naam" });
      headers.push({ text: "Score", value: "score", title: "Score" });

      if (!this.stats) {
        headers.push({
          text: "GW",
          value: "GW",
          title: "Gespeelde wedstrijden",
        });
      }
      if (!this.stats) {
        headers.push({ text: "W", value: "w", title: "winst" });
      }

      if (!this.stats) {
        headers.push({ text: "V", value: "v", title: "Verlies" });
      }

      if (!this.stats) {
        headers.push({
          text: "D",
          value: "D",
          title: "Punten ratio",
          sortable: false,
        });
      }

      return headers;
    },
  },

  methods: {
    reset() {
      this.player1 = "";
      this.player2 = "";
      this.player3 = "";
      this.player4 = "";
      this.score_left = "";
      this.score_right = "";
    },

    async getData() {
      await axios
        .get(`http://localhost:3000/api/score/highscores`)
        .then((response) => (this.userScores = response.data));
    },
    isNight() {
      this.$vuetify.theme.dark =
        new Date().getHours() >= 17 && new Date().getHours() <= 24;
    },

    async getLastGames() {
      await axios
        .get(`http://localhost:3000/api/score/games`)
        .then((response) => (this.lastGames = response.data));
    },

    async addPlayersScore() {
      let player1 = !!this.player1;
      let player2 = !!this.player2;
      let player3 = !!this.player3;
      let player4 = !!this.player4;
      let score_left = !!this.score_left;
      let score_right = !!this.score_right;

      let formisValid =
        player1 && player2 && player3 && player4 && score_left && score_right;
      if (formisValid) {
        await axios.post(`http://localhost:3000/api/score`, {
          player1: this.player1[0].toUpperCase() + this.player1.slice(1),
          player2: this.player2[0].toUpperCase() + this.player2.slice(1),
          player3: this.player3[0].toUpperCase() + this.player3.slice(1),
          player4: this.player4[0].toUpperCase() + this.player4.slice(1),
          score_left: this.score_left,
          score_right: this.score_right,
        });
        this.reset();
        await this.getData();
        await this.getLastGames();
        this.$swal.fire("Dankje!", "Aangemaakt", "success");
        this.dialog = false;
      } else {
        this.$swal.fire(
          "Error!",
          "Controleer of alle velden zijn ingevuld.",
          "error"
        );
      }
    },
  },
};
</script>
<style scoped>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
.date {
  text-align: center;
  font-size: 0.7em;
}
.score_blue {
  font-size: 1.6em;
  font-weight: bold;
  color: #0a7da0;
}

.score_red {
  font-size: 1.6em;
  font-weight: bold;
  color: #c35b6a;
  display: flex;
}
.team {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
