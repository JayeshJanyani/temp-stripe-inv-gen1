import React from 'react'
import HeroPattern from '@/utils/backgroundPatterns/HeroPattern'
import SchedulePattern from '@/utils/backgroundPatterns/SchedulePattern'

export default function HeroBackground({children}) {
  return (
   <div className="relative min-h-screen ">
        {children}
        <HeroPattern />
        {/* <SchedulePattern/> */}
    </div>
  )
}
