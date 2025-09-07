//accessing elements by ids
const form = document.querySelector("form");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneNumberInput = document.getElementById("phoneNumber");
const serviceCategoryInput = document.getElementById("serviceCategory");
const serviceTypeInput = document.getElementById("serviceType");
const masterInput = document.getElementById("master");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const commentInput = document.getElementById("comment");
const button = document.getElementById("submit");

const inputArray = [firstNameInput, lastNameInput, phoneNumberInput, serviceCategoryInput, serviceTypeInput, dateInput, timeInput];

//scaling commentInput
commentInput.addEventListener("input", () => {
    commentInput.style.height = "auto";
    commentInput.style.height = commentInput.scrollHeight + 4 + "px";
});

//removing wrong-class
inputArray.forEach(input => {
    input.addEventListener("focus", () => {
        input.classList.remove("wrong");
    });
});

//unlocking inputs depending on serviceCategory
const services = {
    massage: ["Загальний масаж", "Заспокійливий/бадьорливий масаж", "Лікувальний масаж", "Лікувальний масаж однієї зони", "Реабілітація після травм", "Мануальна терапія", "Лікувальний масаж і мануальна терапія", "Ручний антицилюлітний масаж", "Лікувальний масаж за допомогою вакуумної банки", "Антицилюлітний масаж за допомогою вакуумної банки", "Лікувальний масаж при порушенні постави", "Лімфодринажний масаж однієї зони"],
    hairCut: ["Борода", "Соціальна чоловіча стрижка", "Соціальна жіноча стрижка", "Жіноча стрижка", "Чоловіча стрижка", "Стрижка під машинку"],
    hairDressing: ["Локони до плеча", "Локони до лопаток", "Локони до поясу", "Густина", "Зачіски/хвіст", "Холодне відновлювання від довжини", "Пілінг голови", "Мийка/сушка волосся", "Мийка/сушка волосся з укладанням на Браш/Дайсон"],
    hairDyeing: ["Фарбування в один тон", "Фарбування в один тон (довге волосся)", "Фарбування коренів", "Мелірування", "Airtouch (Аїртач)", "Total blond (Повне блондування)"],
    manicur: ["Манікюр і покриття", "Зміцнення гелем", "Нарощування 1-2 довжини", "Ремонт, нарощування (1 ніготь)", "Гігієнічний манікюр", "Дизайн 1 нігтя", "Дизайн усіх нігтів", "Френч", "Обʼємні фігурки"],
    pedicur: ["Повний педикюр і покриття", "Покриття", "Гігієнічний педикюр"],
    cosmetics: ["Комбінована чистка обличчя", "Чистка обличчя з пілінгом", "Карбоксітерапія", "Пілінг", "Класичний масаж обличчя", "Масаж обличчя Кобідо"],
    eyebrows: ["Ламінування брів", "Ламінування вій", "Фарбування брів", "Фарбування вій", "Моделювання брів", "Корекція та фарбування брів"],
    depilation: ["Пахви", "Глибоке бікіні", "Класичне бікіні", "Ноги повністю", "Ноги до колін", "Руки повністю", "Руки до ліктів", "Вусики", "Підборіддя", "Сідниці"]
};

const masters = {
    massage: ["Вадим Толстік", "Полтавченко Наталія"],
    hairCut: ["Інна Сіра", "Єлизавета Анохіна"],
    hairDressing: ["Анна Кононенко"],
    hairDyeing: ["Інна Сіра", "Інна Нємцева"],
    manicur: ["Ірина Білоусова"],
    pedicur: ["Ірина Білоусова"],
    cosmetics: ["Ангеліна Дехніч"],
    eyebrows: ["Арміне Караханян"],
    depilation: ["Олександра Татаренко"]
};

function createOption(value, text, input) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    input.appendChild(option);
}

function defineInput(serviceCategory, input, array) {
    let inputType = "";
    if (input === serviceTypeInput) {
        inputType = "тип послуги";
    }
    else if (input === masterInput) {
        inputType = "майстра";
    }
    input.innerHTML = "<option value=\"\" disabled selected hidden>Оберіть " + inputType + "</option>";
    array[serviceCategory].forEach(service => createOption(service, service, input));
}

serviceCategoryInput.addEventListener("change", () => {
    if (serviceCategoryInput.value !== "") {
        serviceTypeInput.classList.remove("unavailable");
        defineInput(serviceCategoryInput.value, serviceTypeInput, services);
        masterInput.classList.remove("unavailable");
        defineInput(serviceCategoryInput.value, masterInput, masters);
        dateInput.classList.remove("unavailable");
        timeInput.classList.remove("unavailable");
        serviceTypeInput.disabled = false;
        masterInput.disabled = false;
        dateInput.disabled = false;
        timeInput.disabled = false;
    }
});

//setting dateInput
function calcMinDate(){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let yearTomorrow = tomorrow.getFullYear();
    let monthTomorrow = tomorrow.getMonth() + 1;
    monthTomorrow = String(monthTomorrow).padStart(2, "0");
    let dayTomorrow = tomorrow.getDate();
    dayTomorrow = String(dayTomorrow).padStart(2, "0");
    return yearTomorrow + "-" + monthTomorrow + "-" + dayTomorrow;
}

function calcMaxDate(){
    let nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    let yearNextMonth = nextMonth.getFullYear();
    let monthNextMonth = nextMonth.getMonth() + 1;
    monthNextMonth = String(monthNextMonth).padStart(2, "0");
    let dayNextMonth = nextMonth.getDate();
    dayNextMonth = String(dayNextMonth).padStart(2, "0");
    return yearNextMonth + "-" + monthNextMonth + "-" + dayNextMonth;
}

