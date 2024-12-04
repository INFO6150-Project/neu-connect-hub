// import { v4 as uuid } from "uuid";
// import { SET_ALERT, REMOVE_ALERT } from "./types";

// export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
//   const id = uuid();

//   dispatch({
//     type: SET_ALERT,
//     payload: { id, msg, alertType },
//   });

//   setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
// };

// trying something new to remove the alert with an animation by
//adding class removeing then start the removal process before dispatch
import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  (msg, alertType, timeout = 3000) =>
  (dispatch) => {
    const id = uuid();

    dispatch({
      type: SET_ALERT,
      payload: { id, msg, alertType },
    });

    // Start removal process before dispatch
    setTimeout(() => {
      const alertElement = document.querySelector(`[data-alert-id="${id}"]`);
      if (alertElement) {
        alertElement.classList.add("removing");

        // Wait for animation to complete before removing from state
        setTimeout(() => {
          dispatch({ type: REMOVE_ALERT, payload: id });
        }, 500); // Match this with animation duration
      }
    }, timeout - 500); // Subtract animation duration from timeout
  };
