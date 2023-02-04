export const Answer = ({ children, setAnswer }) => {
  return (
    <div>
      {children}
      <input type="text" onChange={setAnswer} style={{ width: "100%" }} />
    </div>
  );
};
