"use client"

import { MoreHorizontal } from "lucide-react"
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

import { ArrowUpDown } from "lucide-react"
import {InvoiceModal} from "./invoice-modal"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = [
  {
    accessorKey: "created_date",
    header: "Invoice #",
  },
  {
    accessorKey: "customer_details.email",
    header: "Email"
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    // header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amountInCents = parseFloat(row.original.amount_total)
      const amountInDollars = (amountInCents / 100).toFixed(2)
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.currency,
      }).format(amountInDollars)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoiceDetail = row.original
      return (
       <InvoiceModal invoiceDetail={invoiceDetail} />
      )
    },
  },
]