
import { SignUpFormProps } from '../../types';

import styles from './SignUp.module.css'

function SignUpForm({
  register,
  onSubmit,
  success,
  errors,
  error,
  user,
  handleCancelEdit
}: SignUpFormProps) {
  return (
    <div className={styles.container}>
    <h2>{user ? 'Edit user' : 'Create Account'}</h2>
    <form onSubmit={onSubmit} className={styles.form}>
      
      <div>
        <label htmlFor="dni">DNI</label>
        <input
          type="number"
          {...register("dni")}
          className={styles.input}
        />
        {errors.dni && <p style={{ color: 'red' }}>{errors.dni.message}</p>}
      </div>
       <div>
        <label htmlFor="name">Name</label>
        <input
          type="string"
          {...register("name")}
          className={styles.input}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>
       <div>
        <label htmlFor="surname">Surname</label>
        <input
          type="string"
          {...register("surname")}
          className={styles.input}
        />
        {errors.surname && <p style={{ color: 'red' }}>{errors.surname.message}</p>}
      </div>
       <div>
        <label htmlFor="email">Email</label>
        <input
          type="string"
          {...register("email")}
          className={styles.input}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>
       <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password")}
          className={styles.input}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>
      
      <button type="submit" className={styles.btn}>{user ? 'Save changes' : 'Sign Up'}</button>
      {user && <button onClick={handleCancelEdit} className={styles.btn}>Cancel Edit</button> }
      
    </form>
     {success && <p className={styles.success}>{success}</p>}
     {error && <p className={styles.error}>{error}</p>}
  
    </div>
  );
}

export default SignUpForm;

