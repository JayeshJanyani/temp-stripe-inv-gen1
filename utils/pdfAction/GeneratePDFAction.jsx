import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { formatCurrency } from '../formatting/currencyFormatter';

const generatePdf = async (invoiceData) => {
    const doc = new jsPDF({format: 'a4', orientation: 'portrait', unit: 'cm'});
    console.log("generatePdf called", invoiceData)

    const getItemsarray = (items, currency) => {
        return items.reduce((acc, item) => {
            return [...acc, [item.description, item.quantity, formatCurrency(item.amount_subtotal/item.quantity, currency), 
                formatCurrency(item.amount_discount, currency), formatCurrency(item.amount_total, currency)]]
        }, []);
    };

    autoTable(doc, {
        body: [
            [
                {
                    content: "Invoice",
                    styles: {
                        halign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textcolor: '#242424',
                    },
                },
            ],
        ],
        styles: {
            font: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
        }
    });

    autoTable(doc, {
        body: [
            [
                {
                    content: `${invoiceData?.billFrom}`,
                    styles: {
                        halign: 'left',
                    },
                },
                {
                    content: `Invoice #:   ${invoiceData?.invoiceNumber} \n Date:   ${invoiceData?.invoiceDate}`,
                    styles: {
                        halign: 'right'
                    },
                }
            ],
        ],
        theme: 'plain',
        styles: {
            font: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
        }
    });

    autoTable(doc, {
        body: [
            [
                {
                    content: `Bill To: \n \n${invoiceData?.billTo}`,
                    styles: {
                        halign: 'left',
                    },
                }
            ],
        ],
        theme: 'plain',
        styles: {
            font: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
        }
    });

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
        body: getItemsarray(invoiceData.line_items.data, invoiceData.currency),
        theme: 'striped',
        headStyles: {
            fillColor: '#a5a1a1'
        },
        styles: {
            font: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
        }
    });

    autoTable(doc, {
        body: [
            [
                {
                    content: `SubTotal : ${formatCurrency(invoiceData.amount_subtotal, invoiceData.currency)}`,
                    styles: {
                        halign: 'right'
                    },
                }
            ],
        ],
        theme: 'plain',
        styles: {
            font: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
        }
    });

    if (invoiceData?.total_details?.amount_discount > 0) {
        autoTable(doc, {
            body: [
                [
                    {
                        content: `Discount : ${formatCurrency(invoiceData.total_details.amount_discount, invoiceData.currency)}`,
                        styles: {
                            halign: 'right'
                        },
                    }
                ],
            ],
            theme: 'plain',
            styles: {
                font: 'Arial',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: 12,
            }
        })
    }

    if (invoiceData?.total_details?.amount_shipping > 0) {
        autoTable(doc, {
            body: [
                [
                    {
                        content: `Shipping : ${formatCurrency(invoiceData.total_details.amount_shipping, invoiceData.currency)}`,
                        styles: {
                            halign: 'right'
                        },
                    }
                ],
            ],
            theme: 'plain',
            styles: {
                font: 'Arial',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: 12,
            }
        })
    }

    if (invoiceData?.total_details?.amount_tax > 0) {
        autoTable(doc, {
            body: [
                [
                    {
                        content: `Shipping : ${formatCurrency(invoiceData.total_details.amount_tax, invoiceData.currency)}`,
                        styles: {
                            halign: 'right'
                        },
                    }
                ],
            ],
            theme: 'plain',
            styles: {
                font: 'Arial',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: 12,
            }
        })
    }
    

    autoTable(doc, {
        body: [
            [
                {
                    content: `Total Amount: ${formatCurrency(invoiceData.amount_total, invoiceData.currency)}`,
                    styles: {
                        halign: 'right'
                    },
                }
            ],
        ],
        styles: {
            font: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
        }
    });

    autoTable(doc, {
        body: [
            [
                {
                    content: `This invoice is system generated using the data provided by the customer.`,
                    styles: {
                        halign: 'center',
                        valign: 'bottom'
                    },
                }
            ],
        ],
        styles: {
            font: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 8,
        }
    })

    return doc.save(`invoice_${invoiceData.invoiceNumber}.pdf`);
}

export default generatePdf;