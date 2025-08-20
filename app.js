const title = document.getElementById('title');
const body = document.getElementById('body');
const add = document.getElementById('add');
const notesEl = document.getElementById('notes');

let notes = JSON.parse(localStorage.getItem('mini-notes')||'[]');

function render() {
  notesEl.innerHTML = '';
  notes.forEach(n=>{
    const li = document.createElement('li');
    li.className = 'note';
    li.innerHTML = `<strong>${escape(n.title)}</strong><p>${escape(n.body)}</p>
      <button data-id="${n.id}" class="del">Delete</button>`;
    notesEl.appendChild(li);
  });
  document.querySelectorAll('.del').forEach(b=>{
    b.onclick = () => {
      const id = b.dataset.id;
      notes = notes.filter(x=>x.id!==id);
      saveAndRender();
    }
  });
}

function saveAndRender(){
  localStorage.setItem('mini-notes', JSON.stringify(notes));
  render();
}

function escape(s){ return String(s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

add.onclick = () => {
  const n = { id: Date.now().toString(), title: title.value, body: body.value };
  notes.unshift(n);
  title.value=''; body.value='';
  saveAndRender();
};

render();
