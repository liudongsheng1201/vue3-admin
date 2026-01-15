import { ref } from 'vue'
export default () => {
  const state = ref(false)
  const setState = (value) => {
    state.value = value
  }
  const open = () => {
    setState(true)
  }
  const close = () => {
    setState(false)
  }
  return {
    state,
    open,
    close,
    setState,
  }
}
