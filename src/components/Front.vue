<template>
  <v-container>
    <div>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="#48bf86"
            style="color:white;border-bottom: 4px solid #127359;margin-bottom:50px;margin-top:10px"
            block
          >
            Wedstrijd invoeren</v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="text-center" style="text-align:center"
              >Wedstrijd invoeren</span
            >
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-row
                  ><span style="color:blue;"> <h5>Team Blauw</h5></span></v-row
                >

                <v-row>
                  <v-text-field
                    label="Speler 1"
                    v-model="player1"
                    required
                    outlined
                    clearable
                    style="margin: 5px;"
                  ></v-text-field>
                </v-row>

                <v-row>
                  <v-text-field
                    label="Speler 2"
                    v-model="player2"
                    outlined
                    clearable
                    required
                    style="margin: 5px;"
                  ></v-text-field>
                </v-row>

                <v-row>
                  <v-text-field
                    v-model="score_left"
                    label="Score"
                    required
                    outlined
                   
                    clearable
                    style="margin: 5px;"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row
                  ><span style="color:red;"> <h5>Team Rood</h5></span></v-row
                >

                <v-row>
                  <v-text-field
                    label="Speler 3"
                    v-model="player3"
                    outlined
                    clearable
                    required
                    style="margin: 5px;"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    label="Speler 4"
                    v-model="player4"
                    required
                    outlined
                    clearable
                    style="margin: 5px;"
                  ></v-text-field>
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
              <v-btn
                color="#48bf86"
                style="color:white;border-bottom: 4px solid #127359;"
                block
                @click="addPlayersScore()"
              >
                Verzenden</v-btn
              >
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Afsluiten
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-row>
        <v-col cols="7" sm="7">
          <div style="margin-bottom: 30px;">
            <v-toolbar
              color="blue"
              dense
              elevation="24"
              flat
              outlined
              rounded
              shaped
            >
              <h3>Rank</h3></v-toolbar
            >
          </div>

          <v-data-table
            :headers="headers"
            :items="userScores"
            disable-pagination
            :hide-default-footer="true"
            class="elevation-1"
          >
          </v-data-table>
        </v-col>

        <v-col cols="5" sm="5">
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
              <h3>Wedstrijden</h3></v-toolbar
            >
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <th
                    class="text-left"
                    style="padding-bottom:1rem;padding-top:1rem"
                  >
                    Laatste 4 wedstrijden
                  </th>
                </thead>
                <tbody>
                  <tr v-for="games in lastGames" :key="games.id">
                    <td>{{ games.player1 }}  <br>{{ games.player2 }}</td>
                   
                    <td>{{ games.score_left }}</td> 
                    <td><img src="@/assets/beker.png" v-show="games.score_left > games.score_right" ></td>
                    <td>-</td>
                    <td>{{ games.score_right }}</td> <img src="@/assets/beker.png" v-show="games.score_right > games.score_left" >
                
                    <td>    {{ games.player3 }} <br>{{ games.player4 }}</td>
                   
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
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
          value: "displayName",
          sortable: false,
        },
        {
          text: "Speler",
          value: "name",
          sortable: true,
        },
        {
          text: "Score",
          value: "score",
          sortable: true,
        },
      ],
    };
  },
  async mounted() {
    await this.getData();
    await this.getLastGames();
  },
  methods: {

       reset(){
       this.player1 = "";
      this.player2 = "";
      this.player3 = "";
      this.player4 = "";
      this.score_left = "";
      this.score_right = "";
    },
   
    async getData() {
      await axios
        .get(`https://aanvraagbouwvergunning/api/score/highscores`)
        .then((response) => (this.userScores = response.data));
    },

    async getLastGames() {
      await axios
        .get(`https://aanvraagbouwvergunning.nl/api/score/games`)
        .then((response) => (this.lastGames = response.data));
    },

    async addPlayersScore() {
      try {
        await axios.post(`https://aanvraagbouwvergunning.nl/api/score`, {
          player1: this.player1,
          player2: this.player2,
          player3: this.player3,
          player4: this.player4,
          score_left: this.score_left,
          score_right: this.score_right,
        });
        this.reset();
           await this.getData();
        await this.getLastGames();
        this.$swal.fire("Dankje!", "Aangemaakt", "success");
     this.dialog = false;

      } catch (reason) {
        this.errored = true;
        console.log(reason);
        this.$swal.fire("Error!", "Er Is een foutmelding.", "error");

        throw reason;
      }
    },
  
  },
};
</script>
