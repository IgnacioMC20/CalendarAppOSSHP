import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment';

import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
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

export const CalendarModal = ({date}) => {
    
    const [titleValid, setTitleValid] = useState(true)

    const { isModalOpen } = useSelector( state => state.ui );
    const dispatch = useDispatch();
    const { activeEvent } = useSelector( state => state.calendar);

    const [formValues, setFormValues] = useState(initEvent)

    const { title, notes, start, end } = formValues;

    useEffect(() => {
      if(activeEvent) setFormValues(activeEvent);
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
        if(activeEvent) dispatch(eventUnsetActive()); // unset active event
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
            return Swal.fire('Error', 'La fecha de inicio debe ser anterior a la fecha de finalización', 'error');
        }
        if (title.trim().length === 0) {
            return setTitleValid(false);
        }

        if(activeEvent){
            dispatch(eventStartUpdate(formValues));
        }else{
            dispatch(eventStartAddNew( formValues ));
        }

        setTitleValid(true);
        closeModal();

    }



    return (


        <Modal isOpen={isModalOpen} closeTimeoutMS={300} onRequestClose={closeModal} style={customStyles} className='modal' overlayClassName='modal-fondo'>
            <h1> {activeEvent ? 'Editar Evento' : 'Nuevo evento'} </h1>
            <form onSubmit={handleSubmitForm}>

                <div className="form-group my-3">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker className="form-control" onChange={handleStartDateChange} value={start} />
                </div>

                <div className="form-group my-3">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker className="form-control" onChange={handleEndDateChange} minDate={start} value={end} />
                </div>

                <div className="form-group">
                    <label abel>Titulo y notas</label>
                    <input type="text" className={`form-control ${titleValid || 'is-invalid'}`} placeholder="Título del evento" name="title" value={title} onChange={handleInputChange} autoComplete="off" />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea type="text" value={notes} onChange={handleInputChange} className="form-control" placeholder="Notas" rows="5" name="notes"></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
