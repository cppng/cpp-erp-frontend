import React, {useState, useEffect} from 'react'
import "./css/privacyPolicy.css";


function PrivacyPolicy() {

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <div className='pp-body'>
                        <div className="pp-container">
                            <h1>Privacy Policy for Owenzone</h1>
                            <p>Effective Date: 20th February 2023.</p>
                            <p>Welcome to Owenzone! Your privacy is important to us. This Privacy Policy explains how Owenzone ("we," "our," or "us") collects, uses, and protects your personal information when you use our mobile application ("App").</p>
                            
                            <h2>1. Information We Collect</h2>
                            <h3>1.1 Information You Provide</h3>
                            <ul>
                                <li><strong>Account Information</strong>: When you create an account, we collect your name, email address, username, and password.</li>
                                <li><strong>Profile Information</strong>: You may provide additional information such as profile photos, bio, and other personal details.</li>
                                <li><strong>Contact Information</strong>: If you choose to sync your contacts with Owenzone, we collect contact information from your address book.</li>
                            </ul>
                            
                            <h3>1.2 Information We Automatically Collect</h3>
                            <ul>
                                <li><strong>Device Information</strong>: We collect information about your device, including the type of device, operating system, and unique device identifiers.</li>
                                <li><strong>Usage Data</strong>: We collect information about how you interact with our App, including access times, pages viewed, and other usage data.</li>
                                <li><strong>Location Data</strong>: We may collect your location data if you grant us permission to do so.</li>
                            </ul>
                            
                            <h3>1.3 Information from Third Parties</h3>
                            <p>We may receive information about you from third parties, such as social media platforms, if you choose to link your Owenzone account with these platforms.</p>
                            
                            <h2>2. How We Use Your Information</h2>
                            <p>We use the information we collect for the following purposes:</p>
                            <ul>
                                <li><strong>To Provide and Improve Our Services</strong>: To operate and maintain the App, improve user experience, and develop new features.</li>
                                <li><strong>To Communicate with You</strong>: To send you updates, security alerts, and support messages.</li>
                                <li><strong>To Personalize Your Experience</strong>: To provide personalized content and recommendations.</li>
                                <li><strong>To Ensure Security and Prevent Fraud</strong>: To protect the security of your account and the App.</li>
                                <li><strong>To Comply with Legal Obligations</strong>: To comply with applicable laws and regulations.</li>
                            </ul>
                            
                            <h2>3. Sharing Your Information</h2>
                            <p>We do not share your personal information with third parties except in the following circumstances:</p>
                            <ul>
                                <li><strong>With Your Consent</strong>: We may share your information if you give us explicit consent.</li>
                                <li><strong>Service Providers</strong>: We may share information with third-party service providers who perform services on our behalf, such as hosting and data analysis.</li>
                                <li><strong>Legal Requirements</strong>: We may disclose your information if required to do so by law or in response to legal requests.</li>
                            </ul>
                            
                            <h2>4. Data Security</h2>
                            <p>We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
                            
                            <h2>5. Your Choices</h2>
                            <h3>5.1 Access and Update Information</h3>
                            <p>You can access and update your personal information through your account settings in the App.</p>
                            
                            <h3>5.2 Opt-Out of Communications</h3>
                            <p>You can opt out of receiving promotional communications from us by following the instructions in those messages or changing your notification settings in the App.</p>
                            
                            <h3>5.3 Location Data</h3>
                            <p>You can disable location data collection through your device settings.</p>
                            
                            <h2>6. Children's Privacy</h2>
                            <p>Owenzone is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it promptly.</p>
                            
                            <h2>7. Changes to This Privacy Policy</h2>
                            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our App and updating the effective date. Your continued use of the App after any changes signifies your acceptance of the updated Privacy Policy.</p>
                            
                            <h2>8. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                            <p>
                                Owenzone<br />
                                Email: info@owenzone.com<br />
                                Address: 12A Joseph Street, Marina, Lagos Island, Lagos State.
                            </p>
                            
                            <p>By using Owenzone, you acknowledge that you have read and understood this Privacy Policy.</p>
                        </div>
                        </div>
                    </div>
                <div className='col-md-2'></div>
            </div>
        </div>
    )
    
}

export default PrivacyPolicy