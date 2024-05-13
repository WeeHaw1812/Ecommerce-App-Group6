import React from 'react'
import './Item.css'
import all_product from '../../Assets/all_product'
const Item = (props) => {
  return (
    <div className='item'>
        <img className="" src={props.image} />
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                {props.new_price}
            </div>
            <div className="item-price-old">
                {props.old_price}
            </div>
        </div>
        
    </div>      
  )
}
const App = () => {
  return (
    <div className="products-container">
      {all_product.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default App;
