// // import React from 'react';
// // import NotiFeed from './SettingsComponents/YourAccountFeed';
// import { useNavigate } from 'react-router-dom';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import styles from './ChangePassword.module.css';
// // import AllData from './SettingsComponents/YourAccount.json';
// // import MentionData from './NotiComponents/MentionData.json';
// // import GetNotificationsArray from '../Services/NotificationServices';
// import React from 'react';
// // import PropTypes from 'prop-types';
// // import Visibility from '@mui/icons-material/Visibility';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import VisibilityOff from '@mui/icons-material/VisibilityOff';
// // import IconButton from '@mui/material/IconButton';
// import { Button } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import styles from './ConfirmPassword.module.css';
// import usePasswordForm from '../Start/Login/components/usePasswordForm';

// function Settings() {
//   const navigate = useNavigate();

//   //   const [passedData, setpassedData] = useState(AllData);
//   //   console.log(setpassedData);
//   // const [allData, setAllData] = useState();
//   // const [mentionData, setMentionData] = useState();
//   // const handleAll = () => {
//   //   setpassedData(AllData);
//   // };

//   // const handleMention = () => {
//   //   setpassedData();
//   // };
//   const handleOpenAcc = () => { navigate('/AccountInformation'); };
//   const handleOpen = () => { navigate('/Settings'); };
//   const {
//     handleChange, values,
//   } = usePasswordForm();
//   return (
//     <div>
//       <form
//         className={styles['signup-form']}
//       >
//         <div>
//           <h1 className={styles.header1}>Account information</h1>
//           <div
//             className={styles.backarrow}
//             role="button"
//             tabIndex={0}
//             onClick={handleOpen}
//           >
//             <ArrowBackIcon />
//           </div>
//           <h1 className={styles.header3}>Confirm your password</h1>
//           <p className={styles.header2}>
//             Please enter your password in order to see your information.

//           </p>
//           <label htmlFor="password">
//             <input
//               className="start-modals-form-input"
//               type="password"
//               id="password"
//               name="password"
//               value={values.password}
//               onChange={handleChange}
//               placeholder=" "
//             />
//             <span>Current Password</span>

//           </label>
//           <div>
//             <Button
//               onClick={handleOpenAcc}
//               id="next-login-password-button"
//               data-testid="next-button"
//               variant="outlined"
//               className={styles['singin-button']}
//               type="submit"
//             >
//               Confirm
//             </Button>
//           </div>
//         </div>
//       </form>
//     </div>
//     // <div>
//     //   <section className={styles.header1}>
//     //     Change your password
//     //     {' '}
//     //     <div
//     //       className={styles.backarrow}
//     //       role="button"
//     //       tabIndex={0}
//     //       onClick={handleOpen}
//     //     >
//     //       <ArrowBackIcon />

//   //     </div>
//   //   </section>
//   //   <section className={styles.flex1} />
//   // </div>

//   );
// }
// export default Settings;
// Settings.propTypes = {
//   // email: PropTypes.string.isRequired,
//   // handleAfterSignin: PropTypes.func.isRequired,
// };
// import React from 'react';
// import NotiFeed from './SettingsComponents/YourAccountFeed';
// import { useNavigate } from 'react-router-dom';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import styles from './ChangePassword.module.css';
// // import AllData from './SettingsComponents/YourAccount.json';
// // import MentionData from './NotiComponents/MentionData.json';
// // import GetNotificationsArray from '../Services/NotificationServices';
// import React from 'react';
// // import PropTypes from 'prop-types';
// // import Visibility from '@mui/icons-material/Visibility';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import VisibilityOff from '@mui/icons-material/VisibilityOff';
// // import IconButton from '@mui/material/IconButton';
// import { Button } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import styles from './ConfirmPassword.module.css';
// import usePasswordForm from '../Start/Login/components/usePasswordForm';

// function Settings() {
//   const navigate = useNavigate();

//   //   const [passedData, setpassedData] = useState(AllData);
//   //   console.log(setpassedData);
//   // const [allData, setAllData] = useState();
//   // const [mentionData, setMentionData] = useState();
//   // const handleAll = () => {
//   //   setpassedData(AllData);
//   // };

//   // const handleMention = () => {
//   //   setpassedData();
//   // };
//   // const handleOpen = () => { navigate('/Settings'); };
//   const {
//     handleChange, values,
//   } = usePasswordForm();
//   const handleOpen = () => { navigate('/Settings'); };

//   return (
//     <div>
//       <form
//         className={styles['signup-form']}
//       >
//         <div>
//           <h1 className={styles.header1}>Change your password</h1>
//           <div
//             className={styles.backarrow}
//             role="button"
//             tabIndex={0}
//             onClick={handleOpen}
//           >
//             <ArrowBackIcon />
//           </div>
//           <h1 className={styles.header3}>Confirm your password</h1>
//           <p className={styles.header2}>
//             Please enter your password in order to see your information ghdfdddddddddddddddddddd.

//           </p>
//           <label htmlFor="Confirm password">
//             <input
//               className="start-modals-form-input"
//               type="password"
//               id="password"
//               name="password"
//               value={values.password}
//               onChange={handleChange}
//               placeholder=" "
//             />
//             <span>Password</span>
//           </label>
//           <div>
//             <Button
//               id="next-login-password-button"
//               data-testid="next-button"
//               variant="outlined"
//               className={styles['singin-button']}
//               type="submit"
//             >
//               Confirm
//             </Button>
//           </div>
//         </div>
//       </form>
//     </div>
//     // <div>
//     //   <section className={styles.header1}>
//     //     Change your password
//     //     {' '}
//     //     <div
//     //       className={styles.backarrow}
//     //       role="button"
//     //       tabIndex={0}
//     //       onClick={handleOpen}
//     //     >
//     //       <ArrowBackIcon />

//   //     </div>
//   //   </section>
//   //   <section className={styles.flex1} />
//   // </div>

//   );
// }
// export default Settings;
// Settings.propTypes = {
//   // email: PropTypes.string.isRequired,
//   // handleAfterSignin: PropTypes.func.isRequired,
// };
