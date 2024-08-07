"use client"
import { Copy } from "lucide-react"

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
import {InvoiceTableList} from "./invoice-table-list"

export function InvoiceModal({ invoiceDetail }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[800px] h-[842px] max-h-[90vh] overflow-y-auto">
                {/* <DialogHeader>
                    <DialogTitle>Invoice Details</DialogTitle>
                </DialogHeader> */}
                <form>
                    <div className="flex flex-col rounded-md w-full px-4 py-4">
                        <div className="text-2xl font-bold text-center">INVOICE</div>
                        <div className="flex w-full justify-between items-center">
                            {/* invoice details */}
                            <div className="flex flex-row mx-10 w-full justify-between">
                                {/* bill from business details text area*/}
                                <div className="flex flex-col space-y-2">
                                <Textarea placeholder="Bill From" className="w-[300px] h-[150px] my-2" value="Bill From"/>
                                
                                <Label >Bill To</Label>
                                <Textarea placeholder="Bill To" className="w-[300px] h-[150px]" value="Bill To" />
                                </div>
                                
                                <div className="flex flex-col my-5">
                                    <span>Invoice Number:{123123}</span>
                                    <span>Invoice Date:</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-grow m-10">
                            {/* invoice items */}
                            <InvoiceTableList/>
                        </div>
                        <div>
                            {/* invoice total */}
                        </div>
                    </div>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}