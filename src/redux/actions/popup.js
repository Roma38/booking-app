export const OPEN_POPUP = "OPEN_POPUP";
export const CLOSE_POPUP = "CLOSE_POPUP";

export const openPopup = payload => ({ type: OPEN_POPUP, payload });
export const closePopup = () => ({ type: CLOSE_POPUP });