import React from 'react'

function SearchByTransactionDate() {
    return (
        <div className='flex flex-row '>
  

            {/* //shadcn table containing all the charges */}
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default SearchByTransactionDate