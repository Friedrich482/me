import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/posts");
  }, [navigate]);

  return <></>;
};
