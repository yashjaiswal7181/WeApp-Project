import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Header from '../Components/header/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';


describe('Weather app test cases', () => {
    let element;
    beforeEach(() => {
        element = document.createElement('div')
        document.body.appendChild(element)
    });
    afterEach(() => {
        cleanup()
        unmountComponentAtNode(element)
        element.remove()
        element = null
    })

    it('should render Header component', () => {
        render(
            <Router>
                <Header />
            </Router>,
            {
                element
            }
        )
    })

    it('should have 2 Link ', () => {
        render(
            <Router>
                <Header />
            </Router>,
            {
                element,
            }
        );
        const count = document.querySelectorAll('a').length
        expect(count).toBe(2);
    })
    it('should contain Dashboard as nav-link', () => {
        render(
            <Router>
                <Header/>
            </Router>,
            {
                element
            }
        )  
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
    it('should contain WeApp as nav-brand', () => {
        render(
            <Router>
                <Header/>
            </Router>,
            {
                element,
            }
        )

        expect(screen.getByText('WeAPP')).toBeInTheDocument();
    })
})
