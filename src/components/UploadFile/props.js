export default {
  onBeforeUpload: {
    type: Function,
    default: () => true,
  },
  folder: {
    type: String,
    default: 'images',
  },
}
