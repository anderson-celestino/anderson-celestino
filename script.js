let filmes = JSON.parse(localStorage.getItem('filmes')) || [];

const movieForm = document.getElementById('movieForm');

const movieList = document.getElementById('movieList');

const tituloInput = document.getElementById('titulo');

const anoInput = document.getElementById('ano');

const generoInput = document.getElementById('genero');

const notaInput = document.getElementById('nota');

let editIndex = null;


movieForm.addEventListener('submit', function(event) {

  event.preventDefault();

  const filme = {

    titulo: tituloInput.value,

    ano: anoInput.value,

    genero: generoInput.value,

    nota: notaInput.value

  };

  if (editIndex !== null) {

    filmes[editIndex] = filme;

    editIndex = null;

  }

  else {

    filmes.push(filme);

  }

  salvarLocalStorage();

  renderizarFilmes();

  movieForm.reset();

});

function renderizarFilmes() {

  movieList.innerHTML = '';

  filmes.forEach((filme, index) => {

    const card = document.createElement('div');

    card.classList.add('movie-card');

    card.innerHTML = `

      <h3>${filme.titulo}</h3>

      <p><strong>Ano:</strong> ${filme.ano}</p>

      <p><strong>Gênero:</strong> ${filme.genero}</p>

      <p><strong>Nota:</strong> ${filme.nota}/10</p>

      <div class="card-buttons">

        <button
          class="edit-btn"
          onclick="editarFilme(${index})"
        >
          Editar
        </button>

        <button
          class="delete-btn"
          onclick="deletarFilme(${index})"
        >
          Excluir
        </button>

      </div>

    `;

    movieList.appendChild(card);

  });

}

function deletarFilme(index) {

  const confirmar = confirm(
    'Deseja excluir este filme?'
  );

  if (confirmar) {

    filmes.splice(index, 1);

    salvarLocalStorage();

    renderizarFilmes();

  }

}

function editarFilme(index) {

  const filme = filmes[index];

  tituloInput.value = filme.titulo;

  anoInput.value = filme.ano;

  generoInput.value = filme.genero;

  notaInput.value = filme.nota;

  editIndex = index;

  window.scrollTo({

    top: 0,

    behavior: 'smooth'

  });

}

function salvarLocalStorage() {

  localStorage.setItem(
    'filmes',
    JSON.stringify(filmes)
  );

}

renderizarFilmes();


if ('serviceWorker' in navigator) {

  window.addEventListener('load', () => {

    navigator.serviceWorker
      .register('./serviceworker.js')

      .then(() => {

        console.log(
          'Service Worker registrado!'
        );

      })

      .catch((erro) => {

        console.log(
          'Erro ao registrar:',
          erro
        );

      });

  });

}