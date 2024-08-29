import React, { useState, useEffect } from 'react'
import { Github, Settings, TestTube, Rocket } from "lucide-react"

const Pipeline: React.FC = () => {
  const [stage, setStage] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)
  const [isStageComplete, setIsStageComplete] = useState(false)

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStage((prevStage) => {
        const newStage = Math.min(prevStage + 1, 3)
        setIsStageComplete(false)
        setLineProgress(0)
        return newStage
      })
    }, 5000) // Change stage every 5 seconds

    return () => clearInterval(stageTimer)
  }, [])

  useEffect(() => {
    if (stage < 3) {
      const stageCompleteTimer = setTimeout(() => {
        setIsStageComplete(true)
        startLineProgress()
      }, 1000) // Wait 1 second before marking stage as complete

      return () => clearTimeout(stageCompleteTimer)
    }
  }, [stage])

  const startLineProgress = () => {
    const lineAnimationTimer = setInterval(() => {
      setLineProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(lineAnimationTimer)
          return 100
        }
        return prevProgress + 5 // Increase by 5% each time for faster animation
      })
    }, 50) // Update progress every 50ms

    return () => {
      if (lineAnimationTimer) clearInterval(lineAnimationTimer)
    }
  }

  const stages = [
    { name: 'Repository', icon: Github },
    { name: 'Build', icon: Settings },
    { name: 'Staging', icon: TestTube },
    { name: 'Production', icon: Rocket },
  ]

  const getLinePosition = () => {
    const basePosition = 50 + stage * 233
    const progressPosition = (lineProgress / 100) * 233
    return Math.min(basePosition + progressPosition, 750)
  }

  return (
    <div className="w-full h-48 relative">
      <svg className="w-full h-full" viewBox="0 0 800 120">
        {/* Background line */}
        <line 
          x1="50" 
          y1="60" 
          x2="750" 
          y2="60" 
          stroke="currentColor" 
          strokeWidth="4" 
          className="text-gray-300 dark:text-gray-600" 
        />
        {/* Animated progress line */}
        <line 
          x1="50" 
          y1="60" 
          x2={getLinePosition()} 
          y2="60" 
          stroke="currentColor" 
          strokeWidth="4" 
          className="text-green-500 dark:text-green-400" 
        />
        {stages.map((stageInfo, index) => {
          const x = 50 + index * 233
          const Icon = stageInfo.icon
          return (
            <g key={stageInfo.name}>
              <circle 
                cx={x} 
                cy="60" 
                r="10" 
                fill="currentColor" 
                className={
                  index < stage || (index === stage && isStageComplete)
                    ? "text-green-500 dark:text-green-400" 
                    : index === stage 
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-300 dark:text-gray-600"
                } 
              />
              <text 
                x={x} 
                y="90" 
                textAnchor="middle" 
                fill="currentColor" 
                fontSize="14" 
                className="text-gray-600 dark:text-gray-300"
              >
                {stageInfo.name}
              </text>
              <foreignObject x={x - 12} y="20" width="24" height="24">
                <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </foreignObject>
            </g>
          )
        })}
        {/* Active stage indicator */}
        {stage < 3 && !isStageComplete && (
          <circle 
            cx={50 + stage * 233} 
            cy="60" 
            r="14" 
            fill="currentColor" 
            className="text-blue-500 dark:text-blue-400"
          >
            <animate 
              attributeName="opacity" 
              values="0;1;0" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </circle>
        )}
      </svg>
    </div>
  )
}

export default Pipeline
