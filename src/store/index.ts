import { defineStore, acceptHMRUpdate } from "pinia";
export type ExamStore = {
  exam: number;
};
export const useExamStore = defineStore({
  id: "exam",
  state: () =>
    ({
      exam: 1,
    } as ExamStore),
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExamStore, import.meta.hot));
}
