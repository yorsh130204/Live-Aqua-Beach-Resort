import axios from 'axios';
import emailjs from '@emailjs/browser';

const status = document.querySelector('#status');
const totalDisplay = document.querySelector('#total');

let roomPrice = 100;
let total = roomPrice;

totalDisplay.textContent = `$${total}`;

async function sendEmail(reservationData) {
  const message = `
    Name: ${reservationData.name}
    Number of people: ${reservationData.people}
    Room: ${reservationData.room}
    Entry: ${new Date(reservationData.entry).toLocaleDateString()}
    Exit: ${new Date(reservationData.exit).toLocaleDateString()}
    Total: $${reservationData.total}
`;

  const params = {
    name: reservationData.name,
    email: reservationData.email,
    message,
  };

  const service = import.meta.env.VITE_EMAIL_SERVICE;
  const template = import.meta.env.VITE_EMAIL_TEMPLATE;
  const key = import.meta.env.VITE_EMAIL_KEY;

  await emailjs.send(service, template, params, key);
}

async function sendReservation(reservation) {
  try {
    await axios.post('http://localhost:3001/reservations', reservation)
    await sendEmail(reservation);

    status.textContent = 'Reservation created'

  } catch (err) {
    status.textContent = err.message
  }
}

function updatePrice() {
  const room = document.querySelector('#room').value;
  const entry = document.querySelector('#entry').value;
  const exit = document.querySelector('#exit').value;
  const people = document.querySelector('#people').value;

  if (room === 'single')
    roomPrice = 100;

  if (room === 'deluxe')
    roomPrice = 300;

  if (people > 1)
    roomPrice += 50 * (people - 1);

  if (!entry || !exit) {
    total = roomPrice;
    totalDisplay.textContent = `$${total}`;

    return;
  };

  const totalDays = (new Date(exit) - new Date(entry)) / 1000 / 60 / 60 / 24;

  total = roomPrice * totalDays > 0 ? roomPrice * totalDays : roomPrice;

  totalDisplay.textContent = `$${total}`;
}

document.querySelector('#entry').addEventListener('change', updatePrice);
document.querySelector('#exit').addEventListener('change', updatePrice);
document.querySelector('#room').addEventListener('change', updatePrice);
document.querySelector('#people').addEventListener('change', updatePrice);

document.querySelector('#reservationForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (new Date(data.entry) > new Date(data.exit)) {
    status.textContent = 'Entry date must be before exit date';
    return;
  }

  if ((new Date(data.exit) - new Date(data.entry)) / 1000 / 60 / 60 / 24 < 1) {
    status.textContent = 'Exit date must be at least 1 day after entry date';
    return;
  }

  sendReservation({ ...data, total });
});
