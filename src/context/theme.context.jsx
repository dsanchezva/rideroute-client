import { createContext, useState } from "react";


const ThemeContext = createContext() // este componente se crear por la funcion createContext y es el que se usa para transmitir el contexto a cualquier parte de mi app.

function ThemeWrapper(props) {

  // aqui tenemos nuestros estados y otros elementos a pasar por contexto
  const [ darkTheme, setDarkTheme ] = useState(true)

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }


  const selectedPageTheme = darkTheme === true ? "dark-page" : "light-page";

  const selectedBtnTheme = darkTheme === true ? "dark-btn" : "light-btn"

  // se crea el objeto con todos los contextos a pasar
  const passedContext = {
    darkTheme,
    toggleTheme,
    selectedPageTheme,
    selectedBtnTheme
  }

  return (
    <ThemeContext.Provider value={passedContext}>
      {props.children}
    </ThemeContext.Provider>
  )

}

export {
  ThemeContext,
  ThemeWrapper
}