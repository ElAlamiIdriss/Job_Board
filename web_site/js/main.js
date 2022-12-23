import { createHeader } from './utilitiesF.js';

const jobsContainer = document.querySelector('.jobs');

const modalInscription = document.querySelector('.inscription-modal');
const modalApply = document.querySelector('.apply-modal');

const jobToApplyInput = document.querySelector('.job_item input');

const btnInscription = document.querySelector('.inscription-btn');
const btnSubmitInscription = document.querySelector(
  '.form_inscription button[type=submit]'
);
const btnSubmitApply = document.querySelector(
  '.form_apply button[type=submit]'
);

let btnLearnMore, btnApply;

const formConnection = document.querySelector('.form-connection');
const formApply = document.querySelector('.form_apply');

const createJobElement = function (element) {
  const { id, work, wages, working_time, description, adress } = element;
  const jobElement = `
    <div class="job" id='${id}'>
      <div class="job_title">${work}</div>
      <p class="job_society"><strong>${'EPITECH'}</strong>: ${adress}</p>
      <p class="job_wages">${wages}</p>
      <p class="job_working_time">${working_time}</p>
      <p class="job_description">
        ${description.slice(0, 100)}...
      </p>
    <div class="btns-job">
      <button class="btn_apply btn">Apply</button>
      <button class="btn_learn-more btn">learn more</button>
    </div>
    </div>
  `;

  jobsContainer.insertAdjacentHTML('afterbegin', jobElement);
};

const displayDescription = function () {
  const text = this[1].description;
  let descriptionElement;
  for (let child of this[0].closest('.job').children) {
    if (child.classList.contains('job_description')) descriptionElement = child;
  }

  if (descriptionElement.textContent === text)
    descriptionElement.textContent = `${text.slice(0, 100)}...`;
  else descriptionElement.textContent = text;
};

const submitInscription = function (e) {
  e.preventDefault();
  const inputs = [...this.closest('.form_inscription').children]
    .filter((input) => input.classList.contains('item'))
    .map((item) => {
      return item.querySelector('[name]');
    });

  const data = {};
  inputs.forEach((input) => (data[input.name] = input.value));

  addUserToData(data).then((result) => console.log(result));
};

const submitInformations = function (e) {
  e.preventDefault();
  const inputs = [...this.closest('.form_apply').children]
    .filter((input) => input.classList.contains('item'))
    .map((item) => {
      return item.querySelector('[name]');
    });

  const data = {};
  inputs.forEach((input) => (data[input.name] = input.value));

  console.log(data);

  addInformationToData(data).then((result) => console.log(result));
};

const openInscriptionModal = function () {
  modalInscription.classList.remove('hidden');
};

const closeInscriptionModal = function (e) {
  e.preventDefault();
  if (
    !e.target.classList.contains('inscription-modal') &&
    !e.target.closest('.close-btn')
  )
    return;

  modalInscription.classList.add('hidden');
};

const openApplyModal = function () {
  modalApply.classList.remove('hidden');
  jobToApplyInput.value = this.work;
};

const closeApplyModal = function (e) {
  e.preventDefault();

  if (
    !e.target.classList.contains('apply-modal') &&
    !e.target.closest('.close-btn')
  )
    return;

  modalApply.classList.add('hidden');
};

const createJobs = async function () {
  try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const proms = await fetch(
      'http://localhost:3000/api/v1/advertisements',
      requestOptions
    );
    if (!proms.ok) throw new Error(404);

    const advertisements = await proms.json();
    advertisements.forEach((advertisement) => {
      createJobElement(advertisement);

      btnLearnMore = document.querySelector('.btn_learn-more');
      btnApply = document.querySelector('.btn_apply');

      btnLearnMore.addEventListener(
        'click',
        displayDescription.bind([btnLearnMore, advertisement])
      );

      btnApply.addEventListener('click', openApplyModal.bind(advertisement));
    });
  } catch (error) {
    console.log(error);
  }
};

const addUserToData = async function (obj) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(obj);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const res = await fetch('http://localhost:3000/api/v1/users', requestOptions);
  const data = await res.text();

  return data;
};

const addInformationToData = async function (obj) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(obj);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const res = await fetch(
    'http://localhost:3000/api/v1/informations',
    requestOptions
  );
  const data = await res.text();

  return data;
};

const getToken = async function (data) {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const prom = await fetch(
      'http://localhost:3000/api/v1/users/token',
      requestOptions
    );
    const token = await prom.json();

    return token;
  } catch (err) {
    console.log(err);
  }
};

const getConnectPerson = async function (accessToken) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${accessToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const prom = await fetch(
    'http://localhost:3000/api/v1/users/token',
    requestOptions
  );
  const data = await prom.json();

  return data;
};

modalApply.addEventListener('click', closeApplyModal);
btnInscription.addEventListener('click', openInscriptionModal);
btnSubmitInscription.addEventListener('click', submitInscription);

modalInscription.addEventListener('click', closeInscriptionModal);
formConnection.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputs = [...this.children];
  const data = {};
  inputs.forEach((input) => {
    if (input.getAttribute('name'))
      data[input.getAttribute('name')] = input.value;
  });

  getToken(data)
    .then((token) => {
      if (!token)
        return inputs.forEach((input) => input.classList.add('data-not-valid'));

      localStorage.setItem('accessToken', token.accessToken);
      setTimeout(() => localStorage.removeItem('accessToken'), 600000);
    })
    .then(() => getConnectPerson(localStorage.getItem('accessToken')))
    .then((p) => {
      setTimeout(() => localStorage.removeItem('connectPerson'), 600000);
      localStorage.setItem('connectPerson', JSON.stringify(p));
      location.assign(`${p.stat}.html`);
    });
});

btnSubmitApply.addEventListener('click', submitInformations);

createHeader();
createJobs();
