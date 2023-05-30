import { useState, useCallback, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";

import { positionStyles, popUpPositionStyles } from "../placement";

export default function SimpleFeedbackForm({ appKey, direction, options }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const formRef = useRef(null);
  const inputFileRef = useRef(null);

  const handleSubmit = useCallback(async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const data = new FormData(event.target);
      await fetch("https://feedbackbulb.com/api/values", {
        method: "POST",
        body: data,
      });
      setFile(null)
    } catch (err) {
      throw err
    }
    setLoading(false);
  }, []);

  const handleFileAttached = useCallback((e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }, []);

  return (
    <Popover className={`fbb-fixed ${positionStyles(direction)}`}>
      <Popover.Button
        className="fbb-rounded-full zofxcta fbb-p-2 fbb-text-black fbb-shadow-lg border-t-2 focus-visible:fbb-outline focus-visible:fbb-outline-2 focus-visible:fbb-outline-offset-2 "
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
        <MegaphoneIcon className="fbb-w-6 fbb-h-6" />
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
          className={`fbb-fixed fbb-box-border fbb-border-2 fbb-border-gray-400/25 dark:fbb-border-slate-800 fbb-w-[400px] fbb-bg-white dark:fbb-bg-slate-900 fbb-rounded-md fbb-shadow-lg fbb-z-10 ${popUpPositionStyles(
            direction
          )}`}
        >
          {({ close }) => (
            <form
              ref={formRef}
              className={`fbb-py-4 fbb-overflow-y-auto fbb-max-h-[82vh] `}
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
              <div className="fbb-px-2 sm:fbb-px-4">
                <h2 className="fbb-text-base fbb-font-semibold fbb-leading-7 fbb-text-gray-900 dark:fbb-text-white">
                  {options.title}
                </h2>
                <p className="fbb-text-sm fbb-leading-6 fbb-text-gray-600 dark:fbb-text-white">
                  {options.subtitle}
                </p>

                <div className="fbb-mt-4 fbb-grid fbb-grid-cols-1 fbb-gap-x-6 fbb-gap-y-4 sm:fbb-grid-cols-6">
                  {options.showEmail === "true" ? (
                    <div className="sm:fbb-col-span-full">
                      <label
                        htmlFor="value[email]"
                        className="fbb-block fbb-text-sm fbb-text-start fbb-font-medium fbb-leading-6 fbb-text-gray-900 dark:fbb-text-white"
                      >
                        {options.emailLabel}
                      </label>
                      <div className="fbb-mt-2">
                        <div className="fbb-flex fbb-rounded-md fbb-shadow-sm fbb-ring-1 fbb-ring-inset fbb-ring-gray-300 sm:fbb-max-w-md">
                          <input
                            type="email"
                            name="value[email]"
                            id="value[email]"
                            autoComplete="email"
                            className="fbb-px-3 fbb-block fbb-flex-1 fbb-border-0 fbb-bg-transparent fbb-py-1.5 fbb-text-gray-900 dark:fbb-text-white placeholder:fbb-text-gray-400 dark:fbb-bg-slate-800 sm:fbb-text-sm sm:fbb-leading-6 fbb-ring-gray-300 fbb-rounded focus:fbb-ring-2 focus:fbb-ring-inset"
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
                    <div className="fbb-mt-2">
                      <textarea
                        id="value[content]"
                        name="value[content]"
                        rows={2}
                        required
                        placeholder={options.textPlaceholder}
                        className="fbb-py-2 fbb-px-3 fbb-bg-white dark:fbb-bg-slate-800 fbb-block fbb-w-full fbb-rounded-md fbb-border-0 fbb-text-gray-900 dark:fbb-text-white fbb-shadow-sm fbb-ring-1 fbb-ring-inset fbb-ring-gray-300 placeholder:fbb-text-gray-400 focus:fbb-ring-2 focus:fbb-ring-inset sm:fbb-py-1.5 sm:fbb-text-sm sm:fbb-leading-6"
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
                      <div className="fbb-relative fbb-mt-2 fbb-flex fbb-justify-center fbb-rounded-lg fbb-border fbb-border-dashed fbb-border-gray-900/25 dark:fbb-border-white/25 fbb-px-6 fbb-py-4">
                        <div className="text-center">
                          {!file ? (
                            <PhotoIcon
                              className="fbb-mx-auto fbb-h-12 fbb-w-12 fbb-text-gray-300"
                              aria-hidden="true"
                            />
                          ) : (
                            <img
                              className="fbb-h-18 fbb-w-18 fbb-m-auto fbb-rounded-md"
                              src={file}
                              alt=""
                              onClick={(ev) => {
                                ev.preventDefault();
                                setFile(null);
                                inputFileRef.value = null;
                              }}
                            />
                          )}

                          <div className="fbb-mt-4 fbb-flex fbb-text-sm fbb-leading-6 fbb-text-gray-600">
                            <label
                              htmlFor="file"
                              className="fbb-cursor-pointer fbb-rounded-md fbb-font-semibold fbb-text-brand-dark focus-within:fbb-outline-none focus-within:fbb-ring-2 focus-within:fbb-ring-brand focus-within:fbb-ring-offset-2 hover:fbb-text-brand-light"
                            >
                              <span className="zofxlabel">{options.attachmentUploadButton}</span>
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
                            <p className="fbb-pl-1 dark:fbb-text-white">
                              {options.attachmentUploadCaption}
                            </p>
                          </div>

                          <p className="fbb-text-xs fbb-leading-5 fbb-text-gray-600 dark:fbb-text-white">
                            {options.attachmentLimits}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="fbb-mt-6 fbb-flex fbb-items-center fbb-px-2 sm:fbb-px-4">
                <button
                  type="submit"
                  className={`zofxctalabel fbb-inline-flex fbb-items-center fbb-justify-center fbb-rounded-md fbb-w-full  fbb-px-3 fbb-py-2 fbb-text-sm fbb-font-semibold fbb-shadow-sm  ${
                    loading
                      ? "zofxdisabled fbb-cursor-not-allowed"
                      : "zofxcta focus-visible:fbb-outline focus-visible:fbb-outline-2 focus-visible:fbb-outline-offset-2 "
                  }`}
                >
                  {loading ? (
                    <svg
                      className="fbb-animate-spin fbb-mr-3 fbb-h-5 fbb-w-5 fbb--ml-4"
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
              <p class="fbb-mt-4 fbb-text-sm fbb-text-center">Powered by <a href="https://feedbackbulb.com"><span class="fbb-font-medium">Feedback</span><span class="fbb-text-brand fbb-font-medium">Bulb</span></a></p>
            </form>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
