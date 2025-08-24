import React from 'react';

const LoginComponent = ({ 
  email, 
  password, 
  showPassword, 
  rememberMe, 
  emailError,
  passwordError,
  onEmailChange, 
  onPasswordChange, 
  onTogglePassword, 
  onToggleRemember, 
  onSubmit,
  onForgotPassword,
  onCreateAccount
}) => {
  return (
    <div className='desktopLogIn'>
      <div className='background' />
      <img className='logoIcon' alt="Edinova Logo" src="/images/Logo.png" />
      
      <div className='container'>
        <div className='passwordContainer'>
          <b className='welcomeMessage'>Welcome back, Novapreneur</b>
          <div className='input'>Ready to jump back in? Enter your details below.</div>
        </div>
        
        <div className='container2'>
          <div className='container3'>
            {/* Email Field */}
            <div className='passwordContainer'>
              <div className='inputWrapper'>
                <div className='input1'>Email Address</div>
              </div>
              <div className={`inputField ${emailError ? 'error' : ''}`}>
                <input 
                  type="email" 
                  value={email} 
                  onChange={onEmailChange} 
                  placeholder="Enter your email address here" 
                  className='input2' 
                />
              </div>
              {emailError && (
                <div className='errorMessage'>
                  <i className="bi bi-exclamation-circle form393Icon"></i>
                  <div className='input3'>{emailError}</div>
                </div>
              )}
            </div>
            
            {/* Password Field */}
            <div className='passwordContainer'>
              <div className='inputWrapper'>
                <div className='input1'>Password</div>
              </div>
              <div className={`passwordInputField ${passwordError ? 'error' : ''}`}>
                <div className='inputParent'>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={onPasswordChange} 
                    placeholder="Your password" 
                    className='input2' 
                  />
                  <div className='icons' onClick={onTogglePassword}>
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </div>
                </div>
              </div>
              {passwordError && (
                <div className='errorMessage'>
                  <i className="bi bi-exclamation-circle form393Icon"></i>
                  <div className='input3'>{passwordError}</div>
                </div>
              )}
            </div>
            
            {/* Options Container */}
            <div className='optionsContainer'>
              <div className='rememberMeContainer' onClick={onToggleRemember}>
                <input 
                  type="checkbox"
                  className='on2Icon' 
                  checked={rememberMe}
                  onChange={onToggleRemember}
                  id="rememberMe"
                />
                <div className='input3'>Remember me</div>
              </div>
              <div className='input8' onClick={onForgotPassword}>
                I forgot my password
              </div>
            </div>
          </div>
          
          {/* Button Section */}
          <div className='buttonParent'>
            <div className='button' onClick={onSubmit}>
              <div className='choosePlan2'>Log in</div>
            </div>
            <div className='input9'>
              <span>New around here? </span>
              <b className='createAnAccount' onClick={onCreateAccount}>
                Create an account
              </b>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel */}
      <div className='background1' />
      <div className='titleParent'>
        <div className='title'>Your ideas, your adventure.</div>
        <img className='foodChallenge2Icon' alt="Food Challenge" src="/images/food-challenge.png" />
      </div>
    </div>
  );
};

export default LoginComponent;
