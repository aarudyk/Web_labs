"use strict";

const API_BASE = "https://jsonplaceholder.typicode.com";

const state = {
    tasks: [],
    currentFilter: "all",
    searchQuery: "",
    nextLocalId: 1000,
};

const elements = {
    loader: document.getElementById("loader"),
    errorMessage: document.getElementById("error-message"),
    userInfo: document.getElementById("user-info"),
    taskForm: document.getElementById("task-form"),
    taskInput: document.getElementById("task-input"),
    addButton: document.getElementById("add-button"),
    searchInput: document.getElementById("search-input"),
    taskList: document.getElementById("task-list"),
    taskCounter: document.getElementById("task-counter"),
    emptyState: document.getElementById("empty-state"),
    filterButtons: document.querySelectorAll(".filter-btn"),
};

function debounce(func, delay) {
    let timeoutId;

    return function debounced(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function showLoader() {
    elements.loader.classList.remove("hidden");
}

function hideLoader() {
    elements.loader.classList.add("hidden");
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.remove("hidden");
}

function hideError() {
    elements.errorMessage.textContent = "";
    elements.errorMessage.classList.add("hidden");
}

function getActiveTasksCount() {
    return state.tasks.filter((task) => !task.completed).length;
}

function updateTaskCounter() {
    const count = getActiveTasksCount();
    elements.taskCounter.textContent = `Активних завдань: ${count}`;
}

function getFilteredTasks() {
    const query = state.searchQuery.trim().toLowerCase();

    return state.tasks.filter((task) => {
        const matchesFilter =
            state.currentFilter === "all" ||
            (state.currentFilter === "active" && !task.completed) ||
            (state.currentFilter === "completed" && task.completed);

        const matchesSearch = !query || task.title.toLowerCase().includes(query);

        return matchesFilter && matchesSearch;
    });
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.dataset.id = String(task.id);

    if (task.completed) {
        li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("task-checkbox");
    checkbox.setAttribute("aria-label", `Позначити завдання "${task.title}"`);

    const span = document.createElement("span");
    span.textContent = task.title;
    span.classList.add("task-title");

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Видалити";
    deleteBtn.classList.add("task-delete");

    li.append(checkbox, span, deleteBtn);
    return li;
}

function renderTasks() {
    const filteredTasks = getFilteredTasks();

    elements.taskList.textContent = "";

    filteredTasks.forEach((task) => {
        elements.taskList.appendChild(createTaskElement(task));
    });

    elements.emptyState.classList.toggle("hidden", filteredTasks.length > 0);
    updateTaskCounter();
}

function renderUserInfo(user) {
    elements.userInfo.textContent = `Користувач: ${user.name} (${user.email})`;
}

function findTaskById(id) {
    return state.tasks.find((task) => task.id === id);
}

function updateAddButtonState() {
    elements.addButton.disabled = elements.taskInput.value.trim().length === 0;
}

async function loadInitialData() {
    showLoader();
    hideError();

    try {
        const [todosResponse, userResponse] = await Promise.all([
            fetch(`${API_BASE}/todos?_limit=20`),
            fetch(`${API_BASE}/users/1`),
        ]);

        if (!todosResponse.ok || !userResponse.ok) {
            throw new Error("Помилка завантаження даних");
        }

        const [todos, user] = await Promise.all([
            todosResponse.json(),
            userResponse.json(),
        ]);

        state.tasks = todos;
        state.nextLocalId = Math.max(...todos.map((task) => task.id), 0) + 1;

        renderUserInfo(user);
        renderTasks();
    } catch (error) {
        showError("Не вдалося завантажити дані. Спробуйте пізніше.");
        console.error("Помилка:", error);
    } finally {
        hideLoader();
    }
}

async function addTask(title) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
        return;
    }

    showLoader();
    hideError();

    try {
        const response = await fetch(`${API_BASE}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                title: trimmedTitle,
                completed: false,
                userId: 1,
            }),
        });

        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        const newTask = await response.json();
        const taskToAdd = {
            ...newTask,
            id: state.nextLocalId,
        };
        state.nextLocalId += 1;

        state.tasks.unshift(taskToAdd);
        elements.taskInput.value = "";
        updateAddButtonState();
        renderTasks();
    } catch (error) {
        showError("Не вдалося створити завдання.");
        console.error("Помилка створення:", error);
    } finally {
        hideLoader();
    }
}

async function toggleTask(id, completed) {
    const task = findTaskById(id);

    if (!task) {
        return;
    }

    hideError();

    try {
        const response = await fetch(`${API_BASE}/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ completed }),
        });

        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        task.completed = completed;
        renderTasks();
    } catch (error) {
        showError("Не вдалося оновити завдання.");
        console.error("Помилка оновлення:", error);
        renderTasks();
    }
}

async function deleteTask(id) {
    hideError();

    try {
        const response = await fetch(`${API_BASE}/todos/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        state.tasks = state.tasks.filter((task) => task.id !== id);
        renderTasks();
    } catch (error) {
        showError("Не вдалося видалити завдання.");
        console.error("Помилка видалення:", error);
    }
}

function setActiveFilter(filter) {
    state.currentFilter = filter;

    elements.filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === filter);
    });

    renderTasks();
}

function handleTaskListClick(event) {
    const target = event.target;
    const taskItem = target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    const taskId = Number(taskItem.dataset.id);

    if (target.classList.contains("task-delete")) {
        deleteTask(taskId);
        return;
    }

    if (target.classList.contains("task-checkbox")) {
        toggleTask(taskId, target.checked);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    addTask(elements.taskInput.value);
}

function handleTaskInputKeydown(event) {
    if (event.key === "Enter" && !elements.addButton.disabled) {
        event.preventDefault();
        addTask(elements.taskInput.value);
    }

    if (event.key === "Escape") {
        elements.taskInput.value = "";
        updateAddButtonState();
        elements.taskInput.blur();
    }
}

function initEventListeners() {
    elements.taskForm.addEventListener("submit", handleFormSubmit);

    elements.taskInput.addEventListener("input", updateAddButtonState);
    elements.taskInput.addEventListener("keydown", handleTaskInputKeydown);

    elements.taskList.addEventListener("click", handleTaskListClick);

    elements.searchInput.addEventListener(
        "input",
        debounce((event) => {
            state.searchQuery = event.target.value;
            renderTasks();
        }, 300),
    );

    elements.filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setActiveFilter(button.dataset.filter);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initEventListeners();
    updateAddButtonState();
    loadInitialData();
});
