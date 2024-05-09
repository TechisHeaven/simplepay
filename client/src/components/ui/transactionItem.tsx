export default function TransactionItem() {
  return (
    <div className="transaction">
      <div className="flex items-center gap-2">
        {/* <Image
            src={""}
            className="bg-green-500 rounded-xl"
            width={40}
            height={40}
            alt=""
          ></Image> */}
        <div className="w-10 h-10 bg-green-500 rounded-xl"></div>
        <div className="font-medium flex-1">
          <h6 className="text-xs">Public Transport</h6>
          <p className="text-gray-400 text-xs">5 hours ago</p>
        </div>
        <p className="text-xs">-₹50.52</p>
      </div>
    </div>
  );
}
