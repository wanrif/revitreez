import { useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

export interface SkeletonProps {
  loading: boolean
  className?: string
  animate?: boolean
  children: React.ReactNode
}

type Bone = {
  top: number
  left: number
  width: number
  height: number
  radius: number
}

const CONTROL_SELECTOR = 'button,input,textarea,select,img,[data-skeleton-block="true"]'
const IGNORE_SELECTOR = '[data-skeleton-ignore="true"],script,style,noscript'

export function Skeleton({ loading, className, animate = true, children }: SkeletonProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [bones, setBones] = useState<Array<Bone>>([])

  useLayoutEffect(() => {
    if (!loading) {
      setBones([])
      return
    }

    const content = contentRef.current
    if (!content) {
      return
    }

    let frameId = 0

    const measure = () => {
      frameId = 0
      setBones(collectBones(content))
    }

    const scheduleMeasure = () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }

      frameId = requestAnimationFrame(measure)
    }

    scheduleMeasure()

    const resizeObserver = new ResizeObserver(() => {
      scheduleMeasure()
    })
    resizeObserver.observe(content)

    const mutationObserver = new MutationObserver(() => {
      scheduleMeasure()
    })
    mutationObserver.observe(content, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
    })

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [children, loading])

  return (
    <div className={cn('relative', className)} aria-busy={loading || undefined}>
      <div
        ref={contentRef}
        aria-hidden={loading}
        className={cn(loading && 'pointer-events-none opacity-0 select-none')}
      >
        {children}
      </div>

      {loading ? (
        <div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden='true'>
          {bones.map((bone, index) => (
            <div
              key={`${bone.top}-${bone.left}-${index}`}
              className={cn(
                'absolute bg-neutral-200/90 dark:bg-neutral-800',
                animate && 'animate-pulse',
              )}
              style={{
                top: bone.top,
                left: bone.left,
                width: bone.width,
                height: bone.height,
                borderRadius: bone.radius,
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function collectBones(content: HTMLDivElement) {
  const contentRect = content.getBoundingClientRect()
  const nextBones: Array<Bone> = []

  const controlElements = Array.from(content.querySelectorAll<HTMLElement>(CONTROL_SELECTOR))
  for (const element of controlElements) {
    if (!isEligibleElement(element, content)) {
      continue
    }

    const rect = element.getBoundingClientRect()
    if (rect.width < 4 || rect.height < 4) {
      continue
    }

    const style = window.getComputedStyle(element)
    nextBones.push({
      top: rect.top - contentRect.top,
      left: rect.left - contentRect.left,
      width: rect.width,
      height: rect.height,
      radius: resolveRadius(style.borderRadius, rect.width, rect.height),
    })
  }

  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent?.trim()) {
        return NodeFilter.FILTER_REJECT
      }

      const parentElement = node.parentElement
      if (!parentElement || !isVisibleElement(parentElement)) {
        return NodeFilter.FILTER_REJECT
      }

      if (parentElement.closest(IGNORE_SELECTOR)) {
        return NodeFilter.FILTER_REJECT
      }

      if (parentElement.closest(CONTROL_SELECTOR)) {
        return NodeFilter.FILTER_REJECT
      }

      return NodeFilter.FILTER_ACCEPT
    },
  })

  const range = document.createRange()
  while (walker.nextNode()) {
    const textNode = walker.currentNode
    range.selectNodeContents(textNode)

    const parentElement = textNode.parentElement
    if (!parentElement) {
      continue
    }

    const style = window.getComputedStyle(parentElement)
    const fontSize = Number.parseFloat(style.fontSize) || 16

    for (const rect of Array.from(range.getClientRects())) {
      if (rect.width < 4 || rect.height < 4) {
        continue
      }

      const lineHeight = Math.min(rect.height, Math.max(fontSize * 0.72, 8))
      const offsetY = (rect.height - lineHeight) / 2

      nextBones.push({
        top: rect.top - contentRect.top + offsetY,
        left: rect.left - contentRect.left,
        width: rect.width,
        height: lineHeight,
        radius: lineHeight / 2,
      })
    }
  }

  return nextBones
}

function isEligibleElement(element: HTMLElement, root: HTMLDivElement) {
  if (!root.contains(element) || element.closest(IGNORE_SELECTOR)) {
    return false
  }

  if (!isVisibleElement(element)) {
    return false
  }

  const parentControl = element.parentElement?.closest(CONTROL_SELECTOR)
  if (parentControl && parentControl !== element && element.dataset.skeletonBlock !== 'true') {
    return false
  }

  return true
}

function isVisibleElement(element: HTMLElement) {
  const style = window.getComputedStyle(element)

  return style.display !== 'none' && style.visibility !== 'hidden'
}

function resolveRadius(borderRadius: string, width: number, height: number) {
  const radius = Number.parseFloat(borderRadius)

  if (Number.isNaN(radius)) {
    return Math.min(width, height) / 6
  }

  return Math.min(radius, width / 2, height / 2)
}

export default Skeleton