function defineDateInput() {
    dateInput.min = calcMinDate();
    dateInput.max = calcMaxDate();
    dateInput.value = dateInput.min;
}
defineDateInput();

//setting timeInput
let appointments = [];
let appointmentHours = [];
let appointmentMasters = [];
let appointmentServiceCategories = [];
let appointmentsPerHour = {9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0};

const masterIds = {
    0: "none",
    1: "Вадим Толстік",
    2: "Наталія Полтавченко",
    3: "Інна Сіра",
    4: "Єлизавета Анохіна",
    5: "Анна Кононенко",
    6: "Інна Нємцева",
    7: "Ірина Білоусова",
    8: "Ангеліна Дехніч",
    9: "Арміне Караханян",
    10: "Олександра Татаренко"
};

const serviceDuration = {
    massage: 0,
    hairCut: 0,
    hairDressing: 0,
    hairDyeing: 0,
    manicur: 1,
    pedicur: 1,
    cosmetics: 0,
    eyebrows: 0,
    depilation: 0
};

async function getAppointments() {
    const response = await fetch("/sendHours", {
        method: "POST",
        body: new FormData(form)
    });
    if (response.ok) {
        return await response.json();
    }
    else {
        alert("Помилка при зверненні до /sendHours.");
        return [];
    }
}

async function hourIsFree(hour) {
    if (hour === 9) {
        if (appointmentsPerHour[hour] + appointmentsPerHour[hour + serviceDuration[serviceCategoryInput.value]] >= masters[serviceCategoryInput.value].length) {
            return false;
        }
    }
    else if (hour === 20) {
        if (appointmentsPerHour[hour] + appointmentsPerHour[hour - serviceDuration[serviceCategoryInput.value]] >= masters[serviceCategoryInput.value].length) {
            return false;
        }
    }
    else {
        if (appointmentsPerHour[hour] + appointmentsPerHour[hour - serviceDuration[serviceCategoryInput.value]] + appointmentsPerHour[hour + serviceDuration[serviceCategoryInput.value]] >= masters[serviceCategoryInput.value].length) {
            return false;
        }
    }
    if (masterInput.value !== "") {
        for (let i = 0; i < appointmentHours.length; i++) {
            if (appointmentHours[i] === hour || appointmentHours[i] === hour - serviceDuration[serviceCategoryInput.value] || appointmentHours[i] === hour + serviceDuration[serviceCategoryInput.value]) {
                if (masterIds[appointmentMasters[i]] === masterInput.value) {
                    return false;
                }
            }
        }
    }
    return true;
}

async function calcFreeHours() {
    appointments = await getAppointments();
    appointmentHours = appointments.map(a => a[0]);
    appointmentMasters = appointments.map(a => a[1]);
    appointmentServiceCategories = appointments.map(a => a[2]);
    appointmentsPerHour = {9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0};
    for (let i = 9; i < 21; i++) {
        for (let j = 0; j < appointmentHours.length; j++) {
            if (appointmentHours[j] === i && appointmentServiceCategories[j] === serviceCategoryInput.value) {
                appointmentsPerHour[i]++;
            }
        }
    }
    let freeHours = [];
    for (let i = 9; i < 21; i++) {
        if (await hourIsFree(i)) {
            freeHours.push(i + ":00");
        }
    }
    return freeHours;
}

async function defineTimeInput() {
    const freeHours = await calcFreeHours();
    timeInput.innerHTML = "<option value=\"\" disabled selected hidden>Оберіть час</option>";
    freeHours.forEach(hour => createOption(hour, hour, timeInput));
}
serviceCategoryInput.addEventListener("change", defineTimeInput);
masterInput.addEventListener("change", defineTimeInput);
dateInput.addEventListener("change", defineTimeInput);

//submitting
function checkInputs() {
    let checker = false;
    for (let input of inputArray) {
        if (input.value === "") {
            input.classList.add("wrong");
            checker = true;
        }
    }
    for (let char of phoneNumberInput.value) {
        if ((char < '0' || char > '9') && char !== '+' && char !== '-' && char !== '(' && char !== ')' && char !== ' ') {
            phoneNumberInput.classList.add("wrong");
            checker = true;
        }
    }
    return checker;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let hasErrors = checkInputs();
    if (hasErrors) {
        return;
    }

    const formData = new FormData(form);
    const response = await fetch("/submit", {
        method: "POST",
        body: formData
    });
    if (response.status === 429) {
        alert("Ви зробили занадто багато запитів. Спробуйте пізніше.");
    }
    else if (response.ok) {
        firstNameInput.value = "";
        lastNameInput.value = "";
        phoneNumberInput.value = "";
        serviceCategoryInput.value = "";
        serviceTypeInput.value = "";
        masterInput.value = "";
        dateInput.value = dateInput.min;
        timeInput.value = "";
        commentInput.value = "";
        serviceTypeInput.classList.add("unavailable");
        masterInput.classList.add("unavailable");
        dateInput.classList.add("unavailable");
        timeInput.classList.add("unavailable");
        serviceTypeInput.disabled = true;
        masterInput.disabled = true;
        dateInput.disabled = true;
        timeInput.disabled = true;
        appointments = await getAppointments();
        appointmentHours = appointments.map(appointments => appointments[0]);
        appointmentMasters = appointments.map(appointments => appointments[1]);
        alert("Ваша заява успішно відправлена! Ми скоро зв'яжемося з Вами.");
    }
    else {
        alert("Упс, щось пішло не так. Спробуйте ще раз.");
    }
});