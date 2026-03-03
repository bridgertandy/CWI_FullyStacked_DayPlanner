import generateUID from "./UIDGenerator.js";
import StorageManager from "./dataStorage.js";

function initializeEventManager() {
  const addEventButton = document.getElementById("addEventButton");
  const cancelEventButton = document.getElementById("cancelEventButton");
  const eventForm = document.getElementById("eventForm");

  addEventButton.addEventListener("click", () => {
    showEventCreator();
  });

  cancelEventButton.addEventListener("click", () => {
    hideEventCreator();
  });

  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitEvent(e.target);
    hideEventCreator();
    
  // console.log(addEventButton, cancelEventButton, eventForm);
  });
}

/** Handle form submission for creating a new calendar event
 * @param {HTMLFormElement} eventForm - The form element containing event details
 * Extracts data from the form, creates an event object, and assigns it a unique identifier (UID)
 * Uses StorageManager to store the event in localStorage
 */
function submitEvent(eventForm) {
  const data = new FormData(eventForm);
  const event = Object.fromEntries(data);
  const id = generateUID();
  event.UID = id;
  StorageManager.saveEvent(event);
  console.log("Event saved (UID: " + id + ")");
}

function showEventCreator() {
  const eventPopupContainer = document.getElementById("eventPopupContainer");
  eventPopupContainer.classList.remove("hidden");
  eventPopupContainer.classList.add("visible");
}

function hideEventCreator() {
  const eventPopupContainer = document.getElementById("eventPopupContainer");
  eventPopupContainer.classList.remove("visible");
  eventPopupContainer.classList.add("hidden");
  eventForm.reset();
}

export { initializeEventManager };