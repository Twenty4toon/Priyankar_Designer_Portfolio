import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HeartLikeButton() {
  const canvasRef = useRef(null)
  const [hearts, setHearts] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const heartIdRef = useRef(0)
  const isLoadedRef = useRef(false)

  useEffect(() => {
    let rive = null
    let mounted = true

    const initRive = async () => {
      if (!canvasRef.current || isLoadedRef.current) return

      try {
        const Rive = (await import('rive-js')).default
        
        if (!mounted) return

        rive = new Rive({
          src: '/Like animation.riv',
          canvas: canvasRef.current,
          autoplay: false,
          onLoad: () => {
            if (mounted) {
              isLoadedRef.current = true
            }
          },
          onLoadError: () => {
            console.log('Rive file not loaded')
          }
        })
      } catch (err) {
        console.log('Using CSS hearts')
      }
    }

    initRive()

    return () => {
      mounted = false
      if (rive) {
        try { rive.cleanup() } catch (e) {}
      }
    }
  }, [])

  const triggerHeart = useCallback((x, y) => {
    const id = heartIdRef.current++
    const angle = (Math.random() - 0.5) * 0.6
    const offsetX = (Math.random() - 0.5) * 40
    
    setHearts(prev => [...prev, { id, x: x + offsetX, y, angle, scale: 0.8 + Math.random() * 0.4 }])
    
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id))
    }, 1400)
  }, [])

  const handleClick = useCallback((e) => {
    // Avoid triggering on interactive elements
    if (e.target.closest('button')) return
    if (e.target.closest('a')) return
    if (e.target.closest('.slider-arrow')) return
    if (e.target.closest('.lightbox-overlay')) return
    
    setIsLiked(true)
    
    // Support both mouse and touch events
    const x = e.clientX || (e.touches && e.touches[0].clientX)
    const y = e.clientY || (e.touches && e.touches[0].clientY)
    
    if (x !== undefined && y !== undefined) {
      triggerHeart(x, y)
    }
  }, [triggerHeart])

  useEffect(() => {
    window.addEventListener('click', handleClick)
    window.addEventListener('touchstart', handleClick, { passive: true })
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchstart', handleClick)
    }
  }, [handleClick])

  return (
    <>
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 1, 
              scale: 0,
              x: heart.x - 30,
              y: heart.y - 30,
            }}
            animate={{ 
              opacity: 0, 
              scale: heart.scale * 1.3,
              y: heart.y - 280,
              x: heart.x - 30 + (heart.angle * 200),
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 99999,
              filter: 'drop-shadow(0 4px 12px rgba(255,107,157,0.5))'
            }}
          >
            <svg 
              width="60" 
              height="60" 
              viewBox="0 0 24 24" 
              fill="#FF6B9D"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }} 
      />
    </>
  )
}