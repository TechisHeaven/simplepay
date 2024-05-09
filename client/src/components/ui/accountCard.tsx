import Image from "next/image";

export default function AccountCard() {
  return (
    <div
      className="card p-8 rounded-3xl my-2"
      style={{ backgroundImage: `url('/card-background.avif')` }}
    >
      <div className="flex items-center justify-between">
        <h6 className="text-xs max-w-48 truncate">Himanshu Verma</h6>
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
          ₹20,000<span className="text-primary-color/50">.20</span>
        </h1>
        <div className="flex items-center py-2 text-xs justify-between">
          <p className="tracking-widest">3232********9232</p>
          <p>Simple Pay</p>
        </div>
      </div>
    </div>
  );
}
