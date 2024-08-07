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
                {/* <DialogHeader>
                    <DialogTitle>Invoice Details</DialogTitle>
                </DialogHeader> */}
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