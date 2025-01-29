import { useState } from 'react';
import '../Styles/signin-signup.css';
import { Link } from 'react-router-dom';
import { useSignUp } from '../Hooks/useSignUp';

const SignUp = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const { signup, isLoading, error } = useSignUp();

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        await signup(email, password);
    }

    return (
        <div className="signup-wrapper">
            {/* <Link to="/"><img src="/src/Assets/logo-black.png" alt="logo" className="logo" /></Link> */}
            <form className="signup-form">
                <h2 className='form-header'>
                    SIGN <span>UP</span>
                </h2>
                <input type='text' placeholder="Email" value={email} className='email-input' onChange={(e) => setEmail(e.target.value)} required/><br />
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} className='password-input' onChange={(e) => setPassword(e.target.value)} required/>
                <p className="error" style={{padding: error ? '10px' : '0px'}}>{error}</p>
                <div className='password-options'>
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><input type="checkbox" className='show-password' onChange={togglePassword}/>Show Password</span>
                </div>
                <button className="primary-button signup-button" type='submit' disabled={isLoading} onClick={handleSignIn}>Sign Up</button>
                <p>Or Sign Up with</p>
                <div className='social-signup'>

                </div>
                <div className='signin-link'>
                    <p>Already have an account?</p>
                    <Link to="/signin">Sign In</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp;