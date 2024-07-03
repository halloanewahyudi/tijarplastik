<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'World'
  },
  satuan: {
    type: String,
    default: 'satuan'
  },
  harga: {
    type: Number,
    default: 0
  }
})
</script>