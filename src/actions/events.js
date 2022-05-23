import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";
import { toast } from "react-toastify";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {

    const { uid, name } = getState().auth;
    try {
      const resp = await fetchWithToken('events', event, 'POST');
      const body = await resp.json();
  
      console.log(body)
      if(body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name
        }
        dispatch(eventAddNew(event));
        return toast('🏥 Cita guardada correctamente!', {
          position: "top-right",
          theme: "dark",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
      }else{
        
      }
      
    } catch (error) {
      console.log(error);
      return toast(error, {
        position: "top-right",
        theme: "dark",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
    
      
    }
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const eventUnsetActive = () => ({ type: types.eventUnsetActive })

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await resp.json();
      if(body.ok) {
        dispatch(eventUpdate(event));
        return toast('🏥 Cita actualizada correctamente', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
      }else{
        return toast.error(body.msg, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await resp.json();
      if(body.ok) {
        dispatch(eventDelete());
      }else{
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}

export const eventLogout = () => ({ type: types.eventLogout })

const eventUpdate = (event) => ({ 
    type: types.eventUpdated,
    payload: event
})

const eventDelete = () => ({ type: types.eventDeleted })

export const eventStartLoading = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken('events');
    const body = await resp.json();
    const events = prepareEvents(body.events);
    // console.log(JSON.stringify(events));
    dispatch(eventLoaded(events));

  }
}


const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
})