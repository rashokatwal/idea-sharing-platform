import '../Styles/signin.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div className="login-outer">
            <div className="login-inner">
                {/* <Link to="/"><img src="/src/Assets/logo-black.png" alt="logo" className="logo" /></Link> */}
                <form className="login-form">
                    <h2 className='form-header'>
                        {/* SIGN <span>IN</span> */}
                        <Link to="/"><img src="/src/Assets/logo-black.png" alt="logo" className="logo" /></Link>
                    </h2>
                    <input placeholder="Email" className='email-input'/><br />
                    <input placeholder="Password" className='password-input'/>
                    <div className='password-options'>
                        <span><input type="checkbox" className='show-password'/>Show Password</span>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <button className="primary-button login-button">Login</button>
                    <p>Or Sign In with</p>
                    <div className='social-login'>

                    </div>
                    <div className='signup-link'>
                        <p>Don't have an account?</p>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;