"use strict";

const logs = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
};

function logTask(taskNumber, message) {
    const text = String(message);
    logs[taskNumber].push(text);
    console.log(`[Завдання ${taskNumber}] ${text}`);
}

function renderTaskOutputs() {
    for (let taskNumber = 1; taskNumber <= 7; taskNumber += 1) {
        const output = document.getElementById(`output-${taskNumber}`);
        if (output) {
            output.textContent = logs[taskNumber].join("\n");
        }
    }
}

/* ===== Завдання 1. Змінні та типи даних ===== */
function runTask1() {
    logTask(1, "=== Примітивні типи ===");

    const strValue = "Артем Рудик";
    const numValue = 136;
    const boolValue = true;
    const nullValue = null;
    let undefinedValue;
    const symbolValue = Symbol("group");
    const bigIntValue = 2026n;

    const primitives = [
        { name: "string", value: strValue },
        { name: "number", value: numValue },
        { name: "boolean", value: boolValue },
        { name: "null", value: nullValue },
        { name: "undefined", value: undefinedValue },
        { name: "symbol", value: symbolValue },
        { name: "bigint", value: bigIntValue },
    ];

    primitives.forEach(({ name, value }) => {
        logTask(1, `${name}: ${String(value)} | typeof: ${typeof value}`);
    });

    logTask(1, "\n=== Явне перетворення типів ===");
    logTask(1, `String(136) = "${String(numValue)}"`);
    logTask(1, `String(true) = "${String(boolValue)}"`);
    logTask(1, `Number("123") = ${Number("123")}`);
    logTask(1, `Number("") = ${Number("")}`);
    logTask(1, `Number(true) = ${Number(true)}`);
    logTask(1, `Number(false) = ${Number(false)}`);
    logTask(1, `Number(null) = ${Number(null)}`);
    logTask(1, `Number(undefined) = ${Number(undefined)}`);

    logTask(1, "\n=== Falsy / Truthy ===");
    [0, "", null, undefined, NaN, "0", [], {}, "false", 42, -1].forEach((value) => {
        logTask(1, `Boolean(${JSON.stringify(value)}) = ${Boolean(value)}`);
    });

    const name = "Артем Рудик";
    const age = 20;
    const university = "Університет";
    const group = 136;
    logTask(1, `\nШаблонний рядок: ${`Студент: ${name}, вік: ${age}, університет: ${university}, група: ${group}`}`);

    logTask(1, "\n=== == vs === ===");
    logTask(1, `0 == false → ${0 == false} | 0 === false → ${0 === false}`);
    logTask(1, `"" == false → ${"" == false} | "" === false → ${"" === false}`);
    logTask(1, `null == undefined → ${null == undefined} | null === undefined → ${null === undefined}`);
}

/* ===== Завдання 2. Умови та логіка ===== */
function getGrade(score) {
    if (typeof score !== "number" || Number.isNaN(score) || score < 0 || score > 100) {
        return "невалідний бал";
    }

    if (score < 60) {
        return "незадовільно";
    }

    if (score < 75) {
        return "задовільно";
    }

    if (score < 90) {
        return "добре";
    }

    return "відмінно";
}

function getSeasonUA(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "зима";
        case 3:
        case 4:
        case 5:
            return "весна";
        case 6:
        case 7:
        case 8:
            return "літо";
        case 9:
        case 10:
        case 11:
            return "осінь";
        default:
            return "невалідний місяць";
    }
}

function runTask2() {
    logTask(2, "=== getGrade ===");
    [95, 82, 68, 45, -5, 110, "abc", NaN].forEach((score) => {
        logTask(2, `getGrade(${JSON.stringify(score)}) → "${getGrade(score)}"`);
    });

    logTask(2, "\n=== getSeasonUA ===");
    [1, 4, 7, 10, 13, 0].forEach((month) => {
        logTask(2, `getSeasonUA(${month}) → "${getSeasonUA(month)}"`);
    });

    const studentAge = 19;
    const status = studentAge >= 18 ? "повнолітній" : "неповнолітній";
    logTask(2, `\nТернарний оператор: вік ${studentAge} → ${status}`);
}

/* ===== Завдання 3. Масиви ===== */
function createStudents() {
    return [
        { name: "Артем Рудик", grade: 92, courses: ["JavaScript", "HTML", "CSS"] },
        { name: "Олена Коваленко", grade: 87, courses: ["JavaScript", "HTML", "CSS"] },
        { name: "Іван Петренко", grade: 54, courses: ["HTML", "CSS"] },
        { name: "Марія Сидоренко", grade: 78, courses: ["JavaScript", "CSS", "Git"] },
        { name: "Андрій Мельник", grade: 95, courses: ["JavaScript", "HTML", "Git"] },
        { name: "Катерина Бойко", grade: 63, courses: ["HTML", "CSS", "Figma"] },
    ];
}

