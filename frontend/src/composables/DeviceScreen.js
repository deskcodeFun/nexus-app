import { onMounted, onUnmounted, reactive, toRefs } from 'vue'

export function useMonitorSize() {
  const sizes = reactive({
    browserWidth: window.innerWidth,
    deviceWidth: window.innerWidth,
    isMobile: false,
  })
  const browserResized = () => {
    sizes.browserWidth = window.innerWidth
    sizes.deviceWidth = screen.width
    sizes.isMobile = isMobile()
  }
  const isMobile = () => {
    return window.innerWidth <= 1024 ? true : false
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
