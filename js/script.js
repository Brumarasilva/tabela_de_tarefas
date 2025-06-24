document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const list = document.getElementById('task-list');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(input.value.trim());
        input.value = '';
        updateTaskNumbers();
    });

    function addTask(text) {
        if (!text) return;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const span = document.createElement('span');
        span.textContent = text;
        span.style.flex = '1';
        li.appendChild(span);

        // Botões de ação
        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group btn-group-sm';

        // Botão concluir
        const doneBtn = document.createElement('button');
        doneBtn.className = 'btn btn-success';
        doneBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
        doneBtn.title = 'Concluir';
        doneBtn.onclick = function() {
            li.classList.toggle('list-group-item-success');
            span.style.textDecoration = li.classList.contains('list-group-item-success') ? 'line-through' : 'none';
        };
        btnGroup.appendChild(doneBtn);

        // Botão editar
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-warning';
        editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
        editBtn.title = 'Editar';
        editBtn.onclick = function() {
            if (li.classList.contains('editing')) return;
            li.classList.add('editing');
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = span.textContent;
            editInput.className = 'form-control form-control-sm me-2';
            li.insertBefore(editInput, span);
            span.style.display = 'none';
            editInput.focus();

            editInput.onkeydown = function(ev) {
                if (ev.key === 'Enter') {
                    span.textContent = editInput.value.trim() || span.textContent;
                    span.style.display = '';
                    li.removeChild(editInput);
                    li.classList.remove('editing');
                    updateTaskNumbers();
                }
                if (ev.key === 'Escape') {
                    span.style.display = '';
                    li.removeChild(editInput);
                    li.classList.remove('editing');
                }
            };
            editInput.onblur = function() {
                span.style.display = '';
                li.removeChild(editInput);
                li.classList.remove('editing');
            };
        };
        btnGroup.appendChild(editBtn);

        // Botão remover
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger';
        removeBtn.innerHTML = '<i class="bi bi-trash"></i>';
        removeBtn.title = 'Excluir';
        removeBtn.onclick = function() {
            list.removeChild(li);
            updateTaskNumbers();
        };
        btnGroup.appendChild(removeBtn);

        li.appendChild(btnGroup);
        list.appendChild(li);
        updateTaskNumbers();
    }

    function updateTaskNumbers() {
        const items = list.querySelectorAll('li');
        items.forEach((li, idx) => {
            const span = li.querySelector('span');
            // Remove numeração antiga, se houver
            const texto = span.textContent.replace(/^\d+\.\s/, '');
            span.textContent = `${idx + 1}. ${texto}`;
        });
    }
});