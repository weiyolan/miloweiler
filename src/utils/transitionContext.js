import React, { createContext, useContext, useState, useRef, useCallback } from 'react'

const TransitionContext = createContext(null)

export function TransitionProvider({ children }) {
  const [phase, setPhase] = useState('idle')
  const [transitionImage, setTransitionImage] = useState(null)
  const [cardRect, setCardRect] = useState(null)
  const [targetHref, setTargetHref] = useState(null)
  const [carouselScrollIndex, setCarouselScrollIndex] = useState(null)
  const [categoryPageReady, setCategoryPageReady] = useState(false)
  const [carouselReady, setCarouselReady] = useState(false)
  const [depthRevealReady, setDepthRevealReady] = useState(false)

  const lockRef = useRef(false)
  const activeRef = useRef(false)

  const startForward = useCallback((imageData, rect, href, scrollIndex) => {
    if (lockRef.current) return
    lockRef.current = true
    activeRef.current = true
    setTransitionImage(imageData)
    setCardRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
    setTargetHref(href)
    setCarouselScrollIndex(scrollIndex)
    setCategoryPageReady(false)
    setCarouselReady(false)
    setPhase('forward-animating')
  }, [])

  const startReverse = useCallback(() => {
    if (lockRef.current) return
    lockRef.current = true
    activeRef.current = true
    setCarouselReady(false)
    setPhase('reverse-animating')
  }, [])

  const signalCategoryReady = useCallback(() => {
    setCategoryPageReady(true)
  }, [])

  const signalDepthReveal = useCallback(() => {
    setDepthRevealReady(true)
  }, [])

  const signalCarouselReady = useCallback((freshCardRect) => {
    if (freshCardRect) {
      setCardRect({ top: freshCardRect.top, left: freshCardRect.left, width: freshCardRect.width, height: freshCardRect.height })
    }
    setCarouselReady(true)
  }, [])

  const completeForward = useCallback(() => {
    lockRef.current = false
    setPhase('idle')
    setCategoryPageReady(false)
    setDepthRevealReady(false)
  }, [])

  const completeReverse = useCallback(() => {
    lockRef.current = false
    activeRef.current = false
    setPhase('idle')
    setTransitionImage(null)
    setCardRect(null)
    setTargetHref(null)
    setCarouselScrollIndex(null)
    setCarouselReady(false)
    setDepthRevealReady(false)
  }, [])

  return (
    <TransitionContext.Provider value={{
      phase,
      transitionImage,
      cardRect,
      targetHref,
      carouselScrollIndex,
      categoryPageReady,
      carouselReady,
      depthRevealReady,
      isTransitioning: phase !== 'idle',
      startForward,
      startReverse,
      signalCategoryReady,
      signalCarouselReady,
      signalDepthReveal,
      completeForward,
      completeReverse,
      lockRef,
      activeRef,
    }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  return useContext(TransitionContext)
}
