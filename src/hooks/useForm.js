import { useState } from "react"
// ? recibimos un objeto
export const useForm = ( initialState = {} ) => {
  
    // ? usamos el estado
    const [values, setValues] = useState(initialState)

    // ? limpiamos el estado mandandole el objeto con el string vacio que mandamos en el initialState (ejemplo comentado)
    const reset = () => {
      setValues( initialState );
    //   setValues( { descripcion: '', } );
    }

    // ? desestructuramos target del estado y lo agregamos
    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    return [ values, handleInputChange, reset ];
}
