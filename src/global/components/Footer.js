import React from "react";
import {faF} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {

    const styles = { 
        footer: {
            background: '#e9edef',
            paddingTop:80,
            paddingBottom:40
        },
        footerTitle: {
            fontSize:16
        },
        footerText: {
            fontSize:14
        },
        footerLink: {
            fontSize:14,
            textDecoration: 'none'
        }
    }

    return (
        <footer style={styles.footer} className="mainfooter" role="contentinfo">  
        <div className="footer-middle">  
        <div className="container">  
            <div className="row" style={{marginBottom:30}}>  
                <div className="col-md-3 col-sm-6">  
                    <div className="footer-pad">  
                    <h4 style={styles.footerTitle}>Owenzone</h4>  
                    <p style={styles.footerText}>Be Job Ready - Learn Digital and Software Skills.</p> 
                    <p><a href="/privacy-policy" style={styles.footerLink}> Privacy Policy</a></p>  
                    </div>  
                </div>  
                <div className="col-md-3 col-sm-6">  
                    <div className="footer-pad">  
                    <h4 style={styles.footerTitle}>Contact</h4>  
                    <p style={styles.footerText}>12A Joseph Street, Marina, <br /> Lagos Island, Lagos State.<br /> +234 7032813326</p>
                    </div>  
                </div>  
                <div className="col-md-3 col-6">  
                    <div className="footer-pad">  
                    <h4 style={styles.footerTitle}>Links</h4>  
                    <ul className="list-unstyled">  
                        <li><Link to="/" style={styles.footerLink}>Home</Link></li>  
                        <li><Link to="/contact" style={styles.footerLink}>About</Link></li>  
                        <li><Link to="/contact" style={styles.footerLink}>Contact</Link></li>   
                    </ul>  
                    </div>  
                </div>  
                <div className="col-md-3 col-6">  
                    <h4 style={styles.footerTitle}>Follow Us</h4>  
                    <ul className="list-unstyled social-network social-circle">  
                        <li> <a href="https://web.facebook.com/owenzonelimited/" target="_blank" style={styles.footerLink}>facebook</a></li>  
                        <li> <a href="https://www.youtube.com/@owenzone2518" target="_blank"  style={styles.footerLink}>Youtube</a></li>  
                    </ul>               
                </div>  
            </div>  
            <hr />
            <div className="row">  
                <div className="col-md-12 copy">  
                <p style={styles.footerText} className="text-center"> © Copyright 2023 - Owenzone.  All rights reserved. </p>  
                </div>  
            </div>  
        </div>  
        </div>  
        </footer>  
    )

};

export default Footer;