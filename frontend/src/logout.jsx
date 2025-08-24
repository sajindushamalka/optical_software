const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    //window.location.href = '/login'; // or useNavigate
  }, []);

  return null;
};
