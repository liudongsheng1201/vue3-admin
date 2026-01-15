export default {
  goBack: {
    type: Boolean,
    default: false,
  },
  hasBorder: {
    type: Array, // ['left','right']
    default: () => [],
  },
  boxShadow: {
    type: Boolean,
    default: true,
  },
}
