import { computed, getCurrentInstance } from 'vue'
import { isArray, isPlainObject, map } from 'lodash-es'

function useCssBuilder (name) {
  const instance = getCurrentInstance()
  const modifiers = instance.props.modifiers
  const cssClass = name

  const modifierName = (modifier) => {
    return `${cssClass}--${modifier}`
  }

  const fModifiers = () => {
    if (!modifiers || !cssClass) {
      return null
    }

    if (isPlainObject(modifiers)) {
      // todo: loop through and build the class name, return a reactive object
      // assigned to Johan Dahlström
      // by Zoran

      return modifiers
    }

    if (isArray(modifiers)) {
      return map(modifiers, (modifier) => {
        return modifierName(modifier)
      })
    }

    return modifierName(modifiers)
  }

  const cModifiers = computed(() => fModifiers(modifiers))

  return {
    cssClass,
    fModifiers,
    cModifiers
  }
}

export { useCssBuilder }
