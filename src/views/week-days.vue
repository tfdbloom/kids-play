<template>
  <div :class="['page-container', cModifiers, { 'page-container--has-error': showErrorsMessage, 'page-container--has-success': showSuccessMessage }]">
    <button class="m-button" @click="reset">
      Återställ
    </button>

    <div class="error-count">
      {{ errorCount }} / 3
    </div>

    <ul v-if="days && days.length" class="m-list days-list">
      <li v-for="day in days" :key="day.i">
        <button :class="['m-card m-card--small', { 'm-card--is-selected': day.i < selectedCount }]" @click="selectDay(day)">
          {{ day.name }}
        </button>
      </li>
    </ul>

    <ul class="m-list days-list">
      <li v-for="day of selected" :key="day.i" class="m-card m-card--selected">
        <div>{{ day.name }}</div>
        <div>{{ day.i }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
import { computed, reactive, toRefs, onMounted } from 'vue'
import { useCssBuilder } from '@/composables/use-css-builder'
import { shuffle } from 'lodash-es'

export default {
  setup () {
    const { cModifiers } = useCssBuilder('page-container')

    const state = reactive({
      days: [{ i: 1, name: 'Måndag' }, { i: 2, name: 'Tisdag' }, { i: 3, name: 'Onsdag' }, { i: 4, name: 'Torsdag' }, { i: 5, name: 'Fredag' }, { i: 6, name: 'Lördag' }, { i: 7, name: 'Söndag' }],
      selected: [],
      errors: [],
      showErrorsMessage: false,
      showSuccessMessage: false
    })

    function selectDay (day) {
      if (state.selected < selectedCount.value) {
        console.log('errors')
      }

      if (selectedCount.value === day.i) {
        state.selected.push(day)
        state.showSuccessMessage = true

        setTimeout(() => {
          state.showSuccessMessage = false
        }, 2000)

        // playSounds(require('@/assets/fart.wav'))
      } else {
        state.errors.push(day)
        state.showErrorsMessage = true

        setTimeout(() => {
          state.showErrorsMessage = false
        }, 2000)

        playSounds(require('@/assets/fart.wav'))

        if (errorCount.value === 3) {
          reset()
        }
      }
    }

    function reset () {
      state.days = shuffle(state.days)
      state.selected = []
      state.errors = []
    }

    const playSounds = (type) => {
      const sound = new Audio(type)
      sound.play()
    }

    const errorCount = computed(() => state.errors.length)
    const selectedCount = computed(() => state.selected.length + 1)

    onMounted(() => {
      reset()
    })

    return {
      ...toRefs(state),
      cModifiers,
      selectDay,
      reset,
      selectedCount,
      errorCount
    }
  }
}
</script>

<style lang="scss">
.page-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5rem;
}

.page-container::after {
  content: '👎';
  position: absolute;
  top: 0;
  left: 50%;
  padding: 2rem;
  border-radius: .6rem;
  background-color: black;
  font-size: 10rem;
  transform: translate(-50%, 0);
  line-height: 1;
  opacity: 0;
  visibility: hidden;
}

.page-container--has-error::after {
  transform: translate(-50%, 2rem);
  transition: all 400ms;
  opacity: 1;
  visibility: visible;
}

.block {
  padding: 2rem;
  background-color: #ededed;
}

.m-button {
  min-width: 10rem;
  min-height: 4rem;
  padding: .5rem 1rem;
  border: none;
  background-color: #232323;
  color: white;
  border-radius: .3rem;
}

.m-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.days-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  width: 100%;
}

.m-card {
  width: 100%;
  min-height: 10rem;
  padding: 1rem 1.5rem;
  background-color: #039bf3;
  color: white;
  border-radius: .3rem;
  font-size: 2.6rem;
  font-weight: 600;
  letter-spacing: .1rem;
  border: none;
  text-transform: uppercase;
}

.m-card:not(.m-card--selected):not(.m-card--is-selected):hover {
  cursor: pointer;
  background-color: #028fe0;
}

.m-card--is-selected {
  background-color: #a8d4ee;
}

.m-card--selected {
  background-color: #ededed;
  color: #111;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.m-card--selected > *:last-child {
  font-size: 2rem;
}

.error-count {
  font-size: 2rem;
  font-weight: bold;
}
</style>
