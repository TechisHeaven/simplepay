import { CardInterface } from "@/types/types.main";
import Image from "next/image";

export default function AccountCard({ card }: { card: CardInterface }) {
  function formatAccountNumber<Type>(number: Type | any) {
    const strNumber: string = String(number);

    const replacedNumber: string =
      strNumber.substring(0, 4) +
      strNumber.substring(4, strNumber.length - 1).replace(/\d/g, "*") +
      strNumber.charAt(strNumber.length - 1);

    // return formattedNumber;
    return replacedNumber;
  }
  const { balance, cardNumber, customerName, bankName } = card;
  return (
    <div
      className="card p-8 rounded-3xl my-2"
      style={{ backgroundImage: `url('/card-background.avif')` }}
    >
      <div className="flex items-center justify-between">
        <h6 className="text-xs max-w-48 truncate">{customerName}</h6>
        <Image
          src={"/mastercard-image.png"}
          fetchPriority="auto"
          width={40}
          height={40}
          alt="card"
        />
      </div>
      <div className="mt-8">
        <h1 className="text-3xl">
          ₹{balance}
          {/* <span className="text-primary-color/50">.20</span> */}
        </h1>
        <div className="flex items-center py-2 text-xs justify-between">
          <p className="tracking-widest">{formatAccountNumber(cardNumber)}</p>
          <p>{bankName}</p>
        </div>
      </div>
    </div>
  );
}
