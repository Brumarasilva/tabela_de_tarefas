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

    function formatDate(date) {
        return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    function addTask(text) {
        if (!text) return;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const span = document.createElement('span');
        span.textContent = text;
        span.style.flex = '1';

        // Data de criação
        const createdAt = new Date();
        const dateInfo = document.createElement('small');
        dateInfo.className = 'text-muted ms-2';
        dateInfo.textContent = `(Criada: ${formatDate(createdAt)})`;

        // Aviso pendente
        const pendente = document.createElement('span');
        pendente.className = 'ms-2 text-danger fw-bold pendente-label';
        pendente.textContent = 'pendente';

        // Container para texto e datas
        const contentDiv = document.createElement('div');
        contentDiv.style.flex = '1';
        contentDiv.appendChild(span);
        contentDiv.appendChild(dateInfo);
        contentDiv.appendChild(pendente);

        li.appendChild(contentDiv);

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
            if (li.classList.contains('list-group-item-success')) {
                // Adiciona data de conclusão
                if (!li.querySelector('.completed-date')) {
                    const completedAt = new Date();
                    const completedInfo = document.createElement('small');
                    completedInfo.className = 'text-success ms-2 completed-date';
                    completedInfo.textContent = `(Concluída: ${formatDate(completedAt)})`;
                    contentDiv.appendChild(completedInfo);
                }
                // Remove aviso pendente
                pendente.style.display = 'none';
            } else {
                // Remove data de conclusão se desmarcar
                const completedInfo = li.querySelector('.completed-date');
                if (completedInfo) completedInfo.remove();
                // Mostra aviso pendente novamente
                pendente.style.display = '';
            }
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
            // Remove numeração ao editar
            editInput.value = span.textContent.replace(/^\d+\.\s/, '');
            editInput.className = 'form-control form-control-sm me-2';
            contentDiv.insertBefore(editInput, span);
            span.style.display = 'none';
            editInput.focus();

            editInput.onkeydown = function(ev) {
                if (ev.key === 'Enter') {
                    span.textContent = editInput.value.trim() || span.textContent;
                    span.style.display = '';
                    contentDiv.removeChild(editInput);
                    li.classList.remove('editing');
                    updateTaskNumbers();
                }
                if (ev.key === 'Escape') {
                    span.style.display = '';
                    contentDiv.removeChild(editInput);
                    li.classList.remove('editing');
                }
            };
            editInput.onblur = function() {
                span.style.display = '';
                contentDiv.removeChild(editInput);
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