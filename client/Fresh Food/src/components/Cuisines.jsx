import { React, useContext, useEffect } from 'react'
import { MenuContext } from '../Context/Menucontext';

const Cuisines = () => {
  const globalMenu = useContext(MenuContext);

  const items = globalMenu.items;
  const state = globalMenu.state;

  const handleMenu = (categ) => {
    globalMenu.dispatch({ type: 'CUISINE',payload : items, cuisinecateg: categ });
    globalMenu.caller({trigger : 'CUISINE'});
  }
  return (

    <select
      className='focus-visible:outline-none'
      name="Cuisines"
      id="Cuisines"
      value={state.cuisinecateg} // Set the value of the selected option
      onChange={(e) => handleMenu(e.target.value)} // Call handleMenu when the dropdown value changes
    >
      <option value="" selected>
        Cuisines
      </option>

      <option value="Chinese">Chinese</option>
      <option value="Indian">Indian</option>
      <option value="Assamese">Assamese</option>
      <option value="Bengali">Bengali</option>
      <option value="Bihari">Bihari</option>
      <option value="American">American</option>
      <option value="italian">Italian</option>
      <option value="Continental">Continental</option>
      <option value="Desserts">Desserts</option>
      <option value="British">British</option>
      <option value="European">European</option>
      <option value="Fast Food">Fast Food</option>
      <option value="Gujarati">Gujarati</option>
      <option value="Healthy Food">Healthy Food</option>
      <option value="Hyderabadi">Hyderabadi</option>
      <option value="Ice Cream">Ice Cream</option>
      <option value="Kashmiri">Kashmiri</option>

      <option value="Thai">Thai</option>
      <option value="South Indian">South Indian</option>
      <option value="Rolls">Rolls</option>
    </select>

  )
}

export default Cuisines