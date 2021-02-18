import React from 'react';
import {render, screen} from '@testing-library/react';
import FavCity from '../Components/readNow/FavCity';


describe('Weather app test cases',()=>{
    it('should render  Favourites component',()=>{
        render(<FavCity/>);
        
    })
    
})
export default FavCity;