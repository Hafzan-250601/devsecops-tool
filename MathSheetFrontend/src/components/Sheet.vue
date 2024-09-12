<template>
  <v-container class="fill-height max-w-[800px]">
    <v-row class="fill-height d-flex justify-center items-center">
      <v-col cols="12">
        <v-card class="md:w-full sm:w-full bg-sky-50 rounded-lg">
          <v-row class="p-6">
            <v-col class="text-center text-md-left text-sm-left">
              <v-btn
                @click="changeLayout"
                variant="text"
                prepend-icon="mdi-eye-settings"
                class="sm:w-40 w-full rounded-lg bg-blue-200"
              >
                Change Layout
              </v-btn>
            </v-col>
            <v-col class="text-center text-md-right text-sm-right">
              <v-dialog
                transition="dialog-bottom-transition"
                class="w-2/3 h-full"
              >
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    variant="text"
                    v-bind="activatorProps"
                    class="sm:w-40 w-full rounded-lg bg-yellow-400 font-satoshi"
                    prepend-icon="mdi-crown"
                  >
                    Leaderboard
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card rounded="lg">
                    <v-toolbar
                      class="text-center bg-yellow-300 pr-2 pl-8"
                      title="Leaderboard"
                    >
                      <v-btn
                        size="small"
                        variant="tonal"
                        color="red"
                        @click="isActive.value = false"
                        icon="mdi-close"
                      ></v-btn>
                    </v-toolbar>
                    <v-card class="p-6">
                      <v-data-table-virtual
                        :headers="headers"
                        :items="players"
                        height="400"
                        item-value="name"
                      >
                        <template v-slot:[`item.score`]="{ item }">
                          {{ item.score }}%
                        </template>
                      </v-data-table-virtual>
                    </v-card>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
          </v-row>
          <v-card-title class="text-center pt-6 font-satoshi font-bold">
            Rounding Off To Nearest 10
          </v-card-title>

          <!-- Layout 1 -->
          <v-col class="px-4 pb-10" v-if="Layout">
            <div class="d-flex pt-1 justify-center">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="name"
                  hide-details
                  clearable
                  label="Name"
                  variant="outlined"
                  class="text-black font-bold ml-2"
                ></v-text-field>
              </v-col>
            </div>

            <h3
              class="text-center mt-6 mb-4 text-lg font-thin font-satoshi text-black"
            >
              Click on the right answer
            </h3>
            <v-col class="flex justify-center" v-if="!submitted">
              <v-card
                class="rounded-lg shadow-md bg-blue-900 w-full md:w-1/2 sm:w-full"
              >
                <v-card-title
                  class="font-semibold text-lg text-white py-4 px-6 bg-gradient"
                >
                  {{ currentQuestion.name }}
                  <v-progress-linear
                    :model-value="currentQuestionIndex + 1"
                    :max="questions.length"
                  ></v-progress-linear>
                </v-card-title>
                <p class="font-medium text-lg text-white py-4 px-6">
                  {{ currentQuestion.question }}
                </p>
                <v-card-text>
                  <v-radio-group v-model="currentQuestion.selectedAnswerIndex">
                    <v-radio
                      v-for="(answer, idx) in currentQuestion.answers"
                      :key="idx"
                      :label="answer"
                      :value="idx"
                      class="text-white"
                    ></v-radio>
                  </v-radio-group>
                  <v-row justify="end">
                    <v-col cols="auto">
                      <v-btn
                        variant="text"
                        class="bg-red rounded-lg"
                        @click="clearSelection1()"
                      >
                        Clear
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col class="flex justify-center" v-if="submitted">
              <v-card class="rounded-lg shadow-md w-full md:w-1/2 sm:w-full">
                <v-card-title
                  class="font-semibold text-lg text-white py-4 px-6 bg-gradient text-center"
                >
                  {{ name }}'s Score
                </v-card-title>
                <v-card-title
                  class="font-semibold text-xl pb-6 text-white py-4 px-6 bg-gradient text-center"
                >
                  {{ score }}%
                </v-card-title>
              </v-card>
            </v-col>

            <div class="text-center mt-6 space-x-4">
              <v-btn
                @click="previousQuestion"
                class="bg-blue-200 rounded-lg w-36"
                prepend-icon="mdi-arrow-left"
                variant="text"
              >
                Previous
              </v-btn>
              <v-btn
                v-if="currentQuestionIndex < questions.length - 1"
                @click="nextQuestion"
                class="bg-blue-200 rounded-lg w-36"
                append-icon="mdi-arrow-right"
                variant="text"
              >
                Next
              </v-btn>
              <v-btn
                v-if="currentQuestionIndex === questions.length - 1"
                @click="calculateScoreLayout1"
                class="bg-blue-800 rounded-lg w-36 text-white"
                append-icon="mdi-send-outline"
                variant="text"
              >
                Submit
              </v-btn>
            </div>
          </v-col>

          <!-- Layout 2 -->
          <v-col class="px-4 pb-10" v-if="!Layout">
            <v-row>
              <v-col cols="12" sm="6" class="mb-4">
                <v-text-field
                  v-model="name"
                  hide-details
                  clearable
                  label="Name"
                  variant="outlined"
                  class="text-black font-bold ml-2"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-4">
                <v-text-field
                  v-model="score"
                  hide-details
                  readonly
                  label="Score"
                  variant="outlined"
                  class="text-black font-bold ml-2"
                ></v-text-field>
              </v-col>
            </v-row>

            <h3
              class="text-center mt-6 mb-4 text-lg font-thin font-satoshi text-black"
            >
              Click on the right answer
            </h3>

            <v-row>
              <v-col
                v-for="(question, index) in questions"
                :key="index"
                cols="12"
                md="6"
                class="mb-4"
              >
                <v-card class="rounded-lg shadow-md bg-blue-900 w-full">
                  <v-card-title
                    class="font-semibold text-lg text-white py-4 px-6 bg-gradient"
                  >
                    {{ question.name }}
                  </v-card-title>
                  <p class="font-medium text-lg text-white py-4 px-6">
                    {{ question.question }}
                  </p>
                  <v-card-text>
                    <v-radio-group v-model="question.selectedAnswerIndex">
                      <v-radio
                        v-for="(answer, idx) in question.answers"
                        :key="idx"
                        :label="answer"
                        :value="answer"
                        class="text-white"
                      ></v-radio>
                    </v-radio-group>
                    <v-row justify="end">
                      <v-col cols="auto">
                        <v-btn
                          variant="text"
                          class="bg-red rounded-lg"
                          @click="clearSelection(index)"
                        >
                          Clear
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <div class="text-center mt-6 space-x-4">
              <v-btn
                v-if="!Layout"
                @click="calculateScoreLayout2"
                class="bg-green-600 rounded-lg text-white w-full sm:w-40 md:w-40"
                append-icon="mdi-send-outline"
                variant="text"
              >
                Submit
              </v-btn>
            </div>
          </v-col>

          <v-footer class="bg-sky-50">
            <v-col class="text-center" cols="12">
              <p class="font-satoshi">copyright : imnmuqri</p>
            </v-col>
          </v-footer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import { IPlayer } from "../type/Player";
