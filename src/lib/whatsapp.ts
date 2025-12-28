import { CartItem } from '@/types/book';
import { ProductCartItem } from '@/types/product';
import { CustomerInfo } from '@/types/order';

const WHATSAPP_NUMBER = '923126203644';

function getItemPrice(item: CartItem): number {
  if (item.purchaseType === 'buy') {
    return item.book.buyPrice;
  }
  switch (item.rentDuration) {
    case 7:
      return item.book.rentPrice7Days;
    case 14:
      return item.book.rentPrice14Days;
    case 30:
      return item.book.rentPrice30Days;
    default:
      return 0;
  }
}

export function generateWhatsAppMessage(
  bookItems: CartItem[], 
  productItems: ProductCartItem[],
  customerInfo?: CustomerInfo
): string {
  let itemIndex = 1;
  const lines: string[] = [];

  // Book items
  if (bookItems.length > 0) {
    lines.push('📚 BOOKS:');
    bookItems.forEach((item) => {
      const price = getItemPrice(item);
      const typeLabel =
        item.purchaseType === 'buy'
          ? '[Buy]'
          : `[Rent-${item.rentDuration} Days]`;
      const qty = item.quantity > 1 ? ` x${item.quantity}` : '';
      lines.push(`${itemIndex}. ${typeLabel} ${item.book.title}${qty} – Rs ${price * item.quantity}`);
      itemIndex++;
    });
  }

  // Product items
  if (productItems.length > 0) {
    if (bookItems.length > 0) lines.push('');
    lines.push('📦 PRODUCTS:');
    productItems.forEach((item) => {
      const qty = item.quantity > 1 ? ` x${item.quantity}` : '';
      lines.push(`${itemIndex}. ${item.product.name}${qty} – Rs ${item.product.price * item.quantity}`);
      itemIndex++;
    });
  }

  const booksTotal = bookItems.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);
  const productsTotal = productItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = booksTotal + productsTotal;

  let message = `Greetings! I would like to acquire the following from Potter:

${lines.join('\n')}

Total Tribute: Rs ${total}`;

  // Add customer details if provided
  if (customerInfo && Object.values(customerInfo).some(v => v)) {
    message += '\n\n📋 Customer Details:';
    if (customerInfo.type) {
      message += `\n• Type: ${customerInfo.type === 'college' ? 'College Student' : 'Outsider'}`;
    }
    if (customerInfo.semester) {
      message += `\n• Semester: ${customerInfo.semester}`;
    }
    if (customerInfo.department) {
      message += `\n• Department: ${customerInfo.department}`;
    }
    if (customerInfo.name) {
      message += `\n• Name: ${customerInfo.name}`;
    }
    if (customerInfo.phone) {
      message += `\n• Phone: ${customerInfo.phone}`;
    }
  }

  message += '\n\nPlease confirm my order. 🦉';

  return message;
}

export function openWhatsAppCheckout(
  bookItems: CartItem[], 
  productItems: ProductCartItem[],
  customerInfo?: CustomerInfo
): void {
  const message = generateWhatsAppMessage(bookItems, productItems, customerInfo);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
}
