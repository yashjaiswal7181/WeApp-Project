import React from 'react';
import './footer.css';
export default function Footer(){
    return(
        // <footer className="footer" style={{textAlign:'center',backgroundColor:'black',color:'white',position: 'fixed',
        // left: '0',bottom: '0',width: '100%'}}>
        //    <p style={{marginTop:'5px',marginBottom:'5px'}}> Copyright &copy; NYS Weather Application </p>
        // </footer>
        <div className="footer-dark" style={{bottom:'0'}}>
        <footer>
            <div className="container">
                <div className="row">
                  
                   
                    <div className="col item social"><a href="#"><i className="icon ion-social-facebook"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-instagram"></i></a></div>
                </div>
                <p className="copyright">WeAPP © 2021</p>
            </div>
        </footer>
    </div>
    )
}
