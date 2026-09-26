/* =========================================
   CHAMBER WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   CURRENT YEAR + LAST MODIFIED
========================================= */

const yearElement =
  document.getElementById("currentyear") ||
  document.getElementById("year");

const modifiedElement =
  document.getElementById("lastModified");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
  modifiedElement.textContent = document.lastModified;
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton =
  document.getElementById("menu-toggle");

const navMenu =
  document.getElementById("nav-menu");

if (menuButton && navMenu) {

  menuButton.addEventListener("click", () => {

    const isOpen =
      navMenu.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation"
        : "Open navigation"
    );

  });

}


/* =========================================
   LOAD MEMBERS
========================================= */

async function loadMembers() {

  const directory =
    document.getElementById("directory");

  if (!directory) return;

  try {

    const response =
      await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(
        `Members request failed: ${response.status}`
      );
    }

    const members =
      await response.json();

    directory.innerHTML = "";

    members.forEach((member) => {

      const article =
        document.createElement("article");

      article.className = "member";

      article.innerHTML = `
        <img
          src="images/${member.image}"
          alt="${member.name} business image"
          loading="lazy"
          width="600"
          height="450"
        >

        <h2>${member.name}</h2>

        <p>${member.address}</p>

        <p>${member.phone}</p>

        <p>
          Membership Level:
          ${member.membership}
        </p>

        <a
          href="${member.website}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
        </a>
      `;

      directory.appendChild(article);

    });

  } catch (error) {

    directory.innerHTML =
      "<p>Unable to load the member directory at this time.</p>";

    console.error(error);

  }

}


/* =========================================
   DIRECTORY GRID / LIST VIEW
========================================= */

const gridButton =
  document.getElementById("gridBtn");

const listButton =
  document.getElementById("listBtn");

const directory =
  document.getElementById("directory");

if (
  gridButton &&
  listButton &&
  directory
) {

  gridButton.addEventListener(
    "click",
    () => {

      directory.classList.add(
        "grid-view"
      );

      directory.classList.remove(
        "list-view"
      );

    }
  );


  listButton.addEventListener(
    "click",
    () => {

      directory.classList.add(
        "list-view"
      );

      directory.classList.remove(
        "grid-view"
      );

    }
  );

}


/* =========================================
   MEMBERSHIP MODALS
========================================= */

const modalOpenButtons =
  document.querySelectorAll(
    ".modal-open"
  );

const modalCloseButtons =
  document.querySelectorAll(
    ".modal-close"
  );


/* =========================================
   OPEN MEMBERSHIP MODAL
========================================= */

modalOpenButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const modalId =
          button.getAttribute(
            "data-modal"
          );

        const modal =
          document.getElementById(
            modalId
          );

        if (modal) {
          modal.showModal();
        }

      }
    );

  }
);


/* =========================================
   CLOSE MEMBERSHIP MODAL
========================================= */

modalCloseButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const modal =
          button.closest("dialog");

        if (modal) {
          modal.close();
        }

      }
    );

  }
);


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

document
  .querySelectorAll("dialog")
  .forEach((dialog) => {

    dialog.addEventListener(
      "click",
      (event) => {

        const rect =
          dialog.getBoundingClientRect();

        const clickedInside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        if (!clickedInside) {
          dialog.close();
        }

      }
    );

  });


/* =========================================
   MEMBERSHIP FORM TIMESTAMP
========================================= */

const timestamp =
  document.getElementById("timestamp");

if (timestamp) {

  timestamp.value =
    new Date().toISOString();

}


/* =========================================
   LOAD DIRECTORY MEMBERS
========================================= */

loadMembers();