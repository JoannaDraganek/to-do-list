{
    const tasks = [
        {
            content: "zrobić zadanko domowe",
            done: false,
        },
        {
            content: "upiec makowca",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
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
            <li class="flex__boxList"
            >
            <button class="js-done  ${task.done ? "buttonDone" : "buttonNotDone"}"></button>
            ${task.content}
            <button class="js-remove binButton"></button>
           
            </li>
            `;
            const toggleCheckMarkButton = (changeCheckMarkButton) => {
                const buttonNotDone = document.querySelector(".buttonNotDone");
                buttonNotDone.classList.toggle(".buttonDone");
                CheckMarkButton.innerText = body.classList.contains(".buttonNotDone") ? "niezrobione" : "zrobione";
            };
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();


    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}