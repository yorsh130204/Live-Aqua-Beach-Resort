import axios from 'axios';

const employeeForm = document.querySelector('#employeeForm');

function cleanForm() {
  const name = document.querySelector('#name');
  const position = document.querySelector('#position');
  const address = document.querySelector('#address');
  const phone = document.querySelector('#phone');
  const employeeId = document.querySelector('#employeeId');

  name.value = '';
  position.value = '';
  address.value = '';
  phone.value = '';
  employeeId.value = '';
}

async function getEmployees() {
  const response = await axios.get('http://localhost:3001/employees');
  const { data } = response;

  const employees = document.querySelector('#employees');

  employees.innerHTML = '';

  data.forEach((employee) => {
    const employeeElement = document.createElement('tr');

    const name = document.createElement('td');
    name.textContent = employee.name;

    const position = document.createElement('td');
    position.textContent = employee.position;

    const address = document.createElement('td');
    address.textContent = employee.address;

    const phone = document.createElement('td');
    phone.textContent = employee.phone;

    const actions = document.createElement('td');

    const editButton = document.createElement('button');
    editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill me-1" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg> Editar';
    editButton.className = 'btn btn-outline-primary me-2';
    editButton.addEventListener('click', () => editEmployee(employee.id));
    
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill me-1" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg> Eliminar';
    deleteButton.className = 'btn btn-outline-danger';
    deleteButton.addEventListener('click', () => deleteEmployee(employee.id));    

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    employeeElement.appendChild(name);
    employeeElement.appendChild(position);
    employeeElement.appendChild(address);
    employeeElement.appendChild(phone);
    employeeElement.appendChild(actions);

    employees.appendChild(employeeElement);
  });
}

async function getReservations() {
  const response = await axios.get('http://localhost:3001/reservations');
  const { data } = response;

  const reservations = document.querySelector('#reservations');

  reservations.innerHTML = '';

  data.forEach((reservation) => {
    const reservationElement = document.createElement('tr');

    const name = document.createElement('td');
    name.textContent = reservation.name;

    const people = document.createElement('td');
    people.textContent = reservation.people;

    const room = document.createElement('td');
    room.textContent = reservation.room;

    const entry = document.createElement('td');
    entry.textContent = reservation.entry;

    const exit = document.createElement('td');
    exit.textContent = reservation.exit;

    const total = document.createElement('td');
    total.textContent = reservation.total;

    reservationElement.appendChild(name);
    reservationElement.appendChild(people);
    reservationElement.appendChild(room);
    reservationElement.appendChild(entry);
    reservationElement.appendChild(exit);
    reservationElement.appendChild(total);

    reservations.appendChild(reservationElement);
  });
}

async function getOrders() {
  const response = await axios.get('http://localhost:3001/orders');
  const { data } = response;

  const orders = document.querySelector('#orders');

  orders.innerHTML = '';

  data.forEach((order) => {
    const orderElement = document.createElement('tr');

    const name = document.createElement('td');
    name.textContent = order.name;

    const mainCourse = document.createElement('td');
    mainCourse.textContent = order.mainCourse;

    const side = document.createElement('td');
    side.textContent = order.side;

    const drink = document.createElement('td');
    drink.textContent = order.drink;

    const date = document.createElement('td');
    date.textContent = order.date;

    const total = document.createElement('td');
    total.textContent = order.total;

    orderElement.appendChild(name);
    orderElement.appendChild(mainCourse);
    orderElement.appendChild(side);
    orderElement.appendChild(drink);
    orderElement.appendChild(date);
    orderElement.appendChild(total);

    orders.appendChild(orderElement);
  });
}

async function createEmployee(employeeData) {
  await axios.post('http://localhost:3001/employees', employeeData);

  getEmployees();
}

async function updateEmployee(employeeData) {
  await axios.put(`http://localhost:3001/employees/${employeeData.employeeId}`, employeeData);

  getEmployees();
}

async function deleteEmployee(id) {
  await axios.delete(`http://localhost:3001/employees/${id}`);

  getEmployees();
}

async function editEmployee(id) {
  const response = await axios.get(`http://localhost:3001/employees/${id}`);
  const { data } = response;

  const name = document.querySelector('#name');
  const position = document.querySelector('#position');
  const address = document.querySelector('#address');
  const phone = document.querySelector('#phone');
  const employeeId = document.querySelector('#employeeId');

  name.value = data.name;
  position.value = data.position;
  address.value = data.address;
  phone.value = data.phone;
  employeeId.value = data.id;

  document.querySelector('#employeeFormContainer').classList.remove('hidden');
}

document.querySelector('#passForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const passStatus = document.querySelector('#passStatus');
  const passForm = document.querySelector('#passForm');
  const content = document.querySelector('#content');
  const login = document.querySelector('#login');

  const form = e.currentTarget;
  const data = new FormData(form);

  const pass = data.get('password');

  if (pass === '1234') {
    passForm.classList.add('hidden');
    content.classList.remove('hidden');
    login.classList.add('d-none');
  }

  passStatus.textContent = 'Incorrect password';
});

document.querySelector('#addEmployee').addEventListener('click', () => document.querySelector('#employeeFormContainer').classList.remove('hidden'));

document.querySelector('#employeeForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (data.employeeId) {
    updateEmployee(data);

  } else {
    createEmployee(data);
  }

  cleanForm();
});

getEmployees();
getReservations();
getOrders();
