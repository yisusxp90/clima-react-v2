import React, {useState} from 'react';
import Error from "./Error";

const Formulario = ({guardarCamposBusquedaApp, guardarConsultar, guardarResultado}) => {

    // state
    const [busqueda, guardarCamposBusqueda] = useState({
        ciudad: '',
        pais: ''
    });

    // hacemos el destructuring
    const { ciudad, pais } = busqueda;

    // manejo de error
    const [error, guardarError] = useState(false);

    // funcion que coloca los elementos en el state
    const handleChange = e => {
        // actualizar el state
        guardarCamposBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    };

    // cuando el usuario da submit al form
    const handleSubmit = e => {
        e.preventDefault();
        // validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true);
            guardarConsultar(false);
            guardarResultado({});
            return;
        }
        guardarError(false);
        // pasamos al componente principal
        guardarConsultar(true);
        const busqueda = {
            ciudad,
            pais
        };
        guardarCamposBusquedaApp(busqueda);
        guardarCamposBusqueda({
            ciudad: '',
            pais: ''
        });

    };

    return (
        <form onSubmit={handleSubmit}>

            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null }
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">--- Seleccione ---</option>
                    <option value="VE">Venezuela</option>
                    <option value="AR">Argentina</option>
                    <option value="CL">Chile</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">Pais: </label>
            </div>

            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
    );
};

export default Formulario;