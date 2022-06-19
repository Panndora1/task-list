const createBtn = document.querySelector('.create-btn');

const main = document.querySelector('.task-list');
const taskButtons = document.querySelector('.tasks-buttons');
const titleOfTask = document.querySelector('.all-task__headline');

// init new task form

function initMainForm() {

    // Create subtask section

    let subtasks = document.createElement('section');
    subtasks.classList = 'subtasks';
    main.prepend(subtasks);

    let subtasksCaption = document.createElement('div');
    subtasksCaption.classList = 'subtasks__caption';
    subtasks.prepend(subtasksCaption);

    let subtasksHeadline = document.createElement('h2');
    subtasksHeadline.classList = 'subtasks__headline headline';
    subtasksHeadline.innerText = 'Subtasks';
    subtasksCaption.prepend(subtasksHeadline);

    let subtasksBbtn = document.createElement('button');
    subtasksBbtn.innerText = '+';
    subtasksBbtn.classList = 'subtasks__button button';
    subtasksCaption.append(subtasksBbtn);


    let wrapperDes = document.createElement('div');
    wrapperDes.classList = 'subtasks__des';
    wrapperDes.style.display = 'none';
    subtasks.append(wrapperDes);

    let des = document.createElement('p');
    des.classList = 'subtasks__name des';
    des.innerText = 'Description';
    wrapperDes.prepend(des);

    let time = document.createElement('p');
    time.classList = 'subtasks__name time';
    time.innerText = 'Time';
    wrapperDes.append(time);

    let btn = document.createElement('p');
    btn.classList = 'subtasks__name btn';
    btn.innerText = 'Button';
    wrapperDes.append(btn);

    // Listener on subtask button

    subtasksBbtn.addEventListener('click', () => {
        addTitle();
        newSubTask();
    })

    // Create main task section

    let taskName = document.createElement('section');
    taskName.classList = 'task-name';
    main.prepend(taskName);

    let taskNameHeadline = document.createElement('h1');
    taskNameHeadline.classList = 'task-name__headline headline';
    taskNameHeadline.innerText = 'Task name';
    taskName.prepend(taskNameHeadline);

    let taskNameInput = document.createElement('input');
    taskNameInput.placeholder = 'Enter task name';
    taskNameInput.type = 'text';
    taskNameInput.classList = 'task-name__textarea textarea';
    taskName.append(taskNameInput);

    // Add Save button

    let saveBtn = document.createElement('button');
    saveBtn.classList = 'task-buttons__btn save-btn';
    saveBtn.innerText = 'Save task in localstorage';
    taskButtons.prepend(saveBtn);

    saveBtn.addEventListener('click', () => {

        saveLocal()
        createTask()
        deleteForm()
        initMainForm()

        titleOfTask.style.display = 'block'

    })

    // hide task title

    titleOfTask.style.display = 'none';
}


function deleteForm() {

    let taskDel = document.querySelector('.task-name');
    let subtasksDel = document.querySelector('.subtasks');
    let saveDel = document.querySelector('.save-btn');

    taskDel.remove();
    subtasksDel.remove();
    saveDel.remove();

}

createBtn.addEventListener('click', () => {

    if(main.childNodes.length == 5) {
        initMainForm()
    } else {
        deleteForm()
        initMainForm()
    }

})


// Create new subtask


function addTitle() {
    const subWrapperDes = document.querySelector('.subtasks__des');
    subWrapperDes.style.display = 'flex';
}

function newSubTask() {
        
    const subtask = document.querySelector('.subtasks');

    let subtasksWrapper = document.createElement('div');
    subtasksWrapper.classList = 'subtasks__task-wrapper';
    subtask.append(subtasksWrapper);

    const subWrapper = document.querySelector('.subtasks__task-wrapper');

    let subtaskTask = document.createElement('div');
    subtaskTask.classList = 'subtasks__task';
    subWrapper.append(subtaskTask);

    const subArea = document.querySelector('.subtasks__task');

    let text = document.createElement('input');
    text.classList = 'subtasks__textarea textarea';
    text.placeholder = 'New task';
    text.type = 'text';
    subtaskTask.prepend(text);

    let number = document.createElement('input');
    number.classList = 'subtasks__time textarea'
    number.value = '0';
    number.type = 'number';
    subtaskTask.append(number);

    let btn = document.createElement('button');
    btn.classList = 'subtasks__button-del button';
    btn.innerText = 'X';
    subtaskTask.append(btn);

    let buttons = document.querySelectorAll('.subtasks__button-del')

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(btn.parentNode)
            btn.parentNode.remove();
        })
    })
}

// Save task

let data = [];

function saveLocal() {

    let mainTask = document.querySelector('.task-name__textarea');

    let subTaskText = document.querySelectorAll('.subtasks__textarea');
    let subTaskNum = document.querySelectorAll('.subtasks__time');

    let info = {
        main: mainTask.value,
    }

    for (let i = 0; i < subTaskText.length; i++) {
        info[subTaskText[i].value] = subTaskNum[i].value
    }

    data.push(info)
}

const allTask = document.querySelector('.all-task__wrapper')

function createTask() {

    let task = document.createElement('div');
    task.classList = 'all-task__task';
    allTask.prepend(task);

    let avatarWrapper = document.createElement('div');
    avatarWrapper.classList = 'all-task__container';
    task.append(avatarWrapper);

    let avatar = document.createElement('span');
    avatar.classList = 'all-task__avatar';
    avatarWrapper.append(avatar);

    let taskDes = document.createElement('div');
    taskDes.classList = 'all-task__task-des';
    avatarWrapper.append(taskDes);

    let taskTitle = document.createElement('p');
    taskTitle.classList = 'all-task__headline-list';
    taskTitle.innerText = data[data.length-1].main;
    taskDes.append(taskTitle);

    let taskList = document.createElement('ul');
    taskList.classList = 'all-task__list';
    taskDes.append(taskList);

    let obj = data[data.length-1]

    for (let key in obj) {

        if(key != 'main') {
            let taskItem = document.createElement('li');
            taskItem.classList = 'all-task__item';
            taskItem.innerText = `${key} - ${obj[key]}h`
            taskList.append(taskItem)
        }
    }

    let taskBtn = document.createElement('button');
    taskBtn.classList = 'all-task__button';
    taskBtn.innerText = 'Load';
    task.append(taskBtn);

    let loadBtn = document.querySelectorAll('.all-task__button');

    loadBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            console.log(index);

            deleteForm()
            initMainForm()
            sendData(index);
        })
    })
}

// load data

function sendData(index) {

    let newData = [...data].reverse();
    let mainObj = newData[index];

    const title = document.querySelector('.task-name__textarea');
    title.value = mainObj.main;

    for (let key in mainObj) {

        if(key != 'main') {
            addTitle();
            newSubTask();

            let text = document.querySelectorAll('.subtasks__textarea');
            let num = document.querySelectorAll('.subtasks__time');

            text[text.length-1].value = key;
            num[num.length-1].value = mainObj[key];
        }

    }
}






    
