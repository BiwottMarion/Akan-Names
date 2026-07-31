const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const form = document.getElementById("name-form");
const resultBox = document.getElementById("result");
const resultDay = document.getElementById("result-day");
const resultName = document.getElementById("resultnm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("in the fun")

  const day = parseInt(document.getElementById("date").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);
  const gender = document.getElementById("gender").value;

  const inputIsValid = validateInput(day, month, year, gender);
  if (inputIsValid === false) {
    return;
  }

  const dayNumber = calculateDayOfWeek(day, month, year);

  let name;
  if (gender === "male") {
    name = maleNames[dayNumber];
  } else {
    name = femaleNames[dayNumber];
  }

  showResult(name, weekdayNames[dayNumber]);
});

function validateInput(day, month, year, gender) {
  if (isNaN(day) || day < 1 || day > 31) {
    alert("Please enter a valid day between 1 and 31.");
    return false;
  }

  if (isNaN(month) || month < 1 || month > 12) {
    alert("Please enter a valid month between 1 and 12.");
    return false;
  }

  if (isNaN(year) || year < 1000 || year > 9999) {
    alert("Please enter a valid 4-digit year.");
    return false;
  }

  if (gender === "") {
    alert("Please select a gender.");
    return false;
  }

  return true;
}

function calculateDayOfWeek(day, month, year) {
  if (month === 1 || month === 2) {
    month = month + 12;
    year = year - 1;
  }

  const century = Math.floor(year / 100);
  const yearInCentury = year % 100;

  const rawResult =
    Math.floor(century / 4) -
    (2 * century) +
    yearInCentury +
    Math.floor(yearInCentury / 4) +
    Math.floor((26 * (month + 1)) / 10) +
    day;

  const zellerResult = ((rawResult % 7) + 7) % 7;
  const dayOfWeek = (zellerResult + 6) % 7;

  return dayOfWeek;
}

function showResult(name, weekday) {
  resultDay.textContent = "Born on a " + weekday;
  resultName.textContent = name;
  resultBox.style.display = "block";
}