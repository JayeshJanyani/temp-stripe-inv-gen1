

// import { useState } from "react";
import { addAPIKey } from "../utils/actions/databaseAction";
import { signOut } from "../utils/actions/authAction";
import HeaderNavBar from '@/components/navbar/HeaderNavBar';
import Hero from '@/components/hero/Hero'
import HeroBackground from '@/components/heroBackground/HeroBackground'
import HeroPattern from '@/utils/backgroundPatterns/HeroPattern'
import SchedulePattern from '@/utils/backgroundPatterns/SchedulePattern'
export default function Home() {
  // const [api, setApi] = useState("");
  // const [businessName, setBusinessName] = useState("");

  return (
    <>
       <HeaderNavBar />
      {/* <HeroBackground>  */}
        {/* <Hero /> */}
        {/* <div>kasein</div>
      </HeroBackground> */}
      <HeroBanner/>
      <SampleBanner/>
    </>
  );
}

export const HeroBanner = () => {
  return (
    <div className="relative container md:px-20 lg:px-52">
      <Hero/>
      <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden ">
      <div className="absolute left-1/2 top-0 ml-[-38rem] h-[30rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)] ">
        <div className="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
          >
            <defs>
              <pattern
                id=":S1:"
                width="72"
                height="56"
                patternUnits="userSpaceOnUse"
                x="-12"
                y="4"
              >
                <path d="M.5 56V.5H72" fill="none"></path>
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#:S1:)"
            ></rect>
            <svg x="-12" y="4" className="overflow-visible">
              <rect
                strokeWidth="0"
                width="73"
                height="57"
                x="288"
                y="168"
              ></rect>
              <rect
                strokeWidth="0"
                width="73"
                height="57"
                x="144"
                y="56"
              ></rect>
              <rect
                strokeWidth="0"
                width="73"
                height="57"
                x="504"
                y="168"
              ></rect>
              <rect
                strokeWidth="0"
                width="73"
                height="57"
                x="720"
                y="336"
              ></rect>
            </svg>
          </svg>
        </div>
        <svg
          viewBox="0 0 1113 440"
          aria-hidden="true"
          className="absolute left-1/2 top-20 ml-[-19rem] w-[69.5625rem] fill-white blur-[26px] dark:hidden"
        >
          <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z"></path>
        </svg>
      </div>
    </div>
    </div>
  )
}

export const SampleBanner = () => {
  return (
<div className="relative container md:px-20 lg:px-52 ">
    <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#DBFF75] to-[#36b49f] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      <div
        className="absolute inset-x-0 top-[calc(80%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(80%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#36b49f] to-[#DBFF75] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </div>
  )
}

//gradient background
// style={{"background": "linear-gradient(to top, #09203f 0%, #537895 100%);"}}