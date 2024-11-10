
import { SignUpFormProps } from '../../types';

import styles from './SignUp.module.css'

function SignUpForm({
  values,
  handleChange,
  onSubmit,
  success,
  errors,
  error,
}: SignUpFormProps) {
  return (
    <div className={styles.container}>
    <h2>Create Account</h2>
    <form onSubmit={onSubmit} className={styles.form}>
      
      <div>
        <label htmlFor="dni">DNI</label>
        <input
          type="number"
          name="dni"
          value={values.dni}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.dni && <p className={styles.fieldError}>{errors.dni}</p>}
      </div>
       <div>
        <label htmlFor="name">Name</label>
        <input
          type="string"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
      </div>
       <div>
        <label htmlFor="surname">Surname</label>
        <input
          type="string"
          name="surname"
          value={values.surname}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.surname && <p className={styles.fieldError}>{errors.surname}</p>}
      </div>
       <div>
        <label htmlFor="email">Email</label>
        <input
          type="string"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
      </div>
       <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
      </div>
      
      <button type="submit" className={styles.btn}>Sign Up</button>
    </form>
     {success && <p className={styles.success}>{success}</p>}
     {error && <p className={styles.error}>{error}</p>}
  
    </div>
  );
}

export default SignUpForm;

