import Appointments from '../Appointments/Appointments';
import MedicalHistory from '../MedicalHistory/MedicalHistory';
import Patients from '../Patients/Patients';
import './Content.css'

const Content = ({currentSelection}) => {

    const renderSection = () => {
        switch (currentSelection) {
          case 'Patients':
            return <Patients />;
          case 'MedicalHistory':
            return <MedicalHistory />;
          case 'Appointments':
            return <Appointments />
          default:
            return <div>INICIO</div>
        }
      };

    return (
        <div className='containerContent'>
            {renderSection()}
        </div>
    )
}

export default Content