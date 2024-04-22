import { authControllerSignIn } from "@/api/generated";
import { useMutation } from "@tanstack/react-query";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import signInPageStyle from "@/styles/auth-pages.module.scss";

interface IInput {
  login: string;
  pasword: string;
}

const SignInPage = () => {
  const navigate = useNavigate({ from: "/sign-in" });

  const { register, handleSubmit } = useForm<IInput>();

  const mutation = useMutation({
    mutationFn: authControllerSignIn,
    onSuccess() {
      navigate({ to: "/home" });
    },
  });

  const submitData = (formData: IInput) => {
    mutation.mutate(formData);
    console.log(mutation.isError);
  };

  return (
    <div>
      <form
        className={signInPageStyle.form}
        onSubmit={handleSubmit(submitData)}
      >
        <h1>Вход</h1>
        {mutation.error && <h5>Неверный логин или пароль</h5>}
        {/* <label htmlFor="loginField">Логин</label> */}
        <input
          id="loginField"
          placeholder="Логин"
          type="text"
          {...register("login", { required: true })}
        />
        {/* <label htmlFor="passwordField">Пароль</label> */}
        <input
          id="passwordField"
          placeholder="Пароль"
          type="password"
          {...register("pasword", { required: true })}
        />
        <input type="submit" value="Войти" />
        <Link to="/sign-up">Нет аккаунта?</Link>
      </form>
    </div>
  );
};

export const Route = createLazyFileRoute("/sign-in/")({
  component: SignInPage,
});
