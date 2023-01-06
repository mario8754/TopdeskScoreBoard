<template>
  <v-container>
    <v-col cols="auto">
      <v-dialog transition="dialog-top-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="success" block v-bind="attrs" v-on="on"
            >register team for football tournament</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark>Enter Players</v-toolbar>

            <v-card-text>
              <div style="margin-top:10px">
                <v-text-field
                  v-model="teamname"
                  label="Team name (Optional)"
                  outlined
                  clearable
                ></v-text-field>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="player1"
                      label="Player 1"
                      outlined
                      clearable
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="player2"
                      label="Player 2"
                      outlined
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-btn color="#48bf86" block @click="addPlayers()">
                    <span style="color:white" >
                      Submit</span
                    ></v-btn
                  >
                </v-row>
              </div>
            </v-card-text>

            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>

    <v-row style="margin-top:5rem">
      <v-card>
        <v-card-title>
          Topdesk Players
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="teams"
          disable-pagination
        ></v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      teams: [],
      dialog: false,
      teamname: "",
      player1: "",
      player2: "",
      headers: [
        {
          text: "Team naam",
          value: "teamname",

          sortable: true,
        },
        {
          text: "Speler 1",
          value: "player1",

          sortable: true,
        },

        {
          text: "Speler 2",
          value: "player2",

          sortable: true,
        },
      ],
    };
  },
  async mounted() {
    await this.getData();
  },

  methods: {
    reset() {
      this.player1 = "";
      this.player2 = "";
      this.teamname = "";
    },
    async getData() {
      await axios
        .get(`http://localhost:3000/api/v3/tournament/getPlayers`)
        .then((response) => (this.teams = response.data));
    },
    async addPlayers() {
      let player1 = !!this.player1;
      let player2 = !!this.player2;
      let teamname = !!this.teamname;
      let formisValid = player1 && player2 && teamname;
      if (formisValid) {
        await axios.post(
          `http://localhost:3000/api/v3/tournament/addPlayers`,
          {
            player1: this.player1[0].toUpperCase() + this.player1.slice(1),
            player2: this.player2[0].toUpperCase() + this.player2.slice(1),
            teamname: this.teamname[0].toUpperCase() + this.teamname.slice(1),
          }
        );
        this.reset();
        await this.getData();
        this.$swal.fire("Thanks!", "Created", "success");
        this.dialog = false;
      } else {
        this.$swal.fire("Error!", "Not All fields are filled in.", "error");
      }
    },
  },
};
</script>
