import React from 'react';
import {render, screen} from '@testing-library/react';
import Footer from '../Components/footer/Footer';
import "@testing-library/jest-dom/extend-expect";

describe('Weather app test cases',()=>{
    it('should render Footer component',()=>{
        render(<Footer/>);
    })
    it('contains WeAPP in footer',()=>{
        render(<Footer/>);
        expect(screen.getByText('WeAPP',{ exact: false })).toBeInTheDocument()
    })
})
export default Footer;