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

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li 
            class="tasks__item ${task.done ? "task--done" : "task"}">
            <button class="js-done  ${task.done ? "task__buttonToggleDone" : "task__buttonToggleNotDone"}"></button>
            <span>${task.content}</span>
            <button class="js-remove task__binButton"></button>
            </li>`;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
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