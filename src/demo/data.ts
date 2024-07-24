import usa_flag from './images/usa.png'
import uk_flag from './images/uk.png'
import canada_flag from './images/canada.png'
import australia_flag from './images/australia.png'
import germany_flag from './images/germany.png'
import abaya1 from './images/products/abaya_1.png'
import abaya2 from './images/products/abaya_2.png'
import abaya3 from './images/products/abaya_3.png'
import abaya4 from './images/products/abaya_4.png'
import abaya5 from './images/products/abaya_5.png'
import { TranslationKeys } from '@/types'

export const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
]

export const topCountriesBySales = {
  title: 'top_countries_by_sales' as TranslationKeys,
  totalSales: '35,750 ',
  trending: 'up',
  url: '/top-countries-by-sales',
  data: [
    {
      id: 1,
      country: usa_flag.src,
      name: 'United States',
      value: '250.00 ',
    },
    {
      id: 2,
      country: uk_flag.src,
      name: 'United Kingdom',
      value: '150.00 ',
    },
    {
      id: 3,
      country: canada_flag.src,
      name: 'Canada',
      value: '350.00 ',
    },
    {
      id: 4,
      country: australia_flag.src,
      name: 'Australia',
      value: '450.00 ',
    },
    {
      id: 5,
      country: germany_flag.src,
      name: 'Germany',
      value: '550.00 ',
    },
  ],
}

export const topStatesBySales = {
  title: 'top_governorates_by_sales' as TranslationKeys,
  totalSales: '35,750 ',
  trending: 'down',
  url: '/top-governorate-by-sales',
  data: [
    {
      id: 1,
      country: usa_flag.src,
      name: 'California',
      value: '250.00 ',
    },
    {
      id: 2,
      country: uk_flag.src,
      name: 'London',
      value: '150.00 ',
    },
    {
      id: 3,
      country: canada_flag.src,
      name: 'Ontario',
      value: '350.00 ',
    },
    {
      id: 4,
      country: australia_flag.src,
      name: 'New South Wales',
      value: '450.00 ',
    },
    {
      id: 5,
      country: germany_flag.src,
      name: 'Berlin',
      value: '550.00 ',
    },
  ],
}

export const topCustomersBySales = {
  title: 'top_customers_by_sales' as TranslationKeys,
  totalSales: '35,750 ',
  trending: 'up',
  url: '/top-customers-by-sales',
  data: [
    {
      id: 1,
      country: usa_flag.src,
      name: 'John Doe',
      value: '250.00 ',
    },
    {
      id: 2,
      country: uk_flag.src,
      name: 'Jane Doe',
      value: '150.00 ',
    },
    {
      id: 3,
      country: canada_flag.src,
      name: 'Alice',
      value: '350.00 ',
    },
    {
      id: 4,
      country: australia_flag.src,
      name: 'Bob',
      value: '450.00 ',
    },
    {
      id: 5,
      country: germany_flag.src,
      name: 'Charlie',
      value: '550.00 ',
    },
  ],
}

export const topCustomersByOrders = {
  title: 'top_customers_by_orders' as TranslationKeys,
  totalSales: '35,750 ',
  trending: 'down',
  url: '/top-customers-by-orders',
  data: [
    {
      id: 1,
      country: usa_flag.src,
      name: 'John Doe',
      value: 4,
    },
    {
      id: 2,
      country: uk_flag.src,
      name: 'Jane Doe',
      value: 3,
    },
    {
      id: 3,
      name: 'Alice',
      country: canada_flag.src,
      value: 7,
    },
    {
      id: 4,
      country: australia_flag.src,
      name: 'Bob',
      value: 4,
    },
    {
      id: 5,
      country: germany_flag.src,
      name: 'Charlie',
      value: 6,
    },
  ],
}

export const topCategories = {
  url: '/top-categories-by-sales',
  title: 'top_categories_by_sales' as TranslationKeys,
  data: [
    {
      id: 1,
      name: 'Electronics',
      orders: 5,
      sales: '250.00 ',
    },
    {
      id: 2,
      name: 'Clothing',
      orders: 4,
      sales: '150.00 ',
    },
    {
      id: 3,
      name: 'Furniture',
      orders: 7,
      sales: '350.00 ',
    },
    {
      id: 4,
      name: 'Books',
      orders: 6,
      sales: '450.00 ',
    },
    {
      id: 5,
      name: 'Appliances',
      orders: 4,
      sales: '550.00 ',
    },
  ],
}

export const topSizes = {
  url: '/top-sizes-by-sales',
  title: 'top_sizes_by_sales' as TranslationKeys,
  data: [
    {
      id: 1,
      name: '52',
      orders: 5,
      sales: '250.00 ',
    },
    {
      id: 2,
      name: '54',
      orders: 2,
      sales: '150.00 ',
    },
    {
      id: 3,
      name: '56',
      orders: 6,
      sales: '350.00 ',
    },
    {
      id: 4,
      name: '62',
      orders: 2,
      sales: '450.00 ',
    },
    {
      id: 5,
      name: '64',
      orders: 3,
      sales: '550.00 ',
    },
  ],
}

export const topProducts = {
  url: '/products',
  data: [
    {
      id: 1,
      image: abaya3.src,
      name: 'Product 1',
      orders: 5,
      sales: '250.00 ',
    },
    {
      id: 2,
      image: abaya4.src,
      name: 'Golden Embroidery Abaya',
      orders: 4,
      sales: '150.00 ',
    },
    {
      id: 3,
      image: abaya5.src,
      name: 'Product 3',
      orders: 7,
      sales: '350.00 ',
    },
    {
      id: 4,
      image: abaya2.src,
      name: 'Product 4',
      orders: 6,
      sales: '450.00 ',
    },
    {
      id: 5,
      image: abaya1.src,
      name: 'Product 5',
      orders: 4,
      sales: '550.00 ',
    },
  ],
}
