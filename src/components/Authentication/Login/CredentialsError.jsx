import React from 'react';

const CredentialsError = ({ 
  onBackToLogin,
  onSignUp,
  onClose 
}) => {
  return (
    <div className='incorrectPassword'>
      {/* Main Background */}
      <div className='background1' />
      
      {/* Logo */}
      <img className='logoIcon' alt="Edinova Logo" src="/images/Logo.png" />
      
      {/* Left Panel Content */}
      <div className='container'>
        <div className='container1'>
          <b className='title1'>Uh-oh! Lost your password?</b>
          <div className='input'>Let's find it! Pop your email below, and we'll send you a magic link to create a new one.</div>
        </div>
        
        <div className='container2'>
          <div className='container3'>
            <div className='container1'>
              <div className='input1'>Email Address</div>
              <div className='inputField'>
                <div className='input2'>Enter your email address</div>
              </div>
            </div>
          </div>
          
          <div className='button'>
            <div className='input2'>Send me a reset link</div>
          </div>
          
          <div className='container5' onClick={onBackToLogin}>
            <i className="bi bi-arrow-left leftIcon"></i>
            <div className='input2'>Back to log in</div>
          </div>
          
          <div className='input4'>
            <span className='newAroundHere'>New around here? </span>
            <b onClick={onSignUp}>Sign up</b>
          </div>
        </div>
      </div>
      
      {/* Right Panel */}
      <div className='background' />
      <div className='titleParent'>
        <div className='title'>Your ideas, your adventure.</div>
        <img className='foodChallenge2Icon' alt="Food Challenge" src="/images/food-challenge.png" />
      </div>
      
      {/* Modal Overlay */}
      <div className='background2' />
      
      {/* Error Modal */}
      <div className='container6'>
        <div className='background3' />
        <i className="bi bi-x-lg icon27" onClick={onClose}></i>
      </div>
      
      <div className='container7'>
        <div className='icons'>
          <i className="bi bi-x-circle-fill vectorIcon"></i>
        </div>
        
        <div className='container8'>
          <b className='title2'>Password or Email Incorrect</b>
          <div className='input5'>Hmm, something's not quite right with the email or password you entered. Let's give it another shot!</div>
        </div>
        
        <div className='button1' onClick={onBackToLogin}>
          <div className='choosePlan21'>Back to log in</div>
        </div>
      </div>
    </div>
  );
};

export default CredentialsError;
