const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const tasks = await response.json();
  return tasks;
}

const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTask.value }

    await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    loadTasks();
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if(innerHTML) element.innerHTML = innerHTML;
    if(innerText) element.innerText = innerText;
    return element;
}

const createSelect = (value) => {
    const options = `
        <option value="pendente">Pendente</option>
        <option value="andamento">Em andamento</option>
        <option value="concluida">Concluída</option>
    `;

    const select = createElement('select', '', options);
    select.value = value;
    return select;
}

const createRow = (task) => {

    const { id, title, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', created_at);
    const tdStatus = createSelect('td', status);
    const tdActions = createElement('td');

    const select =  createSelect(status);

    const editButton = createElement('button', '' ,'<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '' ,'<span class="material-symbols-outlined">delete</span>');
    
    
    
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;

}

const loadTasks = async () => {
    const tasks = await fetchTasks();
    tasks.forEach((task) => {
        const row = createRow(task);
        tbody.appendChild(row);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();