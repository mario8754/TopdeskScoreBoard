<template>
  <v-container>
    <div>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="#48bf86"
            style="color:white;border-bottom: 4px solid #127359;"
            block
          >
            Wedstrijd invoeren</v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="text-center" style="text-align:center">Wedstrijd invoeren</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              
              <v-col cols="6">
             
                <v-row><span style="color:blue;">  <h5>Team Blauw</h5></span></v-row>

                <v-row>
                  <v-text-field
                    label="Speler 1"
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
                    label="Score"
                    required
                    outlined
                    type="number"
                    clearable
                       style="margin: 5px;"
                  ></v-text-field>
                </v-row>
              </v-col>

              <v-col cols="6">
                <v-row><span style="color:red;">  <h5>Team Rood</h5></span></v-row>
               
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
                >
                  Verzenden</v-btn
                >
              </v-row>
          
            </v-container>
            <small>*indicates required field</small>
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
        <v-col   cols="8" sm="8">
          <h3>Rank</h3>
          <v-divder></v-divder>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    #
                  </th>
                  <th class="text-left">
                    Speler
                  </th>
                  <th class="text-left">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in spelers" :key="item.speler">
                  <td>{{ item.positie }}</td>
                  <td>{{ item.speler }}</td>
                  <td>{{ item.score }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>

        <v-col cols="4" sm="4">
          <h3>Wedstrijden</h3>
          <v-divder></v-divder>
          Sergio - 7-10 Erik
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      spelers: [
        {
          positie: 1,
          speler: "Sergio",
          score: 159,
        },
        {
          positie: 2,
          speler: "Jan Rutger",
          score: 237,
        },
        {
          positie: 3,
          speler: "Erik",
          score: 262,
        },
        {
          positie: 4,
          speler: "Emiliano",
          score: 305,
        },
        {
          positie: 5,
          speler: "Camillo",
          score: 356,
        },
        {
          positie: 6,
          speler: "Martijn",
          score: 375,
        },
        {
          positie: 7,
          speler: "Lollipop",
          score: 392,
        },
      ],
    };
  },
};
</script>
