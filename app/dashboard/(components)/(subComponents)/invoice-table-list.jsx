import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  
  export function InvoiceTableList({itemsList, totalAmount,
     subTotalAmount,totalAmountCurrency, 
    totalAmountDetails,
    handleAmount}) {
    return (
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]"></TableHead> */}
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemsList.map((item) => (
            <TableRow key={item.id}>
              {/* <TableCell className="font-medium">{invoice.invoice}</TableCell> */}
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{handleAmount(item.amount_subtotal/item.quantity, item.currency)}</TableCell>
              <TableCell>{handleAmount(item.amount_discount, item.currency)}</TableCell>
              <TableCell className="text-right">{handleAmount(item.amount_total, item.currency)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Sub Total</TableCell>
            <TableCell className="text-right">{ handleAmount(subTotalAmount, totalAmountCurrency)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Total Discount (-)</TableCell>
            <TableCell className="text-right">{ handleAmount(totalAmountDetails.amount_discount, totalAmountCurrency)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Shipping (+)</TableCell>
            <TableCell className="text-right">{ handleAmount(totalAmountDetails.amount_shipping, totalAmountCurrency)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Total Amount</TableCell>
            <TableCell className="text-right">{ handleAmount(totalAmount, totalAmountCurrency)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  