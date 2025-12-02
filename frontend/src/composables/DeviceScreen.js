import { onMounted, onUnmounted, reactive, toRefs } from 'vue'

export function useMonitorSize() {
  const sizes = reactive({
    browserWidth: window.innerWidth,
    deviveWidth: window.innerWidth,
    isMobile: false,
  })
  const browserResized = () => {
    sizes.browserWidth = window.innerWidth
    sizes.deviveWidth = screen.width
    sizes.isMobile = isMobile()
  }
  const isMobile = () => {
    return window.innerWidth <= 931 ? true : false
  }
  onMounted(() => {
    window.addEventListener('resize', browserResized)
  })
  onUnmounted(() => {
    window.addEventListener('resize', browserResized)
  })
  return {
    ...toRefs(sizes),
  }
}
