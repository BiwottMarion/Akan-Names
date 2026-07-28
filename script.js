const maleNames = [
    "Kwasi",
    "Kwadwo",
    "Kwabena",
    "Kwaku",
    "Yaw",
    "Kofi",
    "Kwame"
];

const femaleNames = [
    "Akosua",
    "Adwoa",
    "Abenaa",
    "Akua",
    "Yaa",
    "Afua",
    "Ama"
];

const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
function validateDate(day, month, year) {
  if (!day || !month || !year) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  if (day < 1 || day > 31) {
    return false;
  }

  const candidateDate = new Date(year, month - 1, day);
  return (
    candidateDate.getFullYear() === year &&
    candidateDate.getMonth() === month - 1 &&
    candidateDate.getDate() === day
  );
}

function calculateDayOfWeek(day, month, year) {
  const date = new Date(year, month - 1, day);
  return date.getDay();
}

function getAkanName(day, month, year, gender) {
  if (!validateDate(day, month, year)) {
    throw new Error("Please enter a valid date.");
  }

  const dayIndex = calculateDayOfWeek(day, month, year);
  const selectedNames = gender === "male" ? maleNames : femaleNames;
  const name = selectedNames[dayIndex];

  return {
    dayName: daysOfWeek[dayIndex],
    name,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nameForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const birthdateInput = document.getElementById("birthdate");
    const genderInput = document.getElementById("gender");
    
    if (!birthdateInput.value || !genderInput.value) {
      alert("Please choose your birthdate and gender.");
      return;
    }

    const [year, month, day] = birthdateInput.value.split("-").map(Number);

    if (!validateDate(day, month, year)) {
      alert("The date you entered is invalid. Please try again.");
      return;
    }

    try {
      const { dayName, name } = getAkanName(day, month, year, genderInput.value);
      result.innerHTML ='<p>You were born on <strong>${dayName}</strong>.</p><p>Your Akan name is <strong>${name}</strong>.</p>';
      result.classList.add("visible");
      form.reset();
    } catch (error) {
      alert(error.message);
    }
  });
});