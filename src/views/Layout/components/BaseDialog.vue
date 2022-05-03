<template>
  <v-card>
    <v-toolbar color="primary" dark>
      {{ toolbarHeaderTitle }}
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('hide')">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-title>
      <h5>{{ headerTitle }}</h5>
    </v-card-title>
    <v-card-text>
      <slot name="body">
        {{ defaultBodyContent }}
      </slot>
    </v-card-text>
    <v-card-actions class="justify-end mr-2 pb-4">
      <v-btn text rounded @click="$emit('hide')">
        {{ footerHideTitle }}
      </v-btn>
      <template v-if="footerSubmit">
        <v-btn text rounded @click="$emit('submit')">
          {{ footerSubmitTitle }}
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AlertDialog',
  props: {
    footerSubmit: {
      type: Boolean,
      default: true,
    },
    toolbarHeaderTitle: {
      type: String,
      default: '제목',
    },
    headerTitle: {
      type: String,
      default: '보조제목',
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
