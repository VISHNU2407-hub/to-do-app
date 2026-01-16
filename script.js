var tasks = [];

var input = document.querySelector("input");
var plus = document.getElementById("plus");
var tasklist = document.getElementById("task-list");

/* ---------- Load from LocalStorage ---------- */
var saved = JSON.parse(localStorage.getItem("tasks"));

if (saved) {
    saved.forEach(t => {
        input.value = t;
        plus.click();
    });
}
input.value = "";

/* ---------- Add by Enter ---------- */
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        plus.click();
    }
});

/* ---------- Add Task ---------- */
plus.addEventListener("click", () => {

    var text = input.value.trim();
    if (text === "") return;

    var task = document.createElement("div");
    task.classList.add("task-item");

    var textSpan = document.createElement("span");
    textSpan.textContent = text;

    textSpan.addEventListener("click", () => {
        textSpan.classList.toggle("done");
    });

    var dots = document.createElement("span");
    dots.textContent = "⋮";
    dots.classList.add("dots");
dots.style.cursor="pointer";
    var menu = document.createElement("div");
    menu.classList.add("menu");
    menu.style.cursor="pointer";

    dots.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    var renameBtn = document.createElement("div");
    renameBtn.textContent = "Rename";

    renameBtn.addEventListener("click", () => {
        menu.style.display = "none";

        var editInput = document.createElement("input");
        editInput.value = textSpan.textContent;

        textSpan.style.display = "none";
        task.append(editInput);
        editInput.focus();

        editInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                textSpan.textContent = editInput.value;
                textSpan.style.display = "inline";
                editInput.remove();
                saveTasks();
            }
        });
    });

    var deleteBtn = document.createElement("div");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        task.remove();
        tasks = tasks.filter(t => t !== textSpan.textContent);
        saveTasks();
    });

    menu.appendChild(renameBtn);
    menu.appendChild(deleteBtn);

    task.appendChild(textSpan);
    task.appendChild(dots);
    task.appendChild(menu);

    tasklist.appendChild(task);

    tasks.push(text);
    saveTasks();
    input.value = "";
});

/* ---------- Close menu on outside click ---------- */
document.addEventListener("click", () => {
    document.querySelectorAll(".menu").forEach(m => m.style.display = "none");
});

/* ---------- Save to LocalStorage ---------- */
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
