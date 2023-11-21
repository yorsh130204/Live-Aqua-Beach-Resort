import axios from 'axios';

const status = document.querySelector('#status');
const totalDisplay = document.querySelector('#total');

let total = 30;

totalDisplay.textContent = `$${total}`;

async function sendOrder(order) {
  try {
    await axios.post('http://localhost:3001/orders', order)

    status.textContent = 'Order created'

  } catch (err) {
    status.textContent = err.message
  }
}

function updatePrice() {
  const mainCourse = document.querySelector('#mainCourse').value;
  const side = document.querySelector('#side').value;
  const drink = document.querySelector('#drink').value;

  total = 0;

  switch (mainCourse) {
    case 'steak': total += 25; break;
    case 'chicken': total += 15; break;
    case 'fish': total += 15; break;
    case 'pasta': total += 10; break;
  }

  switch (side) {
    case 'fries': total += 5; break;
    case 'salad': total += 3; break;
    case 'rice': total += 2; break;
    case 'soup': total += 4; break;
  }

  switch (drink) {
    case 'water': total += 0; break;
    case 'soda': total += 4; break;
    case 'beer': total += 6; break;
    case 'lemonade': total += 2; break;
  }

  totalDisplay.textContent = `$${total}`;
}

document.querySelector('#mainCourse').addEventListener('change', updatePrice);
document.querySelector('#side').addEventListener('change', updatePrice);
document.querySelector('#drink').addEventListener('change', updatePrice);

document.querySelector('#orderForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  sendOrder({ ...data, total, date: new Date() });
});