function runTask3() {
    const students = createStudents();
    logTask(3, `Початковий масив (${students.length} студентів):`);
    students.forEach((student) => {
        logTask(3, `  ${student.name} — ${student.grade} балів`);
    });

    students.push({ name: "Дмитро Шевченко", grade: 71, courses: ["JavaScript", "HTML"] });
    logTask(3, `\nПісля push: ${students.length} студентів`);

    const removedByPop = students.pop();
    logTask(3, `Після pop видалено: ${removedByPop.name}`);

    const removedBySplice = students.splice(2, 1)[0];
    logTask(3, `Після splice(2, 1) видалено: ${removedBySplice.name}`);

    students.splice(1, 0, { name: "Наталія Лисенко", grade: 88, courses: ["JavaScript", "CSS"] });
    logTask(3, `Після splice(1, 0, ...) додано Наталію Лисенко на позицію 1`);

    const excellentStudent = students.find((student) => student.grade > 90);
    logTask(3, `\nfind (оцінка > 90): ${excellentStudent?.name ?? "не знайдено"}`);

    const jsStudents = students.filter((student) => student.courses.includes("JavaScript"));
    logTask(3, `filter (курс JavaScript): ${jsStudents.map((s) => s.name).join(", ")}`);

    const averageGrade = students.reduce((sum, student) => sum + student.grade, 0) / students.length;
    logTask(3, `reduce (середня оцінка): ${averageGrade.toFixed(2)}`);

    return students;
}

/* ===== Завдання 4. Функції ===== */
function rectangleAreaDeclaration(width, height) {
    return width * height;
}

const rectangleAreaExpression = function rectangleArea(width, height) {
    return width * height;
};

const rectangleAreaArrow = (width, height) => width * height;

function createCounter() {
    let value = 0;

    return {
        increment() {
            value += 1;
            return value;
        },
        decrement() {
            value -= 1;
            return value;
        },
        getValue() {
            return value;
        },
    };
}

function createUser(name, role = "student", isActive = true) {
    return { name, role, isActive };
}

const sum = (...numbers) => numbers.reduce((total, number) => total + number, 0);

function printStudentInfo({ name, grade, courses }) {
    logTask(4, `${name} має оцінку ${grade}`);
    logTask(4, `Курси: ${courses.join(", ")}`);
}

function runTask4(students) {
    logTask(4, "=== Площа прямокутника (3 способи) ===");
    logTask(4, `Declaration: 5 × 8 = ${rectangleAreaDeclaration(5, 8)}`);
    logTask(4, `Expression: 5 × 8 = ${rectangleAreaExpression(5, 8)}`);
    logTask(4, `Arrow: 5 × 8 = ${rectangleAreaArrow(5, 8)}`);

    logTask(4, "\n=== Замикання createCounter ===");
    const counter = createCounter();
    logTask(4, `increment() → ${counter.increment()}`);
    logTask(4, `increment() → ${counter.increment()}`);
    logTask(4, `decrement() → ${counter.decrement()}`);
    logTask(4, `getValue() → ${counter.getValue()}`);

    logTask(4, "\n=== Параметри за замовчуванням ===");
    logTask(4, JSON.stringify(createUser("Артем Рудик")));
    logTask(4, JSON.stringify(createUser("Олена", "mentor", false)));

    logTask(4, "\n=== Rest-параметри ===");
    logTask(4, `sum(1, 2, 3) = ${sum(1, 2, 3)}`);
    logTask(4, `sum(10, 20) = ${sum(10, 20)}`);

    logTask(4, "\n=== Деструктуризація в параметрах ===");
    printStudentInfo(students[0]);
}

/* ===== Завдання 5. Обʼєкти ===== */
function runTask5() {
    const studentProfile = {
        firstName: "Артем",
        lastName: "Рудик",
        age: 20,
        university: "Університет",
        grades: { math: 85, physics: 92, programming: 94 },
        isActive: true,
        getFullName() {
            return `${this.firstName} ${this.lastName}`;
        },
        getAverageGrade() {
            const values = Object.values(this.grades);
            return values.reduce((sum, grade) => sum + grade, 0) / values.length;
        },
    };

    logTask(5, `Повне ім'я (метод): ${studentProfile.getFullName()}`);
    logTask(5, `Доступ через крапку: ${studentProfile.university}`);
    logTask(5, `Доступ через дужки: ${studentProfile["age"]}`);

    const fieldName = "isActive";
    logTask(5, `Динамічний ключ [${fieldName}]: ${studentProfile[fieldName]}`);

    logTask(5, `\nObject.keys: ${Object.keys(studentProfile.grades).join(", ")}`);
    logTask(5, `Object.values: ${Object.values(studentProfile.grades).join(", ")}`);
    Object.entries(studentProfile.grades).forEach(([subject, grade]) => {
        logTask(5, `Object.entries → ${subject}: ${grade}`);
    });

    const profileCopy = { ...studentProfile, age: 21 };
    logTask(5, `\nКопія (spread): вік у копії ${profileCopy.age}, вік оригіналу ${studentProfile.age}`);

    const labScore = studentProfile.grades?.lab;
    const mentorName = studentProfile.mentor?.name ?? "Не призначено";
    logTask(5, `Optional chaining grades?.lab: ${labScore ?? "немає"}`);
    logTask(5, `Optional chaining mentor?.name ?? fallback: ${mentorName}`);
    logTask(5, `Середня оцінка: ${studentProfile.getAverageGrade().toFixed(2)}`);
}

