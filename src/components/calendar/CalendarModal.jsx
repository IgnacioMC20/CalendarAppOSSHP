import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment';

import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { iuCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventStartUpdate, eventUnsetActive } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = moment().minutes(0).seconds(0).add(2, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
}

export const CalendarModal = ({ date }) => {

    const [titleValid, setTitleValid] = useState(true)

    const { isModalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const { activeEvent } = useSelector(state => state.calendar);

    const [formValues, setFormValues] = useState(initEvent)

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) setFormValues(activeEvent);
        else setFormValues(initEvent);
    }, [activeEvent, setFormValues])


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch(iuCloseModal());
        if (activeEvent) dispatch(eventUnsetActive()); // unset active event
        setTimeout(() => {
            setFormValues(initEvent);
        }, 300);

    }

    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {

        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return toast.error('La fecha de inicio debe ser anterior a la fecha de finalización!', {
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
        if (title.trim().length === 0) {
            setTitleValid(false);
            return toast.error('El expediente es obligatorio', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }

        if (activeEvent) {
            dispatch(eventStartUpdate(formValues));
        } else {
            dispatch(eventStartAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();

    }



    return (


        <Modal isOpen={isModalOpen} closeTimeoutMS={300} onRequestClose={closeModal} style={customStyles} className='modal' overlayClassName='modal-fondo'>
            <h1 className='text-center mb-5 display-5'> {activeEvent ? 'Editar Cita' : 'Nueva Cita'} </h1>
            <form onSubmit={handleSubmitForm}>

                <div className="form-group my-3">
                    {/* <label>Inicio</label> */}
                    <DateTimePicker className="text-center form-control h-auto text-dark rounded-pill py-3 px-4" onChange={handleStartDateChange} value={start} />
                </div>

                <div className="form-group my-3">
                    {/* <label>Fin</label> */}
                    <DateTimePicker className="text-center form-control h-auto text-dark rounded-pill py-3 px-4" onChange={handleEndDateChange} minDate={start} value={end} />
                </div>

                <div className="form-group my-3">
                    {/* <label>Expediente</label> */}
                    <input type="text" className={`text-center form-control h-auto text-dark rounded-pill py-3 px-4 ${titleValid || 'is-invalid'}`} placeholder="Expediente" name="title" value={title} onChange={handleInputChange} autoComplete="off" />
                    {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
                </div>

                <div className="form-group mt-3">
                    {/* <label>Notas</label> */}
                    <textarea type="text" value={notes} onChange={handleInputChange} className="text-center form-control h-auto text-dark rounded-pill py-3 px-4" rows="3" name="notes"></textarea>
                </div>
                <div className="form-group d-flex justify-content-center">
                    <small className="text-muted">Información adicional</small>
                </div>

                <div className="form-group my-3 d-flex justify-content-center">
                    <button type="submit" className="btnSubmit">
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </div>

            </form>
        </Modal>
    )
}
