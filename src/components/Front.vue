<template>
  <v-container>
    <div>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="#48bf86"
            style="color:white;border-bottom: 4px solid #127359;margin-bottom:50px"
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
                    label="Speler 1 (test)"
                    v-model="player"
                    required
                    outlined
                    clearable
                    style="margin: 5px;"
                  ></v-text-field>
                </v-row>

                <v-row>
                  <v-text-field
                    label="Speler 2"
                    outlined
                    clearable
                    required
                    style="margin: 5px;"
                  ></v-text-field>
                </v-row>

                <v-row>
                  <v-text-field
                    v-model="score"
                    label="Score (test)"
                    required
                    outlined
                    type="number"
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
                    label="Speler 1"
                    outlined
                    clearable
                    required
                    style="margin: 5px;"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    label="Speler 2"
                    required
                    outlined
                    clearable
                    style="margin: 5px;"
                  ></v-text-field>
                </v-row>

                <v-row>
                  <v-text-field
                    v-model="score"
                    label="Score"
                    type="number"
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
        <v-col cols="8" sm="8">

<div style="margin-bottom: 30px;">

<v-toolbar
  color="blue"
  dense
  elevation="24"
  flat
  outlined
  rounded
  shaped
>     <h3>Rank</h3></v-toolbar>
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

        <v-col cols="4" sm="4">

          <div  style="margin-bottom: 30px;text-align: center;">

<v-toolbar
  color="blue"
  dense
  elevation="24"
  flat
  outlined
  rounded
  shaped
>           <h3 >Wedstrijden</h3></v-toolbar>
     </div>
    
     
          Sergio - 7-10 Erik
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
      userScores: [],
      player: "",
      score: "",
      headers: [
        {
          text: "Positie",
          value: "displayName",
          sortable: false,
        },
        {
          text: "Speler",
          value: "playername",
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
  },
  methods: {
    async getData() {
      await axios
        .get(`http://localhost:3000/api/score`)
        .then((response) => (this.userScores = response.data));
    },
    async addPlayersScore() {
      try {
        await axios.post(`http://localhost:3000/api/score`, {
          playername: this.player,
          score: this.score,
        });
        this.$swal.fire("Dankje!", "Aangemaakt", "success");

        this.getData();
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
