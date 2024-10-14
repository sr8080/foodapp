import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store'; 
import { verifyOtp } from '../../actions/userActions'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface AuthState {
    isAuthenticated: boolean;
    error: any; 
    loading: boolean;
}

const OtpVerification: React.FC = () => {
    const [otp, setOtp] = useState<string>("");
    const [timer, setTimer] = useState<number>(120); 
    const [canResend, setCanResend] = useState<boolean>(false); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticatedUser, error, loading } = useSelector((state: RootState) => state.auth);
    console.log(isAuthenticatedUser,"is auth at ito")

    useEffect(() => {
        let countdown: NodeJS.Timeout | null = null;
        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer(prevTime => prevTime - 1);
            }, 1000);
        } else {
            if (countdown) {
                clearInterval(countdown);
            }
            setCanResend(true); 
        }

        
        return () => {
            if (countdown) {
                clearInterval(countdown);
            }
        };
    }, [timer]);

    useEffect(() => {
        if (isAuthenticatedUser) {
            console.log(isAuthenticatedUser,"aa001")
            toast.success("otp verified"); 
            // navigate('/login')
            window.location.href='/login'
           
        }
        if (error) {
            toast.error("wrong otp");
            console.log(error);
        }
    }, [dispatch, isAuthenticatedUser, error]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (timer > 0) {
            dispatch(verifyOtp(otp) as any); 
        } else {
            alert("OTP has expired. Please request a new OTP.");
        }
    };

    const handleResendOtp = () => {
        dispatch(verifyOtp(otp) as any); 
        setTimer(120); 
        setCanResend(false); 
    };

    // Format timer display
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <div className='row wrapper'>
                <div className='col-10 col-lg-5 verification-form'>
                    <form 
                        className='shadow-lg'
                        onSubmit={submitHandler}
                    >
                        <h1 className='mb-3'>OTP Verification</h1>

                        <div className='form-group'>
                            <label htmlFor='otp_field'>Enter OTP</label>
                            <input 
                                type="text"
                                id="otp_field"
                                className='form-control'
                                name="otp"
                                value={otp}
                                onChange={onChange}
                                disabled={timer === 0} 
                            />
                        </div>

                        <div className='timer'>
                            {timer > 0 ? (
                                <p>Time remaining: {formatTime(timer)}</p>
                            ) : (
                                <p style={{ color: 'red' }}>OTP has expired.</p>
                            )}
                        </div>

                        <button 
                            id="verify_button"
                            type="submit"
                            className='btn btn-block py-3'
                            disabled={loading || timer === 0} 
                        >
                            VERIFY OTP
                        </button>

                        {canResend && (
                            <button
                                type="button"
                                className='btn btn-link mt-3'
                                onClick={handleResendOtp}
                            >
                                Resend OTP
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default OtpVerification;
