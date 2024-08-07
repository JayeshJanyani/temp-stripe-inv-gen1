// import { getAPIKey } from '@/utils/actions/databaseAction';
// import { getCharges } from '@/utils/actions/stripeAction';

// // import { useState, useEffect } from 'react';

// import { stripe } from 'stripe'
// import SearchByEmail from './(components)/search-by-email';

// // }
// const getChargesByEmail = async (email, businessData) => {
//   "use server"
//   console.log("getChargesByEmail")
//   return await getCharges(email, businessData);
// }

// async function StripeDetails() {

//   // const getAPIKeyData = async () => {
//   //   "use server"
//   const businessData = await getAPIKey();

//   //   return {api_key, data};


//   // const [selectedKey, setSelectedKey] = useState("api_key[0].api_key");
//   // const [listOfKey, setListOfKey] = useState([]);

//   // const charges = await getCharges();
//   // console.log(charges);
//   return (
//     <div className="flex min-h-screen flex-col items-center p-24">
//       <div className=" text-2xl font-bold my-2">API_KEYS</div>

//       <SearchByEmail businessDataList={businessData} 
//         searchCheckoutByEmail={getChargesByEmail} />

//       {/* <div>{selectedKey}</div>
//         {/* //shadcn dropdown containing all the api keys */}


//     </div>
//   )
// }

// export default StripeDetails

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
