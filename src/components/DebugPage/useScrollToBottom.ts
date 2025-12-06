import type { MaybeRefOrGetter, Ref } from 'vue'

import { nextTick, ref, watch } from 'vue'

export const useScrollToBottom = (
  logsContainer: Ref<HTMLDivElement | null>,
  trigger: MaybeRefOrGetter<object>
) => {
  const isScrolledToBottom = ref(true)

  const scrollToBottom = () => {
    if (logsContainer.value) {
      logsContainer.value.scrollTop = logsContainer.value.scrollHeight
    }
  }

  const handleScroll = () => {
    if (logsContainer.value) {
      const { scrollTop, scrollHeight, clientHeight } = logsContainer.value
      isScrolledToBottom.value = scrollHeight - scrollTop - clientHeight < 10
    }
  }

  watch(trigger, async () => {
    if (isScrolledToBottom.value) {
      await nextTick()
      scrollToBottom()
    }
  })

  return {
    isScrolledToBottom,
    handleScroll,
    scrollToBottom
  }
}
