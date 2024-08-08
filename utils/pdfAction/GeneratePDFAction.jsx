import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { formatCurrency } from '../formatting/currencyFormatter';

const generatePdf = async (invoiceDetail, businessDetail) => {
    const doc = new jsPDF();
    console.log("generatePdf called", invoiceDetail, businessDetail)

    const getItemsarray = (items, currency) => {
        return items.reduce((acc, item) => {
            return [...acc, [item.description, item.quantity, formatCurrency(item.amount_subtotal/item.quantity, currency), 
                formatCurrency(item.amount_discount, currency), formatCurrency(item.amount_total, currency)]]
        }, []);
    };

    // autoTable(doc, {
    //     body: [
    //         [
    //             {
    //                 content: `${formData?.companyName}`,
    //                 styles: {
    //                     halign: 'left',
    //                     fontSize: 20,
    //                     // textColor: '#ffffff'
    //                 }
    //             },
    //             {
    //                 content: `Invoice # ${formData?.invoiceNo}`,
    //                 styles: {
    //                     halign: 'right',
    //                     fontSize: 20,
    //                     // textColor: '#ffffff'
    //                 }
    //             }
    //         ],
    //     ],
    //     theme: 'plain',
    //     // styles: {
    //     //     fillColor: '#3366ff'
    //     // }
    // });


    //     autoTable(doc, {
    //         body: [
    //             [
    //                 {
    //                     content: `From: \n${formData.billFrom}`,
    //                     styles: {
    //                         halign: 'left'
    //                     }
    //                 },
    //                 {
    //                     content: `Purchase Order #: ${formData.purchaseOrder},
    //                          \nDate: ${formData.date}`,
    //                     styles: {
    //                         halign: 'right'
    //                     }
    //                 }
    //             ],
    //         ],
    //         theme: 'plain'
    //     });

    // autoTable(doc, {
    //     body: [
    //         [
    //             {
    //                 content: `Billing Address: \n${formData.billTo}`,
    //                 styles: {
    //                     halign: 'left'
    //                 }
    //             },
    //             {
    //                 content: `Shipping Address: \n${formData.shipTo}`,
    //                 styles: {
    //                     halign: 'left'
    //                 }
    //             }
    //         ],
    //     ],
    //     theme: 'plain'
    // });

    // autoTable(doc, {
    //     body: [
    //         [
    //             {
    //                 content: 'Amount due:',
    //                 styles: {
    //                     halign: 'right',
    //                     fontSize: 14
    //                 }
    //             }
    //         ],
    //         [
    //             {
    //                 content: `$ ${formData.balance}`,
    //                 styles: {
    //                     halign: 'right',
    //                     fontSize: 20,
    //                     textColor: '#3366ff'
    //                 }
    //             }
    //         ]
    //     ],
    //     theme: 'plain'
    // });

    // autoTable(doc, {
    //     body: [
    //         [
    //             {
    //                 content: 'Products & Services',
    //                 styles: {
    //                     halign: 'left',
    //                     fontSize: 14
    //                 }
    //             }
    //         ]
    //     ],
    //     theme: 'plain'
    // });

    autoTable(doc, {
        head: [['Description', 'Quantity', 'Price', 'Discount', 'Amount']],
        body: getItemsarray(invoiceDetail.line_items.data, invoiceDetail.currency),
        theme: 'striped',
        headStyles: {
            fillColor: ''
        }
    });

    // autoTable(doc, {
    //     body: [
    //         [
    //             {
    //                 content: 'Subtotal:',
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //             {
    //                 content: `$ ${subTotalAmount}`,
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //         ],
    //         [
    //             {
    //                 content: 'Total tax:',
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //             {
    //                 content: `$ ${discountTaxShipping?.tax}`,
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //         ],
    //         [
    //             {
    //                 content: 'Shipping:',
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //             {
    //                 content: `$ ${discountTaxShipping?.shipping}`,
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //         ],
    //         [
    //             {
    //                 content: 'Discount:',
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //             {
    //                 content: `$ ${discountTaxShipping?.discount}`,
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //         ],
    //         [
    //             {
    //                 content: 'Total amount:',
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //             {
    //                 content: `$ ${totalAmount}`,
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //         ],
    //         [
    //             {
    //                 content: 'Advance:',
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //             {
    //                 content: `$ ${formData?.amtPaid}`,
    //                 styles: {
    //                     halign: 'right'
    //                 }
    //             },
    //         ],
    //     ],
    //     theme: 'plain'
    // });

    // if (formData?.tnC) {
    //     autoTable(doc, {
    //         body: [
    //             [
    //                 {
    //                     content: 'Terms & Conditions',
    //                     styles: {
    //                         halign: 'left',
    //                         fontSize: 14
    //                     }
    //                 }
    //             ],
    //             [
    //                 {
    //                     content: `${formData?.tnC}`,
    //                     styles: {
    //                         halign: 'left'
    //                     }
    //                 }
    //             ],
    //         ],
    //         theme: "plain"
    //     });
    // }

    // if (formData?.notes) {
    //     autoTable(doc, {
    //         body: [
    //             [
    //                 {
    //                     content: 'Notes',
    //                     styles: {
    //                         halign: 'left',
    //                         fontSize: 14
    //                     }
    //                 }
    //             ],
    //             [
    //                 {
    //                     content: `${formData?.notes}`,
    //                     styles: {
    //                         halign: 'left'
    //                     }
    //                 }
    //             ],
    //         ],
    //         theme: "plain"
    //     });
    // }

    // if (viewInvoiceFlag) {
        return doc.output('pdfobjectnewwindow');
    // }
    // return doc.save("invoice");
}

export default generatePdf;