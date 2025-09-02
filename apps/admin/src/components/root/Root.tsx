import { useEffect } from "react";
import { useNavigate } from "react-router";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/posts");
  }, [navigate]);

  return <></>;
};

export default Root;