/* ===== Завдання 6. Ланцюжки методів масивів ===== */
function createProducts() {
    return [
        { name: "Ноутбук", price: 25000, category: "electronics", inStock: true, quantity: 5 },
        { name: "Мишка", price: 450, category: "electronics", inStock: true, quantity: 12 },
        { name: "Книга JS", price: 650, category: "books", inStock: true, quantity: 8 },
        { name: "Навушники", price: 1200, category: "electronics", inStock: false, quantity: 3 },
        { name: "Монітор", price: 8500, category: "electronics", inStock: true, quantity: 4 },
        { name: "Рюкзак", price: 900, category: "accessories", inStock: true, quantity: 6 },
        { name: "Клавіатура", price: 1800, category: "electronics", inStock: false, quantity: 2 },
        { name: "Блокнот", price: 120, category: "books", inStock: true, quantity: 20 },
    ];
}

function runTask6(students) {
    const products = createProducts();

    const totalInStockValue = products
        .filter((product) => product.inStock)
        .map((product) => product.price * product.quantity)
        .reduce((total, value) => total + value, 0);

    logTask(6, `filter → map → reduce (вартість у наявності): ${totalInStockValue} грн`);

    const electronicsNames = products
        .filter((product) => product.category === "electronics")
        .sort((a, b) => a.price - b.price)
        .map((product) => product.name);

    logTask(6, `filter → sort → map (electronics): ${electronicsNames.join(", ")}`);

    const categoryCount = products.reduce((result, product) => {
        const current = result[product.category] ?? 0;
        return { ...result, [product.category]: current + 1 };
    }, {});

    logTask(6, `reduce (кількість по категоріях): ${JSON.stringify(categoryCount)}`);

    const sortedByGrade = [...students].sort((a, b) => b.grade - a.grade);
    logTask(6, `\nСортування за оцінкою: ${sortedByGrade.map((s) => `${s.name} (${s.grade})`).join("; ")}`);

    const sortedByName = [...students].sort((a, b) => a.name.localeCompare(b.name, "uk"));
    logTask(6, `Сортування за ім'ям: ${sortedByName.map((s) => s.name).join(", ")}`);
}

/* ===== Завдання 7. Рядки ===== */
function capitalize(str) {
    if (!str) {
        return "";
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function countWords(str) {
    return str.trim().split(/\s+/).filter(Boolean).length;
}

function truncate(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }

    return `${str.slice(0, maxLength)}...`;
}

function isValidEmail(email) {
    const atIndex = email.indexOf("@");

    if (!email.includes("@") || email.indexOf("@", atIndex + 1) !== -1) {
        return false;
    }

    if (atIndex < 1) {
        return false;
    }

    const domainPart = email.slice(atIndex + 1);
    const dotIndex = domainPart.lastIndexOf(".");

    if (dotIndex <= 0) {
        return false;
    }

    const afterDot = domainPart.slice(dotIndex + 1);
    return afterDot.length >= 2;
}

function runTask7() {
    logTask(7, `capitalize("javaScript") → "${capitalize("javaScript")}"`);
    logTask(7, `capitalize("hello world") → "${capitalize("hello world")}"`);

    logTask(7, `countWords("JavaScript це круто") → ${countWords("JavaScript це круто")}`);
    logTask(7, `countWords("  пробіли між словами  ") → ${countWords("  пробіли між словами  ")}`);

    logTask(7, `truncate("Це довгий текст для прикладу", 15) → "${truncate("Це довгий текст для прикладу", 15)}"`);
    logTask(7, `truncate("Короткий", 20) → "${truncate("Короткий", 20)}"`);

    [
        "user@example.com",
        "invalid-email",
        "@example.com",
        "user@.com",
        "artem.rudik@university.ua",
    ].forEach((email) => {
        logTask(7, `isValidEmail("${email}") → ${isValidEmail(email)}`);
    });
}

/* ===== Запуск усіх завдань ===== */
function runAllTasks() {
    console.log("=== Лабораторна робота 4 — JavaScript ===");
    console.log("Автор: Артем Рудик, група 136\n");

    runTask1();
    runTask2();
    const students = runTask3();
    runTask4(students);
    runTask5();
    runTask6(students);
    runTask7();

    renderTaskOutputs();
    console.log("\n=== Усі завдання виконано ===");
}

document.addEventListener("DOMContentLoaded", runAllTasks);
