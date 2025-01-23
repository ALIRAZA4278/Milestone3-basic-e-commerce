// schemas/order.js
export const order = {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'First Name',
        type: 'string',
      },
      {
        name: 'lastName',
        title: 'Last Name',
        type: 'string',
      },
      {
        name: 'company',
        title: 'Company Name',
        type: 'string',
        description: 'Optional company name',
      },
      {
        name: 'email',
        title: 'Email Address',
        type: 'string',
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
      },
      {
        name: 'country',
        title: 'Country / Region',
        type: 'string',
      },
      {
        name: 'city',
        title: 'City / Town',
        type: 'string',
      },
      {
        name: 'province',
        title: 'Province / State',
        type: 'string',
      },
      {
        name: 'zipCode',
        title: 'Zip Code',
        type: 'string',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'text',
      },
      {
        name: 'message',
        title: 'Additional Information',
        type: 'text',
      },
      {
        name: 'status',
        title: 'Order Status',
        type: 'string',
        options: {
          list: [
            { title: 'Pending', value: 'Pending' },
            { title: 'Shipped', value: 'Shipped' },
            { title: 'Delivered', value: 'Delivered' },
          ],
        },
      },
      {
        name: 'items',
        title: 'Order Items',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'item',
            fields: [
              {
                name: 'title',
                title: 'Item Title',
                type: 'string',
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
              },
              {
                name: 'price',
                title: 'Price',
                type: 'number',
              },
            ],
          },
        ],
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        readOnly: true,
      },
    ],
  };
  