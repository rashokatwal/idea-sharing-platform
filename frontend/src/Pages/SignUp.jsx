const SignUp = () => {
    return (
        <div className="signup-outer">
            <div className="signup-inner">
                <h1>Sign Up</h1>
                <form>
                    <input type="text" placeholder="Username" className="input"/>
                    <input type="password" placeholder="Password" className="input"/>
                    <button className="primary-button">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;