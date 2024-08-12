const ErrorMessage = ({ message }) => {
    return (
      <div
        style={{
          padding: '10px',
          color: 'red',
          textAlign: 'center',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
        }}
      >
        {message}
      </div>
    );
  };
  
  export default ErrorMessage;