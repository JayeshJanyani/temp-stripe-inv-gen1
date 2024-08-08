"use client"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { InvoiceTableList } from "./invoice-table-list"
import generatePdf from "@/utils/pdfAction/GeneratePDFAction"

export function InvoiceModal({ invoiceDetail, businessDetail }) {
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            ...invoiceDetail,
            billTo: formatBillTo(invoiceDetail.customer_details),
            invoiceNumber: new String(invoiceDetail.created_date).slice(0, 10),
            invoiceDate: epochToDateString(invoiceDetail.created_date),
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission here
    };

    const handleAmount = (amount, currency) => {
        const amountInCents = parseFloat(amount)
        const amountInDollars = (amountInCents / 100).toFixed(2)
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(amountInDollars)
        return formatted;
    }

    function epochToDateString(epochTime) {
        const date = new Date(epochTime * 1000);
        return date.toISOString().split('T')[0];
    }

    function formatBillTo(customerDetails) {
        const { name, email, address, tax_ids } = customerDetails
        const { line1, line2, city, state, postal_code, country } = address || {}
        const gst = tax_ids?.find(tax => tax.type === 'in_gst')?.value

        return `${name || ''}
${email || ''}
${line1 ? line1 + '\n' : ''}${line2 ? line2 + '\n' : ''}${city ? city + ', ' : ''}${state || ''}
${postal_code || ''} ${country || ''}
${gst ? 'GST: ' + gst : ''}`.trim()
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[800px] h-[842px] max-h-[90vh] overflow-y-auto p-4">
                <DialogHeader>
                    
                    <div className="flex justify-between gap-2 mr-10">
                    {/* <DialogClose asChild> */}
                    <DialogTitle>Invoice</DialogTitle>
                    <div className="flex gap-2">
                        <Button type="submit" className="bg-emerald hover:bg-emerald/80 text-white text-md px-5 flex items-center gap-2" 
                        onClick={()=>generatePdf(invoiceDetail, businessDetail)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 17H12H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5" />
                            </svg>
                            Download Invoice</Button>
                        <Button type="submit" className="bg-emerald hover:bg-emerald/80 text-white text-md px-5 flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Send Invoice</Button>
                        {/* </DialogClose>/ */}
                        </div>
                    </div>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <div className="flex flex-col rounded-md w-full flex-grow overflow-y-auto p-4">
                        <div className="text-2xl font-bold text-center mb-4">INVOICE</div>
                        <div className="flex w-full justify-between items-start mb-4">
                            <div className="flex flex-col space-y-2 w-1/2">
                                <Label>Bill From</Label>
                                <Textarea
                                    {...register("billFrom", { required: "Bill From is required" })}
                                    placeholder="Bill From"
                                    className="h-[150px]"
                                    value={businessDetail.business_address}
                                />
                                {errors.billFrom && <span className="text-red-500">{errors.billFrom.message}</span>}
                                <Label>Bill To</Label>
                                <Textarea
                                    {...register("billTo", { required: "Bill To is required" })}
                                    placeholder="Bill To"
                                    className="h-[150px]"
                                />
                                {errors.billTo && <span className="text-red-500">{errors.billTo.message}</span>}
                            </div>
                            <div className="flex flex-col ">
                                <div className="flex my-2 items-center ">
                                    <Label >Invoice Number:</Label>
                                    <Input
                                        {...register("invoiceNumber", { required: "Invoice Number is required" })}
                                        placeholder="Invoice Number"
                                        value={invoiceDetail.created_date}
                                    />
                                    {errors.invoiceNumber && <span className="text-red-500">{errors.invoiceNumber.message}</span>}
                                </div>
                                <div className="flex my-2 items-center ">
                                    <Label >Invoice Date:</Label>
                                    <Input
                                        {...register("invoiceDate", { required: "Invoice Date is required" })}
                                        type="date"
                                        placeholder="Invoice Date"
                                        value={epochToDateString(invoiceDetail.created_date)}
                                    />
                                </div>
                                {errors.invoiceDate && <span className="text-red-500">{errors.invoiceDate.message}</span>}
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <InvoiceTableList itemsList={invoiceDetail.line_items.data}
                                totalAmount={invoiceDetail.amount_total}
                                totalAmountCurrency={invoiceDetail.currency}
                                subTotalAmount={invoiceDetail.amount_subtotal}
                                handleAmount={handleAmount}
                                totalAmountDetails={invoiceDetail.total_details}
                            />
                        </div>

                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit">Save</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}