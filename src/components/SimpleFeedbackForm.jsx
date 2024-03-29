import { useState, useCallback, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import FilePreview from "./FilePreview";

import { positionStyles, popUpPositionStyles } from "../placement";

const MAX_FILE_SIZE_BYTES = 20971520;

export default function SimpleFeedbackForm({ appKey, direction, options }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const formRef = useRef(null);
  const inputFileRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = useCallback(async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const data = new FormData(event.target);
      await fetch("https://feedbackbulb.com/api/values", {
        method: "POST",
        body: data,
      });
      handleRemoveImage();
    } catch (err) {
      throw err;
    }
    setLoading(false);
  }, []);

  const handleFileAttached = useCallback((e) => {
    if (e.target.files[0].size > MAX_FILE_SIZE_BYTES) {
      // file too big
      setFile(null);
      e.target.value = "";
      return;
    }
    setFile(URL.createObjectURL(e.target.files[0]));
    // e.target.value = "";
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].size > MAX_FILE_SIZE_BYTES) {
        // file too big
        setFile(null);
        inputFileRef.current.value = "";
        return;
      }
      setFile(URL.createObjectURL(e.dataTransfer.files[0]));
      inputFileRef.current.files = e.dataTransfer.files;
      // inputFileRef.current.value = "";
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setFile(null);
  }, []);

  return (
    <Popover className={`fbb-fixed ${positionStyles(direction)} fbb-z-50`}>
      <Popover.Button
        className="fbb-rounded-full zofxcta fbb-p-fbb2 fbb-text-black fbb-shadow-lg border-t-fbb2 focus-visible:fbb-outline focus-visible:fbb-outline-2 focus-visible:fbb-outline-offset-fbb2 "
        title="Send feedback"
        style={{
          "--fbb-primary": options.primaryColor,
          "--fbb-primary-dark": options.primaryDarkColor,
          "--fbb-hover-dark": options.hoverDarkColor,
          "--fbb-hover": options.hoverColor,
          "--fbb-fill": options.fillColor,
          "--fbb-fill-dark": options.fillColorDark,
        }}
      >
        <MegaphoneIcon className="fbb-w-fbb6 fbb-h-fbb6" />
      </Popover.Button>

      <Transition
        enter="fbb-transition fbb-duration-100 fbb-ease-out"
        enterFrom="fbb-transform fbb-scale-95 fbb-opacity-0"
        enterTo="fbb-transform fbb-scale-100 fbb-opacity-100"
        leave="fbb-transition fbb-duration-75 fbb-ease-out"
        leaveFrom="fbb-transform fbb-scale-100 fbb-opacity-100"
        leaveTo="fbb-transform fbb-scale-95 fbb-opacity-0"
      >
        <Popover.Panel
          className={`fbb-fixed fbb-box-border fbb-border-fbb2 fbb-border-gray-400/25 dark:fbb-border-slate-800 fbb-w-[350px] sm:fbb-w-[400px] fbb-bg-white dark:fbb-bg-slate-900 fbb-rounded-md fbb-shadow-lg fbb-z-10 ${popUpPositionStyles(
            direction
          )}`}
        >
          {({ close }) => (
            <form
              ref={formRef}
              className={`fbb-py-fbb4 fbb-overflow-y-auto fbb-max-h-[82vh] `}
              onSubmit={async (ev) => {
                await handleSubmit(ev);
                close();
              }}
              style={{
                "--fbb-primary": options.primaryColor,
                "--fbb-primary-dark": options.primaryDarkColor,
                "--fbb-hover-dark": options.hoverDarkColor,
                "--fbb-hover": options.hoverColor,
                "--fbb-fill": options.fillColor,
                "--fbb-fill-dark": options.fillColorDark,
              }}
            >
              <input
                type="hidden"
                className="fbb-hidden"
                name="value[key]"
                value={appKey}
              />
              <input
                type="hidden"
                className="fbb-hidden"
                name="value[attributes][url]"
                value={`${window.location}`}
              />
              <div className="fbb-px-fbb2 sm:fbb-px-fbb4">
                <h2 className="fbb-text-base fbb-font-semibold fbb-leading-7 fbb-text-gray-900 dark:fbb-text-white">
                  {options.title}
                </h2>
                <p className="fbb-text-sm fbb-leading-6 fbb-text-gray-600 dark:fbb-text-white">
                  {options.subtitle}
                </p>

                <div className="fbb-mt-fbb4 fbb-grid fbb-grid-cols-1 fbb-gap-x-fbb6 fbb-gap-y-fbb4 sm:fbb-grid-cols-6">
                  {options.showEmail === "true" ? (
                    <div className="sm:fbb-col-span-full">
                      <label
                        htmlFor="value[email]"
                        className="fbb-block fbb-text-sm fbb-text-start fbb-font-medium fbb-leading-6 fbb-text-gray-900 dark:fbb-text-white"
                      >
                        {options.emailLabel}
                      </label>
                      <div className="fbb-mt-fbb2">
                        <div className="fbb-flex fbb-rounded-md fbb-shadow-sm fbb-ring-1 fbb-ring-inset fbb-ring-gray-300 sm:fbb-max-w-md">
                          <input
                            type="email"
                            name="value[email]"
                            id="value[email]"
                            autoComplete="email"
                            className="fbb-px-fbb3 fbb-block fbb-flex-1 fbb-border-0 fbb-bg-transparent fbb-py-fbb1.5 fbb-text-gray-900 dark:fbb-text-white placeholder:fbb-text-gray-400 dark:fbb-bg-slate-800 sm:fbb-text-sm sm:fbb-leading-6 fbb-ring-gray-300 fbb-rounded focus:fbb-ring-2 focus:fbb-ring-inset"
                            placeholder={options.emailPlaceholder}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="fbb-col-span-full">
                    <label
                      htmlFor="value[content]"
                      className="fbb-block fbb-text-sm fbb-text-start fbb-font-medium fbb-leading-6 fbb-text-gray-900 dark:fbb-text-white"
                    >
                      {options.textLabel}
                    </label>
                    <div className="fbb-mt-fbb2">
                      <textarea
                        id="value[content]"
                        name="value[content]"
                        rows={2}
                        required
                        placeholder={options.textPlaceholder}
                        className="fbb-py-fbb2 fbb-px-fbb3 fbb-bg-white dark:fbb-bg-slate-800 fbb-block fbb-w-full fbb-rounded-md fbb-border-0 fbb-text-gray-900 dark:fbb-text-white fbb-shadow-sm fbb-ring-1 fbb-ring-inset fbb-ring-gray-300 placeholder:fbb-text-gray-400 focus:fbb-ring-2 focus:fbb-ring-inset sm:fbb-py-fbb1.5 sm:fbb-text-sm sm:fbb-leading-6"
                        defaultValue={""}
                      />
                    </div>
                  </div>

                  {options.showAddAttachment === "true" ? (
                    <div className="fbb-col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="fbb-block fbb-text-sm fbb-text-start fbb-font-medium fbb-leading-6 fbb-text-gray-900 dark:fbb-text-white"
                      >
                        {options.addAttachmentLabel}
                      </label>
                      <div
                        className={
                          "fbb-relative fbb-mt-fbb2 fbb-flex fbb-justify-center fbb-rounded-lg fbb-border fbb-px-fbb6 fbb-py-fbb4" +
                          (dragActive
                            ? " fbb-border-2 fbb-border-solid zofxborder"
                            : " fbb-border-dashed fbb-border-gray-900/25 dark:fbb-border-white/25")
                        }
                      >
                        <div
                          className="text-center relative"
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                        >
                          <FilePreview file={file} />
                          <div className="fbb-mt-fbb4 fbb-flex fbb-text-sm fbb-leading-6 fbb-text-gray-600 fbb-justify-center">
                            <label
                              htmlFor="file"
                              className="fbb-cursor-pointer fbb-rounded-md fbb-font-semibold fbb-text-brand-dark focus-within:fbb-outline-none focus-within:fbb-ring-2 focus-within:fbb-ring-brand focus-within:fbb-ring-offset-2 hover:fbb-text-brand-light"
                            >
                              <span className="zofxlabel">
                                {options.attachmentUploadButton}
                              </span>
                              <input
                                id="file"
                                ref={inputFileRef}
                                name="file"
                                type="file"
                                className="fbb-absolute fbb-w-full fbb-h-full fbb-top-0 fbb-bottom-0 fbb-left-0 fbb-right-0 fbb-opacity-0 fbb-cursor-pointer"
                                accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/*,image/*,video/*"
                                onChange={handleFileAttached}
                              />
                            </label>
                            <p className="fbb-pl-fbb1 dark:fbb-text-white">
                              {options.attachmentUploadCaption}
                            </p>
                          </div>

                          <p className="fbb-text-xs fbb-leading-5 fbb-text-gray-600 dark:fbb-text-white fbb-text-center">
                            {options.attachmentLimits}
                          </p>

                          {file ? (
                            <button
                              className="fbb-absolute fbb-top-fbb1 fbb-right-fbb1 zofxcta fbb-rounded-full fbb-cursor-pointer"
                              title="Remove attachment"
                              onClick={handleRemoveImage}
                            >
                              <TrashIcon
                                className="fbb-w-fbb6 fbb-h-fbb6 fbb-m-fbb2"
                                aria-hidden="true"
                              />
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="fbb-mt-fbb6 fbb-flex fbb-items-center fbb-px-fbb2 sm:fbb-px-fbb4">
                <button
                  type="submit"
                  className={`zofxctalabel fbb-inline-flex fbb-items-center fbb-justify-center fbb-rounded-md fbb-w-full  fbb-px-fbb3 fbb-py-fbb2 fbb-text-sm fbb-font-semibold fbb-shadow-sm  ${
                    loading
                      ? "zofxdisabled fbb-cursor-not-allowed"
                      : "zofxcta focus-visible:fbb-outline focus-visible:fbb-outline-2 focus-visible:fbb-outline-offset-2 "
                  }`}
                >
                  {loading ? (
                    <svg
                      className="fbb-animate-spin fbb-mr-fbb3 fbb-h-fbb5 fbb-w-fbb5 fbb--ml-fbb4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="fbb-opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {options.submitButtonLabel}
                </button>
              </div>
              <p className="fbb-mt-fbb4 fbb-text-xs fbb-text-center fbb-font-light fbb-text-gray-900 dark:fbb-text-white">
                Powered by{" "}
                <a href="https://feedbackbulb.com">
                  <span className="fbb-text-sm">Feedback</span>
                  <span className="fbb-text-sm fbb-font-medium">Bulb</span>
                </a>
              </p>
            </form>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
