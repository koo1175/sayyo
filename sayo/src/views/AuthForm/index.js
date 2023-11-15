import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

// New component for registration form
function LoginForm() {
  return (
    <div style={{ marginTop: 200, marginLeft: 350, textAlign: 'center' }}>
      {/* Add your registration form elements here */}
      <form>
        {/* Example input field */}
        <input type="text" placeholder='Username' />
        {/* Add more input fields as needed */}
        <br />
        <input type="password" placeholder='Password' />
        <br /><br />
        {/* Example submit button */}
        <button type="submit" style={{ backgroundColor: '#909090', color: "#fff", borderRadius: 5 }}>Sign in</button>
        <br />
        <button style={{ fontSize: '0.5em' }}>Forget password?</button>
      </form>
    </div>
  );
}

function RegisterForm() {
  return (
    <div style={{ marginTop: 200, marginLeft: -300, textAlign: 'center' }}>
      {/* Add your registration form elements here */}
      <form>
        {/* Example input field */}
        <input type="text" placeholder='Username' />
        {/* Add more input fields as needed */}
        <br />
        <input type="text" placeholder='Email' />
        <br />
        <input type="password" placeholder='Password' />
        <br />
        <input type="text" placeholder='Confirm Password' />
        <br />
        {/* Example submit button */}
        <button type="submit" style={{ backgroundColor: '#909090', color: "#fff", borderRadius: 5 }}>Sign up</button>

      </form>
    </div>
  );
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [springProps, api] = useSpring(() => ({
    from: { x: 170 },
  }));

  const handleClick = () => {
    api.start({
      from: { x: isLogin ? 170 : 530 },
      to: { x: isLogin ? 530 : 170 },
      onRest: () => {
        // Toggle between login and sign-up after the animation completes
        setIsLogin((prev) => !prev);
      },
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* White form in front of the gray square */}
      <animated.div
        style={{
          position: 'realtive',
          width: 708,
          height: 500,
          margin: '300px 0 0 170px', // Adjust position to center inside the gray square
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
          borderRadius: 30,
        }}
      >
        <div style={{ position: 'absolute', top: '30%', left: '45%', transform: 'translate(-50%, -50%)', fontSize: '1em' }}>
        {/* Render registration form if isLogin is false */}
        {isLogin && <LoginForm />}
        {!isLogin && <RegisterForm />}
        </div>

        {/* Gray animated square */}
        <animated.div
          onClick={handleClick}
          style={{
            width: 350,
            height: 500,
            background: '#909090',
            borderRadius: 30,
            marginTop: -110,
            marginLeft: -170,
            ...springProps,
          }}
        >

          {/* Image positioning */}
          <img
            src="/img/sayoLogo.png" // Replace with the actual path to your image
            alt="sayoLogo"
            style={{
              position: 'absolute',
              left: '50%',
              top: '33.33%', // 2/3 of the height from the bottom
              transform: 'translate(-50%, -50%)',
              width: '100px', // Adjust the width as needed
              height: '100px', // Adjust the height as needed
            }}
          />


          {/* Text depending on the state */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ffffff', textAlign: 'center', fontSize: '2em' }}>
            {isLogin ? 'Welcome' : 'Join with us'}
          </div>
        </animated.div>


      </animated.div>

      {/* Toggle between login and sign-up buttons */}
      <button onClick={handleClick} style={{ marginTop: 10, marginLeft: 470 }}>
        {isLogin ? '회원가입 하러가기' : '로그인 하러가기'}
      </button>
    </div>
  );
}
