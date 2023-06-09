function openAddTaskOverlay(stat) {
    chosenStat = stat;
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <form class="addTaskOverlay" id="addTaskForm" onclick="doNotClose(event)">
            <div class="headlineContainerOverlay" id="headlineContainerOverlay"></div>
            <div class="contentLeftAndRightContainerOverlay" id="contentLeftAndRightContainerOverlay"></div>
            <div class="twoButtonsContainerOverlay" id="twoButtonsContainerOverlay"></div>
        </form>
    `;
    renderHeadlineOverlay();
}


function renderHeadlineOverlay() {
    document.getElementById('headlineContainerOverlay').innerHTML = /*html*/ `
        <h1>Add Task</h1>
        <img src="../../img/cancelIcon.png" onclick="closeOverlay()">
    `;
    renderContentLeftAndRightOverlay();
    renderContactsAddTask('assignedToOverlay');
    activatePrioButtonsOverlay();
}


function closeOverlay() {
    document.getElementById('overlaySection').classList.add('d-none');
}


function renderContentLeftAndRightOverlay() {
    document.getElementById('contentLeftAndRightContainerOverlay').innerHTML = generateContentLeftAndRightContainerOverlay();
    renderTwoButtonsContainerOverlay();
    setMinDate('dateOverlay');
}


function renderContactsAddTaskOverlay() {
    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name } = getJoinData(allData);
        const { color } = getJoinData(allData);
        document.getElementById('assignedToOverlay').innerHTML += /*html*/ `
            <option value="${color}">${name}</option>
        `;
    }
}


function renderTwoButtonsContainerOverlay() {
    document.getElementById('twoButtonsContainerOverlay').innerHTML = generateTwoButtonsContainerOverlay();
    clearFieldsOverlay();
}


function pushDateOverlay() {
    let dueDate = document.getElementById('dateOverlay').value;
    dateArray.splice(0, 1, dueDate);
}


function activatePrioButtonsOverlay() {
    lowOverlay();
    let urgentBtn = document.getElementById('urgentOverlay');
    urgentBtn.addEventListener("click", urgentOverlay);

    let mediumBtn = document.getElementById('mediumOverlay');
    mediumBtn.addEventListener("click", mediumOverlay);

    let lowBtn = document.getElementById('lowOverlay');
    lowBtn.addEventListener("click", lowOverlay);

    let resetBtn = document.getElementById('resetOverlay');
    resetBtn.addEventListener("click", lowOverlay);

    let assignBtn = document.getElementById('assignedToOverlay');
    assignBtn.addEventListener("change", assignedToOverlay);

    document.getElementById('addTaskForm').addEventListener('submit', function (event) {
        event.preventDefault();
        createTaskOverlay();
    });
}


function urgentOverlay() {
    let prioValue = document.getElementById('urgentOverlay').value;
    prio = prioValue;

    document.getElementById('urgentOverlay').classList.add('urgent');
    document.getElementById('urgentIconOverlay').src = '../../img/urgentWhiteIcon.png';

    document.getElementById('mediumOverlay').classList.remove('medium');
    document.getElementById('mediumIconOverlay').src = '../../img/mediumIcon.png';

    document.getElementById('lowOverlay').classList.remove('low');
    document.getElementById('lowIconOverlay').src = '../../img/lowIcon.png';
}


function mediumOverlay() {
    let prioValue = document.getElementById('mediumOverlay').value;
    prio = prioValue;

    document.getElementById('mediumOverlay').classList.add('medium');
    document.getElementById('mediumIconOverlay').src = '../../img/mediumWhiteIcon.png';

    document.getElementById('urgentOverlay').classList.remove('urgent');
    document.getElementById('urgentIconOverlay').src = '../../img/urgentIcon.png';

    document.getElementById('lowOverlay').classList.remove('low');
    document.getElementById('lowIconOverlay').src = '../../img/lowIcon.png';
}


function lowOverlay() {
    let prioValue = document.getElementById('lowOverlay').value;
    prio = prioValue;

    document.getElementById('lowOverlay').classList.add('low');
    document.getElementById('lowIconOverlay').src = '../../img/lowWhiteIcon.png';

    document.getElementById('mediumOverlay').classList.remove('medium');
    document.getElementById('mediumIconOverlay').src = '../../img/mediumIcon.png';

    document.getElementById('urgentOverlay').classList.remove('urgent');
    document.getElementById('urgentIconOverlay').src = '../../img/urgentIcon.png';
}


function openCategoryDropdownOverlay() {
    document.getElementById('categoryDropdownOverlay').classList.remove('d-none');
    document.getElementById('categoryOverlay').style.cssText = `
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom: none;
    `;
    document.getElementById('categoryOverlay').onclick = closeCategoryDropdownOverlay;
}


function newCategoryOverlay() {
    closeCategoryDropdownOverlay();
    document.getElementById('newCategoryContainerOverlay').classList.remove('d-none');
    document.getElementById('newCategoryColorsOverlay').classList.remove('d-none');
    document.getElementById('categoryOverlay').style.display = 'none';
}


function addColorToNewCategoryOverlay(color) {
    document.getElementById('newCategoryColorOverlay').style.backgroundColor = color;
}


function cancelNewCategoryOverlay() {
    document.getElementById('newCategoryInputOverlay').value = '';
    document.getElementById('newCategoryColorOverlay').style.backgroundColor = '';
    document.getElementById('newCategoryContainerOverlay').classList.add('d-none');
    document.getElementById('newCategoryColorsOverlay').classList.add('d-none');
    document.getElementById('categoryOverlay').style.display = 'flex';
    document.getElementById('categoryOverlay').innerHTML = 'Select task category';
}


function confirmNewCategoryOverlay() {
    let newCategory = document.getElementById('newCategoryInputOverlay').value;
    let newCategoryColor = document.getElementById('newCategoryColorOverlay').style.backgroundColor;
    let newCategoryInput = document.getElementById('newCategoryInputOverlay');

    if (newCategoryInput.value == '') {
        newCategoryInput.focus();
    } else {
        selectedCategoryOverlay(newCategory, newCategoryColor);
        document.getElementById('newCategoryInputOverlay').value = '';
        document.getElementById('newCategoryColorOverlay').style.backgroundColor = '';
        document.getElementById('newCategoryContainerOverlay').classList.add('d-none');
        document.getElementById('newCategoryColorsOverlay').classList.add('d-none');
        document.getElementById('categoryOverlay').style.display = 'flex';
    }
}


function selectedCategoryOverlay(category, color) {
    category = category.charAt(0).toUpperCase() + category.slice(1);
    document.getElementById('categoryOverlay').innerHTML = /*html*/ `
        ${category}
        <div class="categoryColor" style="background-color: ${color}; margin-left: 10px"></div>
    `;
    closeCategoryDropdownOverlay();
}


function closeCategoryDropdownOverlay() {
    document.getElementById('categoryDropdownOverlay').classList.add('d-none');
    document.getElementById('categoryOverlay').style.cssText = `
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: 1px solid #D1D1D1;
    `;
    document.getElementById('categoryOverlay').onclick = openCategoryDropdownOverlay;
}


function assignedToOverlay() {
    let assignee = document.getElementById("assignedToOverlay");
    let selectedAssignee = assignee.options[assignee.selectedIndex].value;
    let color = assignee.options[assignee.selectedIndex].id;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;
    let i = assignee.selectedIndex - 1;
    let objId = i + 1;

    if (assignedToNames.indexOf(selectedAssignee) === -1) {
        assignedToNames.push(selectedAssignee);
        contactsColors.push(color);
        objIds.push(objId);
    }
    showAssignedToListOverlay();
}


function showAssignedToListOverlay() {
    let content = document.getElementById("assignedToListOverlay");
    content.innerHTML = "";

    for (let i = 0; i < assignedToNames.length; i++) {
        const name = assignedToNames[i];
        let bgColor = contactsColors[i];
        let objId = objIds[i];
        let initials = getInitials(name);
        content.innerHTML += /*html*/ `
            <div class="assigneeContainer" style="background-color: ${bgColor}" onclick="removeAssigneeOverlay(${i}, ${objId})">
                ${initials}
            </div>
        `;
    }
}


function removeAssigneeOverlay(position, objId) {
    assignedToNames.splice(position, 1);
    contactsColors.splice(position, 1);
    objIds.splice(position, 1);
    showAssignedToListOverlay();

    let assignee = document.getElementById("assignedToOverlay");
    let selectedAssignee2 = assignee.options[objId];
    selectedAssignee2.disabled = false;

    if (assignedToNames.length === 0) {
        assignee.selectedIndex = 0;
    }
}


function clearFieldsOverlay() {
    allSubtasks = [];
    assignedToNames = [];
    contactsColors = [];
    objIds = [];
    dateArray = [];
    document.getElementById('categoryOverlay').innerHTML = 'Select task category';
    document.getElementById('assignedToListOverlay').innerHTML = '';
    document.getElementById('subtasksList').innerHTML = '';
    closeCategoryDropdownOverlay();
    cancelNewCategoryOverlay();
    enableContactsForAssignedToOverlay();
}


function enableContactsForAssignedToOverlay() {
    let assignee = document.getElementById("assignedToOverlay");
    for (let i = 1; i < assignee.options.length; i++) {
        let option = assignee.options[i];
        option.disabled = false;
    }
}


function createTaskOverlay() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('categoryOverlay').innerText;
    let date = dateArray;

    let newTask = {
        'id': '',
        'title': title,
        'description': description,
        'category': category,
        'assignedTo': assignedToNames,
        'date': date,
        'prio': prio,
        'stat': chosenStat,
        'subtasks': allSubtasks,
        'isChecked': isChecked,
        'doneSubTasks': 0,
        'color': contactsColors
    };

    newTaskArray.push(newTask);
    saveTasks();
    clearFieldsOverlay();
    taskAddedToBoard();
}