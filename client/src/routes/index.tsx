import { authControllerGetSessionInfo } from "@/api/generated";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import mainPageStyles from "@/styles/main-page.module.scss";
import logo from "./../../public/devil-svgrepo-com (1).svg";
import { useEffect, useRef } from "react";

const WelcomePage = () => {
  const navigate = useNavigate({ from: "/" });
  const isMounted = useRef(false);
  const { data, isError } = useQuery({
    queryKey: ["session"],
    queryFn: authControllerGetSessionInfo,
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
  console.log(isError, data);

  useEffect(() => {
    if (!isError && isMounted.current) {
      console.log(data);
      navigate({ to: "/home" });
    }
    isMounted.current = true;
  }, [data]);

  return (
    <div className={mainPageStyles.root}>
      <img src={logo} alt="picture of devil - my main logo" width={150} />
      <h1>Добро пожаловать ... куда? </h1>
      <p>
        <Link to="/sign-in">Войдите</Link> в аккаунт или{" "}
        <Link to="/sign-up">создайте</Link> его для дальнейшего пользования
        сайтом
      </p>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: WelcomePage,
});
