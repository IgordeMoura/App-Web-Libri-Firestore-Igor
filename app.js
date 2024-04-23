const livrolist = document.getElementById('book-list');

function renderBook(doc){
    let li = document.createElement('li');
    let titulo = document.createElement('span');
    let autor = document.createElement('span');
    let excluir = document.createElement('div');

    excluir.textContent = 'X';

    //carregta os dados nos elementos html
    li.setAttribute('data-id', doc.id);
    titulo.textContent = doc.data().titulo;
    autor.textContent = doc.data().autor;
    
    //adicionando os dados de autor e titulo na tag li
    li.appendChild(titulo);
    li.appendChild(autor);
    li.appendChild(excluir);

    //trata a ação de clique no X para a exclusão do arquivo
    excluir.addEventListener('click', (event)=>{
      event.stopPropagation();

      let id = event.target.parentElement.getAttribute('data-id')
      // alert (id);
      db.collection('libri-firestore').doc(id).delete()
        .then(()=>{window.location.reload();})
    })

    //adicionando o li na tag ul
    livrolist.appendChild(li);
}

db.collection('libri-firestore')
  .get()
  .then(
    (snapshot)=>{
      // console.log(snapshot.docs)
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderBook(doc);
      });
  }
);

// Inserção de livros e autores
const form = document.getElementById("add-book-form")

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    db.collection('libri-firestore').add({
        autor: form.autor.value,
        titulo: form.titulo.value
    }).then(() =>{
        form.autor.value = '';
        form.titulo.value = '';
        window.location.reload();
    })
});
 