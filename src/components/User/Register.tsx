import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; // Adjust import path if necessary
import { register } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearWaitingQueue } from 'react-toastify/dist/core/store';

interface AuthState {
    isAuthenticated: boolean;
    error: any;
    loading: boolean;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
    });
    const { name, email, password, passwordConfirm, phoneNumber } = user;
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>("/images/images.png");

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
        avatar: "",
    });

    const dispatch = useDispatch();
    const { isAuthenticatedUser, error, loading } = useSelector((state: RootState) => state.auth);
    console.log('is auth',isAuthenticatedUser)

    useEffect(() => {
        console.log("is auth 11")
        debugger
        if (isAuthenticatedUser) {
            console.log(isAuthenticatedUser,"fisrtt after useeffect")
            toast.success("Otp 111  sent to email!!!!");
            console.log("naviagte 111 to otp")
            // navigate('/otp')
            window.location.href='/otp'
           
        }
        if (error) {
            console.log(error);
        }
    }, [dispatch, isAuthenticatedUser, error]);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        return phoneNumber.length === 10 && /^[0-9]+$/.test(phoneNumber);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const validateForm = () => {
        let formErrors = { ...errors };

        formErrors.name = name ? "" : "Name is required";
        formErrors.email = validateEmail(email) ? "" : "Invalid email format";
        formErrors.password = validatePassword(password) ? "" : "Password must be at least 6 characters";
        formErrors.passwordConfirm = password === passwordConfirm ? "" : "Passwords do not match";
        formErrors.phoneNumber = validatePhoneNumber(phoneNumber) ? "" : "Invalid phone number (must be 10 digits)";

        setErrors(formErrors);

        return Object.values(formErrors).every((error) => error === "");
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "avatar" && e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result as string); // For preview
                    setAvatar(file); // Store the file itself
                }
            };
            reader.readAsDataURL(file);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("Validation failed");
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("passwordConfirm", passwordConfirm);
        formData.set("phoneNumber", phoneNumber);
        if (avatar) {
            formData.append("avatar", avatar);
        }
        dispatch(register(formData) as any);
    };
    return (
        <div className='row wrapper'>
            <div className='col-10 col-lg-5 registration-form'>
                <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>
                    <h1 className='mb-3'>Register</h1>
                    <div className='form-group'>
                        <label htmlFor='name_field'>Name</label>
                        <input
                            type="text"
                            id="name_field"
                            className={`form-control ${errors.name && 'is-invalid'}`}
                            name="name"
                            value={name}
                            onChange={onChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email_field'>Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className={`form-control ${errors.email && 'is-invalid'}`}
                            name="email"
                            value={email}
                            onChange={onChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password_field'>Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className={`form-control ${errors.password && 'is-invalid'}`}
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className='form-group'>
                        <label htmlFor='passwordConfirm_field'>Password Confirm</label>
                        <input
                            type="password"
                            id="passwordConfirm_field"
                            className={`form-control ${errors.passwordConfirm && 'is-invalid'}`}
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={onChange}
                        />
                        {errors.passwordConfirm && <div className="invalid-feedback">{errors.passwordConfirm}</div>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phoneNumber_field'>Phone Number</label>
                        <input
                            type="number"
                            id="phoneNumber_field"
                            className={`form-control ${errors.phoneNumber && 'is-invalid'}`}
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={onChange}
                        />
                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    <img src={avatarPreview} className='rounded-circle' alt="Avatar Preview" />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id="customFile"
                                    accept='image/*'
                                    onChange={onChange}
                                />
                                <label className='custom-file-label' htmlFor='customFile'>Choose Avatar</label>
                            </div>
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className='btn btn-block py-3'
                        disabled={loading}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;