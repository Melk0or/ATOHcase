import { Link, createLazyFileRoute } from "@tanstack/react-router";
import homePageStyles from "@/styles/home-page.module.scss";
import logo from "./../../../public/devil-svgrepo-com (1).svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authControllerSignOut,
  tableControllerAddClient,
  tableControllerGetClients,
} from "@/api/generated";
import TableItem from "@/components/TableItem";
import { useForm } from "react-hook-form";
import { useRef } from "react";

interface IClientForm {
  accountNumber: number;
  birthDate: string;
  EIN: string;
  fullName: string;
}

function useResetSession() {
  const queryClient = useQueryClient();
  return () => queryClient.removeQueries();
}

const HomePage = () => {
  const { register, handleSubmit } = useForm<IClientForm>();
  const formRef = useRef<HTMLFormElement>(null)
  const resetSession = useResetSession();

  const signOutMutation = useMutation({
    mutationFn: authControllerSignOut,
    onSuccess() {
      resetSession();
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: tableControllerGetClients,
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });

  const addCLientMutation = useMutation({
    mutationFn: tableControllerAddClient,
    onSuccess(clientData) {
      data?.unshift(clientData);
    },
  });

  const addClient = (formData: IClientForm) => {
    formData.accountNumber = +formData.accountNumber;
    formData.birthDate = new Date(formData.birthDate).toISOString();
    addCLientMutation.mutate(formData);
    formRef.current?.reset(); 

  };
  console.log(isLoading);

  return (
    <div className={homePageStyles.root}>
      <header className={homePageStyles.header}>
        <img src={logo} alt="" width={70} />
        <Link to="/" onClick={() => signOutMutation.mutate({})}>Выйти</Link>
      </header>
      <main className={homePageStyles.main}>
        <h1>Клиенты</h1>
        <table>
          <thead>
            <tr>
              <td>Номер клиента</td>
              <td>Номер счета</td>
              <td>ФИО</td>
              <td>День рождения</td>
              <td>ИНН</td>
              <td>Статус</td>
            </tr>
          </thead>
          <tbody>
            {!data ? (
              <tr>
                {new Array(6).fill(0).map((_, i) => <td key={i}>Загрузка</td>)}
              </tr>
            ) : (
              data?.map((item, index) => <TableItem {...item} key={index} />)
            )}
          </tbody>
        </table>
        <form ref={formRef} onSubmit={handleSubmit(addClient)}>
          <input
            type="text"
            placeholder="Номер счета"
            {...register("accountNumber", { required: true })}
          />
          <input
            type="text"
            placeholder="ФИО"
            {...register("fullName", { required: true })}
          />
          <input
            type="date"
            placeholder="День рождения"
            {...register("birthDate", { required: true })}
          />
          <input
            type="text"
            placeholder="ИНН"
            {...register("EIN", { required: true })}
          />
          <input type="submit" value={"Добавить клиента"}/>
        </form>
      </main>
    </div>
  );
};

export const Route = createLazyFileRoute("/home/")({
  component: HomePage,
});
