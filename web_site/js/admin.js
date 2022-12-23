import { createHeader } from './utilitiesF.js';

const main = document.querySelector('.main');
const linksArrays = document.querySelectorAll('.list-arrays');
const removeModal = document.querySelector('.apply-modal');

const btnCloseRemoveModal = document.querySelector('.btn_no');
const btnYesToRemoveData = document.querySelector('.btn_yes');

let idRowClicked, rowClicked, tableToStudy;

const createArray = async function (e) {
  e.preventDefault();
  const anchorLink = e.target.closest('.list-arrays li').querySelector('a');
  tableToStudy = anchorLink.textContent;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const proms = await fetch(
    `http://localhost:3000/api/v1/${tableToStudy}`,
    requestOptions
  );
  const data = await proms.json();

  const keysHTML = Object.keys(data[0])
    .map((key) => {
      if (key === 'id') return;
      return `<th>${key}</th>`;
    })
    .join('\n');

  const bodyArrayHTML = data
    .map((elm) => {
      const objValues = { ...elm, id: null };
      const row = `
          <tr id=${elm.id}>${Object.values(objValues)
        .map((value) => {
          if (!value) return;
          return `<td>${value}</td>`;
        })
        .join('\n')}
          <td class="btns">
            <button class="btn delete_btn">delete</button>
            <button class="btn modifie_btn">modifie</button>
          </td>
          </tr>`;
      return row;
    })
    .join('\n');

  const tableHtml = `
      <table class="table">
            <thead>
              <tr>
                ${keysHTML}
                <th>Modifie</th>
              </tr>
            </thead>

            <tbody>
              ${bodyArrayHTML}
            </tbody>
          </table>
    `;

  main.innerHTML = tableHtml;

  const [deleteBtns, modifieBtns] = [
    document.querySelectorAll('.delete_btn'),
    document.querySelectorAll('.modifie_btn'),
  ];

  deleteBtns.forEach((btn) =>
    btn.addEventListener('click', function () {
      removeModal.classList.remove('hidden');
      rowClicked = btn.closest('tr');
      idRowClicked = btn.closest('tr').id;
    })
  );

  modifieBtns.forEach((btn) =>
    btn.addEventListener('click', function () {
      console.log('modifie');
    })
  );
};

linksArrays.forEach((link) => {
  link.addEventListener('click', createArray);
});

removeModal.addEventListener('click', function (e) {
  e.preventDefault();
  if (!e.target.classList.contains('apply-modal')) return;
  removeModal.classList.add('hidden');
});
btnCloseRemoveModal.addEventListener('click', function (e) {
  e.preventDefault();
  removeModal.classList.add('hidden');
});

btnYesToRemoveData.addEventListener('click', function () {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    id: idRowClicked,
  });

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`http://localhost:3000/api/v1/${tableToStudy}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      removeModal.classList.add('hidden');
      rowClicked.remove();
    })
    .catch((error) => console.log('error', error));
});

createHeader();
