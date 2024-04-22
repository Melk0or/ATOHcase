import {  authControllerSignUp } from "@/api/generated";
import { useMutation } from "@tanstack/react-query";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import signUpPageStyle from "@/styles/auth-pages.module.scss";

interface IInput {
  login: string;
  pasword: string;
  fullName: string;
}

const SignUpPage = () => {
  // const client = useQueryClient();
  const navigate = useNavigate({ from: "/sign-in" });

  const { register, handleSubmit } = useForm<IInput>();

  const mutation = useMutation({
    mutationFn: authControllerSignUp,
    // async onSettled() {
    //   await client.invalidateQueries({ queryKey: ["session"] });
    // },
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
        className={signUpPageStyle.form}
        onSubmit={handleSubmit(submitData)}
      >
        <h1>Регистрация</h1>
        {mutation.error && <h5>Чел с таким логином или фио уже существует</h5>}
        {/* <label htmlFor="loginField">Логин</label> */}
        <input
          id="nameField"
          placeholder="ФИО"
          type="text"
          {...register("fullName", { required: true })}
        />
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
        <Link to="/sign-in">Есть аккаунт?</Link>
      </form>
    </div>
  );
};
export const Route = createLazyFileRoute("/sign-up/")({
  component: SignUpPage,
});
