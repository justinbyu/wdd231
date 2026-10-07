const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#plan-summary");
const message = document.querySelector("#action-message");

const fields = [
  ["Name", params.get("name")],
  ["Email", params.get("email")],
  ["Destination", params.get("destination")],
  ["Travel style", params.get("style")],
  ["Estimated budget", params.get("budget")],
  ["Preferred season", params.get("season")],
  ["Travelers", params.get("travelers")],
  ["Additional preferences", params.get("notes")]
];

const safeValue = (value) => value && value.trim() ? value.trim() : "Not provided";

const name = safeValue(params.get("name"));

message.textContent = name === "Not provided"
  ? "Here is the information submitted from your Wander Plan form."
  : `Thanks, ${name}! Here is the information submitted from your Wander Plan form.`;

summary.replaceChildren(
  ...fields.map(([label, value]) => {
    const item = document.createElement("div");
    item.className = "summary-item";

    const labelElement = document.createElement("strong");
    labelElement.textContent = label;

    const valueElement = document.createElement("span");
    valueElement.textContent = safeValue(value);

    item.append(labelElement, valueElement);
    return item;
  })
);
