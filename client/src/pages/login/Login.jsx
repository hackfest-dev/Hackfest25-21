import React from 'react'
import LoginCard from '../../components/LoginCard';
// import blockchainimg1 from './assets/blockchainimg1'
import Particles from '../../Particles/Particles';

const Login = () => {
    return (
        <>
            <div className="h-screen   flex justify-center items-center">

                <LoginCard />
                <div className='-z-10 ' style={{ width: '100%', height: '690px ', position: 'absolute' }}>
                    <Particles
                        particleColors={['#9B65FF', '#F2613F']}
                        particleCount={200}
                        particleSpread={10}
                        speed={0.2}
                        particleBaseSize={180}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={true}
                    />
                </div>
            </div>
        </>

    );
}

export default Login