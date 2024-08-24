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
import { Resend } from 'resend';
import { sendInvoiceEmail } from "@/utils/resend/sendEmail"

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
        console.log('handlesubmit called',data);
        generatePdf(data, true)
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

    const formatBillFrom = (businessDetails) => {
        const { business_name, business_address } = businessDetails
        return `${business_name} \n${business_address}`
    }

    const sendEmail = async (data) => {
        console.log('sendEmail called',data);
        const doc = await generatePdf(invoiceDetail)
        const pdfBuffer = Buffer.from(pdfBuffer).toString('base64');
        const res = await fetch('/api/send', {
            method: 'POST',
            body: JSON.stringify({
                to: 'janyanijayesh4@gmail.com',
                subject: 'hello world',
                fileData: pdfBuffer
            })
        });
        console.log('res',res);
    }

    const sendTempEmail = async (data) => {
        console.log('sendTempEmail called',data);
        const doc = await generatePdf(invoiceDetail)
        const pdfBuffer = Buffer.from(doc, 'base64');
        await sendInvoiceEmail(pdfBuffer);
    }   




    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-emerald hover:bg-emerald/80 text-white text-md px-5 flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.55281 1.60553C7.10941 1.32725 7.77344 1 9 1C10.2265 1 10.8906 1.32722 11.4472 1.6055L11.4631 1.61347C11.8987 1.83131 12.2359 1.99991 13 1.99993C14.2371 1.99998 14.9698 1.53871 15.2141 1.35512C15.5944 1.06932 16.0437 1.09342 16.3539 1.2369C16.6681 1.38223 17 1.72899 17 2.24148L17 13H20C21.6562 13 23 14.3415 23 15.999V19C23 19.925 22.7659 20.6852 22.3633 21.2891C21.9649 21.8867 21.4408 22.2726 20.9472 22.5194C20.4575 22.7643 19.9799 22.8817 19.6331 22.9395C19.4249 22.9742 19.2116 23.0004 19 23H5C4.07502 23 3.3148 22.7659 2.71092 22.3633C2.11331 21.9649 1.72739 21.4408 1.48057 20.9472C1.23572 20.4575 1.11827 19.9799 1.06048 19.6332C1.03119 19.4574 1.01616 19.3088 1.0084 19.2002C1.00194 19.1097 1.00003 19.0561 1 19V2.24146C1 1.72899 1.33184 1.38223 1.64606 1.2369C1.95628 1.09341 2.40561 1.06931 2.78589 1.35509C3.03019 1.53868 3.76289 1.99993 5 1.99993C5.76415 1.99993 6.10128 1.83134 6.53688 1.6135L6.55281 1.60553ZM3.00332 19L3 3.68371C3.54018 3.86577 4.20732 3.99993 5 3.99993C6.22656 3.99993 6.89059 3.67269 7.44719 3.39441L7.46312 3.38644C7.89872 3.1686 8.23585 3 9 3C9.76417 3 10.1013 3.16859 10.5369 3.38643L10.5528 3.39439C11.1094 3.67266 11.7734 3.9999 13 3.99993C13.7927 3.99996 14.4598 3.86581 15 3.68373V19C15 19.783 15.1678 20.448 15.4635 21H5C4.42498 21 4.0602 20.8591 3.82033 20.6992C3.57419 20.5351 3.39761 20.3092 3.26943 20.0528C3.13928 19.7925 3.06923 19.5201 3.03327 19.3044C3.01637 19.2029 3.00612 19.1024 3.00332 19ZM19.3044 20.9667C19.5201 20.9308 19.7925 20.8607 20.0528 20.7306C20.3092 20.6024 20.5351 20.4258 20.6992 20.1797C20.8591 19.9398 21 19.575 21 19V15.999C21 15.4474 20.5529 15 20 15H17L17 19C17 19.575 17.1409 19.9398 17.3008 20.1797C17.4649 20.4258 17.6908 20.6024 17.9472 20.7306C18.2075 20.8607 18.4799 20.9308 18.6957 20.9667C18.8012 20.9843 18.8869 20.9927 18.9423 20.9967C19.0629 21.0053 19.1857 20.9865 19.3044 20.9667Z" fill="currentColor" />
                        <path d="M5 8C5 7.44772 5.44772 7 6 7H12C12.5523 7 13 7.44772 13 8C13 8.55229 12.5523 9 12 9H6C5.44772 9 5 8.55229 5 8Z" fill="currentColor" />
                        <path d="M5 12C5 11.4477 5.44772 11 6 11H12C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13H6C5.44772 13 5 12.5523 5 12Z" fill="currentColor" />
                        <path d="M5 16C5 15.4477 5.44772 15 6 15H12C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17H6C5.44772 17 5 16.5523 5 16Z" fill="currentColor" />
                    </svg>
                    View</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[800px] h-[842px] max-h-[90vh] overflow-y-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <DialogHeader>

                    <div className="flex justify-between gap-2 mr-10">
                        <DialogTitle>Invoice</DialogTitle>
                        <div className="flex gap-2">

                            <Button type="submit" className="bg-emerald hover:bg-emerald/80 text-white text-md px-5 flex items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16 17H12H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                                Download Invoice</Button>
                            <Button type="button" onClick={()=>sendEmail()} className="bg-emerald hover:bg-emerald/80 text-white text-md px-5 flex items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Send Invoice</Button>

                        </div>
                    </div>


                </DialogHeader>
                
                    <div className="flex flex-col rounded-md w-full flex-grow overflow-y-auto p-4">
                        <div className="text-2xl font-bold text-center mb-4">INVOICE</div>
                        <div className="flex w-full justify-between items-start mb-4">
                            <div className="flex flex-col space-y-2 w-1/2">
                                <Label>Bill From</Label>
                                <Textarea
                                    {...register("billFrom", { required: "Bill From is required" })}
                                    placeholder="Bill From"
                                    className="h-[150px]"
                                    value={formatBillFrom(businessDetail)}
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
                                        disabled
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
                                        disabled
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