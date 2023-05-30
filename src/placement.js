export const BOTTOM_TRAILING = "fbb-bottom-10 fbb-right-10";
export const BOTTOM_LEADING = "fbb-bottom-10 fbb-left-10";
export const TOP_LEADING = "fbb-top-10 fbb-left-10";
export const TOP_TRAILING = "fbb-top-10 fbb-right-10";
export const VALID_PLACEMENTS = [
  BOTTOM_TRAILING,
  BOTTOM_LEADING,
  TOP_LEADING,
  TOP_TRAILING,
];

export const POPUP_BOTTOM_TRAILING =
  "fbb-bottom-12 sm:fbb-bottom-8 -fbb-right-10 sm:fbb-right-10";
export const POPUP_BOTTOM_LEADING =
  "fbb-bottom-12 sm:fbb-bottom-8 -fbb-left-10 sm:fbb-left-10";
export const POPUP_TOP_LEADING = "fbb-top-0 -fbb-left-10 sm:fbb-left-11";
export const POPUP_TOP_TRAILING = "fbb-top-0 -fbb-right-10 sm:fbb-right-11";

export const positionStyles = (direction) => {
  if (!direction) {
    // assume lower-right
    return BOTTOM_TRAILING;
  }
  switch (direction) {
    case "bottom-trailing":
      return BOTTOM_TRAILING;
    case "bottom-leading":
      return BOTTOM_LEADING;
    case "top-leading":
      return TOP_LEADING;
    case "top-trailing":
      return TOP_TRAILING;
    default:
      throw new Error(
        `Invalid value for attribute direction: '${direction}'. Expected one of: ${VALID_PLACEMENTS.join(
          ","
        )}`
      );
  }
};

export const popUpPositionStyles = (direction) => {
  if (!direction) {
    // assume lower-right
    return BOTTOM_TRAILING;
  }
  switch (direction) {
    case "bottom-trailing":
      return POPUP_BOTTOM_TRAILING;
    case "bottom-leading":
      return POPUP_BOTTOM_LEADING;
    case "top-leading":
      return POPUP_TOP_LEADING;
    case "top-trailing":
      return POPUP_TOP_TRAILING;
    default:
      throw new Error(
        `Invalid value for attribute direction: '${direction}'. Expected one of: ${VALID_PLACEMENTS.join(
          ","
        )}`
      );
  }
};
