import PatientForm from "../../components/PatientForm";
import DoctorForm from "../../components/DoctorForm";
import StaffForm from "../../components/StaffForm";
import AuthContext from "../../context/AuthContext"
import { useContext } from "react";

export default function Profile() {
  const {userData} = useContext(AuthContext)
  
  if (userData.role == "doctor") return <DoctorForm />;
  if (userData.role == "patient") return <PatientForm />
  if (userData.role == "staff") return <StaffForm />
}
