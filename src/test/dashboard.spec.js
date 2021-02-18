import React from 'react';
import {render} from '@testing-library/react';
import Dashboard from '../Components/dashboard/Dashboard';


describe('Weather app test cases',()=>{
    it('should render Dashboard component',()=>{
        render(<Dashboard/>);
    })
})
export default Dashboard;