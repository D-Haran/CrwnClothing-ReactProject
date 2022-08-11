import { useState } from 'react';
import './sign-in-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils.js';
import FormInput from '../form-input/form-input.component';

const defaultformFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();
    };
    
    const handleSubmit = async(event) => {
        event.preventDefault();

    try {
        const {user} = await signInAuthUserWithEmailAndPassword(email, password);
        resetFormFields(defaultformFields)
    } catch (error) {
        switch(error.code) {
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break
            case 'auth/user-not-found':
                alert('no user associated with this email');
                break
            default:
                console.log(error)
        }
        // if(error.code === 'auth/wrong-password') {
        //     alert('incorrect password or email')
        // }
        console.log('there was an error signing in: ', {error})
    }

    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    return (
      <div className="sign-up-container">
        <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        <div className="buttons-container">
        <Button type="submit">Sign In</Button>
        <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>Google sign in</Button>
        </div>
        
        
      </form>
      
      </div>
        );
};


export default SignInForm;