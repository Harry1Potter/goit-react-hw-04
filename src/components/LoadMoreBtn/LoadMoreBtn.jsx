const LoadMoreBtn = ({ handleLoadMoreClick }) => {
    return (
      <button
        type="button"
        onClick={handleLoadMoreClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Load more
      </button>
    );
  };
  
  export default LoadMoreBtn;
  