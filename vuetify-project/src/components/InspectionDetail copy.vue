<template>
  <v-card-title>Inspectieformulier van {{ inspection.user }}</v-card-title>
  <v-list v-for="damage in inspection.damageRecords" :key="damage.id">
    <v-list-subheader>Schade</v-list-subheader>
    <v-text-field
      v-model="damage.location"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Locatie"
    ></v-text-field>
    <v-text-field
      v-model="damage.newDamage"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Nieuwe schade:"
    ></v-text-field>
    <v-text-field
      v-model="damage.type"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Soort schade:"
    ></v-text-field>
    <v-text-field
      v-model="damage.date"
      class="mt-2"
      type="datetime-local"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Datum:"
    ></v-text-field>
    <v-text-field
      v-model="damage.immediateAction"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Acute actie vereist:"
    ></v-text-field>
    <v-text-field
      v-model="damage.description"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Omschrijving:"
    ></v-text-field>

    <v-card>
      <v-img
        v-for="image in damage.images"
        :key="image.id"
        :src="getNewDamageUrl(inspection.id, damage.id, image.id, image.img)"
        :alt="damage.id"
        class="img-fluid"
      >
      </v-img>
      <v-card-actions>
        <v-icon @click="deleteImage(index)">mdi-delete</v-icon>
      </v-card-actions>
      <v-file-input
        v-model="damage.images"
        placeholder="Voeg nog een foto toe"
        prepend-icon="mdi-camera"
      ></v-file-input>
    </v-card>
  </v-list>

  <v-list
    v-for="damage in inspection.overdueMaintenanceRecords"
    :key="damage.id"
  >
    <v-list-subheader>Achterstallig onderhoud</v-list-subheader>
    <v-table>
      <tbody>
        <tr>
          <td>Locatie:</td>
          <td>{{ damage.location }}</td>
        </tr>
        <tr>
          <td>Soort schade:</td>
          <td>{{ damage.type }}</td>
        </tr>
        <tr>
          <td>Acute actie vereist:</td>
          <td>{{ damage.immediateAction }}</td>
        </tr>
        <tr>
          <td>Kostenindicatie:</td>
          <td>{{ damage.costIndication }}</td>
        </tr>
        <tr>
          <td v-for="image in damage.images" :key="image.id">
            <img
              :src="
                getOverdueUrl(inspection.id, damage.id, image.id, image.img)
              "
              :alt="damage.id"
              class="img-fluid"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-list>

  <v-list
    v-for="damage in inspection.technicalInstallationsinspections"
    :key="damage.id"
  >
    <v-list-subheader>Technische installaties inspecteren</v-list-subheader>
    <v-table>
      <tbody>
        <tr>
          <td>Locatie:</td>
          <td>{{ damage.location }}</td>
        </tr>
        <tr>
          <td>Soort schade:</td>
          <td>{{ damage.type }}</td>
        </tr>
        <tr>
          <td>Gemelde storingen:</td>
          <td>{{ damage.reportedMalfunction }}</td>
        </tr>
        <tr>
          <td>Test procedure:</td>
          <td>
            <a :href="getPDFTests(inspection.id, damage.test)" download>
              {{ damage.test }}
            </a>
          </td>
        </tr>
        <tr>
          <td>Goedgekeurd:</td>
          <td>{{ damage.approved }}</td>
        </tr>
        <tr>
          <td>Opmerkingen:</td>
          <td>{{ damage.description }}</td>
        </tr>
        <tr>
          <td v-for="image in damage.images" :key="image.id">
            <img
              :src="
                getTechnicalUrl(inspection.id, damage.id, image.id, image.img)
              "
              :alt="damage.id"
              class="img-fluid"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-list>

  <v-list v-for="damage in inspection.identifyModifications" :key="damage.id">
    <v-list-subheader>Modificaties identificeren</v-list-subheader>
    <v-table>
      <tbody>
        <tr>
          <td>Bestaande situaties en reeds gedocumenteerde modificaties:</td>
          <td>
            <a :href="getPDFMods(inspection.id, damage.existing)" download>
              {{ damage.existing }}
            </a>
          </td>
        </tr>
        <tr>
          <td>Locatie aangetroffen modificatie:</td>
          <td>{{ damage.place }}</td>
        </tr>
        <tr>
          <td>Uitgevoerd door:</td>
          <td>{{ damage.executed }}</td>
        </tr>
        <tr>
          <td>Beschrijving modificatie:</td>
          <td>{{ damage.descriptionModification }}</td>
        </tr>
        <tr>
          <td>Te ondernemen actie:</td>
          <td>{{ damage.action }}</td>
        </tr>
        <tr>
          <td>Opmerkingen:</td>
          <td>{{ damage.description }}</td>
        </tr>
        <tr>
          <td v-for="image in damage.images" :key="image.id">
            <img
              :src="
                getModificationUrl(
                  inspection.id,
                  damage.id,
                  image.id,
                  image.img
                )
              "
              :alt="damage.id"
              class="img-fluid"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-list>
</template>

<script>
import mixins from "../mixins/mixins";

export default {
  name: "InspectionDetail",
  props: ["inspection"],
  data() {
    return {
      images: [],
      file: null,
    };
  },
  mixins: [mixins],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("nl-NL", options);
    },
    addImage() {
      const file = this.file;
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.images.push({ src: e.target.result });
        this.file = null;
      };
    },
    deleteImage(index) {
      this.images.splice(index, 1);
    },
  }
};
</script>

<style scoped>
td {
  width: 50%;
}

img {
  width: 50%;
  aspect-ratio: 1/1;
}
</style>