import PlayerServices from "../services/PlayerServices";

const calculatedScore = ref(0);
const submitted = ref(false);
const name = ref("");
const Layout = ref(true);
const players = ref<IPlayer[]>([]);
const openLeaderboard = ref(false);

interface Question {
  name: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  selectedAnswerIndex: string | null;
}

const headers = [
  { title: "Name", value: "name" },
  { title: "Score", value: "score" },
];

const questions: Ref<Question[]> = ref<Question[]>([
  {
    name: "Question 1",
    question: "17 rounded off to nearest 10 is?",
    answers: ["10", "20", "17"],
    correctAnswer: 10,
    selectedAnswerIndex: null,
  },
  {
    name: "Question 2",
    question: "45 rounded off to nearest 10 is?",
    answers: ["50", "45", "40"],
    correctAnswer: 50,
    selectedAnswerIndex: null,
  },
  {
    name: "Question 3",
    question: "75 rounded off to nearest 10 is?",
    answers: ["70", "80", "175"],
    correctAnswer: 80,
    selectedAnswerIndex: null,
  },
  {
    name: "Question 4",
    question: "19 rounded off to nearest 10 is?",
    answers: ["20", "10", "19"],
    correctAnswer: 20,
    selectedAnswerIndex: null,
  },
  {
    name: "Question 5",
    question: "64 rounded off to nearest 10 is?",
    answers: ["64", "70", "60"],
    correctAnswer: 60,
    selectedAnswerIndex: null,
  },
]);

