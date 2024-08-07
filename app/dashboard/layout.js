import {NavigationMenuDemo} from '@/app/dashboard/(components)/navigation'
import HeaderNavBar from '@/components/navbar/HeaderNavBar';
import Hero from '@/components/hero/Hero'

export default function layout({ children }) {
  return (
    // <div className='max-w-6xl mx-auto flex flex-col min-h-screen shadow-xl'>
      
    //   <header className="fixed top-0 w-full mt-4 z-50">
    //   <div className="container md:px-20 lg:px-52 w-full">
    //     <div className="flex justify-between items-center px-4 py-3 w-full bg-white/40 dark:bg-black/40 backdrop-filter backdrop-blur-lg rounded-full border shadow-sm">
    //       <div className="flex items-center gap-1 pl-4">
    //         {/* <FileSpreadsheet className="text-emerald h-6 w-6" /> */}
    //         <h2 className="scroll-m-20 text-md font-bold tracking-tight text-center">
    //           Schedule Generator
    //         </h2>
    //       </div>

    //       <div className="flex items-center gap-2">
    //         {/* <ModeToggle />
    //         <LanguageSwitcher /> */}
            
    //       </div>
    //     </div>
    //   </div>
    // </header>
    // <NavigationMenuDemo />
    //     <div>{children}</div>
    // </div>
    <>
     <HeaderNavBar />
       {/* <Hero /> */}
    {children}
   </>
  )
}
