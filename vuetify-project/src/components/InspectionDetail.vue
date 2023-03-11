<template>
  <v-card-title>{{ inspection.user }}</v-card-title>
  <v-list v-for="damage in inspection.recordDamage" :key="damage.id">
    <v-list-subheader>Schade</v-list-subheader>
    <v-table>
      <tbody>
        <tr>
          <td>Locatie:</td>
          <td>{{ damage.location }}</td>
        </tr>
        <tr>
          <td>Nieuwe schade:</td>
          <td>{{ damage.newDamage }}</td>
        </tr>
        <tr>
          <td>Soort schade:</td>
          <td>{{ damage.type }}</td>
        </tr>
        <tr>
          <td>Datum:</td>
          <td>{{ formatDate(damage.date) }}</td>
        </tr>
        <tr>
          <td>Acute actie vereist:</td>
          <td>{{ damage.immediateAction }}</td>
        </tr>
        <tr>
          <td>Omschrijving:</td>
          <td>{{ damage.description }}</td>
        </tr>
        <tr>
          <td v-for="image in damage.image" :key="image.id">
            <img  
              :src="getNewDamageUrl(inspection.id, damage.id, image.id, image.img)"
              :alt="damage.id"
              class="img-fluid"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-list>

  <v-list
    v-for="damage in inspection.recordOverdueMaintenance"
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
          <td v-for="image in damage.image" :key="image.id">
            <img  
              :src="getOverdueUrl(inspection.id, damage.id, image.id, image.img)"
              :alt="damage.id"
              class="img-fluid"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-list>

  <v-list
    v-for="damage in inspection.inspectTechnicalInstallations"
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
          <td v-for="image in damage.image" :key="image.id">
            <img  
              :src="getTechnicalUrl(inspection.id, damage.id, image.id, image.img)"
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
          <td v-for="image in damage.image" :key="image.id">
            <img  
              :src="getModificationUrl(inspection.id, damage.id, image.id, image.img)"
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
import mixins from '../mixins/mixins';

export default {
  name: "InspectionDetail",
  props: ["inspection"],
  mixins: [mixins],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('nl-NL', options);
    }
  },
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
