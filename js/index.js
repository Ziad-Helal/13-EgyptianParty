// GLOBAL VARIABLES
const animationDuration = 500;
const sidebarWidth = "250px";

// HEADER
const headerElement = document.querySelector("#pageHeader .logo");
styleHeader(headerElement);
$(window).on("scroll", () => styleHeader(headerElement));

// SIDEBAR OPEN BUTTON
$("#pageAside .openMenu").on("click", () => {
  $("#pageAside nav").animate({ width: sidebarWidth }, animationDuration);
});

// SIDEBAR CLOSE BUTTON
$("#pageAside .closeMenu").on("click", () => {
  $("#pageAside nav").animate({ width: "0" }, animationDuration);
});

// ACCORDION
document.querySelectorAll("details").forEach((element, index) => {
  if (index == 0) element.open = true;
  else element.open = false;

  $(element)
    .find("summary")
    .on("click", function (event) {
      event.preventDefault();
      const currentDetails = $(this).closest("details")[0];

      if (currentDetails.open) {
        $(this)
          .find("+ p")
          .slideUp(animationDuration, () => (currentDetails.open = false));
      } else {
        currentDetails.open = true;
        $(this).find("+ p").slideDown(animationDuration);
      }

      $("details summary").each((index, element) => {
        const currentDetails = $(element).closest("details")[0];
        if (element != this && currentDetails.open) {
          $(element)
            .find("+ p")
            .slideUp(animationDuration, () => (currentDetails.open = false));
        }
      });
    });
});

// COUNTDOWN
const daysElement = document.querySelector("#duration #days");
const hoursElement = document.querySelector("#duration #hours");
const minutesElement = document.querySelector("#duration #minutes");
const secondsElement = document.querySelector("#duration #seconds");

const futureDate = new Date("09 march 2024 11:00");
const now = new Date();
const difference = (futureDate - now) / 1000;

let days = Math.floor(difference / 60 / 60 / 24);
let hours = Math.floor((difference - days * 60 * 60 * 24) / 60 / 60);
let minutes = Math.floor(
  (difference - days * 60 * 60 * 24 - hours * 60 * 60) / 60
);
let seconds = Math.floor(
  difference - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60
);

const remainingTimeTillNextSecond =
  difference -
  difference -
  days * 60 * 60 * 24 -
  hours * 60 * 60 -
  minutes * 60 -
  seconds * 1000;

daysElement.innerText = `${days} D`;
hoursElement.innerText = `${hours} H`;
minutesElement.innerText = `${minutes} M`;
secondsElement.innerText = `${seconds} S`;

setTimeout(() => {
  if (seconds == 0) seconds = 60;
  secondsElement.innerText = `${--seconds} S`;

  setInterval(() => {
    if (seconds == 0) seconds = 60;
    secondsElement.innerText = `${--seconds} S`;
  }, 1000);

  setTimeout(() => {
    if (minutes == 0) minutes = 60;
    minutesElement.innerText = `${--minutes} M`;

    setInterval(() => {
      if (minutes == 0) minutes = 60;
      minutesElement.innerText = `${--minutes} M`;
    }, 60 * 1000);

    setTimeout(() => {
      if (hours == 0) hours = 24;
      hoursElement.innerText = `${--hours} H`;

      setInterval(() => {
        if (hours == 0) hours = 24;
        hoursElement.innerText = `${--hours} H`;
      }, 60 * 60 * 1000);

      setTimeout(() => {
        daysElement.innerText = `${--days} D`;

        setInterval(() => {
          daysElement.innerText = `${--days} D`;
        }, 24 * 60 * 60 * 1000);
      }, hours * 60 * 60 * 1000);
    }, minutes * 60 * 1000);
  }, seconds * 1000);
}, remainingTimeTillNextSecond);

// FORM MESSAGE
$("#contact form textarea").on("input", function (event) {
  const remainingCharacters = 100 - this.value.length;
  if (remainingCharacters > -1)
    document.querySelector("#contact form #charactersRemaining").innerText =
      remainingCharacters;
});

// FUNCTIONS
function styleHeader(element) {
  $(element).css(
    "backgroundColor",
    window.scrollY > 0 ? "rgba(214, 46, 51, 0.95)" : "transparent"
  );
}
