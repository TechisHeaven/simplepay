import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/components/ui/Loader";
import PaymentStatus from "@/components/ui/paymentStatus";
import { SelectScrollable } from "@/components/ui/scrollableSelectGateway";
import { UserInterface } from "@/types/types.main";
import sanitizedConfig from "@/utils/env.config";
import { IconCheck } from "@tabler/icons-react";
import { ArrowRight, Info } from "lucide-react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useBank } from "../bankSessionProvider";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TransactionService from "@/services/transaction.service";

export default function Page({ user }: { user: UserInterface }) {
  const router = useRouter();
  const { bankState } = useBank();
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({
    amount: 0,
    from: currentUserId,
    to: user?.id,
    note: "",
    card: selected,
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      card: selected,
    }));
  }, [selected]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (formData.amount <= 0 || formData.note.length <= 0) {
      return setError("Please Fill All Fields");
    }
    try {
      const result = await TransactionService.createTransaction(formData);
      if (result.status === 201) {
        // bankState?.cards.find((c) => c.id === selected)?.balance =
        //   formData.amount;
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message);
    }
  }
  // return <p>gateway: {router.query.id}</p>;
  return (
    <>
      <Head>
        <title>Gateway</title>
      </Head>
      {false ? (
        <PaymentStatus />
      ) : (
        <div className="p-8 w-full flex items-start flex-col">
          <div className="bg-secondary-color-background p-1 rounded-3xl">
            <button className="text-lg p-2 px-8 font-semibold bg-primary-color text-center rounded-3xl  ">
              Pay
            </button>
            <button
              onClick={() => router.push("/payment")}
              className="text-lg p-2 px-4 font-semibold  text-center rounded-3xl  "
            >
              Receive
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="py-8 flex flex-col items-start gap-2"
          >
            <div className="userDetails flex items-center gap-2 flex-row">
              <Avatar>
                <AvatarImage
                  className="rounded-xl "
                  width={40}
                  height={40}
                  src={user?.image}
                  alt="receiver-image"
                />
                <AvatarFallback className="bg-primary-color">
                  {user?.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4>{user?.name}</h4>
                <p className="text-gray-400 text-xs">+91 000000000</p>
              </div>
            </div>
            <div className="banking flex flex-row gap-2  items-center p-2 text-sm font-semibold">
              <div className=" rounded-full p-1 bg-green-500">
                <IconCheck className="w-3 h-3" />
              </div>
              <h6>Bank Name : {user?.name}</h6>
            </div>
            <div className="caption flex items-center gap-2 rounded-md text-gray-400 text-xs bg-secondary-color-background/50 p-2 px-4">
              <Info className="w-4 h-4" /> Transfer made to bank account could
              take a few mintues.
            </div>
            <div className="price my-8 text-gray-400 text-2xl flex flex-row items-center gap-2">
              ₹{" "}
              <input
                type="number"
                autoFocus
                id="amount"
                onChange={handleChange}
                name="amount"
                placeholder="100.00"
                className="text-5xl text-white outline-none bg-secondary-color [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="note">
              <input
                type="text"
                name="note"
                id="note"
                onChange={handleChange}
                placeholder="Note"
                className="outline-none p-2 px-4 rounded-md bg-secondary-color-background"
              />
            </div>
            <div className="transaction-option my-2 flex items-center flex-row gap-2">
              <SelectScrollable
                setSelected={setSelected}
                cards={bankState?.cards!}
              />
              <button type="submit" className="bg-primary-color p-4 rounded-md">
                {true ? <ArrowRight /> : <Loader />}
              </button>
            </div>
            <p className="text-xs text-red-500">{error}</p>
          </form>
        </div>
      )}
    </>
  );
}

export const getServerSideProps = (async ({ params }) => {
  // Fetch data from external API
  const url = sanitizedConfig.BACKEND_URL;
  const { id } = params as { id: string };
  const res = await fetch(`${url}api/user/${id}`);
  const user: { result: UserInterface } = await res.json();
  // Pass data to the page via props
  return { props: { user: user.result || null } };
}) satisfies GetServerSideProps<{ user: UserInterface }>;
