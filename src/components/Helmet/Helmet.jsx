const Helmet = ({ children, title }) => {
  document.title = title;
  return <div className=" w-100 ">{children}</div>;
};

export default Helmet;
