import React, {Fragment, useState, useEffect} from 'react';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {

  // state principal
  const [busquedaApp, guardarCamposBusquedaApp] = useState({
      ciudad: '',
      pais: ''
  });

  // hacemos el destructuring
  const { ciudad, pais } = busquedaApp;
  // state usado para saber si se realizo una consulta
  const [consultar, guardarConsultar] = useState(false);
  // state para guardar el resultado de la consulta
  const [ resultado, guardarResultado ] = useState({});

  const [error, guardarErrorServicio] = useState(false);

  // detectamos los cambios cuando el usuario realiza la accion consultar
  useEffect(() => {

    // console.log('ciudad desde app principal: ' + ciudad);
    // console.log('pais desde app principal: ' +  pais);

    const consultarAPI = async () => {
        if(consultar) {
            const appId = '52cccc184676ea334692437a9537a50b';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            if (resultado.cod === '404') {
                guardarErrorServicio(true);
            } else {
                guardarErrorServicio(false);
                guardarResultado(resultado);
            }
            guardarConsultar(false);
        }
    };
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);



  let componente;
  if(error) {
    componente = <Error mensaje="No hay Resultados" />
  }else {
    componente = <Clima resultado={resultado} />
  }
  return (
      <Fragment>
        <Header titulo="Clima React"/>

          <div className="contenedor-form">
              <div className="container">
                  <div className="row">
                      <div className="col m6 s12">
                        <Formulario
                            guardarCamposBusquedaApp={guardarCamposBusquedaApp}
                            guardarConsultar={guardarConsultar}
                            guardarResultado={guardarResultado}
                        />
                      </div>
                      <div className="col m6 s12">
                          {componente}
                      </div>
                  </div>
              </div>
          </div>
      </Fragment>

  );
}

export default App;
