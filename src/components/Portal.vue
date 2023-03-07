<template>
  <div>
    
    <v-container style="padding-top: 4rem">
        <v-bottom-navigation style="margin-bottom:15px" v-if="active">
       

        <v-btn
          :color="activeElement === 'Pending' ? '' : ''"
          @click="activeElement = 'Pending'"
        >
          <span>Gegevens bewerken</span>

          <v-icon :color="activeElement === 'Pending' ? 'blue lighten-1' : ''"
            >gavel</v-icon
          >
        </v-btn>

        <v-btn
          :color="activeElement === 'Approved' ? '' : ''"
          @click="activeElement = 'Approved'"
        >
      

          <v-icon :color="activeElement === 'Approved' ? 'green lighten-1' : ''">
            mdi-checkbox-marked-circle</v-icon
          >
        </v-btn>

        <!-- <v-btn
          :color="activeElement === 'Cancelled' ? '' : ''"
          @click="activeElement = 'Cancelled'"
        >
          <span>Gegeannuleerd</span>

          <v-icon :color="activeElement === 'Cancelled' ? 'red darken-1' : ''"
            >mdi-cancel</v-icon
          >
        </v-btn> -->
      </v-bottom-navigation>

      <v-row style="margin-top: 15px">
        
        <v-col cols="10" v-if="activeElement === 'Pending'">
          <v-card>
            <v-card-title>
              All Games
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              disable-pagination
              :hide-default-footer="true"
              class="elevation-1"
            >
              <template v-slot:top>
               
              </template>
              <template v-slot:[`item.Actions`]="{ item }">
                <v-dialog
                  v-model="model"
               
                      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      small
                      class="mr-2"
                      color="green"
                      @click="getGameByID(item.id)"
                    >
                      mdi-pen
                    </v-icon>
                  </template>
                  <v-card>
                    <v-toolbar color="primary" dark>
                      <h4>Enter match</h4>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn icon dark @click="model = false">
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
                            <v-text-field
                              v-model="currentGame.player1"
                              label="Speler 1"
                              required
                              outlined
                              number
                              style="margin: 5px;"
                            ></v-text-field>
                          </v-row>

                          <v-row>
                            <v-text-field
                              v-model="currentGame.player2"
                              label="Speler 2"
                              required
                              outlined
                              number
                              style="margin: 5px;"
                            ></v-text-field>
                          </v-row>

                          <v-row>
                            <v-text-field
                              v-model="currentGame.score_left"
                              label="Score"
                              required
                              outlined
                              type="number"
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
                            <v-text-field
                              v-model="currentGame.player3"
                              label="Speler 3"
                              required
                              outlined
                              number
                              style="margin: 5px;"
                            ></v-text-field>
                          </v-row>
                          <v-row>
                            <v-text-field
                              v-model="currentGame.player4"
                              label="Speler 4"
                              required
                              outlined
                              number
                              style="margin: 5px;"
                            ></v-text-field>
                          </v-row>

                          <v-row>
                            <v-text-field
                              v-model="currentGame.score_right"
                              label="Score"
                              outlined
                              style="margin: 5px;"
                              required
                              type="number"
                            ></v-text-field>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-btn color="#48bf86" block @click="updateGame(item.id)">
                          <span style="color:white"> update</span></v-btn
                        >
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <!-- delete games -->
                <v-icon small color="red" @click="deleteGame(item.id)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="resetButton()">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import axios from "axios";
export default {
  data: () => ({

      active: true,
      activeElement: "Pending",
    search: "",
    model: false,
    dialogDelete: false,
    currentGame:[],
    items: [],
    headers: [
      {
        text: "player1 team blue",
        value: "player1",
        sortable: true,
      },

      {
        text: "player2 one team blue",
        value: "player2",
        sortable: true,
      },
      {
        text: "player1 team red",
        value: "player3",
        sortable: true,
      },

      {
        text: "player2 team red",
        value: "player4",
        sortable: true,
      },

      {
        text: "Score team blue",
        value: "score_left",
        sortable: true,
      },

      {
        text: "Score team blue",
        value: "score_right",
        sortable: true,
      },
      {
        text: "Actions",
        value: "Actions",
        sortable: false,
      },
    ],
  }),

  async mounted() {
    await this.getAllGames();
    await this.getGameByID();
  },

  methods: {
    async getAllGames() {
      const response = await axios.get(
        "https://score.hacketon.nl/api/score/v3/games"
      );
      this.items = response.data;
    },
    async deleteGame(id) {
      const result = await this.$swal.fire({
        title: "Are you sure?",
        text: "You cannot restore this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete",
      });
      if (result.isConfirmed) {
        await axios.delete(`https://score.hacketon.nl/api/score/v3/games/delete/${id}`);
        this.$swal.fire("Deleted!", "Game deleted.", "success");
        await this.getAllGames();
      }
      
    },
    async updateGame(id) {
      await axios.put(`https://score.hacketon.nl/api/score/v3/games/update/${id}`, 
      this.currentGame,
      );
        await this.getAllGames();
      this.$swal.fire("Gewijzigd!", "", "success");
      await this.getAllGames();
    },
    async getGameByID(id) {
      const response = await axios.get(
        `https://score.hacketon.nl/api/score/v3/game/${id}`
      );
      this.currentGame = response.data;
    },
  },
};
</script>
