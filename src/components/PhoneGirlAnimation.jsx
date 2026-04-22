import { useState, useCallback, useEffect, useRef } from 'react'
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas'

// Use base URL for assets
const base = import.meta.env.BASE_URL;

export default function PhoneGirlAnimation() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef(null)

  const { RiveComponent, rive } = useRive({
    src: `${base}5845-11463-curious-phone-girl.riv`,
    artboard: 'Main_new',
    stateMachines: 'GirlState',
    layout: new Layout({
      fit: Fit.Contain, // Back to Contain for better framing without the internal BG
      alignment: Alignment.Center,
    }),
    autoplay: true,
    onLoad: () => {
      setIsLoaded(true)
      // Robust method to hide ANY background layers in the Rive file
      if (rive) {
        try {
          const artboard = rive.activeArtboard;
          if (artboard) {
            // Scan all nodes in the artboard for potential background layers
            for (let i = 0; i < artboard.nodeCount; i++) {
              const node = artboard.nodeAt(i);
              if (node && node.name) {
                const name = node.name.toLowerCase();
                // Hide background, gradients, and any "neon" or "glow" layers
                if (
                  name.includes('bg') || 
                  name.includes('background') || 
                  name.includes('gradient') ||
                  name.includes('neon') ||
                  name.includes('glow') ||
                  name.includes('light') ||
                  name.includes('shine') ||
                  name.includes('side') ||
                  name.includes('center')
                ) {
                  node.opacity = 0;
                }
              }
            }
          }
          // Fallback: specifically try to set fill to transparent
          rive.setFill('Background', 'rgba(0,0,0,0)');
          rive.setFill('bg', 'rgba(0,0,0,0)');
        } catch (e) {
          console.warn('Seamless background hide failed:', e);
        }
      }
    },
    onLoadError: () => setHasError(true),
  })

  // State Machine Inputs
  const mouseOverInput = useStateMachineInput(rive, 'GirlState', 'MouseOver')
  const headLRInput = useStateMachineInput(rive, 'GirlState', 'Head_LR')
  const headTDInput = useStateMachineInput(rive, 'GirlState', 'Head_TD')
  const pupilsLRInput = useStateMachineInput(rive, 'GirlState', 'Pupils_LR')
  const pupilsTDInput = useStateMachineInput(rive, 'GirlState', 'Pupils_UD')
  
  // Mouse tracking logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!rive || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      const clampedX = Math.max(0, Math.min(100, x))
      const clampedY = Math.max(0, Math.min(100, y))

      if (headLRInput) headLRInput.value = clampedX
      if (headTDInput) headTDInput.value = 100 - clampedY
      if (pupilsLRInput) pupilsLRInput.value = clampedX
      if (pupilsTDInput) pupilsTDInput.value = 100 - clampedY
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [rive, headLRInput, headTDInput, pupilsLRInput, pupilsTDInput])

  const handleMouseEnter = useCallback(() => {
    if (mouseOverInput) mouseOverInput.value = true
  }, [mouseOverInput])

  const handleMouseLeave = useCallback(() => {
    if (mouseOverInput) mouseOverInput.value = false
  }, [mouseOverInput])

  if (hasError) {
    return (
      <div className="hero-animation">
        <div className="girl-animation-wrapper">
          <div className="girl-canvas-box">
            <div className="girl-error">
              <span>✦</span>
              <span>Animation Error</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="hero-animation bigger" ref={containerRef}>
      <div className="girl-animation-wrapper">
        <div
          className="girl-canvas-box seamless"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!isLoaded && (
            <div className="girl-loading">
              <div className="loading-pulse" />
            </div>
          )}
          <RiveComponent className="girl-canvas" />
        </div>
      </div>
    </div>
  )
}
