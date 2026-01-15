export default {
  columns: {
    type: Array,
    required: true,
  },
  events: {
    type: Object,
    default: () => ({}),
  },
}
