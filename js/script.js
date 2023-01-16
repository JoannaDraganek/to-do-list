{
    let tasks = [];
    let hiddenDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
          ...tasks,
           { content: newTaskContent }
          ];
        render();
      };
    
     
      const removeTask = (taskIndex) => {
        tasks = [
          ...tasks.slice(0, taskIndex),
          ...tasks.slice(taskIndex + 1)
        ];
        render();
      };
    
      
      const toggleTaskDone = (taskIndex) => {
        tasks = [
          ...tasks.slice(0, taskIndex),
          { ...tasks[taskIndex], done: !tasks[taskIndex].done },
          ...tasks.slice(taskIndex + 1),
        ];
        render();
      };
    
      const hideDoneTask = () => {
        hiddenDoneTasks = !hiddenDoneTasks;
        render();
      };
     
      const setAllTasksDone = () => {
        tasks = tasks.map((task) => ({
          ...task,
          done: true,
        }));
        render();
      };

      const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
    
        removeButtons.forEach((removeButton, index) => {
          removeButton.addEventListener("click", () => {
            removeTask(index);
          });
        });
      };
    
      const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
    
        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
          toggleDoneButtons.addEventListener("click", () => {
            toggleTaskDone(index);
          });
        });
      };
    
      const bindButtonsEvents = () => {
        const setAllDoneButton = document.querySelector(".js-setAllDone");
        const hiddenTaskButton = document.querySelector(".js-hideDoneTasks");
    
        if (setAllDoneButton) {
          setAllDoneButton.addEventListener("click", setAllTasksDone);
        };
    
        if (hiddenTaskButton) {
          hiddenTaskButton.addEventListener("click", hideDoneTask);
        };
      };

      const renderTasks = () => {
        let htmlString = "";
    
        for (const task of tasks) {
          htmlString +=  `
          <button class="js-done task__button task__buttonToggleDone">${task.done ? "✓" : " "}</button>
          <li class="tasks__item ${task.done && hiddenDoneTasks ? "task__item--hidden" : ""}">
            <span class="tasks ${task.done ? "task--done" : ""}">${task.content}</span>
          </li> 
          <button class="js-remove task__button task__binButton">️🗑️</button>
          `;
        };
    
       document.querySelector(".js-tasks").innerHTML = htmlString;
      };
    
      const renderButtons = () => {
        let buttonsBox = "";
    
        if (tasks.length > 0) {
          buttonsBox += `
          <button class="section__tasksListButtons js-hideDoneTasks">
          ${hiddenDoneTasks ? "Pokaż " : "Ukryj "}ukończone
          </button>
          <button class="section__tasksListButtons js-setAllDone"
          ${tasks.every(({ done }) => done) ? "disabled" : ""}>
          Ukończ wszystkie
          </button>
          `;
        }
        document.querySelector(".js-tasksBoxButtons").innerHTML = buttonsBox;
      };
    
      const render = () => {
        renderTasks();
        renderButtons();
    
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
      };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}