// Method to clear the selection in question
const clearSelection = (index: number) => {
  questions.value[index].selectedAnswerIndex = null;
};

const clearSelection1 = () => {
  currentQuestion.value.selectedAnswerIndex = null;
};
const currentQuestionIndex: Ref<number> = ref(0);

const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
);

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const score = computed(() => calculatedScore.value);

const calculateScoreLayout1 = () => {
  if (name.value !== "") {
    submitted.value = true;
    let correctAnswers = 0;

    questions.value.forEach((question, index) => {
      // Check if selectedAnswerIndex is not null
      if (question.selectedAnswerIndex !== null) {
        // Cast selectedAnswerIndex to number
        const selectedAnswerIndex = parseInt(question.selectedAnswerIndex);
        // Ensure selectedAnswerIndex is within bounds of the answers array
        if (
          selectedAnswerIndex >= 0 &&
          selectedAnswerIndex < question.answers.length
        ) {
          // Get the selected answer
          const selectedAnswer = question.answers[selectedAnswerIndex];
          // Compare the selected answer with the correct answer
          if (selectedAnswer === String(question.correctAnswer)) {
            correctAnswers++;
          }
        }
      }
    });

    const totalQuestions = questions.value.length;
    const percentageScore = (correctAnswers / totalQuestions) * 100;
    calculatedScore.value = parseFloat(percentageScore.toFixed(2));

    // Scroll back to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    const playerData: IPlayer = {
      name: name.value,
      score: calculatedScore.value,
    };

    addPlayer(playerData); // Pass playerData to addPlayer
  } else {
    Swal.fire({
      position: "center",
      width: 400,
      icon: "error",
      title: "Please Enter Your Name",
      showConfirmButton: false,
      timer: 1000,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
const calculateScoreLayout2 = () => {
  if (name.value !== "") {
    let correctAnswers = 0;

    questions.value.forEach((question) => {
      if (
        question.selectedAnswerIndex !== null &&
        parseInt(question.selectedAnswerIndex) === question.correctAnswer
      ) {
        correctAnswers++;
      }
    });

    const totalQuestions = questions.value.length;
    const percentageScore = (correctAnswers / totalQuestions) * 100;
    calculatedScore.value = parseFloat(percentageScore.toFixed(2));

    window.scrollTo({ top: 0, behavior: "smooth" });

    const playerData: IPlayer = {
      name: name.value,
      score: calculatedScore.value,
    };

    addPlayer(playerData); // Pass playerData to addPlayer
  } else {
    Swal.fire({
      position: "center",
      width: 400,
      icon: "error",
      title: "Please Enter Your Name",
      showConfirmButton: false,
      timer: 1000,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const changeLayout = () => {
  Layout.value = !Layout.value;
};

const addPlayer = async (playerData: IPlayer) => {
  name.value = playerData.name;
  calculatedScore.value = playerData.score;
  try {
    const newPlayer = await PlayerServices.createPlayer(playerData);
    players.value.push(newPlayer);
  } catch (error) {
    console.error("Failed to add player:", error);
  }
};
const fetchPlayers = async () => {
  try {
    const fetchedPlayers = await PlayerServices.getPlayers();
    players.value = fetchedPlayers;
  } catch (error) {
    console.error("Failed to fetch players:", error);
  }
};
const OpenLeaderboard = () => {
  openLeaderboard.value = true;
};
const CloseLeaderboard = () => {
  openLeaderboard.value = false;
};
onMounted(() => {
  fetchPlayers();
});
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
.bg-gradient {
  background: linear-gradient(to right, #ff6b6b, #43c5ff);
}
</style>
