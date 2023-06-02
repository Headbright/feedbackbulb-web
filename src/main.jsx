import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const DEFAULT_OPTIONS = {
  title: "Send feedback",
  subtitle: "We'd love to hear from you",
  textLabel: "Describe what's happening",
  textPlaceholder: "Remember not to include personal information.",
  submitButtonLabel: "Submit",
  showEmail: "false",
  emailLabel: "Email",
  emailPlaceholder: "Type your email address",
  debugRequests: "true",
  showAddAttachment: "true",
  addAttachmentLabel: "Attachment",
  attachmentUploadButton: "Upload a file",
  attachmentUploadCaption: "or drag and drop",
  attachmentLimits: "Image, Video, Audio, Document up to 10MB",
  primaryColor: "#FDB713",
  primaryDarkColor: "#DE9C02",
  hoverColor: "#FEE09A",
  hoverDarkColor: "#FEE09A",
  fillColor: "#111213",
  fillColorDark: "#111213",
};

const getOptions = (dataset) => {
  let options = { ...DEFAULT_OPTIONS };
  for (const prop in dataset) {
    const optionName = prop.split(":")[1];
    if (optionName && Object.hasOwn(DEFAULT_OPTIONS, optionName)) {
      options[optionName] = dataset[prop];
    }
  }
  return options;
};

const targetElements = document.querySelectorAll("[data-fbb-feedback]");
targetElements.forEach((el) => {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <App
        appKey={el.dataset.fbbFeedback}
        direction={el.dataset.fbbDirection}
        options={getOptions(el.dataset)}
      />
    </React.StrictMode>
  );
});
