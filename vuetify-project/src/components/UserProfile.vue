<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row center="d-flex justify-center">
      <v-col
        cols="12"
        md="8"
      >
        <material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Profiel wijzigen
            </div>

            <div class="subtitle-1 font-weight-light">
              Maak je profiel compleet
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Bedrijf"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    variant="outlined"
                    label="Gebruikersnaam"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Wachtwoord"
                    type="password"
                    variant="outlined"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Voornaam"
                    variant="outlined"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Achternaam"
                    variant="outlined"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Adres"
                    variant="outlined"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Stad"
                    variant="outlined"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Land"
                    variant="outlined"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    variant="outlined"
                    label="Postcode"
                    type="number"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    variant="outlined"
                    label="Over mij "
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="accent"
                    class="mr-0"
                  >
                    Update profiel
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
      <material-card
          class="v-card-profile"
          avatar="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              Inspecteur
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              Alex de Vries
            </h4>

            <p class="font-weight-light grey--text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <v-btn
              color="accent"
              rounded
              class="mr-0"
            >
              Volgen
            </v-btn>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '@/layouts/MaterialCard.vue'

export default {
  name: "UserProfile",
  components: {MaterialCard}
};

</script>

