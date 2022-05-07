<template>
  <v-card>
    <v-card-title>
      조교 계정 생성
      <v-row>
        <v-col>
          <v-text-field v-model="inputForm·name" placeholder="조교 이름" />
        </v-col>
        <v-col>
          <v-text-field v-model="inputForm.email" placeholder="조교 이메일" />
        </v-col>
        <v-col>
          <v-text-field v-model="inputForm.password" placeholder="조교 비밀번호" />
        </v-col>
        <v-col>
          <v-btn @click="saveUser()">추가하기</v-btn>
        </v-col>
      </v-row>
      조교 계정 목록
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="이름으로 검색" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="datasets" :search="search"></v-data-table>
  </v-card>
</template>
<!--<template>
  <div>
    <v-data-table :headers="headers" :items="datasets">
      <template v-slot:item.name="props">
        <v-edit-dialog :return-value.sync="props.item.name" @save="save" @cancel="cancel" @open="open" @close="close">
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field v-model="props.item.name" :rules="[max25chars]" label="Edit" single-line counter></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <v-btn @click="showDialog(event)">ddd</v-btn>
      <template v-slot:item.iron="props">
        <v-edit-dialog :return-value.sync="props.item.iron" large persistent @save="save" @cancel="cancel" @open="open" @close="close">
          <div>{{ props.item.iron }}</div>
          <template v-slot:input>
            sdsad
            <div class="mt-4 text-h6">
              Update Iron
            </div>
            <v-text-field v-model="props.item.iron" :rules="[max25chars]" label="Edit" single-line counter autofocus></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template> -->

<script>
export default {
  data() {
    return {
      inputForm: {
        name: '',
        email: '',
        password: '',
      },
      search: '',
      snack: false,
      snackColor: '',
      snackText: '',
      max25chars: v => v.length <= 25 || 'Input too long!',
      pagination: {},
      headers: [
        {
          text: '이름',
          align: 'start',
          value: 'name',
        },
        { text: '이메일', value: 'email' },
        { text: '비밀번호', value: 'password', sortable: false },
      ],
      datasets: [
        {
          name: 'Frozen Yogurt',
          email: 1549,
          password: 6.0,
        },
        {
          name: 'Frozen Yogurt1',
          email: 1559,
          password: 6.0,
        },
        {
          name: 'Frozen Yogurt2',
          email: 1659,
          password: 6.0,
        },
        {
          name: 'Frozen Yogurt',
          email: 1549,
          password: 6.0,
        },
        {
          name: 'Frozen Yogurt1',
          email: 1559,
          password: 6.0,
        },
        {
          name: 'Frozen Yogurt2',
          email: 1659,
          password: 6.0,
        },
      ],
    };
  },
  methods: {
    saveUser() {},
    save() {
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = 'Data saved';
    },
    cancel() {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = 'Canceled';
    },
    open() {
      this.snack = true;
      this.snackColor = 'info';
      this.snackText = 'Dialog opened';
    },
    close() {
      console.log('Dialog closed');
    },
  },
};
</script>
