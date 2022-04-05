import './Alert.styles.scss';

const Alert = ({ message }) => {
      return (
            <h3 className='alert'>{message}</h3>
      )
}

export default Alert