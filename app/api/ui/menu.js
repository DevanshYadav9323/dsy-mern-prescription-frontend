// module.exports = [

//   {
//     key: 'dashboard',
//     name: 'Dashboard',
//     linkParent: '/dashboard',
//     icon: 'fa-solid fa-house'
//   },

//   {
//     key: 'consultations',
//     name: 'Consultations',
//     linkParent: '/consultations',
//     icon: 'fa-solid fa-user-doctor'
//   },

//   {
//     key: 'prescriptions',
//     name: 'Prescriptions',
//     linkParent: '/prescriptions',
//     icon: 'fa-solid fa-file-prescription'
//   },

//   {
//     key: 'profile',
//     name: 'Profile',
//     linkParent: '/doctor-profile',
//     icon: 'fa-solid fa-user'
//   }

// ];



const role =
  localStorage.getItem("role");

const doctorMenu = [

  {
    key: 'dashboard',
    name: 'Dashboard',
    linkParent: '/dashboard',
    icon: 'fa-solid fa-house'
  },

  {
    key: 'consultations',
    name: 'Consultations',
    linkParent: '/consultations',
    icon: 'fa-solid fa-user-doctor'
  },

  {
    key: 'prescriptions',
    name: 'Prescriptions',
    linkParent: '/prescriptions',
    icon: 'fa-solid fa-file-prescription'
  },

];

const patientMenu = [

  {
    key: 'doctors',
    name: 'Doctors',
    linkParent: '/doctors',
    icon: 'fa-solid fa-user-doctor'
  },

  {
    key: 'my-consultations',
    name: 'My Consultations',
    linkParent: '/my-consultations',
    icon: 'fa-solid fa-notes-medical'
  },

  {
    key: 'my-prescriptions',
    name: 'My Prescriptions',
    linkParent: '/my-prescriptions',
    icon: 'fa-solid fa-file-prescription'
  },

];

const dataMenu =
  role === "doctor"
    ? doctorMenu
    : patientMenu;

    console.log("dasdfa" , dataMenu);

export default dataMenu;