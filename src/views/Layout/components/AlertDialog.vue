<template>
  <v-card>
    <v-card-title>
      {{ headerTitle }}
    </v-card-title>
    <v-card-text>
      <slot name="body">
        {{ defaultBodyContent }}
      </slot>
    </v-card-text>
    <v-card-actions class="justify-end mr-2 pb-4">
      <v-btn color="amber" dark rounded small @click="$emit('hide')">
        {{ footerHideTitle }}
      </v-btn>
      <template v-if="footerSubmit">
        <v-btn color="success" rounded small @click="$emit('submit')">
          {{ footerSubmitTitle }}
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>

  <!-- <v-btn dark color="green" @click="showDialog('Text')">
                      show Text dialog !
                    </v-btn>
                    <v-dialog max-width="500" v-model="alertTextDialog">
                      <alert-dialog
                        header-title="텍스트"
                        @hide="hideDialog('Text')"
                        @submit="submitDialog('Text')"
                      >
                        <template v-slot:body>
                          <v-text-field placeholder="내용을 입력하세요" />
                        </template>
                      </alert-dialog>
                    </v-dialog> -->
</template>

<script>
export default {
  name: 'AlertDialog',
  props: {
    footerSubmit: {
      type: Boolean,
      default: true,
    },
    headerTitle: {
      type: String,
      default: '제목',
    },
    footerSubmitTitle: {
      type: String,
      default: '저장',
    },
  },
  data: () => ({
    footerHideTitle: '닫기',
    defaultBodyContent: 'body slot 영역을 작성해주세요.',
  }),
};
</script>
