import Appointments from '../Appointments/Appointments';
import Dashboard from '../Dashboard/Dashboard';
import MedicalHistory from '../MedicalHistory/MedicalHistory';
import Patients from '../Patients/Patients';
import './Content.css'

const Content = ({ currentSelection }) => {

  const renderSection = () => {
    switch (currentSelection) {
      case 'Patients':
        return <Patients />;
      case 'Appointments':
        return <Appointments />
      case 'Dashboard':
        return <Dashboard />
      default:
        return <Dashboard />
    }
  };

  return (
    <div className='containerContent'>
      {renderSection()}
    </div>
  )
}

export default Content