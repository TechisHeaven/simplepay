import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/components/ui/Loader";
import PaymentStatus from "@/components/ui/paymentStatus";
import { SelectScrollable } from "@/components/ui/scrollableSelectGateway";
import { IconCheck } from "@tabler/icons-react";
import { ArrowRight, Info } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  // return <p>gateway: {router.query.id}</p>;
  return (
    <>
      <Head>
        <title>Gateway</title>
      </Head>
      {true ? (
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
          <div className="py-8 flex flex-col items-start gap-2">
            <div className="userDetails flex items-center gap-2 flex-row">
              <Avatar>
                <AvatarImage
                  className="rounded-xl "
                  width={40}
                  height={40}
                  src={
                    "https://lh3.googleusercontent.com/a/ACg8ocIXH1OzdIK01CcjMDfzvlhE-LPnbaeCUG5RLgnXP0puXt80bqNX=s96-c"
                  }
                  alt="receiver-image"
                />
                <AvatarFallback className="bg-primary-color">HV</AvatarFallback>
              </Avatar>
              <div>
                <h4>Himanshu</h4>
                <p className="text-gray-400 text-xs">+91 823232323</p>
              </div>
            </div>
            <div className="banking flex flex-row gap-2  items-center p-2 text-sm font-semibold">
              <div className=" rounded-full p-1 bg-green-500">
                <IconCheck className="w-3 h-3" />
              </div>
              <h6>Bank Name : Himanshu Verma</h6>
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
                name="price"
                placeholder="100.00"
                className="text-5xl text-white outline-none bg-secondary-color [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="note">
              <input
                type="text"
                placeholder="Note"
                className="outline-none p-2 px-4 rounded-md bg-secondary-color-background"
              />
            </div>
            <div className="transaction-option my-2 flex items-center flex-row gap-2">
              <SelectScrollable />
              <button className="bg-primary-color p-4 rounded-md">
                {true ? <ArrowRight /> : <Loader />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
