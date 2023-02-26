<template>
  <div :class="['page-container', cModifiers, { 'page-container--has-error': showErrorsMessage, 'page-container--has-success': showSuccessMessage }]">
    <div class="page-actions">
      <button class="m-button m-button--dark-temp" @click="reset">
        Börja om
      </button>

      <div class="error-count">
        {{ errorCount }} / 3
      </div>
    </div>

    <ul v-if="days && days.length" class="m-list days-list">
      <li v-for="day in days" :key="day.i">
        <button class="m-button--day" :disabled="day.i < selectedCount" @click="selectDay(day)">
          {{ day.name }}
        </button>
      </li>
    </ul>

    <ul class="m-list days-correct-list">
      <li v-for="i of 7" :key="i" class="days-correct-list__item">
        <template v-if="selected.find(d => d.i === i)">
          <span>{{ i }}</span>
          <span>{{ getDayName(i) }}</span>
        </template>
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

    function getDayName (index) {
      const day = state.selected.find(d => d.i === index)
      return day.name ?? null
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
      errorCount,
      getDayName
    }
  }
}
</script>

<style lang="scss">
/* page container */
.page-container {
  position: relative;
  display: grid;
  gap: 5rem;
  padding: 2rem;
}

.page-container::after {
  content: '👎';
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
  border-radius: .6rem;
  background-color: #111;
  font-size: 3rem;
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

.page-actions {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.block {
  padding: 2rem;
  background-color: #ededed;
}

/* button */

.m-button {
  min-width: 10rem;
  min-height: 4rem;
  padding: .5rem 1rem;
  border: none;
  background-color: #232323;
  color: white;
  border-radius: .3rem;
  font-size: 1.6rem;
}

.m-button--dark-temp {
  justify-self: start;
}

/* list */

.m-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/* day list */

.days-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1rem;
  width: 100%;
}

/* day button */

.m-button--day {
  width: 100%;
  min-height: 10rem;
  padding: 1rem 1.5rem;
  background-color: #0a1e37;
  color: white;
  border-radius: .6rem;
  font-size: 2.6rem;
  font-weight: 600;
  letter-spacing: .1rem;
  border: none;
  text-transform: uppercase;
}

.m-button--day:hover {
  cursor: pointer;
}

.m-button--day:disabled {
  background-color: #1e5ba6;
}

.days-correct-list {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 1rem;
}

.days-correct-list__item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  height: 6rem;
  padding: 1.5rem;
  background-color: #ccc;
  color: #111;
  font-size: 1.8rem;
  border-radius: .3rem;
}

.error-count {
  place-self: center;
  display: flex;
  padding: 1rem;
  background-color: #f5dc09;
  font-size: 2rem;
  font-weight: bold;
  }
</style>
