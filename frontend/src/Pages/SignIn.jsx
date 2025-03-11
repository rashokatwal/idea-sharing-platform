import { useState, useEffect } from 'react';
import '../Styles/signin-signup.css';
import { Link } from 'react-router-dom';
import { useSignin } from '../Hooks/useSignin';
// import toast from 'react-hot-toast';

const SignIn = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const { signin, isLoading, error } = useSignin()

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        await signin(email, password);
    }

    return (
        <div className="signin-wrapper">
            {/* <Link to="/"><img src="/src/Assets/logo-black.png" alt="logo" className="logo" /></Link> */}
            <form className="signin-form">
                <h2 className='form-header'>
                    {/* SIGN <span>IN</span> */}
                    <Link to="/"><img src="/src/Assets/logo-black.png" alt="logo" className="logo" /></Link>
                </h2>
                <input type='text' placeholder="Email" value={email} className='email-input' onChange={(e) => setEmail(e.target.value)} required/><br />
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} className='password-input' onChange={(e) => setPassword(e.target.value)} required/>
                {/* <p className="error" style={{padding: error ? '10px' : '0px'}}>{error}</p> */}
                <div className='password-options'>
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><input type="checkbox" className='show-password' onChange={togglePassword}/>Show Password</span>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <button className="primary-button signin-button" type='submit' onClick={handleSignIn} disabled={isLoading}>Login</button>
                <p>Or Sign In with</p>
                <div className='social-signin'>

                </div>
                <div className='signup-link'>
                    <p>Don't have an account?</p>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default SignIn;